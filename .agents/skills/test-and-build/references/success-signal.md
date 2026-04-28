# Success Signal Template

After all checks pass and builds succeed, output this exact success message:

```
✅ ===============================
   PROJECT IS FINE AND READY
==================================

✓ TypeScript `any` types: Fixed
✓ Console statements: Cleaned
✓ Import paths: Validated
✓ Architecture: Compliant
✓ Linting: Passed
✓ TypeScript: Compiled
✓ Build: Successful

Ready for deployment!
==================================
```

## Variation for Partial Success

If some non-critical issues remain but build succeeds:

```
⚠️ ===============================
   PROJECT BUILT WITH WARNINGS
==================================

✓ TypeScript `any` types: Fixed
✓ Console statements: Cleaned
✓ Import paths: Validated
✓ Architecture: Compliant
✓ Linting: Passed
✓ TypeScript: Compiled
✓ Build: Successful

⚠️  Warnings:
   - [List any remaining warnings]

Ready for deployment (review warnings first)!
==================================
```

## Variation for Failure

If build fails after 3 attempts:

```
❌ ===============================
   PROJECT HAS CRITICAL ISSUES
==================================

❌ Build failed after 3 attempts

Issues found:
- [List critical issues]

Please fix these issues manually and re-run the skill.
==================================
```

## Notes
- Use emojis exactly as shown (✅, ⚠️, ❌)
- Keep the box drawing characters (═, =) for visual consistency
- Update checkmarks based on actual results (✓ for pass, ❌ for fail, ⚠️ for warnings)
