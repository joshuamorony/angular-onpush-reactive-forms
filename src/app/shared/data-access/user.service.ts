import { Injectable } from '@angular/core';
import { delay, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  checkUsernameAvailable(username: string) {
    return of(false).pipe(delay(1000));
  }
}
