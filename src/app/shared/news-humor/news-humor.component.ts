import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-news-humor',
  templateUrl: './news-humor.component.html',
  styleUrls: ['./news-humor.component.scss'],
})
export class NewsHumorComponent implements OnInit {
  @Input()
  post;

  constructor() {}

  ngOnInit() {}
}
