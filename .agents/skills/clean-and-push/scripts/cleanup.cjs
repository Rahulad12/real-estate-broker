const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

/**
 * Removes console.log statements from a file.
 * @param {string} filePath 
 */
function removeConsoleLogs(filePath) {
    let content = fs.readFileSync(filePath, 'utf8');
    // Regex to match console.log(...) and optional trailing semicolon
    // Handles multi-line logs as well
    const regex = /console\.log\s*\((?:[^)(]+|\((?:[^)(]+|\([^)(]*\))*\))*\)\s*;?/g;
    const newContent = content.replace(regex, '');
    
    if (content !== newContent) {
        fs.writeFileSync(filePath, newContent, 'utf8');
        return true;
    }
    return false;
}

/**
 * Recursively find files in a directory.
 */
function getFiles(dir, fileList = []) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const name = path.join(dir, file);
        if (fs.statSync(name).isDirectory()) {
            if (!['node_modules', 'dist', '.git', 'build'].includes(file)) {
                getFiles(name, fileList);
            }
        } else {
            if (/\.(ts|tsx|js|jsx)$/.test(name)) {
                fileList.push(name);
            }
        }
    }
    return fileList;
}

const targetDirs = process.argv.slice(2);
if (targetDirs.length === 0) {
    console.log("Usage: node cleanup.cjs <dir1> <dir2> ...");
    process.exit(1);
}

let modifiedCount = 0;
targetDirs.forEach(dir => {
    const fullPath = path.resolve(dir);
    if (fs.existsSync(fullPath)) {
        const files = getFiles(fullPath);
        files.forEach(file => {
            if (removeConsoleLogs(file)) {
                modifiedCount++;
                console.log(`Cleaned: ${file}`);
            }
        });
    }
});

console.log(`Finished. Modified ${modifiedCount} files.`);
