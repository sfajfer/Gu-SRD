const fs = require('fs');
const path = require('path');

// 1. UPDATE THIS PATH to point to where your rule components are stored!
const RULES_DIR = path.join(__dirname, 'src', 'components', 'rules'); 
// This will create searchIndex.js inside your src folder
const OUTPUT_FILE = path.join(__dirname, 'src', 'searchIndex.js');

function walkDir(dir, callback) {
  if (!fs.existsSync(dir)) return;
  fs.readdirSync(dir).forEach(f => {
    let dirPath = path.join(dir, f);
    let isDirectory = fs.statSync(dirPath).isDirectory();
    isDirectory ? walkDir(dirPath, callback) : callback(dirPath);
  });
}

const indexData = [];

walkDir(RULES_DIR, (filePath) => {
  if (!filePath.endsWith('.js') && !filePath.endsWith('.jsx')) return;
  if (filePath.includes('RulesDirectory')) return; 

  const fileContent = fs.readFileSync(filePath, 'utf8');

  // Extract the title
  const titleMatch = fileContent.match(/<h1[^>]*>([^<]+)<\/h1>/) || fileContent.match(/<div className="gu-title">([^<]+)<\/div>/);
  const title = titleMatch ? titleMatch[1].trim() : path.basename(filePath, path.extname(filePath));

  // Extract return block content
  const returnMatch = fileContent.match(/return\s*\(\s*([\s\S]*?)\s*\);/);
  let cleanContent = "";
  
  if (returnMatch) {
      // 1. Strip out HTML/JSX tags first
      cleanContent = returnMatch[1]
          .replace(/<[^>]+>/g, ' ') 
          .replace(/\s+/g, ' ') 
          .trim();

      // 2. Locate the word "Directory" (case-insensitive)
      const directoryIndex = cleanContent.search(/directory/i);
      
      if (directoryIndex !== -1) {
          // Keep everything starting from the index of "Directory"
          cleanContent = cleanContent.slice(directoryIndex + 9).trim();
      }
  }

  indexData.push({ title, content: cleanContent });
});

const fileOutput = `// AUTO-GENERATED FILE. DO NOT EDIT DIRECTLY.\nexport const searchIndex = ${JSON.stringify(indexData, null, 2)};\n`;

fs.writeFileSync(OUTPUT_FILE, fileOutput);
console.log(`✅ Successfully generated search index with ${indexData.length} rules.`);