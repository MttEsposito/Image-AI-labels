import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { GooglePlus } from '@ionic-native/google-plus/ngx';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase/app';
import { AppSnackbar } from '../../services/snackbar.service';

@Component({
  templateUrl: 'login.component.html',
  styleUrls: ['login.component.scss']
})

export class LoginPage {

  constructor(
    private router: Router,
    private google: GooglePlus,
    private fireAuth: AngularFireAuth,
    private snackBar: AppSnackbar,
  ) { }

  loader: boolean = false;

  googleLogin() {
    const googleSettings = {
      'scopes': 'profile email',
      'webClientId': 'your webClientId here',
      'offline': true
    }
    this.google.login(googleSettings)
      .then(res => this.googleSuccess(res))
      .catch(err => this.googleFail(err))
  }

  private googleSuccess(user: any): void {
    this.loader = true;
    this.fireAuth.auth
      .signInWithCredential(firebase.auth.GoogleAuthProvider.credential(user.idToken))
      .then(user => this.grantAppAcces())
      .catch(error => this.deniedAppAccess())
  }

  private googleFail(error: any): void {
    this.loader = false;
    //alert(JSON.stringify(error))
    if (error != 13) {
      this.snackBar.show('someting goes wrong :(', 'snack-error');
    }
  }

  private grantAppAcces(): void {
    this.router.navigate(['/home/camera']);
    setTimeout(() => {
      this.loader = false;
    }, 4000);
  }

  private deniedAppAccess(): void {
    this.loader = false;
    this.snackBar.show('someting goes wrong :(', 'snack-error');
  }

}
