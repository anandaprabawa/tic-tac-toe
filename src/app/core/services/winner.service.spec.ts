import { TestBed } from '@angular/core/testing';
import { WinnerService } from './winner.service';

describe('WinnerService', () => {
  let service: WinnerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WinnerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('Row Winning Combinations', () => {
    it('should get row winning combinations on board size 3x3', () => {
      const combinations = service.getRowWinningCombination([1, 2, 3]);
      const expected = [[0, 1, 2]];
      expect(combinations).toEqual(expected);
    });

    it('should get row winning combinations on board size 4x4', () => {
      const combinations = service.getRowWinningCombination([1, 2, 3, 4]);
      const expected = [
        [0, 1, 2],
        [1, 2, 3],
      ];
      expect(combinations).toEqual(expected);
    });

    it('should get row winning combinations on board size 5x5', () => {
      const combinations = service.getRowWinningCombination([1, 2, 3, 4, 5]);
      const expected = [[0, 1, 2, 3, 4]];
      expect(combinations).toEqual(expected);
    });

    it('should get row winning combinations on board size 7x7', () => {
      const combinations = service.getRowWinningCombination([
        1, 2, 3, 4, 5, 6, 7,
      ]);
      const expected = [
        [0, 1, 2, 3, 4],
        [1, 2, 3, 4, 5],
        [2, 3, 4, 5, 6],
      ];
      expect(combinations).toEqual(expected);
    });
  });

  describe('Check Horizontal', () => {
    it('should return the winner for 3x3 board', () => {
      const board = [
        ['X', 'X', 'X'],
        [3, 4, 5],
        [6, 7, 8],
      ];
      const check = service.checkHorizontal({
        board,
        playerIdentities: ['X', 'O'],
      });
      expect(check).toEqual('X');
    });

    it('should return the winner from the other rows for 3x3 board', () => {
      const board = [
        [0, 1, 2],
        ['X', 'X', 'X'],
        [6, 7, 8],
      ];
      const check = service.checkHorizontal({
        board,
        playerIdentities: ['X', 'O'],
      });
      expect(check).toEqual('X');
    });

    it('should not return the winner if no 3 marks in a row for 3x3 board', () => {
      const board = [
        [0, 1, 2],
        ['X', 4, 'X'],
        ['O', 7, 7],
      ];
      const check = service.checkHorizontal({
        board,
        playerIdentities: ['X', 'O'],
      });
      expect(check).toBeUndefined();
      expect(check).not.toEqual('X');
      expect(check).not.toEqual('O');
    });

    it('should not return the winner if no marks on 5x5 or greater board size', () => {
      const board = [
        [0, 1, 2, 3, 4],
        [5, 6, 7, 8, 9],
        [10, 11, 12, 13, 14],
        [15, 16, 17, 18, 19],
        [20, 21, 22, 23, 24],
      ];
      const check = service.checkHorizontal({
        board,
        playerIdentities: ['X', 'O'],
      });
      expect(check).toBeUndefined();
      expect(check).not.toEqual('X');
      expect(check).not.toEqual('O');
    });

    it('should return the winner on 5x5 board size', () => {
      const board = [
        [0, 1, 2, 3, 4],
        ['X', 'X', 'X', 'X', 'X'],
        [10, 11, 12, 13, 14],
        [15, 16, 17, 18, 19],
        [20, 21, 22, 23, 24],
      ];
      const check = service.checkHorizontal({
        board,
        playerIdentities: ['X', 'O'],
      });
      expect(check).toEqual('X');
    });

    it('should return the winner on 6x6 or greater board size', () => {
      const board = [
        [0, 1, 2, 3, 4, 5],
        ['X', 'X', 'X', 'X', 'X', 11],
        [12, 13, 14, 15, 16, 17],
        [18, 19, 20, 21, 22, 23],
        [24, 25, 26, 27, 28, 29],
        [30, 31, 32, 33, 34, 35],
      ];
      const check = service.checkHorizontal({
        board,
        playerIdentities: ['X', 'O'],
      });
      expect(check).toEqual('X');
    });

    it('should return the winner on 6x6 or greater board size when the marks are on different positions', () => {
      const board = [
        [0, 1, 2, 3, 4, 5],
        [6, 'X', 'X', 'X', 'X', 'X'],
        [12, 13, 14, 15, 16, 17],
        [18, 19, 20, 21, 22, 23],
        [24, 25, 26, 27, 28, 29],
        [30, 31, 32, 33, 34, 35],
      ];
      const check = service.checkHorizontal({
        board,
        playerIdentities: ['X', 'O'],
      });
      expect(check).toEqual('X');
    });
  });
});
