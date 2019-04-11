import { BookmarkService } from './../../services/bookmark.service';
import { Component, OnInit, Input, SecurityContext } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import * as moment from 'moment';
import { NavigationExtras, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss'],
})
export class NewsComponent implements OnInit {
  @Input()
  post;

  bookmarkedPostIds$: Observable<number[]>;

  constructor(
    private sanitizer: DomSanitizer,
    private router: Router,
    private bookService: BookmarkService,
  ) {}

  ngOnInit() {
    this.bookmarkedPostIds$ = this.bookService.bookmarks.asObservable();
    this.bookmarkedPostIds$.subscribe(ids => {
      const isBookmarked = ids.includes(this.post.id);
      this.post = {
        ...this.post,
        isBookmarked,
      };
    });
  }

  formatExcerpt(val) {
    const sanitizedVal = this.sanitizer.sanitize(SecurityContext.HTML, val);
    if (sanitizedVal) {
      return (
        sanitizedVal
          .split(' ')
          .splice(0, 15)
          .join(' ') + '...'
      );
    } else {
      return '';
    }
  }

  formatRelativeTime(ISODate: string) {
    return moment(new Date(ISODate))
      .locale('pt-br')
      .fromNow();
  }

  readPost() {
    const navigationExtras: NavigationExtras = {
      state: {
        post: this.post,
      },
    };
    this.router.navigate([this.router.url, 'reader'], navigationExtras);
  }
}
