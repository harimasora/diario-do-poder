import { AuthService } from './../services/auth.service';
import { HeaderComponent } from './../shared/header/header.component';
import { WordpressService } from './../services/wordpress.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { IonSlides } from '@ionic/angular';
import { BehaviorSubject, of, combineLatest, Observable } from 'rxjs';
import * as _ from 'lodash';
import { switchMap, map, tap } from 'rxjs/operators';

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
    VIDEO: { categories: '2222,8058,2429,3075,3076,2428' },
  };

  posts$: BehaviorSubject<any[]> = new BehaviorSubject([]);
  postsCH$: BehaviorSubject<any[]> = new BehaviorSubject([]);
  postsHumor$: BehaviorSubject<any[]> = new BehaviorSubject([]);
  postsVideo$: BehaviorSubject<any[]> = new BehaviorSubject([]);

  filtersFavorites$: BehaviorSubject<any> = new BehaviorSubject({
    categories: [],
    tags: [],
    hasFavorites: false,
  });
  postsFavoriteMerged$: BehaviorSubject<any[]> = new BehaviorSubject([]);
  postsFavoriteCategories$: BehaviorSubject<any[]> = new BehaviorSubject([]);
  postsFavoriteTags$: BehaviorSubject<any[]> = new BehaviorSubject([]);

  constructor(public wp: WordpressService, private auth: AuthService) {}

  ngOnInit() {
    this.wp.getPosts().subscribe(ps => this.posts$.next(ps));
    this.wp
      .getPosts(this.filters.CLAUDIO_HUMBERTO)
      .subscribe(ps => this.postsCH$.next(ps));
    this.wp
      .getPosts(this.filters.HUMOR)
      .subscribe(ps => this.postsHumor$.next(ps));
    this.wp
      .getPosts(this.filters.VIDEO)
      .subscribe(ps => this.postsVideo$.next(ps));

    // FAVORITE CATEGORIES AND TAGS
    // TODO: Refactor to it's own component

    this.auth.user$.subscribe(user => {
      if (!user) {
        return of(null);
      } else {
        const categories = user.categories || [];
        const tags = user.tags || [];
        const hasFavorites = categories.length || tags.length;
        this.filtersFavorites$.next({ categories, tags, hasFavorites });
      }
    });

    this.filtersFavorites$
      .pipe(
        switchMap(userFilters => {
          const userCategories = userFilters.categories;
          const userTags = userFilters.tags;
          const requests = [];
          if (userCategories.length) {
            requests.push(
              this.wp.getPosts({ categories: userCategories.join(',') }),
            );
          } else {
            requests.push(of([]));
          }
          if (userTags.length) {
            requests.push(this.wp.getPosts({ tags: userTags.join(',') }));
          } else {
            requests.push(of([]));
          }
          return combineLatest(requests);
        }),
      )
      .subscribe(responses => {
        this.postsFavoriteCategories$.next(responses[0]);
        this.postsFavoriteTags$.next(responses[1]);
      });

    combineLatest(
      this.postsFavoriteCategories$.asObservable(),
      this.postsFavoriteTags$.asObservable(),
    ).subscribe(arrays => {
      this.postsFavoriteMerged$.next(this.mergePosts(arrays));
    });
  }

  mergePosts(arrays: any[][]): any[] {
    let posts = _.flatten(arrays);
    posts = _.uniqBy(posts, 'id');
    posts = _.orderBy(posts, 'date', 'desc');
    return posts;
  }

  async doFavoriteRefresh(event) {
    const currentCategories = this.postsFavoriteCategories$.getValue();
    const currentTags = this.postsFavoriteTags$.getValue();
    const categoriesIds = this.filtersFavorites$
      .getValue()
      .categories.join(',');
    const tagsIds = this.filtersFavorites$.getValue().tags.join(',');

    if (categoriesIds.length) {
      const categoryOptions = {};
      categoryOptions['categories'] = categoriesIds;
      if (currentCategories.length) {
        categoryOptions['after'] = _.first(currentCategories).date;
      }
      const newCategories: any[] = await this.wp
        .getPosts(categoryOptions)
        .toPromise();
      this.postsFavoriteCategories$.next([
        ...newCategories,
        ...currentCategories,
      ]);
    }

    if (tagsIds.length) {
      const tagOptions = {};
      tagOptions['tags'] = tagsIds;
      if (currentTags.length) {
        tagOptions['after'] = _.first(currentTags).date;
      }
      const newTags: any[] = await this.wp.getPosts(tagOptions).toPromise();
      this.postsFavoriteTags$.next([...newTags, ...currentTags]);
    }

    event.target.complete();
  }

  async loadFavoriteOlderPosts(event) {
    const currentCategories = this.postsFavoriteCategories$.getValue();
    const currentTags = this.postsFavoriteTags$.getValue();
    const categoriesIds = this.filtersFavorites$
      .getValue()
      .categories.join(',');
    const tagsIds = this.filtersFavorites$.getValue().tags.join(',');

    if (categoriesIds.length) {
      const categoryOptions = {};
      categoryOptions['categories'] = categoriesIds;
      if (currentCategories.length) {
        categoryOptions['before'] = _.last(currentCategories).date;
      }
      const olderCategories: any[] = await this.wp
        .getPosts(categoryOptions)
        .toPromise();
      this.postsFavoriteCategories$.next([
        ...currentCategories,
        ...olderCategories,
      ]);
    }

    if (tagsIds.length) {
      const tagOptions = {};
      tagOptions['tags'] = tagsIds;
      if (currentTags.length) {
        tagOptions['before'] = _.last(currentTags).date;
      }
      const olderTags: any[] = await this.wp.getPosts(tagOptions).toPromise();
      this.postsFavoriteTags$.next([...currentTags, ...olderTags]);
    }

    event.target.complete();
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
