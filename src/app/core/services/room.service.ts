import { Injectable } from '@angular/core';
import {
  Database,
  get,
  objectVal,
  ref,
  remove,
  set,
} from '@angular/fire/database';
import { from, map, Observable, of } from 'rxjs';
import { Room } from '../models/room.model';
import { BoardResult, BoardResultItem } from '../types/board.type';
import { GeneratedIdService } from './generated-id.service';
import { RulesService } from './rules.service';

@Injectable({
  providedIn: 'root',
})
export class RoomService {
  readonly roomsPath = 'rooms';

  constructor(
    private readonly db: Database,
    private readonly generatedIdService: GeneratedIdService,
    private readonly rulesService: RulesService
  ) {}

  /**
   * Create a room.
   * @returns Room id
   */
  createRoom(params?: { boardSize?: number }): Observable<string> {
    const boardSize = params?.boardSize ?? this.rulesService.minBoardSize;

    const roomId = this.generatedIdService.generateId();
    const refPath = `${this.roomsPath}/${roomId}`;
    const dbRef = ref(this.db, refPath);
    const data = { boardSize: boardSize };
    return from(set(dbRef, data)).pipe(map(() => roomId));
  }

  getRoom(roomId: string): Observable<Room | null> {
    if (!roomId) return of(null);
    const refPath = `${this.roomsPath}/${roomId}`;
    const dbRef = ref(this.db, refPath);
    return from(get(dbRef)).pipe(map((snapshot) => snapshot.val()));
  }

  deleteRoom(roomId?: string): Observable<void> {
    if (!roomId) return of();
    const refPath = `${this.roomsPath}/${roomId}`;
    const dbRef = ref(this.db, refPath);
    return from(remove(dbRef));
  }

  playerExitRoom(roomId?: string, player?: number) {
    if (!roomId || !player) return of(null);
    const refPath = `${this.roomsPath}/${roomId}/players/${player - 1}/exit`;
    const dbRef = ref(this.db, refPath);
    return from(set(dbRef, true));
  }

  saveBoardResult(roomId: string, result: BoardResult) {
    const refPath = `${this.roomsPath}/${roomId}/boardResult`;
    const dbRef = ref(this.db, refPath);
    return from(set(dbRef, result));
  }

  getBoardResult(roomId?: string): Observable<BoardResult | null> {
    if (!roomId) return of(null);
    const refPath = `${this.roomsPath}/${roomId}/boardResult`;
    const dbRef = ref(this.db, refPath);
    return objectVal<Record<string, BoardResultItem[]>>(dbRef).pipe(
      map((snapshot) => (snapshot ? snapshot : {})),
      map((snapshot) => Object.keys(snapshot).map((key) => snapshot[key]))
    );
  }

  getPlayerTurn(roomId?: string): Observable<Room['playerTurn'] | null> {
    if (!roomId) return of(null);
    const refPath = `${this.roomsPath}/${roomId}/playerTurn`;
    const dbRef = ref(this.db, refPath);
    return objectVal<Room['playerTurn']>(dbRef);
  }

  changePlayerTurn(roomId: string, playerTurn: Room['playerTurn']) {
    const refPath = `${this.roomsPath}/${roomId}/playerTurn`;
    const dbRef = ref(this.db, refPath);
    return from(set(dbRef, playerTurn));
  }
}
