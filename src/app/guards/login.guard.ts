import { AlertController } from '@ionic/angular';
import { AuthService } from './../services/auth.service';
import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  CanActivate,
} from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoginGuard implements CanActivate {
  constructor(
    private auth: AuthService,
    private alertController: AlertController,
  ) {}

  async canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ): Promise<boolean> {
    const uid = await this.auth.uid();
    const isLoggedIn = !!uid;

    if (!isLoggedIn) {
      const alert = await this.alertController.create({
        header: 'Usuário não registrado',
        message: 'Você precisa estar logado para realizar esta ação.',
        buttons: ['OK'],
      });

      await alert.present();
    }

    return isLoggedIn;
  }
}
