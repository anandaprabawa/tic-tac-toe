import { Injectable } from '@angular/core';
import { Database, get, ref, set } from '@angular/fire/database';
import { from, map, Observable } from 'rxjs';
import { GeneratedIdService } from './generated-id.service';

@Injectable({
  providedIn: 'root',
})
export class RoomService {
  readonly roomsPath = 'rooms';

  constructor(
    private readonly db: Database,
    private readonly generatedIdService: GeneratedIdService
  ) {}

  /**
   * Create a room.
   * @returns Room id
   */
  createRoom(): Observable<string> {
    const roomId = this.generatedIdService.generateId();
    const refPath = `${this.roomsPath}/${roomId}`;
    const dbRef = ref(this.db, refPath);
    return from(set(dbRef, {})).pipe(map(() => roomId));
  }

  validateRoom(roomId: string): Observable<boolean> {
    const refPath = `${this.roomsPath}/${roomId}`;
    const dbRef = ref(this.db, refPath);
    return from(get(dbRef)).pipe(map((snapshot) => snapshot.exists()));
  }
}
