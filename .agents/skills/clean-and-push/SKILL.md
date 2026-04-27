---
name: clean-and-push
description: Cleans up the codebase by removing console logs and unused imports, then commits and pushes changes to git. Use when the user wants to finalize a feature or fix and ensure the code is clean before pushing.
---

# Clean And Push

This skill automates the process of cleaning up code (logs and imports) and synchronizing with a remote repository.

## Workflow

### 1. Code Cleanup
Run the provided cleanup script to remove `console.log` statements and use `eslint` to fix auto-fixable issues like unused imports.

- **Remove Logs**: Execute the cleanup script on target directories.
  ```bash
  node .gemini/skills/clean-and-push/scripts/cleanup.cjs real-estate-client real-estate-server
  ```
- **Fix Imports**: Run lint with fix in the respective project directories.
  - Client: `cd real-estate-client && npm run lint -- --fix`
  - Server: `cd real-estate-server && npm run lint -- --fix`

### 2. Manual Verification
Check if any unused imports remain (ESLint doesn't always remove them automatically without specific plugins).
- Use `grep_search` to find `unused` warnings if lint fails.
- Manually remove any remaining unused imports.

### 3. Commit Changes
Gather information and propose a commit message.
- Run `git status` and `git diff` to review changes.
- Propose a message like: `chore: cleanup logs and unused imports`

### 4. Push to Remote
Push the committed changes to the current branch.
- Run `git push`.

## Guidelines
- Always verify that the cleanup script didn't remove necessary logic (regex is robust but worth a quick check).
- Ensure the project still builds after cleanup (`npm run build`).
- If `eslint --fix` doesn't remove unused imports, you MUST manually remove them from the affected files.
