import { Injectable } from '@angular/core';
import { collection, doc, Firestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root',
})
export class GeneratedIdService {
  constructor(private readonly firestore: Firestore) {}

  generateId(): string {
    return doc(collection(this.firestore, 'ids')).id;
  }
}
