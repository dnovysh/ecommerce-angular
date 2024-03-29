import { Injectable } from "@angular/core";
import { map, Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";

import { environment } from "src/environments/environment";
import { UserDetailsInterface } from "src/app/shared/modules/identity/types/user-details.interface";
import { UserDetailsResponseInterface } from "src/app/shared/modules/identity/types/user-details-response.interface";
import { UserDetailsMapper } from "src/app/shared/modules/identity/mappers/user-details.mapper";


@Injectable()
export class UserDetailsService {

  constructor(private http: HttpClient, private mapper: UserDetailsMapper) { }

  refreshUserDetails(): Observable<UserDetailsInterface | null> {
    const url = `${environment.baseApiUrl}/auth/refresh`
    return this.http.get<UserDetailsResponseInterface>(url)
      .pipe(map((response) =>
        this.mapper.mapFromUserDetailsDtoOrNull(response.user)))
  }

}
