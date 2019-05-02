import {
  Component,
  OnInit,
  ViewChild,
  Output,
  EventEmitter,
} from '@angular/core';
import { IonSegment } from '@ionic/angular';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  @ViewChild(IonSegment)
  segment: IonSegment;

  @Output() segmentDidChange = new EventEmitter();

  constructor() {}

  ngOnInit() {}

  // On Segment change slide to the matching slide
  onSegmentChange(ev) {
    this.segmentDidChange.emit(ev.detail.value);
  }
}
