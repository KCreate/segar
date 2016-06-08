jest.unmock('../index.js');
const segar = require('../index');

describe('Basic Behaviour', () => {
    it('segmentizes an array', () => {
        const testArray = [
            1, 2, 3, 4, 5, 6, 7, 8
        ];

        expect(segar(testArray, 4)).toEqual([
            [1, 2, 3, 4],
            [5, 6, 7, 8]
        ]);
    });

    it('segmentizes an array not divisible by the segmentSize', () => {
        const testArray = [
            1, 2, 3, 4, 5, 6, 7, 8, 9, 10
        ];

        expect(segar(testArray, 4)).toEqual([
            [1, 2, 3, 4],
            [5, 6, 7, 8],
            [9, 10]
        ]);
    });

    it('segmentizes an array bigger than the segmentSize', () => {
        const testArray = [
            1, 2, 3, 4
        ];

        expect(segar(testArray, 3)).toEqual([
            [1, 2, 3],
            [4]
        ]);
    });

    it('segmentizes an array smaller than the segmentSize', () => {
        const testArray = [
            1, 2, 3, 4
        ];

        expect(segar(testArray, 6)).toEqual([
            [1, 2, 3, 4]
        ]);
    });

    it('throws an error when segmentSize is 0', () => {
        const testArray = [
            1, 2, 3, 4
        ];

        expect(segar.bind(null, testArray, 0)).toThrow(
            new Error('Can\'t create a segment with size: 0')
        );
    });

    it('throws an error when segmentSize is negative', () => {
        const testArray = [
            1, 2, 3, 4
        ];

        expect(segar.bind(null, testArray, -100)).toThrow(
            new Error('Can\'t create a segment with size: -100')
        );
    });

    it('returns an empty array when an empty array was given', () => {
        const testArray = [];

        expect(segar(testArray, 4)).toEqual([]);
    });

    it('throws an error when no segmentSize was passed', () => {
        expect(segar.bind(null, [1, 2, 3, 4])).toThrow(
            new Error('You forgot to pass a segmentSize.')
        );
    });

    it('throws an error when no array was passed', () => {
        expect(segar.bind(null)).toThrow(
            new Error('You forgot to pass an array.')
        );
    });

    it('throws a TypeError when passing something different than a number as a segmentSize', () => {
        expect(segar.bind(null, [], "test")).toThrow(
            new TypeError('Expected a number, received: string')
        );
    });

    it('throws a TypeError when passing something different than an array, string as an array', () => {
        expect(segar.bind(null, 2, 2)).toThrow(
            new TypeError('Expected an array or string, received: number')
        );
    });
});

describe('callback behaviour', function() {

    it('throws a TypeError when passing something different than a function as a callback', function() {
        expect(segar.bind(null, [], 2, 'this should fail')).toThrow(
            new TypeError('Expected a function, received: string')
        );
    });

    it('receives the right arguments', () => {
        const mockedCallback = jest.fn();
        segar([1, 2, 3, 4], 3, mockedCallback);

        expect(mockedCallback.mock.calls[0]).toEqual([1, 0, 0]);
        expect(mockedCallback.mock.calls[1]).toEqual([2, 1, 0]);
        expect(mockedCallback.mock.calls[2]).toEqual([3, 2, 0]);
        expect(mockedCallback.mock.calls[3]).toEqual([4, 3, 1]);
    });

    it('gets called the right amount of times', () => {
        const mockedCallback = jest.fn();
        segar([1, 2, 3, 4], 3, mockedCallback);

        expect(mockedCallback.mock.calls.length).toBe(4);
    });
});
