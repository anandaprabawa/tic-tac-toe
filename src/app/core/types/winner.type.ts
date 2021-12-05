import { Board } from './board.type';

export type WinnerCheckingParams = {
  board: Board;
  playerIdentities: string[];
};
