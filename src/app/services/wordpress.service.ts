import { Injectable } from '@angular/core';
import {
  BehaviorSubject,
  of,
  from,
  Observable,
  defer,
  combineLatest,
} from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { switchMap, mergeMap, map, tap } from 'rxjs/operators';
import * as _ from 'lodash';

const BASE_URL = 'https://diariodopoder.com.br/wp-json/wp/v2';
const POSTS_URL = `${BASE_URL}/posts`;
const CATEGORIES_URL = `${BASE_URL}/categories`;

@Injectable({
  providedIn: 'root',
})
export class WordpressService {
  posts$: BehaviorSubject<any[]> = new BehaviorSubject([]);

  constructor(private http: HttpClient) {}

  getPosts(options?: any): Observable<any> {
    const queryParams = { ...options, _embed: 1 };
    return this.http
      .get(POSTS_URL, { params: queryParams })
      .pipe(this.extractCategories());
  }

  getPost(id: string) {
    return this.http.get(`${POSTS_URL}/${id}`);
  }

  getCategories(ids: number[]): Observable<any> {
    if (ids) {
      return from(ids).pipe(
        mergeMap(id => this.http.get(`${CATEGORIES_URL}/${id}`)),
      );
    } else {
      return this.http.get(CATEGORIES_URL);
    }
  }

  getCategory(id: string) {
    return this.http.get(`${CATEGORIES_URL}/${id}`);
  }

  private joinCategories = () => {
    return (source: Observable<any>) => {
      return defer<any>(() => {
        // Operator state
        let collectionData;
        const cache = new Map();

        const docField = 'categories';

        return source.pipe(
          switchMap(data => {
            // Clear mapping on each emitted value
            cache.clear();

            // Save the parent data state
            collectionData = data as any[];

            const reads$ = [];
            let i = 0;
            for (const doc of collectionData) {
              // Categories from post
              for (const id of doc[docField]) {
                // Skip if doc field does not exist or is already in cache
                if (cache.get(id)) {
                  continue;
                }

                // Push doc read to Array
                reads$.push(this.http.get(`${CATEGORIES_URL}/${id}`));
                cache.set(id, i);
              }

              i++;
            }

            return reads$.length ? combineLatest(reads$) : of([]);
          }),
          map(joins => {
            return collectionData.map((v, i) => {
              const categories = v[docField]
                .sort()
                .map(id => joins.find(category => category.id === id));
              return { ...v, categories: categories || null };
            });
          }),
          tap(final => {
            console.log(
              `Queried ${(final as any).length}, Joined ${cache.size} docs`,
            );
          }),
        );
      });
    };
  };

  private extractCategories = () =>
    map((posts: any) => {
      return posts.map(post => {
        const termArrays = post._embedded['wp:term'];
        const categories = _.sortBy(
          termArrays.find(arr => arr[0] && arr[0].taxonomy === 'category'),
          'id',
        );
        return { ...post, categories };
      });
    });
}
