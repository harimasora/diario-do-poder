import { Component, OnInit, Input, SecurityContext } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import * as moment from 'moment';
import { NavigationExtras, Router } from '@angular/router';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss'],
})
export class NewsComponent implements OnInit {
  @Input()
  post;

  constructor(private sanitizer: DomSanitizer, private router: Router) {}

  ngOnInit() {}

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
    this.router.navigate(['/tabs/home/reader'], navigationExtras);
  }
}
