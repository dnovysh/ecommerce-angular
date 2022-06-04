import { Injectable } from "@angular/core";
import { map, Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";

import { environment } from "src/environments/environment";
import { UserDetailsInterface } from "src/app/shared/modules/identity/types/user-details.interface";
import { UserDetailsResponseInterface } from "src/app/shared/modules/identity/types/user-details-response.interface";


@Injectable()
export class UserDetailsService {

  constructor(private http: HttpClient) { }

  refreshUserDetails(): Observable<UserDetailsInterface | null> {
    const url = `${environment.baseApiUrl}/auth/refresh`
    return this.http.post<UserDetailsResponseInterface>(url, null)
      .pipe(map((response) => response.user))
  }

}
