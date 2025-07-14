"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.combineStringAndNumber = combineStringAndNumber;
exports.joinOrLength = joinOrLength;
// Przykładowy string
const myString = "Hello TypeScript!";
// Przykładowa tablica
const myArray = [1, 2, 3, 4, 5];
// Przykładowy obiekt 1
const person = {
    name: "Jan",
    age: 30
};
// Przykładowy obiekt 2
const product = {
    id: 1,
    title: "Laptop",
    price: 2999.99,
    available: true
};
function combineStringAndNumber(str, num) {
    return `${str} (${num})`;
}
function joinOrLength(arr, returnLength) {
    return returnLength ? arr.length : arr.join(", ");
}
// Przykładowe użycie
console.log(combineStringAndNumber(person.name, person.age));
console.log(joinOrLength(["Ala", "ma", "kota"], false));
console.log(joinOrLength(["Ala", "ma", "kota"], true));
console.log(`Produkt: ${product.title}, cena: ${product.price}, dostępny: ${product.available}`);
