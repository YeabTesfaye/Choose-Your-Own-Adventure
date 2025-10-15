from sqlalchemy.orm import Session
from langchain_google_genai import ChatGoogleGenerativeAI
from langchain_core.prompts import ChatPromptTemplate
from langchain_core.output_parsers import PydanticOutputParser
from core.prompts import STORY_PROMPT
from models.story import Story, StoryNode
from core.models import StoryLLMResponse, StoryNodeLLM
from dotenv import load_dotenv
import re
import json
from core.config import settings
import random

load_dotenv()


class StoryGenerator:

    @classmethod
    def _get_llm(cls):
        """Return a Google Gemini LLM instance"""
        if not settings.GOOGLE_API_KEYS:
            raise ValueError("NO GOOGLE API KEY FOUND")
        google_api_key = random.choice(settings.GOOGLE_API_KEYS)
        print(f"🔑 Using Gemini key: {google_api_key[5:]}...")

        return ChatGoogleGenerativeAI(
            model="gemini-2.0-flash",
            google_api_key=google_api_key,  # type: ignore
            temperature=0.7,
            max_output_tokens=2048,  # type: ignore
            # response_mime_type="application/json",  # 👈 tells Gemini to return pure JSON # type: ignore
        )

    @classmethod
    def generate_story(cls, db: Session, session_id: str, theme: str = "fantasy"):
        llm = cls._get_llm()
        story_parser = PydanticOutputParser(pydantic_object=StoryLLMResponse)

        prompt = ChatPromptTemplate.from_messages(
            [
                ("system", STORY_PROMPT),
                ("human", f"Create the story with this theme: {theme}"),
            ]
        ).partial(format_instructions=story_parser.get_format_instructions())

        # Run Gemini
        raw_response = llm.invoke(prompt.invoke({}))

        # ✅ Extract response content safely
        response_text = getattr(raw_response, "content", None)
        if not response_text:
            raise ValueError(
                "Gemini returned no content — check API quota or response format."
            )

        # print("\n🧠 RAW GEMINI OUTPUT:\n", response_text[:1000])
        # print("-" * 80)

        # ✅ Clean markdown fences
        response_text = re.sub(
            r"^```json|```$", "", response_text.strip(), flags=re.MULTILINE
        )

        # ✅ Try direct parse
        try:
            story_structure = story_parser.parse(response_text)
        except Exception as e:
            print(f"⚠️ JSON parsing failed: {e}")
            cleaned_json = cls._extract_json(response_text)
            print("🛠 CLEANED JSON:\n", cleaned_json[:800])

            try:
                data = json.loads(cleaned_json)
                story_structure = StoryLLMResponse.model_validate(data)
            except Exception as inner_e:
                raise ValueError(f"❌ Still invalid JSON after cleaning: {inner_e}")

        # ✅ Save to DB
        story_db = Story(title=story_structure.title, session_id=session_id)
        db.add(story_db)
        db.flush()

        root_node_data = story_structure.rootNode
        if isinstance(root_node_data, dict):
            root_node_data = StoryNodeLLM.model_validate(root_node_data)

        cls._process_story_node(db, story_db.id, root_node_data, is_root=True)  # type: ignore

        db.commit()
        return story_db

    @staticmethod
    def _extract_json(text: str) -> str:
        """
        Attempt to extract or repair JSON from Gemini’s output.
        Handles truncated JSON and removes garbage.
        """
        # Remove markdown fences
        text = text.strip().replace("```json", "").replace("```", "")

        # Extract first '{' and last '}' block
        start = text.find("{")
        end = text.rfind("}")
        if start != -1 and end != -1 and end > start:
            json_candidate = text[start : end + 1]
        else:
            json_candidate = text

        # Try basic repair for truncated output
        open_braces = json_candidate.count("{")
        close_braces = json_candidate.count("}")
        if open_braces > close_braces:
            json_candidate += "}" * (open_braces - close_braces)

        # Remove trailing commas (common cause of JSON errors)
        json_candidate = re.sub(r",(\s*[}\]])", r"\1", json_candidate)

        return json_candidate

    @classmethod
    def _process_story_node(
        cls, db: Session, story_id: int, node_data: StoryNodeLLM, is_root: bool = False
    ) -> StoryNode:
        node = StoryNode(
            story_id=story_id,
            content=node_data.content,
            is_root=is_root,
            is_ending=node_data.isEnding,
            is_winning_ending=node_data.isWinningEnding,
            options=[],
        )
        db.add(node)
        db.flush()

        if not node.is_ending and (hasattr(node_data, "options") and node_data.options):  # type: ignore
            options_list = []
            for option_data in node_data.options:
                next_node = option_data.nextNode

                if isinstance(next_node, dict):
                    next_node = StoryNodeLLM.model_validate(next_node)

                child_node = cls._process_story_node(db, story_id, next_node, False)  # type: ignore

                options_list.append(
                    {"text": option_data.text, "node_id": child_node.id}
                )

            node.options = options_list  # type: ignore

        db.flush()
        return node
