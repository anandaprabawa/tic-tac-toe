import { Injectable } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { Database, listVal, ref, set } from '@angular/fire/database';
import { from, map, Observable, of } from 'rxjs';
import { Player } from '../models/player.model';
import { Room } from '../models/room.model';
import { RoomService } from './room.service';

@Injectable({
  providedIn: 'root',
})
export class PlayerService {
  readonly playersPath = 'players';

  constructor(
    private readonly db: Database,
    private readonly auth: Auth,
    private readonly roomService: RoomService
  ) {}

  saveName(name: string, roomId: string, player: 1 | 2): Observable<string> {
    const refPath = `${this.roomService.roomsPath}/${roomId}/${
      this.playersPath
    }/${player - 1}`;
    const dbRef = ref(this.db, refPath);
    const data = {
      uid: this.auth.currentUser?.uid,
      name,
      player,
    };
    return from(set(dbRef, data)).pipe(map(() => name));
  }

  validateCurrentPlayerInRoom(room: Room): Player | undefined {
    const playerUid = this.auth.currentUser?.uid;
    if (!playerUid) return undefined;
    return room.players?.find((player) => player.uid === playerUid);
  }

  getMe(roomId?: string): Observable<Player | undefined> {
    if (!roomId) return of(undefined);
    const refPath = `${this.roomService.roomsPath}/${roomId}/${this.playersPath}`;
    const dbRef = ref(this.db, refPath);
    return from(listVal<Player>(dbRef)).pipe(
      map((players) =>
        players?.find((player) => player.uid === this.auth.currentUser?.uid)
      )
    );
  }
}
