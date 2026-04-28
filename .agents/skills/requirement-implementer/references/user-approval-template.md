# User Approval Question Template

After completing Phase 1-3 (planning), use the `question` tool with this format:

```json
{
  "questions": [
    {
      "question": "I've created the following:\n\n**Milestones:**\n- [List milestone names and objectives]\n\n**TODO Tasks:**\n- [List tasks with priorities]\n\n**GitHub Issues:**\n- [List issue numbers and titles]\n\nShould I start implementing this requirement?",
      "header": "Start Implementation?",
      "options": [
        {
          "label": "Yes, start implementation (Recommended)",
          "description": "Begin implementing the requirement following the created milestones and tasks"
        },
        {
          "label": "No, let me review first",
          "description": "Pause implementation and wait for further instructions"
        }
      ]
    }
  ]
}
```

## Important Notes
- Always present a clear summary of what was created before asking
- The "Yes" option should be first and marked as "(Recommended)"
- Never proceed with implementation without explicit user approval
- If user selects "No", do not implement - wait for further instructions
