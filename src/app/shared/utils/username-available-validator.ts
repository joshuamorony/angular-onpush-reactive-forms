import { Injectable } from '@angular/core';
import {
  AbstractControl,
  AsyncValidator,
  ValidationErrors,
} from '@angular/forms';
import { catchError, map, Observable, of } from 'rxjs';
import { UserService } from '../data-access/user.service';

@Injectable({
  providedIn: 'root',
})
export class UsernameAvailableValidator implements AsyncValidator {
  constructor(private userService: UserService) {}

  validate(control: AbstractControl): Observable<ValidationErrors | null> {
    return this.userService.checkUsernameAvailable(control.value).pipe(
      map((isAvailable) => (isAvailable ? null : { usernameAvailable: true })),
      catchError(() => of(null))
    );
  }
}
