---
name: prompt-engineer
description: Translates user requirements into structured, high-quality prompts for Gemini CLI. Enforces a "Milestone First" workflow where planning precedes implementation.
---

# Prompt Engineer

This skill helps transform vague or complex requirements into actionable prompts while ensuring the project roadmap is updated first.

## The "Milestone First" Mandate
Before generating any implementation prompt, this skill MUST ensure that:
1. The requirement is mapped to an existing or new Milestone in `.agents/taskboard/milestones.md`.
2. Granular tasks are added to `.agents/taskboard/todo.md`.
3. The user has confirmed the plan.

## Workflow

1. **Requirement Analysis**: Deeply analyze the user's request. Ask clarifying questions if the scope is ambiguous.
2. **Milestone Check**:
    - If the request fits an existing milestone, update the `todo.md`.
    - If it's a new feature set, propose a new Milestone in `milestones.md`.
3. **Drafting the Prompt**: Once the roadmap is updated, generate a structured prompt for the implementation phase.
4. **Validation**: Ensure the prompt includes:
    - Clear Goal
    - Technical Constraints (referencing `rules/`)
    - Context (files involved)
    - Verification Steps

## Prompt Template Reference
See [prompt-templates.md](references/prompt-templates.md) for standard prompt structures.
