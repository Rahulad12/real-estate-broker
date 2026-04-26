---
name: milestone-manager
description: Analyzes project requirements and current state to propose, create, and manage project milestones. Use this skill when you need to break down a large project into manageable phases or update the project roadmap.
---

# Milestone Manager

This skill helps you create and manage project milestones by analyzing the existing codebase, `README.md`, `WIKI.md`, and `GEMINI.md`.

## Workflow

1. **Information Gathering**: Read the root `README.md`, `WIKI.md`, and `GEMINI.md` to understand the project goals and core requirements.
2. **Current State Analysis**: Check the existing codebase to identify what has already been implemented.
3. **Gap Analysis**: Compare the requirements against the current state to identify missing features and technical debt.
4. **Milestone Proposal**: Group the remaining tasks into logical milestones (e.g., Phase 1: MVP, Phase 2: Enhanced Features).
5. **Review**: Present the proposed milestones to the user for approval.
6. **Persistence**: Save approved milestones to `.gemini/taskboard/milestones.md`.

## Milestone Structure

Each milestone should follow this format:
- **Title**: Clear and concise (e.g., "Milestone 1: Authentication & User Profiles").
- **Objective**: A brief description of what this milestone achieves.
- **Tasks**: A list of specific, actionable tasks required to complete the milestone.
- **Status**: (Pending/In Progress/Completed).
- **Target Date**: (Optional).

## Reference

See [milestone-template.md](references/milestone-template.md) for the standard format.
