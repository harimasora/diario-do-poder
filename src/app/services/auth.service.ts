import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { auth } from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';

import { Observable, of } from 'rxjs';
import { switchMap, take, map } from 'rxjs/operators';
import { DbService } from './db.service';

import { Platform, LoadingController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { GooglePlus } from '@ionic-native/google-plus/ngx';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  user$: Observable<any>;

  constructor(
    private afAuth: AngularFireAuth,
    private db: DbService,
    private router: Router,
    private storage: Storage,
    private platform: Platform,
    private loadingController: LoadingController,
    private gplus: GooglePlus,
  ) {
    this.user$ = this.afAuth.authState.pipe(
      switchMap(user => (user ? this.db.doc$(`users/${user.uid}`) : of(null))),
    );

    this.handleRedirect();
  }

  async anonymousLogin() {
    const credential = await this.afAuth.auth.signInAnonymously();
    return await this.updateUserData(credential.user);
  }

  async emailSignUp(email, password, displayName?) {
    const credential = await this.afAuth.auth.createUserWithEmailAndPassword(
      email,
      password,
    );
    return await this.updateUserData({
      ...credential.user,
      displayName: displayName || null,
    });
  }

  async signOut() {
    await this.afAuth.auth.signOut();
    return this.router.navigate(['/']);
  }

  private updateUserData({ uid, email, displayName, photoURL, isAnonymous }) {
    const path = `users/${uid}`;

    const data = {
      uid,
      email,
      displayName,
      photoURL,
      isAnonymous,
    };

    return this.db.updateAt(path, data);
  }

  uid() {
    return this.user$
      .pipe(
        take(1),
        map(u => u && u.uid),
      )
      .toPromise();
  }

  // GOOGLE AUTH

  async googleLogin() {
    try {
      let user;

      if (this.platform.is('cordova')) {
        user = await this.nativeGoogleLogin();
      } else {
        await this.setRedirect(true);
        const provider = new auth.GoogleAuthProvider();
        user = await this.afAuth.auth.signInWithRedirect(provider);
      }
    } catch (err) {
      console.log(err);
    }
  }

  async nativeGoogleLogin(): Promise<any> {
    const gplusUser = await this.gplus.login({
      webClientId:
        '638655416785-l0i4fi0gdauhb8rhrkamq22f689qi8fo.apps.googleusercontent.com',
      offline: true,
      scopes: 'profile email',
    });

    return this.afAuth.auth.signInWithCredential(
      auth.GoogleAuthProvider.credential(gplusUser.idToken),
    );
  }

  // Handle login with redirect from web Google auth
  private async handleRedirect() {
    if ((await this.isRedirect()) !== true) {
      return null;
    }
    const loading = await this.loadingController.create();
    await loading.present();

    const result = await this.afAuth.auth.getRedirectResult();

    if (result.user) {
      await this.updateUserData(result.user);
    }

    await loading.dismiss();

    await this.setRedirect(false);

    return result;
  }

  setRedirect(val) {
    this.storage.set('authRedirect', val);
  }

  async isRedirect() {
    return await this.storage.get('authRedirect');
  }
}
