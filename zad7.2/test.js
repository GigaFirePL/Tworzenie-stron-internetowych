import { expect } from 'chai';
import { add, average, multiplyArray, reverseString } from './app.js';

describe('Przykładowe funkcje', () => {
    it('add powinno dodawać liczby', () => {
        expect(add(2, 3)).to.equal(5);
        expect(add(-1, 1)).to.equal(0);
    });
});

describe('Moja pierwsza funkcja: average', () => {
    it('powinna zwracać średnią arytmetyczną', () => {
        expect(average([2, 4, 6])).to.equal(4);
        expect(average([1, 1, 1, 1])).to.equal(1);
        expect(average([10])).to.equal(10);
        expect(average([])).to.equal(null);
        expect(average('nie tablica')).to.equal(null);
    });
});

describe('Moja druga funkcja: multiplyArray', () => {
    it('powinna zwracać iloczyn wszystkich elementów tablicy', () => {
        expect(multiplyArray([2, 3, 4])).to.equal(24);
        expect(multiplyArray([1, 2, 3, 0])).to.equal(0);
        expect(multiplyArray([5])).to.equal(5);
        expect(multiplyArray([])).to.equal(null);
        expect(multiplyArray('nie tablica')).to.equal(null);
    });
});

describe('Moja trzecia funkcja: reverseString', () => {
    it('powinna odwracać string', () => {
        expect(reverseString('abc')).to.equal('cba');
        expect(reverseString('')).to.equal('');
        expect(reverseString('12345')).to.equal('54321');
        expect(reverseString(123)).to.equal(null);
        expect(reverseString(['a', 'b', 'c'])).to.equal(null);
    });
});