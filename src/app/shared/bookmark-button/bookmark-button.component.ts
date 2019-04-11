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

  constructor(private bookService: BookmarkService) {}

  ngOnInit() {}

  async bookmark() {
    this.bookService.togglePostId(this.post.id);
  }
}
