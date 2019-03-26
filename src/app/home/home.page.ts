import { HeaderComponent } from './../shared/header/header.component';
import { WordpressService } from './../services/wordpress.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { IonSlides } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  @ViewChild(HeaderComponent)
  header: HeaderComponent;

  @ViewChild(IonSlides)
  slides: IonSlides;

  constructor(public wp: WordpressService) {}

  ngOnInit() {}

  onSegmentChange(index) {
    this.slides.slideTo(index);
  }

  async onSlideDidChange() {
    const index = await this.slides.getActiveIndex();
    this.header.segment.value = index.toString();
  }

  async doRefresh(event) {
    await this.wp.refreshPosts();
    event.target.complete();
  }

  async loadOlderPosts(event) {
    await this.wp.getOlderPosts();
    event.target.complete();
  }
}
