import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { map, Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { RoleInterface } from "src/app/admin/role-administration/types/role.interface";
import { RoleResponseInterface } from "src/app/admin/role-administration/types/role-response.interface";


@Injectable()
export class RoleService {
  constructor(private http: HttpClient) { }

  getAllRoles(): Observable<RoleInterface[]> {
    const fullUrl =
      `${environment.baseApiUrl}/identity-roles/search/findAllByOrderByName?projection=inlineAuthorities`

    return this.http.get<RoleResponseInterface>(fullUrl)
      .pipe(map((response) => response._embedded.roles))
  }
}
