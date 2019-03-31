import { WordpressService } from './../services/wordpress.service';
import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import * as _ from 'lodash';

@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
})
export class SearchPage implements OnInit {
  posts$ = new BehaviorSubject([]);
  options = {};

  constructor(private wp: WordpressService) {}

  ngOnInit() {}

  async searchPosts(searchString) {
    if (!searchString) {
      this.posts$.next([]);
    }
    this.options = { search: searchString };
    const searchResults = await this.wp.getPosts(this.options).toPromise();
    this.posts$.next(searchResults);
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
