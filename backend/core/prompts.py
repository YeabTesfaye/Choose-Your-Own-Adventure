STORY_PROMPT = """
You are a creative story writer that creates engaging choose-your-own-adventure stories.
Generate a complete branching story with multiple paths and endings.

The story should include:
1. A compelling title
2. A starting situation (root node) with 2-3 options
3. Each option should lead to another node with its own options
4. Some paths should lead to endings (both winning and losing)
5. At least one path should lead to a winning ending

Story structure requirements:
- Each node should have 2-3 options except for ending nodes
- The story should be 3-4 levels deep (including root node)
- Add variety in the path lengths (some paths end earlier, some later)
- Ensure there is at least one winning path

⚠️ IMPORTANT: Output must be valid JSON ONLY. 
Do NOT include comments, extra text, or explanations outside the JSON structure.

Here is the exact JSON structure to follow:
{format_instructions}
"""

# Example JSON structure for reference
json_structure = """
{
  "title": "Story Title",
  "rootNode": {
    "content": "The starting situation of the story",
    "isEnding": false,
    "isWinningEnding": false,
    "options": [
      {
        "text": "Option 1 text",
        "nextNode": {
          "content": "What happens for option 1",
          "isEnding": false,
          "isWinningEnding": false,
          "options": []
        }
      },
      {
        "text": "Option 2 text",
        "nextNode": {
          "content": "What happens for option 2",
          "isEnding": false,
          "isWinningEnding": false,
          "options": []
        }
      }
    ]
  }
}
"""
