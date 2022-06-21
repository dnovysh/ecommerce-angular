import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { map, Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { AuthorityInterface } from "src/app/admin/authority-grouping-report/types/authority.interface";
import { AuthorityResponseInterface } from "src/app/admin/authority-grouping-report/types/authority-response.interface";
import {
  AuthorityWithGroupingFieldInterface
} from "src/app/admin/authority-grouping-report/types/authority-with-grouping-field.interface";


@Injectable()
export class AuthorityService {
  constructor(private http: HttpClient) { }

  getAllAuthorities(): Observable<AuthorityInterface[]> {
    const fullUrl = `${environment.baseApiUrl}/identity-authorities/search/findAllByOrderByPermission`

    return this.http.get<AuthorityResponseInterface>(fullUrl)
      .pipe(map((response) => response._embedded.authorities))
  }

  getAllAuthoritiesWithGroupingField(): Observable<AuthorityWithGroupingFieldInterface[]> {
    return this.getAllAuthorities()
      .pipe(map(authorities => {
        return authorities.map(authority => {
          const splitPermission = authority.permission.split('.')
          const groupingField = splitPermission.length > 1 ? splitPermission[0] : null
          return {
            id: authority.id,
            permission: authority.permission,
            splitPermission: splitPermission,
            groupingField: groupingField
          }
        })
      }))
  }
}
