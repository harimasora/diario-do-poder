import { WordpressService } from './../services/wordpress.service';
import { BookmarkService } from './../services/bookmark.service';
import { Component, OnInit } from '@angular/core';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-bookmark',
  templateUrl: './bookmark.page.html',
  styleUrls: ['./bookmark.page.scss'],
})
export class BookmarkPage implements OnInit {
  posts$;
  constructor(
    public bookmarkService: BookmarkService,
    private wpService: WordpressService,
  ) {
    this.posts$ = this.bookmarkService.bookmarks.pipe(
      switchMap((ids: string[]) => {
        const options = { include: ids.join(',') };
        return this.wpService.getPosts(options);
      }),
    );
  }

  ngOnInit() {}
}
