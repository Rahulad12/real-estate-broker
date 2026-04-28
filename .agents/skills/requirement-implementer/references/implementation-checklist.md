# Implementation Checklist

Complete this checklist after implementing any requirement:

## Code Quality
- [ ] Server: Run `npm run lint` in `real-estate-server/`
- [ ] Server: Run `npm run format` in `real-estate-server/` (if Prettier available)
- [ ] Client: Run `npm run lint` in `real-estate-client/`
- [ ] Client: Verified no TypeScript errors

## Performance (MANDATORY)
- [ ] Checked for unnecessary re-renders using React DevTools or similar
- [ ] Extracted components causing re-renders in parent/sibling components
- [ ] Placed reusable global components in `src/components/shared/`
- [ ] Avoided `useEffect` unless necessary (documented reason in comments)
- [ ] Used `useMemo`/`useCallback` for expensive operations
- [ ] Verified component renders only when its own state/props change

## API Convention (CRITICAL)
- [ ] Followed API convention rules in `.agents/rules/api-convention.md`
- [ ] Used TanStack Query hooks in `src/apis/hooks/` for data fetching
- [ ] Services in `src/apis/services/` for pure API calls only
- [ ] Never called services directly from components

## Task Completion
- [ ] Marked completed tasks as `[x]` in `.agents/taskboard/todo.md`
- [ ] Updated milestone status in `.agents/taskboard/milestones.md`
- [ ] Closed corresponding GitHub issues (if applicable)
- [ ] Tested the feature manually in browser

## Documentation
- [ ] Updated relevant README sections (if needed)
- [ ] Added JSDoc comments for new functions (if complex logic)
