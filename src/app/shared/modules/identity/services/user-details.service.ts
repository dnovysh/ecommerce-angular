import { Injectable } from "@angular/core";
import { map, Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";

import { environment } from "src/environments/environment";
import { UserDetailsInterface } from "src/app/shared/modules/identity/types/user-details.interface";
import { UserDetailsResponseInterface } from "src/app/shared/modules/identity/types/user-details-response.interface";


@Injectable()
export class UserDetailsService {

  constructor(private http: HttpClient) { }

  getUserDetails(): Observable<UserDetailsInterface> {
    const url = `${environment.baseApiUrl}/ToDoInBackend`
    return this.http.get<UserDetailsResponseInterface>(url)
      .pipe(map((response): UserDetailsInterface => response.userDetails))
  }

}
