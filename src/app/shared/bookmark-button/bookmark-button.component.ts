import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-bookmark-button',
  templateUrl: './bookmark-button.component.html',
  styleUrls: ['./bookmark-button.component.scss'],
})
export class BookmarkButtonComponent implements OnInit {
  constructor() {}

  ngOnInit() {}

  bookmark(postId) {
    console.log('Bookmark click');
  }
}
