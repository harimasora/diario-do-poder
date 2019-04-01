import { ActivatedRoute } from '@angular/router';
import { WordpressService } from './../services/wordpress.service';
import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import * as _ from 'lodash';

const EDITORIAL_SETTINGS = {
  claudio: {
    title: 'Cláudio Humberto',
    categories: '12,570',
  },
  politica: {
    title: 'Política',
    categories: '25,3074',
  },
  justica: {
    title: 'Justiça',
    categories: '27,3072',
  },
  brasil: {
    title: 'Brasil e Regiões',
    categories: '28,83808',
  },
  exteriores: {
    title: 'Exteriores',
    categories: '35,3071',
  },
  dinheiro: {
    title: 'Dinheiro',
    categories: '36,3070',
  },
  opiniao: {
    title: 'Opinião',
    categories: '26',
  },
  especiais: {
    title: 'Especiais',
    categories: '967,3077',
  },
  mulheres: {
    title: 'Mulheres',
    categories: '37',
  },
};

@Component({
  selector: 'app-editorial',
  templateUrl: './editorial.page.html',
  styleUrls: ['./editorial.page.scss'],
})
export class EditorialPage implements OnInit {
  editorial;
  posts$: BehaviorSubject<any[]> = new BehaviorSubject([]);

  constructor(private wp: WordpressService, private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.editorial =
        EDITORIAL_SETTINGS[params.get('id')] || EDITORIAL_SETTINGS['politica'];
      this.updateUI();
    });
  }

  updateUI() {
    const { categories } = this.editorial;
    this.wp
      .getPosts({ categories: categories })
      .subscribe(posts => this.posts$.next(posts));
  }

  async doRefresh(event, array$: BehaviorSubject<any[]>, options?: any) {
    const posts = array$.getValue();
    const firstPost = _.first(posts);
    const newPosts = await this.wp
      .getPosts({
        ...options,
        after: firstPost.date,
      })
      .toPromise();
    array$.next([...newPosts, ...posts]);
    event.target.complete();
  }

  async loadOlderPosts(event, array$: BehaviorSubject<any[]>, options?: any) {
    const posts = array$.getValue();
    const lastPost = _.last(posts);
    const olderPosts = await this.wp
      .getPosts({
        ...options,
        before: lastPost.date,
      })
      .toPromise();
    array$.next([...posts, ...olderPosts]);
    event.target.complete();
  }
}
