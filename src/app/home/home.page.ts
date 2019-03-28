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
    this.scrollToSegmentButton(
      `headerSegmentButton${index}`,
      750,
      'headerSegment',
    );
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

  scrollToSegmentButton(elementID: string, duration: number = 750, container) {
    const item = document.getElementById(elementID); // the element
    if (item) {
      const itemPos =
        item.offsetLeft + item.offsetWidth / 2 - window.innerWidth / 2;
      container = document.getElementById(container);
      this.scrollTo(container, itemPos, duration);
    } else {
      console.error(
        `Could not find element with the following ID: ${elementID}`,
      );
    }
  }

  private scrollTo(element, to: number, duration) {
    const increment = 20,
      that = this;
    let start,
      remaining,
      currentTime = 0,
      animateScroll;

    start = element.scrollLeft;

    remaining = to - start;

    animateScroll = () => {
      currentTime += increment;
      const val = that.easeInOut(currentTime, start, remaining, duration);
      element.scroll(val, 0);

      if (currentTime < duration) {
        setTimeout(animateScroll, increment);
      }
    };
    animateScroll();
  }

  private easeInOut(
    currentTime: number,
    startTime: number,
    remainingTime: number,
    duration: number,
  ) {
    currentTime /= duration / 2;

    if (currentTime < 1) {
      return (remainingTime / 2) * currentTime * currentTime + startTime;
    }

    currentTime--;
    return (
      (-remainingTime / 2) * (currentTime * (currentTime - 2) - 1) + startTime
    );
  }
}
