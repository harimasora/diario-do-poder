import { WordpressService } from './../services/wordpress.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  constructor(public wp: WordpressService) {}

  ngOnInit() {}

  async doRefresh(event) {
    await this.wp.refreshPosts();
    event.target.complete();
  }

  async loadOlderPosts(event) {
    await this.wp.getOlderPosts();
    event.target.complete();
  }
}
