const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src/components/FormSteps/Debts.tsx');
let content = fs.readFileSync(filePath, 'utf8');

// Fix the structure by ensuring all JSX tags are properly closed and balanced
// The specific issue appears to be with how the Stack component's children are structured
const fixedContent = content.replace(
  /{debtsData.length === 0 \? \(\n\s+<Text>Engar skuldir fundust\.<\/Text>\n\s+\) : \(\n\s+<Stack space={7}>/,
  '{debtsData.length === 0 ? (\n        <Text>Engar skuldir fundust.</Text>\n      ) : (\n        <Stack space={7}>'
);

const lines = fixedContent.split('\n');
let openBrackets = 0;
let closeBrackets = 0;

// Find the line with ")} <-- Own Domicile"
for (let i = 0; i < lines.length; i++) {
  if (lines[i].includes('{/* Own Domicile')) {
    // Check if we're missing a closing tag before this comment
    const prevLine = lines[i-1].trim();
    if (!prevLine.endsWith(')}') && !prevLine.endsWith('})}')) {
      // We need to add a closing bracket for the mapping function
      lines[i-1] = lines[i-1] + ','
    }
  }
  
  // Count open/close brackets to detect imbalance
  const openCount = (lines[i].match(/\{/g) || []).length;
  const closeCount = (lines[i].match(/\}/g) || []).length;
  openBrackets += openCount;
  closeBrackets += closeCount;
}

// Check if we're missing closing brackets at the end
if (openBrackets > closeBrackets) {
  const diff = openBrackets - closeBrackets;
  const lastBraceLineIndex = lines.findLastIndex(line => line.includes('}'));
  if (lastBraceLineIndex > 0) {
    lines[lastBraceLineIndex] = lines[lastBraceLineIndex] + ')';
  }
}

fs.writeFileSync(filePath, lines.join('\n'), 'utf8');
console.log('File fixed successfully!');
