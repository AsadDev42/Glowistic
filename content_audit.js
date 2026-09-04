const fs = require('fs');
const path = require('path');
const storeDir = 'C:\\Users\\ASAD\\.gemini\\antigravity\\scratch\\glowistic-store';
const htmlFiles = fs.readdirSync(storeDir).filter(f => f.endsWith('.html'));

console.log('=== CONTENT AUDIT ACROSS ALL 14 HTML FILES ===');

const suspiciousPatterns = [
  { name: 'Lorem Ipsum', regex: /lorem\s+ipsum/i },
  { name: 'Placeholder Domain / Email', regex: /(example\.com|test@test|placeholder)/i },
  { name: 'Fake Award Claims', regex: /(award winning|voted #1|#1 beauty brand|gold award winner)/i },
  { name: 'Fake Medical Claims', regex: /(cures disease|100% cure|clinical guarantee|miracle formula)/i },
  { name: 'Fake Founder / Factory Names', regex: /(founded in 19|john doe|jane smith|established 19|our factory in)/i }
];

htmlFiles.forEach(file => {
  const content = fs.readFileSync(path.join(storeDir, file), 'utf8');
  suspiciousPatterns.forEach(pattern => {
    if (pattern.regex.test(content)) {
      // Ignore acceptable input placeholder attributes
      const matches = content.match(pattern.regex);
      console.log(`[ALERT] ${file} matched ${pattern.name}:`, matches[0]);
    }
  });
});

console.log('Content audit complete.');
