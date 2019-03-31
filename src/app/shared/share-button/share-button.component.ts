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

  constructor(private socialSharing: SocialSharing) {}

  ngOnInit() {}

  async share() {
    const options = {
      url: this.post.link,
    };

    await this.socialSharing.shareWithOptions(options);
  }
}
