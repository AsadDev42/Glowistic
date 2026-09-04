const fs = require('fs');
const path = require('path');
const r = __dirname;

function write(name, content) {
  fs.writeFileSync(path.join(r, name), content, 'utf8');
  console.log('Generated:', name);
}

write('status.txt', 'Ready to generate');
