// index.js
const fs = require('fs');
const commander = require('commander');

const program = new commander.Command();

program
    .option('-i, --input <path>', 'input file path', './data.json') // Встановлено значення за замовчуванням
    .option('-o, --output <path>', 'output file path')
    .option('-d, --display', 'display result in console');

program.parse(process.argv);

const options = program.opts();

// Перевірка наявності обовʼязкового параметра
if (!options.input) {
    console.error('Please, specify input file');
    process.exit(1);
}

// Синхронне читання файлу
let jsonData;
try {
    const data = fs.readFileSync(options.input, 'utf8');
    jsonData = JSON.parse(data);
} catch (error) {
    console.error('Cannot find input file');
    process.exit(1);
}

// Форматування даних
const formattedData = jsonData.map(item => {
    const stockCode = item.StockCode || item.Code || ''; // Заміна на Code, якщо поле StockCode відсутнє
    const valCode = item.ValCode || item.Currency || ''; // Заміна на Currency
    const attraction = item.Attraction || item.Size || ''; // Заміна на Size

    return `${stockCode}-${valCode}-${attraction}`;
}).join('\n');

// Вивід результатів у консоль
if (options.display) {
    console.log('Formatted data:\n', formattedData);
}

// Запис у файл, якщо вказано
if (options.output) {
    fs.writeFileSync(options.output, formattedData, 'utf8');
}
