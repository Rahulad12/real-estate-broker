---
name: issue-creator
description: Automatically generates and creates GitHub or GitLab issues based on project tasks or bug reports. Use this skill to populate your issue tracker from local task lists or after identifying bugs.
---

# Issue Creator

This skill automates the creation of issues on GitHub or GitLab.

## Workflow

1. **Task Identification**: Extract tasks from `.agents/taskboard/milestones.md` or identify a bug through testing.
2. **Context Enrichment**: Gather relevant context (code snippets, error logs, or requirements) to include in the issue description.
3. **Drafting**: Generate a clear title and a detailed description following the project's issue template.
4. **Platform Selection**: Identify whether the project uses GitHub (`gh`) or GitLab (`glab`) CLI.
5. **Execution**: Create the issue using the platform-specific CLI command.
6. **Reference Update**: Once created, update the local task list with the issue URL or ID.

## CLI Command Examples

### GitHub (gh)
```bash
gh issue create --title "[Title]" --body "[Body]" --label "[Label]"
```

### GitLab (glab)
```bash
glab issue create --title "[Title]" --description "[Body]" --label "[Label]"
```

## Reference

See [issue-template.md](references/issue-template.md) for the recommended issue format.
