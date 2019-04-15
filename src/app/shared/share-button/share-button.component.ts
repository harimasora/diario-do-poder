import { Component, OnInit, Input } from '@angular/core';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';

@Component({
  selector: 'app-share-button',
  templateUrl: './share-button.component.html',
  styleUrls: ['./share-button.component.scss'],
})
export class ShareButtonComponent implements OnInit {
  @Input()
  post;

  @Input()
  iconKind: string;

  iconUrl = '/assets/icon/share.svg';

  constructor(private socialSharing: SocialSharing) {}

  ngOnInit() {
    switch (this.iconKind) {
      case 'on':
        this.iconUrl = '/assets/icon/share-on.svg';
        break;
      case 'off':
        this.iconUrl = '/assets/icon/share-off.svg';
        break;
      default:
        this.iconUrl = '/assets/icon/share.svg';
        break;
    }
  }

  async share() {
    const options = {
      url: this.post.link,
    };

    await this.socialSharing.shareWithOptions(options);
  }
}
