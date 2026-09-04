const fs = require('fs');
const path = require('path');

const outDir = path.join(__dirname, '..', 'out');

function getAllHtmlFiles(dirPath, arrayOfFiles = []) {
  if (!fs.existsSync(dirPath)) return arrayOfFiles;
  const files = fs.readdirSync(dirPath);
  files.forEach(file => {
    const fullPath = path.join(dirPath, file);
    if (fs.statSync(fullPath).isDirectory()) {
      arrayOfFiles = getAllHtmlFiles(fullPath, arrayOfFiles);
    } else if (file.endsWith('.html')) {
      arrayOfFiles.push(fullPath);
    }
  });
  return arrayOfFiles;
}

if (fs.existsSync(outDir)) {
  const htmlFiles = getAllHtmlFiles(outDir);
  console.log(`[POST-BUILD OPT] Processing ${htmlFiles.length} HTML files...`);

  let modifiedCount = 0;

  htmlFiles.forEach(filePath => {
    let html = fs.readFileSync(filePath, 'utf8');
    let modified = false;

    // 1. Fix render-blocking scripts in <head> by adding defer to external scripts lacking async/defer
    // Match <script src="..." ...></script> inside <head>
    const headMatch = html.match(/<head[\s\S]*?<\/head>/i);
    if (headMatch) {
      const headContent = headMatch[0];
      const updatedHead = headContent.replace(/<script\s+([^>]*?\bsrc=["'][^"']+["'][^>]*?)>/gi, (match, attrs) => {
        if (!attrs.includes('async') && !attrs.includes('defer')) {
          modified = true;
          return `<script ${attrs} defer>`;
        }
        return match;
      });

      if (modified) {
        html = html.replace(headContent, updatedHead);
      }
    }

    if (modified) {
      fs.writeFileSync(filePath, html, 'utf8');
      modifiedCount++;
    }
  });

  console.log(`[POST-BUILD OPT] Successfully optimized ${modifiedCount} HTML files (Eliminated render-blocking scripts in <head>).`);
} else {
  console.warn('[POST-BUILD OPT] out/ directory not found, skipping.');
}
