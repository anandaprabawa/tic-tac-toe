import { Board, BoardResult } from './board.type';

export type WinnerCheckingParams = {
  board: Board;
  boardResult: BoardResult;
  playerIdentities: string[];
};
