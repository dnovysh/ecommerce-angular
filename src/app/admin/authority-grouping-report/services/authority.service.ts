import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { map, Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { AuthorityInterface } from "src/app/admin/authority-grouping-report/types/authority.interface";
import { AuthorityResponseInterface } from "src/app/admin/authority-grouping-report/types/authority-response.interface";


@Injectable()
export class AuthorityService {
  constructor(private http: HttpClient) { }

  getAllAuthorities(): Observable<AuthorityInterface[]> {
    const fullUrl = `${environment.baseApiUrl}/identity-authorities/search/findAllByOrderById`

    return this.http.get<AuthorityResponseInterface>(fullUrl)
      .pipe(map((response) => response._embedded.authorities))
  }
}
