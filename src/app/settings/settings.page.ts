import { FcmService } from './../services/fcm.service';
import { Component, OnInit } from '@angular/core';
import { DbService } from '../services/db.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {
  constructor(public fcm: FcmService, private db: DbService) {}

  ngOnInit() {}

  randomDiscount() {
    const random = Math.round(Math.random() * 100);

    const headline = `New discount for ${random}% off!!!`;

    this.db.updateAt('discounts', { headline });
  }
}
