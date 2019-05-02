import { ThemePickerComponent } from '../theme-picker/theme-picker.component';
import {
  Component,
  OnInit,
  ViewChild,
  Output,
  EventEmitter,
  ElementRef,
} from '@angular/core';
import { IonSegment, PopoverController } from '@ionic/angular';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  @ViewChild(IonSegment)
  segment: IonSegment;

  @ViewChild('popoverContent', { read: ElementRef }) content: ElementRef;
  @ViewChild('popoverText', { read: ElementRef }) text: ElementRef;

  @Output() segmentDidChange = new EventEmitter();

  constructor(public popoverController: PopoverController) {}

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

  // On Segment change slide to the matching slide
  onSegmentChange(ev) {
    this.segmentDidChange.emit(ev.detail.value);
  }
}
