import { Component, OnInit, Input } from '@angular/core';
import * as moment from 'moment';

@Component({
  selector: 'app-news-ch',
  templateUrl: './news-ch.component.html',
  styleUrls: ['./news-ch.component.scss'],
})
export class NewsChComponent implements OnInit {
  @Input()
  post;

  constructor() {}

  ngOnInit() {}

  formatAbsoluteDate(ISODate: string) {
    return moment(new Date(ISODate))
      .locale('pt-br')
      .format('DD/MM/YYYY [às] hh:mm');
  }
}
