import chalk from 'chalk';

for (let i = 1; i <= 100; i++) {
    if (i % 3 === 0 && i % 5 === 0) {
        console.log(chalk.magenta(i)); // Liczby podzielne przez 3 i 5
    } else if (i % 3 === 0) {
        console.log(chalk.red(i));     // Liczby podzielne przez 3
    } else if (i % 5 === 0) {
        console.log(chalk.blue(i));    // Liczby podzielne przez 5
    } else {
        console.log(chalk.white(i));   // Pozostałe liczby
    }
}