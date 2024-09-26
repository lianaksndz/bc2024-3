console.log("The program works correctly!");
const { Command } = require('commander');
const program = new Command();

program
    .version('1.0.0')
    .description('Program for processing NBU data')
    .option('-f, --file <type>', 'Specify the data file', 'data.json')
    .parse(process.argv);

console.log(`Using data file: ${program.opts().file}`);
