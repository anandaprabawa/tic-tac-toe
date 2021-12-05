import { Injectable } from '@angular/core';
import { merge } from 'rxjs';
import { Board, BoardResult, BoardResultItem } from '../types/board.type';
import { WinnerCheckingParams } from '../types/winner.type';
import { RulesService } from './rules.service';

@Injectable({
  providedIn: 'root',
})
export class WinnerService {
  constructor(private readonly rulesService: RulesService) {}

  checkWinner(params: WinnerCheckingParams) {
    return merge([
      this.checkHorizontal(params),
      this.checkVertical(params),
      this.checkDiagonal(params),
    ]);
  }

  checkDiagonal(params: WinnerCheckingParams) {
    const diagonalBoard = this.constructBoardDiagonals(params.board);
    const diagonalBoardResult = this.constructBoardDiagonals(
      params.boardResult
    );
    return this.checkHorizontal({
      ...params,
      board: diagonalBoard as Board,
      boardResult: diagonalBoardResult as BoardResult,
    });
  }

  constructBoardDiagonals(board: Board | BoardResult): Board | BoardResult {
    const marksCount = this.rulesService.getMarksCount(board.length);
    const loopCount = board.length - marksCount + 1;
    const loopCountArray = Array.from(Array(loopCount));

    const boardSize = board.length;
    const boardSizeArray = Array.from(Array(boardSize));

    // From top left to bottom right (\) (to right direction).
    const boardTopLeftToRight = loopCountArray.map((_, rowIdx) =>
      boardSizeArray.slice(0, boardSize - rowIdx).map((_, itemIdx) => {
        const item = rowIdx + itemIdx;
        return board[itemIdx][item];
      })
    );

    // From top left to bottom right (\) (to bottom direction).
    const boardTopLeftToBottom = loopCountArray.map((_, rowIdx) =>
      boardSizeArray.slice(0, boardSize - rowIdx).map((_, itemIdx) => {
        const row = rowIdx + itemIdx;
        return board[row][itemIdx];
      })
    );

    // From bottom left to top right (/) (to top direction).
    const boardBottomLeftToTop = loopCountArray.map((_, rowIdx) =>
      boardSizeArray.slice(0, boardSize - rowIdx).map((_, itemIdx) => {
        const row = boardSize - 1 - rowIdx - itemIdx;
        return board[row][itemIdx];
      })
    );

    // From bottom left to top right (/) (to right direction).
    const boardBottomLeftToRight = loopCountArray.map((_, rowIdx) =>
      boardSizeArray.slice(0, boardSize - rowIdx).map((_, itemIdx) => {
        const row = boardSize - 1 - itemIdx;
        const item = rowIdx + itemIdx;
        return board[row][item];
      })
    );

    return [
      ...boardTopLeftToRight,
      ...boardTopLeftToBottom,
      ...boardBottomLeftToTop,
      ...boardBottomLeftToRight,
    ];
  }

  checkVertical(params: WinnerCheckingParams) {
    const columnBoard = this.constructBoardColumns(params.board);
    const columnBoardResult = this.constructBoardColumns(params.boardResult);
    return this.checkHorizontal({
      ...params,
      board: columnBoard as Board,
      boardResult: columnBoardResult as BoardResult,
    });
  }

  constructBoardColumns(board: Board | BoardResult): Board | BoardResult {
    return board.map((row, rowIndex) =>
      row.map((_, itemIndex) => board[itemIndex][rowIndex])
    );
  }

  checkHorizontal(params: WinnerCheckingParams): BoardResultItem | undefined {
    let winner: BoardResultItem | undefined;
    for (const [rowIndex, row] of params.boardResult.entries()) {
      // Get player marks in this row.
      let playerMarks = row.filter((item) =>
        this.getPlayerMark(item, params.playerIdentities)
      );
      // Remove duplicate marks.
      playerMarks = [...new Set(playerMarks)];
      // Stop process and continue to the next row.
      if (!playerMarks.length) continue;

      const winningCombinations = this.getRowWinningCombination(
        params.board[rowIndex]
      );
      const rowValueInWinningCombinations = winningCombinations.map(
        (combination, combinationIdx) =>
          combination.map((_, idx) => row[combinationIdx + idx])
      );

      winner = playerMarks.find((player) => {
        return rowValueInWinningCombinations.some((combination) =>
          combination.every((boardItemValue) => boardItemValue === player)
        );
      });

      if (winner) break;
    }
    return winner;
  }

  getRowWinningCombination(row: number[]) {
    const marksCount = this.rulesService.getMarksCount(row.length);
    const loopCount = row.length - marksCount + 1;
    const combinations: number[][] = [];
    for (let index = 0; index < loopCount; index++) {
      const combination = Array.from(Array(marksCount)).map(
        (_, i) => row[index + i]
      );
      combinations.push(combination);
    }
    return combinations;
  }

  private getPlayerMark(
    item: BoardResultItem,
    players: string[]
  ): string | undefined {
    // Player identity should be a string,
    // if it's a number, that's a board item number.
    if (typeof item === 'number') return undefined;

    // Check marks of the players on the board item.
    if (players.includes(item)) return item;

    return undefined;
  }
}
