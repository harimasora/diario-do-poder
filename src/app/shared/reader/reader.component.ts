import { DomSanitizer } from '@angular/platform-browser';
import {
  Component,
  OnInit,
  ViewEncapsulation,
  ViewChild,
  ElementRef,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';
import { PopoverController } from '@ionic/angular';
import { ThemePickerComponent } from '../theme-picker/theme-picker.component';

@Component({
  selector: 'app-reader',
  templateUrl: './reader.component.html',
  styleUrls: ['./reader.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ReaderComponent implements OnInit {
  post;

  @ViewChild('popoverContent', { read: ElementRef }) content: ElementRef;
  @ViewChild('popoverText', { read: ElementRef }) text: ElementRef;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private sanitizer: DomSanitizer,
    public popoverController: PopoverController,
  ) {
    this.route.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.post = this.router.getCurrentNavigation().extras.state.post;
      }
    });
  }

  ngOnInit() {}

  async presentPopover(ev: any) {
    const popover = await this.popoverController.create({
      component: ThemePickerComponent,
      event: ev,
      translucent: false,
      componentProps: {
        contentEle: this.content.nativeElement,
        textEle: this.text.nativeElement,
      },
    });
    return await popover.present();
  }

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
