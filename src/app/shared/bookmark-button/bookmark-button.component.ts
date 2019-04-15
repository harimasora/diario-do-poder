import { BookmarkService } from './../../services/bookmark.service';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-bookmark-button',
  templateUrl: './bookmark-button.component.html',
  styleUrls: ['./bookmark-button.component.scss'],
})
export class BookmarkButtonComponent implements OnInit {
  @Input()
  post;

  @Input()
  iconKind: string;

  iconUrl = '/assets/icon/bookmark.svg';

  constructor(private bookService: BookmarkService) {}

  ngOnInit() {
    switch (this.iconKind) {
      case 'on':
        this.iconUrl = '/assets/icon/bookmark-on.svg';
        break;
      case 'off':
        this.iconUrl = '/assets/icon/bookmark-off.svg';
        break;
      default:
        this.iconUrl = '/assets/icon/bookmark.svg';
        break;
    }
  }

  async bookmark() {
    this.bookService.togglePostId(this.post.id);
  }
}
