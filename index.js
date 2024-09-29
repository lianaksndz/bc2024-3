const fs = require('fs');
const { program } = require('commander');

// Налаштування параметрів командного рядка
program
    .requiredOption('-i, --input <path>', 'Input file path') // обовʼязковий параметр
    .option('-o, --output <path>', 'Output file path') // не обовʼязковий параметр
    .option('-d, --display', 'Display result in console') // не обовʼязковий параметр
    .parse(process.argv);

// Отримуємо значення аргументів
const options = program.opts();

// Перевірка наявності обов'язкового параметра `input`
if (!options.input) {
    console.error('Please, specify input file');
    process.exit(1); // Завершуємо програму з кодом помилки
}

// Перевірка, чи існує файл для читання
if (!fs.existsSync(options.input)) {
    console.error('Cannot find input file');
    process.exit(1); // Завершуємо програму з кодом помилки
}

// Функція для обробки та форматування даних
function formatBondData(data) {
    return data.map(item => `${item.StockCode}-${item.ValCode}-${item.Attraction}`).join('\n');
}

// Читання файлу
fs.readFile(options.input, 'utf8', (err, data) => {
    if (err) {
        console.error('Error reading input file:', err);
        return;
    }

    let jsonData;
    try {
        jsonData = JSON.parse(data); // Парсинг JSON даних
    } catch (e) {
        console.error('Error parsing JSON:', e);
        return;
    }

    // Форматуємо дані за шаблоном <StockCode>-<ValCode>-<Attraction>
    const formattedData = formatBondData(jsonData);

    // Якщо задано параметр --display, виводимо дані у консоль
    if (options.display) {
        console.log('Formatted data:\n', formattedData);
    }

    // Якщо задано параметр --output, записуємо дані у файл
    if (options.output) {
        fs.writeFile(options.output, formattedData, (err) => {
            if (err) {
                console.error('Error writing to output file:', err);
                return;
            }
            console.log(`Formatted data has been written to ${options.output}`);
        });
    }

    // Якщо не задано ні --display, ні --output, програма нічого не виводить
});
