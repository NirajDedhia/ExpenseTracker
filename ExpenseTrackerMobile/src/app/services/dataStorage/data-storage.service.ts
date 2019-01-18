import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataStorageService {

  private messageSource = new BehaviorSubject(null);
  currentMessage = this.messageSource.asObservable();

  private userId = new BehaviorSubject(null);
  currentUserId = this.userId.asObservable();

  constructor() { }

  changeMessage(message: any) {
    this.messageSource.next(message);
  }

  setUserId(userId: any) {
    this.userId.next(userId);
  }
}
