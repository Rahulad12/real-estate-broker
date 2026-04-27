---
name: repo-sync
description: Synchronizes local milestones and issues with remote repositories (GitHub/GitLab). Use this skill to ensure your remote issue tracker reflects the current state of local project planning.
---

# Repo Sync

This skill ensures that local project management data (milestones and issues) is synchronized with the remote repository.

## Workflow

1. **Remote Discovery**: Identify the remote repository URL and type (GitHub/GitLab).
2. **State Comparison**: Compare local `.agents/taskboard/milestones.md` and issues against the remote state.
3. **Milestone Sync**:
    - For GitHub: Use `gh api` or `gh milestone` (if available) to create/update milestones.
    - For GitLab: Use `glab api` to manage milestones.
4. **Issue Association**: Link local tasks to remote issues.
5. **Conflict Resolution**: If discrepancies are found, prioritize the user's preferred source of truth (usually local for new plans, remote for active collaboration).

## Examples

### GitHub Milestone Creation (via API)
```bash
gh api repos/:owner/:repo/milestones -f title="Milestone Name" -f description="Description" -f state="open"
```

### GitLab Milestone Creation (via API)
```bash
glab api projects/:id/milestones -f title="Milestone Name" -f description="Description"
```

## Guidance
Prefer using high-level CLI commands (like `gh issue create`) before falling back to raw API calls. Always verify authentication status before attempting sync operations.
