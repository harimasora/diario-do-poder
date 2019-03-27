import { HeaderComponent } from './../shared/header/header.component';
import { WordpressService } from './../services/wordpress.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { IonSlides } from '@ionic/angular';
import { BehaviorSubject } from 'rxjs';
import * as _ from 'lodash';

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

  filters = {
    CLAUDIO_HUMBERTO: { categories: 12 },
    HUMOR: { categories: 2424 },
  };

  posts$: BehaviorSubject<any[]> = new BehaviorSubject([]);
  postsCH$: BehaviorSubject<any[]> = new BehaviorSubject([]);
  postsHumor$: BehaviorSubject<any[]> = new BehaviorSubject([]);

  constructor(public wp: WordpressService) {}

  ngOnInit() {
    this.wp.getPosts().subscribe(ps => this.posts$.next(ps));
    this.wp
      .getPosts(this.filters.CLAUDIO_HUMBERTO)
      .subscribe(ps => this.postsCH$.next(ps));
    this.wp
      .getPosts(this.filters.HUMOR)
      .subscribe(ps => this.postsHumor$.next(ps));
  }

  onSegmentChange(index) {
    this.slides.slideTo(index);
  }

  async onSlideDidChange() {
    const index = await this.slides.getActiveIndex();
    this.header.segment.value = index.toString();
  }

  async doRefresh(event, array$: BehaviorSubject<any[]>, options?: any) {
    const posts = array$.getValue();
    const firstPost = _.first(posts);
    const newPosts = await this.wp
      .getPosts({
        ...options,
        after: firstPost.date,
      })
      .toPromise();
    array$.next([...newPosts, ...posts]);
    event.target.complete();
  }

  async loadOlderPosts(event, array$: BehaviorSubject<any[]>, options?: any) {
    const posts = array$.getValue();
    const lastPost = _.last(posts);
    const olderPosts = await this.wp
      .getPosts({
        ...options,
        before: lastPost.date,
      })
      .toPromise();
    array$.next([...posts, ...olderPosts]);
    event.target.complete();
  }
}
