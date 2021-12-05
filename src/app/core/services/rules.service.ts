import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class RulesService {
  readonly maxBoardSize = 10; // 10x10
  readonly minBoardSize = 3; // 3x3
  readonly supportedMarksCount = [3, 5];

  getMarksCount(boardSize: number) {
    this.validateBoardSize(boardSize);

    if (boardSize <= 4) {
      return this.supportedMarksCount[0];
    }
    return this.supportedMarksCount[1];
  }

  validateBoardSize(boardSize: number): boolean {
    if (boardSize >= this.minBoardSize && boardSize <= this.maxBoardSize) {
      return true;
    }

    throw new Error(
      `Board size cannot be lower than 3 or greater than 10. Provided board size is ${boardSize}.`
    );
  }
}
