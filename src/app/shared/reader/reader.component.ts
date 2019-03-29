import { DomSanitizer } from '@angular/platform-browser';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';

@Component({
  selector: 'app-reader',
  templateUrl: './reader.component.html',
  styleUrls: ['./reader.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ReaderComponent implements OnInit {
  post;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private sanitizer: DomSanitizer,
  ) {
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

  embedUrl(youtubeUrl: string) {
    const videoCode = youtubeUrl.split('/').pop();
    const embeddedUrl = `https://www.youtube.com/embed/${videoCode}`;
    return this.sanitizer.bypassSecurityTrustResourceUrl(embeddedUrl);
  }
}
