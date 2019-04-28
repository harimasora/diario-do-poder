import { Injectable } from '@angular/core';
import { AngularFireMessaging } from '@angular/fire/messaging';
import { AngularFireFunctions } from '@angular/fire/functions';
import { ToastController, Platform } from '@ionic/angular';
import { Firebase } from '@ionic-native/firebase/ngx';
import { tap } from 'rxjs/operators';
import { from, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FcmService {
  token;

  constructor(
    private afMessaging: AngularFireMessaging,
    private fun: AngularFireFunctions,
    private toastController: ToastController,
    private platform: Platform,
    private firebaseNative: Firebase,
  ) {}

  async makeToast(message) {
    const toast = await this.toastController.create({
      message,
      duration: 5000,
      position: 'top',
      showCloseButton: true,
      closeButtonText: 'Fechar',
    });
    toast.present();
  }

  sub(topic) {
    return this.fun
      .httpsCallable('subscribeToTopic')({ topic, token: this.token })
      .pipe(tap(_ => this.makeToast(`subscribed to ${topic}`)))
      .subscribe();
  }

  unsub(topic) {
    return this.fun
      .httpsCallable('unsubscribeTFromTopic')({ topic, token: this.token })
      .pipe(tap(_ => this.makeToast(`unsubscribed from ${topic}`)))
      .subscribe();
  }

  getPermission(): Observable<string> {
    let token$;
    if (this.platform.is('cordova')) {
      token$ = from(this.getPermissionNative());
    } else {
      token$ = this.getPermissionWeb();
    }
    return token$.pipe(tap(token => (this.token = token)));
  }

  listenToMessages(): Observable<any> {
    let messages$;
    if (this.platform.is('cordova')) {
      messages$ = this.firebaseNative.onNotificationOpen();
    } else {
      messages$ = this.afMessaging.messages;
    }

    return messages$.pipe(tap(v => this.showMessages(v)));
  }

  private showMessages(payload) {
    let body;
    if (this.platform.is('android')) {
      body = payload.body;
    } else {
      body = payload.notification.body;
    }

    this.makeToast(body);
  }

  private getPermissionWeb() {
    return this.afMessaging.requestToken;
  }

  private async getPermissionNative() {
    let token;

    if (this.platform.is('ios')) {
      await this.firebaseNative.grantPermission();
    }

    token = await this.firebaseNative.getToken();

    return token;
  }
}
