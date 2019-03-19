import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Router } from '@angular/router';

@Component({
  selector: 'app-walkthrough',
  templateUrl: './walkthrough.page.html',
  styleUrls: ['./walkthrough.page.scss'],
})
export class WalkthroughPage implements OnInit {
  constructor(private storage: Storage, private router: Router) {}

  async finish() {
    await this.storage.set('walkthroughComplete', true);
    this.router.navigateByUrl('home');
  }

  ngOnInit() {}
}
