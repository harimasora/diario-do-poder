import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import { DbService } from './db.service';
import { take, filter } from 'rxjs/operators';
import { AlertController } from '@ionic/angular';
import * as _ from 'lodash';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BookmarkService {
  bookmarks: BehaviorSubject<any> = new BehaviorSubject([]);

  constructor(
    private auth: AuthService,
    private db: DbService,
    private alertController: AlertController,
  ) {
    this.auth.user$.subscribe(u =>
      u ? this.bookmarks.next(u.bookmarks) : this.bookmarks.next([]),
    );
  }

  async togglePostId(postId: number) {
    const user = await this.auth.user$.pipe(take(1)).toPromise();
    const isLoggedIn = !!user;

    if (!isLoggedIn) {
      const alert = await this.alertController.create({
        header: 'Usuário não registrado',
        message: 'Você precisa estar logado para marcar uma publicação',
        buttons: ['OK'],
      });

      await alert.present();
      return;
    }

    const currentBookmarks = this.bookmarks.getValue();
    const updatedBookmarks = _.xor(currentBookmarks, [postId]);

    this.bookmarks.next(updatedBookmarks);
    await this.db.updateAt(`users/${user.uid}`, {
      bookmarks: updatedBookmarks,
    });
  }
}
