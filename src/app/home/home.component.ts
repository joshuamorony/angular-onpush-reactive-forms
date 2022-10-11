import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  NgModule,
  OnInit,
} from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HappinessLevelComponentModule } from '../shared/ui/happiness-level.component';
import { adultValidator } from '../shared/utils/adult-validator';
import { passwordMatchesValidator } from '../shared/utils/password-matches-validator';
import { UsernameAvailableValidator } from '../shared/utils/username-available-validator';

@Component({
  selector: 'app-home',
  template: `
    <ng-container *ngIf="myForm.statusChanges | async"></ng-container>

    <form [formGroup]="myForm" (ngSubmit)="handleSubmit()" #form="ngForm">
      <div>
        <input formControlName="username" type="text" placeholder="username" />
        <span *ngIf="myForm.controls.username.statusChanges | async as status">
          {{ status }}
        </span>
        <p
          *ngIf="
            !myForm.controls.username.valid &&
            (myForm.controls.username.touched || form.submitted)
          "
        >
          Please provide a username that is not taken
        </p>
      </div>
      <div>
        <input formControlName="age" type="number" />
        <p
          *ngIf="
            !myForm.controls.age.valid &&
            (myForm.controls.age.touched || form.submitted)
          "
        >
          Age must be greater than 18
        </p>
      </div>

      <button type="submit" [disabled]="myForm.controls.username.pending">
        Submit
      </button>
    </form>

    <button type="button" (click)="({})">Test change detection</button>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent implements OnInit {
  myForm = this.fb.nonNullable.group(
    {
      username: [
        '',
        Validators.required,
        this.usernameAvailableValidator.validate.bind(
          this.usernameAvailableValidator
        ),
      ],
      age: [0, [Validators.required, adultValidator]],
    },
    {
      validators: [passwordMatchesValidator],
    }
  );

  constructor(
    private fb: FormBuilder,
    private usernameAvailableValidator: UsernameAvailableValidator,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    setTimeout(() => {
      console.log('Mark as touched');
      this.myForm.controls.age.markAsTouched();
      this.myForm.updateValueAndValidity();

      //this.cdr.markForCheck();
    }, 1000);
  }

  handleSubmit() {
    console.log(this.myForm.value);
  }
}

@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HappinessLevelComponentModule,
    RouterModule.forChild([
      {
        path: '',
        component: HomeComponent,
      },
    ]),
  ],
})
export class HomeComponentModule {}
