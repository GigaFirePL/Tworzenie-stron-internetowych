// Przykładowy string
const myString: string = "Hello TypeScript!";

// Przykładowa tablica
const myArray: number[] = [1, 2, 3, 4, 5];

// Przykładowy obiekt 1
const person: { name: string; age: number } = {
    name: "Jan",
    age: 30
};

// Przykładowy obiekt 2
const product: { id: number; title: string; price: number; available: boolean } = {
    id: 1,
    title: "Laptop",
    price: 2999.99,
    available: true
};

export function combineStringAndNumber(str: string, num: number): string {
    return `${str} (${num})`;
}

export function joinOrLength(arr: string[], returnLength: boolean): string | number {
    return returnLength ? arr.length : arr.join(", ");
}

// Przykładowe użycie
console.log(combineStringAndNumber(person.name, person.age));
console.log(joinOrLength(["Ala", "ma", "kota"], false));
console.log(joinOrLength(["Ala", "ma", "kota"], true));
console.log(`Produkt: ${product.title}, cena: ${product.price}, dostępny: ${product.available}`);