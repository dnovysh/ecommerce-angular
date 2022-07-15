import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { EntityCollectionDataService, Logger, QueryParams } from '@ngrx/data';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Update } from "@ngrx/entity";

import { Category } from "src/app/management/domain/Category";
import { environment } from "src/environments/environment";
import { GetAllCategoryResponseInterface } from "src/app/management/types/get-all-category-response.interface";
import { SaveCategoryResponseInterface } from "src/app/management/types/save-category-response.interface";
import { CategoryResponseInterface } from "src/app/management/types/category-response.interface";


@Injectable()
export class CategoryDataService implements EntityCollectionDataService<Category> {

  readonly categoriesUrl = `${environment.baseApiUrl}/catalog-categories`

  constructor(private http: HttpClient, private logger: Logger) {
    this.name = 'Category'
  }

  readonly name: string;

  add(entity: Category): Observable<Category> {
    return this.http.post<SaveCategoryResponseInterface>(this.categoriesUrl, entity)
      .pipe(map((response: SaveCategoryResponseInterface): Category => ({
          id: response.id,
          name: response.name
        })
      ))
  }

  delete(id: number | string): Observable<number | string> {
    const url = `${this.categoriesUrl}/${id}`
    return this.http.delete(url).pipe(map(() => id))
  }

  getAll(): Observable<Category[]> {
    const fullUrl = `${this.categoriesUrl}/search/findAllPreAuthorizedByOrderByName`
    return this.http.get<GetAllCategoryResponseInterface>(fullUrl)
      .pipe(map((response: GetAllCategoryResponseInterface) => response._embedded.categories))
  }

  getById(id: any): Observable<Category> {
    const fullUrl = `${this.categoriesUrl}/${id}`
    return this.http.get<CategoryResponseInterface>(fullUrl)
      .pipe(map((response: CategoryResponseInterface) => response._embedded.category))
  }

  getWithQuery(params: QueryParams | string): Observable<Category[]> {
    throw new Error('Method not implemented.');
  }

  update(update: Update<Category>): Observable<Category> {
    const url = `${this.categoriesUrl}/${update.id}`
    let patchCommands: patchCommandInterface[] = []
    Object.keys(update.changes).forEach(key => {
      if (key !== 'id' && key !== '_links') {
        patchCommands.push({
          op: "replace",
          path: `/${key}`,
          value: (update.changes as any) [key]
        })
      }
    })
    return this.http.patch<SaveCategoryResponseInterface>(
      url, patchCommands, { headers: { "Content-Type": "application/json-patch+json" } }
    ).pipe(map((response: SaveCategoryResponseInterface): Category => ({
        id: response.id,
        name: response.name
      })
    ))
  }

  upsert(entity: Category): Observable<Category> {
    if (entity.id === null) {
      return this.add(entity)
    }
    return this.http.put<SaveCategoryResponseInterface>(this.categoriesUrl, entity)
      .pipe(map((response: SaveCategoryResponseInterface): Category => ({
          id: response.id,
          name: response.name
        })
      ))
  }
}

interface patchCommandInterface {
  op: string
  path: string
  value?: any
}
