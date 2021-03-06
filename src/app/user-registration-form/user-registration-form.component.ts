/**
 * The UserRegistrationFormComponents renders a mat dialog card to enable
 * a new user register to use the application. This includes a
 * formfield and a submit button tthat sends inputed data to the database.
 * @module UserRegistrationFormComponent
 */

import { Component, OnInit, Input } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { of } from 'rxjs';

@Component({
  selector: 'app-user-registration-form',
  templateUrl: './user-registration-form.component.html',
  styleUrls: ['./user-registration-form.component.scss'],
})
export class UserRegistrationFormComponent implements OnInit {
  /**
   * Gets user input values and stores in userData
   */
  @Input() userData = { Username: '', Password: '', Email: '', Birthday: '' };

  constructor(
    public fetchApiData: FetchApiDataService,
    public dialogRef: MatDialogRef<UserRegistrationFormComponent>,
    public snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {}

  /**
   * call API end-point to register a new user
   * @function registerUser
   * @param userData {object}
   * @return new user's data in json format
   */

  registerUser(): void {
    this.fetchApiData.userRegistration(this.userData).subscribe(
      (response) => {
        //Logic for a succesful user registration goes here! (To be implemented)
        this.dialogRef.close(); // This will close the modal on success!
        console.log(response);
        this.snackBar.open('user registered succesfully', 'OK', {
          duration: 2000,
        });
      },
      (response) => {
        console.log(response);
        this.snackBar.open(response, 'OK', {
          duration: 2000,
        });
      }
    );
  }
}

/* (method) Observable<any>.subscribe(next?: ((value: any) => void) | null | undefined, error?: ((error: any) => void) | null | undefined, complete?: (() => void) | null | undefined):  */
