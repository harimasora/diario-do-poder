import { Component, OnInit, Input, SecurityContext } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import * as moment from 'moment';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss'],
})
export class NewsComponent implements OnInit {
  @Input()
  post;

  constructor(private sanitizer: DomSanitizer) {}

  ngOnInit() {}

  formatExcerpt(val) {
    const sanitizedVal = this.sanitizer.sanitize(SecurityContext.HTML, val);
    return (
      sanitizedVal
        .split(' ')
        .splice(0, 15)
        .join(' ') + '...'
    );
  }

  formatRelativeTime(ISODate: string) {
    return moment(new Date(ISODate))
      .locale('pt-br')
      .fromNow();
  }
}
