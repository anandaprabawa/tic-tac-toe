import { Injectable } from '@angular/core';
import { v4 as uuidV4 } from 'uuid';

@Injectable({
  providedIn: 'root',
})
export class GeneratedIdService {
  generateId(): string {
    return uuidV4();
  }
}
