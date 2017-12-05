import {solve} from './solve';
import {Coord} from '../store/types';

describe('solve', () => {
    describe('destination point is outside the building', () => {
        it('should throw', () => {
            const times = [[1, 2], [3, 4]];
            const from: Coord = {floor: 0, room: 0};
            const to: Coord = {floor: 3, room: 3};
            expect(() => solve(times, from, to)).toThrow();
        });
    });
    describe('start point is outside the building', () => {
        it('should throw', () => {
            const times = [[1, 2], [3, 4]];
            const from: Coord = {floor: -2, room: 4};
            const to: Coord = {floor: 1, room: 1};
            expect(() => solve(times, from, to)).toThrow();
        });
    });
    describe('the building is barricaded', () => {
        it('should throw', () => {
            const times = [[1, 2], [0, 4]];
            const from: Coord = {floor: 0, room: 0};
            const to: Coord = {floor: 1, room: 1};
            expect(() => solve(times, from, to)).toThrow();
        });
    });
    describe('destination apartment does not exist', () => {
        it('should throw', () => {
            const times = [[1, 0], [3, 4]];
            const from: Coord = {floor: 0, room: 0};
            const to: Coord = {floor: 1, room: 1};
            expect(() => solve(times, from, to)).toThrow();
        });
    });   
    describe('valid inputs', () => {
        it('should find the shortest path', () => {
            const times = 
                [ [100, 210, 200]
                , [300, 0,   40]
                , [91,  50,  20]
                ];
            const from: Coord = {floor: 0, room: 0};
            const to: Coord = {floor: 2, room: 1};
            const result = solve(times, from, to);
            expect(result).toMatchObject(
                [ {floor: 0, room: 1}
                , {floor: 0, room: 2}
                , {floor: 1, room: 2}
                , {floor: 2, room: 2}
                , {floor: 2, room: 1}
                ]
            );
        });
    });
    describe('no path exists', () => {
        it('should throw', () => {
            const times = 
                [ [100, 210, 200]
                , [0, 0, 0]
                , [91, 50, 20]
                ];
            const from: Coord = {floor: 0, room: 0};
            const to: Coord = {floor: 2, room: 1};
            expect(() => solve(times, from, to)).toThrow();
        });
    });
});