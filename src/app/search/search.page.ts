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
  isLoading = false;

  constructor(private wp: WordpressService) {}

  ngOnInit() {}

  async searchPosts(searchString) {
    if (!searchString) {
      this.posts$.next([]);
      return;
    }

    this.isLoading = true;
    this.options = { search: searchString };
    try {
      const searchResults = await this.wp.getPosts(this.options).toPromise();
      this.posts$.next(searchResults);
    } catch (error) {
      console.log(error);
    } finally {
      this.isLoading = false;
    }
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
