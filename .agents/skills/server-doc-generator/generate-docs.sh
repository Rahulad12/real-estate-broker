#!/bin/bash
# Server Documentation Generator
# This script adds JSDoc comments to all server-side code

SERVER_DIR="E:/code/real-estate-broker/real-estate-server/src"

echo "Generating JSDoc documentation for server code..."

# Process all TypeScript files in modules
find "$SERVER_DIR/modules" -name "*.ts" | while read file; do
  echo "Processing: $file"
  # Add file-level JSDoc if not present
  if ! grep -q "@fileoverview" "$file"; then
    # Insert after first import line
    sed -i '1s/^/\/**\n * @fileoverview Auto-generated JSDoc\n * @module '$(basename "$file" .ts)'\n *\/\n\n/' "$file"
  fi
done

echo "Documentation generation complete!"
echo "Please review and commit the changes."
