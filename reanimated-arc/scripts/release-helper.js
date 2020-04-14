const fs = require('fs');
const path = require('path');

const fileNames = ['LICENSE.md', 'README.md'];

const action = process.argv[2];

if (action === 'before') {
  fileNames.forEach(fileName => {
    fs.copyFileSync(path.join('../', fileName), fileName);
  });
}

if (action === 'after') {
  fileNames.forEach(fileName => {
    fs.unlinkSync(fileName);
  });
}
