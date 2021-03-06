/**
 * The UserLoginFormComponent renders a mat dialog card to enable
 * a returning user login to use the application. This includes a
 * formfield and a submit button that sends a request to
 * authenticate user before granting access to the main-page
 * @module UserLoginFormComponent
 */

import { Component, OnInit, Input } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-login-form',
  templateUrl: './user-login-form.component.html',
  styleUrls: ['./user-login-form.component.scss'],
})
export class UserLoginFormComponent implements OnInit {
  /**
   * Gets user input values and stores in userData
   */
  @Input() userData = { Username: '', Password: '' };

  constructor(
    public fetchApiData: FetchApiDataService,
    public dialogRef: MatDialogRef<UserLoginFormComponent>,
    public snackBar: MatSnackBar,
    public router: Router
  ) {}

  ngOnInit(): void {}

  /**
   * call API end-point to login an existing user
   * @function loginUser
   * @param userData {object}
   * @return new user's data in json format
   */

  loginUser(): void {
    this.fetchApiData.userLogin(this.userData).subscribe(
      (response) => {
        this.dialogRef.close();
        console.log(response);
        localStorage.setItem('token', response.token);
        localStorage.setItem('user', response.user.Username);
        this.snackBar.open('Logged in successfully', 'OK', {
          duration: 4000,
        });
        this.router.navigate(['movies']);
      },
      (response) => {
        console.log(response);
        this.snackBar.open(response, 'OK', {
          duration: 4000,
        });
      }
    );
  }
}
