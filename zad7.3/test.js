"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
const app_1 = require("./app");
describe('Funkcja combineStringAndNumber', () => {
    it('łączy stringa z liczbą', () => {
        (0, chai_1.expect)((0, app_1.combineStringAndNumber)('Test', 123)).to.equal('Test (123)');
    });
});
describe('Funkcja joinOrLength', () => {
    it('łączy tablicę stringów w jeden string', () => {
        (0, chai_1.expect)((0, app_1.joinOrLength)(['a', 'b', 'c'], false)).to.equal('a, b, c');
    });
    it('zwraca długość tablicy', () => {
        (0, chai_1.expect)((0, app_1.joinOrLength)(['a', 'b', 'c'], true)).to.equal(3);
    });
});
