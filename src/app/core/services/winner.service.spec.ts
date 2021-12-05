import { TestBed } from '@angular/core/testing';
import { WinnerService } from './winner.service';

const board3x3 = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
];

const board4x4 = [
  [1, 2, 3, 4],
  [5, 6, 7, 8],
  [9, 10, 11, 12],
  [13, 14, 15, 16],
];

const board5x5 = [
  [0, 1, 2, 3, 4],
  [5, 6, 7, 8, 9],
  [10, 11, 12, 13, 14],
  [15, 16, 17, 18, 19],
  [20, 21, 22, 23, 24],
];

const board6x6 = [
  [0, 1, 2, 3, 4, 5],
  [6, 7, 8, 9, 10, 11],
  [12, 13, 14, 15, 16, 17],
  [18, 19, 20, 21, 22, 23],
  [24, 25, 26, 27, 28, 29],
  [30, 31, 32, 33, 34, 35],
];

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
      const combinations = service.getRowWinningCombination([0, 1, 2]);
      const expected = [[0, 1, 2]];
      expect(combinations).toEqual(expected);
    });

    it('should get row winning combinations on board size 4x4', () => {
      const combinations = service.getRowWinningCombination([0, 1, 2, 3]);
      const expected = [
        [0, 1, 2],
        [1, 2, 3],
      ];
      expect(combinations).toEqual(expected);
    });

    it('should get row winning combinations on board size 5x5', () => {
      const combinations = service.getRowWinningCombination([0, 1, 2, 3, 4]);
      const expected = [[0, 1, 2, 3, 4]];
      expect(combinations).toEqual(expected);
    });

    it('should get row winning combinations on board size 7x7', () => {
      const combinations = service.getRowWinningCombination([
        0, 1, 2, 3, 4, 5, 6,
      ]);
      const expected = [
        [0, 1, 2, 3, 4],
        [1, 2, 3, 4, 5],
        [2, 3, 4, 5, 6],
      ];
      expect(combinations).toEqual(expected);
    });

    it('should get row winning combinations on board 3x3 for random number', () => {
      const combinations = service.getRowWinningCombination([1, 4, 7]);
      const expected = [[1, 4, 7]];
      expect(combinations).toEqual(expected);
    });
  });

  describe('Check Horizontal', () => {
    it('should return the winner for 3x3 board', () => {
      const boardResult = [
        ['X', 'X', 'X'],
        [3, 4, 5],
        [6, 7, 8],
      ];
      const check = service.checkHorizontal({
        board: board3x3,
        boardResult,
        playerIdentities: ['X', 'O'],
      });
      expect(check).toEqual('X');
    });

    it('should return the winner from the other rows for 3x3 board', () => {
      const boardResult = [
        [0, 1, 2],
        ['X', 'X', 'X'],
        [6, 7, 8],
      ];
      const check = service.checkHorizontal({
        board: board3x3,
        boardResult,
        playerIdentities: ['X', 'O'],
      });
      expect(check).toEqual('X');
    });

    it('should not return the winner if no 3 marks in a row for 3x3 board', () => {
      const boardResult = [
        [0, 1, 2],
        ['X', 4, 'X'],
        ['O', 7, 7],
      ];
      const check = service.checkHorizontal({
        board: board3x3,
        boardResult,
        playerIdentities: ['X', 'O'],
      });
      expect(check).toBeUndefined();
      expect(check).not.toEqual('X');
      expect(check).not.toEqual('O');
    });

    it('should not return the winner if no marks on 5x5 or greater board size', () => {
      const check = service.checkHorizontal({
        board: board5x5,
        boardResult: board5x5,
        playerIdentities: ['X', 'O'],
      });
      expect(check).toBeUndefined();
      expect(check).not.toEqual('X');
      expect(check).not.toEqual('O');
    });

    it('should return the winner on 5x5 board size', () => {
      const boardResult = [
        [0, 1, 2, 3, 4],
        ['X', 'X', 'X', 'X', 'X'],
        [10, 11, 12, 13, 14],
        [15, 16, 17, 18, 19],
        [20, 21, 22, 23, 24],
      ];
      const check = service.checkHorizontal({
        board: board5x5,
        boardResult,
        playerIdentities: ['X', 'O'],
      });
      expect(check).toEqual('X');
    });

    it('should return the winner on 6x6 or greater board size', () => {
      const boardResult = [
        [0, 1, 2, 3, 4, 5],
        ['X', 'X', 'X', 'X', 'X', 11],
        [12, 13, 14, 15, 16, 17],
        [18, 19, 20, 21, 22, 23],
        [24, 25, 26, 27, 28, 29],
        [30, 31, 32, 33, 34, 35],
      ];
      const check = service.checkHorizontal({
        board: board6x6,
        boardResult,
        playerIdentities: ['X', 'O'],
      });
      expect(check).toEqual('X');
    });

    it('should return the winner on 6x6 or greater board size when the marks are on different positions', () => {
      const boardResult = [
        [0, 1, 2, 3, 4, 5],
        [6, 'X', 'X', 'X', 'X', 'X'],
        [12, 13, 14, 15, 16, 17],
        [18, 19, 20, 21, 22, 23],
        [24, 25, 26, 27, 28, 29],
        [30, 31, 32, 33, 34, 35],
      ];
      const check = service.checkHorizontal({
        board: board6x6,
        boardResult,
        playerIdentities: ['X', 'O'],
      });
      expect(check).toEqual('X');
    });
  });

  describe('Construct Board Columns', () => {
    it('should structure board columns from board', () => {
      const board = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
      ];
      const expected = [
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
      ];
      expect(service.constructBoardColumns(board)).toEqual(expected);
    });
  });

  describe('Check Vertical', () => {
    it('should return the winner on 3x3 board', () => {
      const boardResult = [
        ['X', 'O', 'O'],
        ['X', 'O', 5],
        ['X', 7, 8],
      ];
      const check = service.checkVertical({
        board: board3x3,
        boardResult,
        playerIdentities: ['X', 'O'],
      });
      expect(check).toBe('X');
    });

    it('should return the winner on 3x3 board for another winning combination', () => {
      const boardResult = [
        [0, 'X', 2],
        [3, 'X', 5],
        [6, 'X', 8],
      ];
      const check = service.checkVertical({
        board: board3x3,
        boardResult,
        playerIdentities: ['X', 'O'],
      });
      expect(check).toBe('X');
    });

    it('should return another player as the winner on 3x3 board', () => {
      const boardResult = [
        ['X', 'O', 'X'],
        ['X', 'O', 5],
        [6, 'O', 8],
      ];
      const check = service.checkVertical({
        board: board3x3,
        boardResult,
        playerIdentities: ['X', 'O'],
      });
      expect(check).toBe('O');
    });

    it('should not return the winner if no marks in vertical', () => {
      const check = service.checkVertical({
        board: board3x3,
        boardResult: board3x3,
        playerIdentities: ['X', 'O'],
      });
      expect(check).toBeUndefined();
    });

    it('should return the winner on 5x5 board', () => {
      const boardResult = [
        [0, 1, 'X', 3, 4],
        [5, 6, 'X', 8, 9],
        [10, 11, 'X', 13, 14],
        [15, 16, 'X', 18, 19],
        [20, 21, 'X', 23, 24],
      ];
      const check = service.checkVertical({
        board: board5x5,
        boardResult,
        playerIdentities: ['X', 'O'],
      });
      expect(check).toEqual('X');
    });
  });

  describe('Check Diagonal', () => {
    it('should return the winner on 3x3 board', () => {
      const boardResult = [
        ['X', 1, 2],
        [3, 'X', 5],
        [6, 7, 'X'],
      ];
      const check = service.checkDiagonal({
        board: board3x3,
        boardResult,
        playerIdentities: ['X', 'O'],
      });
      expect(check).toBe('X');
    });

    it('should return the winner on 3x3 board (reversed)', () => {
      const boardResult = [
        [0, 1, 'X'],
        [3, 'X', 5],
        ['X', 7, 8],
      ];
      const check = service.checkDiagonal({
        board: board3x3,
        boardResult,
        playerIdentities: ['X', 'O'],
      });
      expect(check).toBe('X');
    });

    it('should return the winner on 4x4 board', () => {
      const boardResult = [
        [0, 1, 'X', 3],
        [4, 'X', 6, 7],
        [8, 9, 'X', 11],
        [12, 13, 14, 'X'],
      ];
      const check = service.checkDiagonal({
        board: board4x4,
        boardResult,
        playerIdentities: ['X', 'O'],
      });
      expect(check).toBe('X');
    });

    it('should return the winner on 4x4 with direction top-left to bottom', () => {
      const boardResult = [
        [0, 1, 2, 3],
        ['X', 5, 6, 7],
        ['O', 'X', 10, 11],
        ['X', 'O', 'X', 15],
      ];
      const check = service.checkDiagonal({
        board: board4x4,
        boardResult,
        playerIdentities: ['X', 'O'],
      });
      expect(check).toBe('X');
    });

    it('should return the winner on 4x4 with direction top-left to right', () => {
      const boardResult = [
        [0, 'X', 2, 3],
        [4, 5, 'X', 7],
        [8, 9, 10, 'X'],
        [12, 13, 14, 15],
      ];
      const check = service.checkDiagonal({
        board: board4x4,
        boardResult,
        playerIdentities: ['X', 'O'],
      });
      expect(check).toBe('X');
    });

    it('should return the winner on 4x4 board with direction bottom-left to top', () => {
      const boardResult = [
        [0, 1, 'X', 3],
        [4, 'X', 6, 7],
        ['X', 9, 10, 11],
        [12, 13, 14, 15],
      ];
      const check = service.checkDiagonal({
        board: board4x4,
        boardResult,
        playerIdentities: ['X', 'O'],
      });
      expect(check).toBe('X');
    });

    it('should return the winner on 4x4 board with direction bottom-left to right', () => {
      const boardResult = [
        [0, 1, 2, 3],
        [4, 5, 6, 'X'],
        [8, 9, 'X', 11],
        [12, 'X', 14, 15],
      ];
      const check = service.checkDiagonal({
        board: board4x4,
        boardResult,
        playerIdentities: ['X', 'O'],
      });
      expect(check).toBe('X');
    });

    it('should return the winner on 5x5 board', () => {
      const boardResult = [
        ['X', 1, 'X', 3, 4],
        [5, 'X', 7, 8, 9],
        [10, 11, 'X', 13, 14],
        [15, 16, 'X', 'X', 19],
        [20, 21, 'X', 23, 'X'],
      ];
      const check = service.checkDiagonal({
        board: board5x5,
        boardResult,
        playerIdentities: ['X', 'O'],
      });
      expect(check).toEqual('X');
    });

    it('should return the winner on 6x6 board', () => {
      const boardResult = [
        [0, 1, 'X', 3, 4, 5],
        [6, 'X', 8, 9, 10, 11],
        [12, 13, 'X', 15, 16, 17],
        [18, 19, 'X', 'X', 22, 23],
        [24, 25, 'X', 27, 'X', 29],
        [30, 31, 'X', 33, 34, 'X'],
      ];
      const check = service.checkDiagonal({
        board: board6x6,
        boardResult,
        playerIdentities: ['X', 'O'],
      });
      expect(check).toEqual('X');
    });
  });
});
