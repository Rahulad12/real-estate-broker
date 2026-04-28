---
name: requirement-implementer
description: Implements requirements with a milestone-first workflow. Creates milestones, todo items, and GitHub issues before asking user approval to implement. Use this skill when the user pastes a requirement and wants it fully implemented following the project's plan-before-action mandate.
---

# Requirement Implementer

This skill implements requirements by strictly following the project's "Milestone & Issue-First Development" workflow. No implementation begins without updating the roadmap and getting user approval.

## Workflow

### Phase 1: Requirement Analysis
1. **Read Project Context**: Read `AGENTS.md`, `README.md`, and current `.agents/taskboard/milestones.md` and `todo.md` to understand existing scope.
2. **Analyze Requirement**: Break down the user's requirement into:
   - Milestones (logical phases if complex)
   - Granular tasks
   - GitHub issues needed

### Phase 2: Milestone & Task Update
1. **Update Milestones**: Add new milestone(s) to `.agents/taskboard/milestones.md` following the [milestone-template.md](references/milestone-template.md) format.
2. **Update TODO**: Add corresponding tasks to `.agents/taskboard/todo.md` with proper priority (High/Medium/Low) and expected GitHub issue numbers.

### Phase 3: GitHub Issues Creation
1. **Create Issues**: Use `gh issue create` to create GitHub issues for each task. Follow the [issue-template.md](references/issue-template.md) format.
2. **Link Issues**: Update the todo.md with the created issue numbers (e.g., `(#23)`).
3. **Link Milestones**: Attach issues to the appropriate GitHub milestone using `gh issue edit <number> --milestone <milestone-name>`.

### Phase 4: User Approval
1. **Present Plan**: Display a summary of:
   - Milestones created/updated
   - Tasks added to todo
   - GitHub issues created
2. **Ask User**: Present the question: "Should I start implementing this requirement?" with options:
   - "Yes, start implementation (Recommended)"
   - "No, let me review first"
3. **Wait for Response**: Do NOT proceed without explicit user approval.

### Phase 5: Implementation
Only after user approves:
1. **Follow Milestones**: Implement in order of milestones (if multiple).
2. **Follow TODO Order**: Complete tasks in priority order (High → Medium → Low).
3. **Server First**: If changes span both client and server, implement server changes first (APIs, schemas, controllers).
4. **Client Second**: Implement frontend changes (components, hooks, pages).
5. **Validation**: Run linting (`npm run lint`) in both `real-estate-server/` and `real-estate-client/`.
6. **Update Status**: Mark completed tasks as `[x]` in `todo.md` and update milestone progress.

## Implementation Guidelines
- **Server Changes**: Follow module-based architecture in `real-estate-server/src/modules/`
- **Client Changes**: Follow feature-based modules in `real-estate-client/src/modules/`
- **API Convention**: Strictly follow `.agents/rules/api-convention.md`
- **Component Architecture**: Check for unnecessary re-renders, use `src/components/shared/` for reusable components
- **Performance**: Complete the performance checklist for each feature implemented

## Error Handling
- If `gh` CLI is not authenticated, instruct user to run `gh auth login`
- If milestone creation fails, continue with issues only and note the error
- If user rejects implementation, leave all planning artifacts (milestones, todo, issues) for later use

## Reference
- See [implementation-checklist.md](references/implementation-checklist.md) for the mandatory checklist to complete after implementation.
