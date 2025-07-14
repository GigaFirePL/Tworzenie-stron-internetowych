import { expect } from 'chai';
import { combineStringAndNumber, joinOrLength } from './app';

describe('Funkcja combineStringAndNumber', () => {
    it('łączy stringa z liczbą', () => {
        expect(combineStringAndNumber('Test', 123)).to.equal('Test (123)');
    });
});

describe('Funkcja joinOrLength', () => {
    it('łączy tablicę stringów w jeden string', () => {
        expect(joinOrLength(['a', 'b', 'c'], false)).to.equal('a, b, c');
    });
    it('zwraca długość tablicy', () => {
        expect(joinOrLength(['a', 'b', 'c'], true)).to.equal(3);
    });
});