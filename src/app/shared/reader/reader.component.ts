import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';

@Component({
  selector: 'app-reader',
  templateUrl: './reader.component.html',
  styleUrls: ['./reader.component.scss'],
})
export class ReaderComponent implements OnInit {
  post;

  constructor(private route: ActivatedRoute, private router: Router) {
    this.route.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.post = this.router.getCurrentNavigation().extras.state.post;
      }
    });
  }

  ngOnInit() {}

  formatRelativeTime(ISODate: string) {
    return moment(new Date(ISODate))
      .locale('pt-br')
      .fromNow();
  }

  formatAbsoluteDateTime(ISODate: string) {
    return moment(new Date(ISODate))
      .locale('pt-br')
      .format('DD/MM/YYYY [às] hh:mm');
  }

  formatAbsoluteTime(ISODate: string) {
    return moment(new Date(ISODate))
      .locale('pt-br')
      .format('hh:mm');
  }
}
