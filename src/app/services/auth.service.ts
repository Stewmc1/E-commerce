import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private userNameSubject = new BehaviorSubject<string | null>(null);
  userName$ = this.userNameSubject.asObservable();

  setUserName(name: string) {
    this.userNameSubject.next(name);
  }

  getUserName(): string | null {
    return this.userNameSubject.getValue();
  }
}
