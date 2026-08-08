import { readFile, writeFile } from "node:fs/promises";
import { resolve } from "node:path";

// Static export has one root layout, so route-specific <html lang> cannot be
// emitted by a nested page. Patch only the generated Hindi document after the
// Next build; client navigation is handled by HindiDocumentLanguage.tsx.
const hindiFilePath = resolve("out/hi.html");
const hindiHtml = await readFile(hindiFilePath, "utf8");
const updatedHindiHtml = hindiHtml
  .replace('<html lang="en"', '<html lang="hi"')
  .replaceAll('hrefLang="en" href="https://www.digixpro.in"', 'hrefLang="en" href="https://www.digixpro.in/"')
  .replaceAll('hrefLang="x-default" href="https://www.digixpro.in"', 'hrefLang="x-default" href="https://www.digixpro.in/"');

if (updatedHindiHtml === hindiHtml) {
  throw new Error("Could not set lang=hi in out/hi.html; expected the root html tag was not found.");
}

await writeFile(hindiFilePath, updatedHindiHtml, "utf8");

const englishFilePath = resolve("out/index.html");
const englishHtml = await readFile(englishFilePath, "utf8");
const updatedEnglishHtml = englishHtml
  .replaceAll('hrefLang="en" href="https://www.digixpro.in"', 'hrefLang="en" href="https://www.digixpro.in/"')
  .replaceAll('hrefLang="x-default" href="https://www.digixpro.in"', 'hrefLang="x-default" href="https://www.digixpro.in/"');

await writeFile(englishFilePath, updatedEnglishHtml, "utf8");
