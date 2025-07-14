// Przykładowa funkcja z dokumentacji
export function add(a, b) {
    return a + b;
}

// Moja pierwsza funkcja: średnia arytmetyczna
export function average(arr) {
    if (!Array.isArray(arr) || arr.length === 0) return null;
    return arr.reduce((a, b) => a + b, 0) / arr.length;
}

// Moja druga funkcja: mnożenie wszystkich elementów tablicy
export function multiplyArray(arr) {
    if (!Array.isArray(arr) || arr.length === 0) return null;
    return arr.reduce((a, b) => a * b, 1);
}

// Moja trzecia funkcja: odwracanie stringa
export function reverseString(str) {
    return typeof str === 'string' ? str.split('').reverse().join('') : null;
}