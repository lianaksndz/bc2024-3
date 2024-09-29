const fs = require('fs');
const { program } = require('commander');

// Встановлення командного рядка за допомогою Commander.js
program
  .option('-p, --print', 'Print data from JSON file')
  .parse(process.argv);

if (program.print) {
  fs.readFile('data.json', 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading file:', err);
      return;
    }
    console.log('Data from JSON file:', JSON.parse(data));
  });
}
