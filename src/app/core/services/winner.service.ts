import { Injectable } from '@angular/core';
import { BoardItem } from '../types/board.type';
import { WinnerCheckingParams } from '../types/winner.type';
import { RulesService } from './rules.service';

@Injectable({
  providedIn: 'root',
})
export class WinnerService {
  constructor(private readonly rulesService: RulesService) {}

  checkHorizontal(params: WinnerCheckingParams): BoardItem | undefined {
    let winner: BoardItem | undefined;
    for (const row of params.board) {
      // Get player marks in this row.
      let playerMarks = row.filter((item) =>
        this.getPlayerMark(item, params.playerIdentities)
      );
      // Remove duplicate marks.
      playerMarks = [...new Set(playerMarks)];
      // Stop process and continue to the next row.
      if (!playerMarks.length) continue;

      const winningCombinations = this.getRowWinningCombination(row);
      const rowValueInWinningCombinations = winningCombinations.map(
        (combination) => combination.map((idx) => row[idx])
      );

      winner = playerMarks.find((player) => {
        return rowValueInWinningCombinations.some((combination) =>
          combination.every((boardItemValue) => boardItemValue === player)
        );
      });

      break;
    }
    return winner;
  }

  getRowWinningCombination(row: BoardItem[]) {
    const marksCount = this.rulesService.getMarksCount(row.length);
    const loopCount = row.length - marksCount + 1;
    const combinations: number[][] = [];
    for (let index = 0; index < loopCount; index++) {
      const combination = Array.from(Array(marksCount)).map(
        (_, i) => index + i
      );
      combinations.push(combination);
    }
    return combinations;
  }

  private getPlayerMark(
    item: BoardItem,
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
