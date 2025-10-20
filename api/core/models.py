from typing import List, Dict, Any, Optional
from pydantic import BaseModel, Field

class StoryOptionLLM(BaseModel):
    text: str = Field(description="The text of the option shown to the user")
    nextNode: Optional[Dict[str, Any]] = Field(default=None, description="The next node content and its options")

class StoryNodeLLM(BaseModel):
    content: str = Field(description="The main content of the story node")
    isEnding: bool = Field(default=False, description="Whether this node is an ending node")
    isWinningEnding: bool = Field(default=False, description="Whether this node is a winning ending node")
    options: Optional[List[StoryOptionLLM]] = Field(default=None, description="The options for this node")

class StoryLLMResponse(BaseModel):
    title: str = Field(description="The title of the story")
    rootNode: StoryNodeLLM = Field(description="The root node of the story")
