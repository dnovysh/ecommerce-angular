import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { SignInRequestInterface } from "src/app/auth/types/sign-in-request.interface";
import { AuthResponseInterface } from "src/app/auth/types/auth-response.interface";
import { environment } from "src/environments/environment";


@Injectable()
export class AuthService {
  constructor(private http: HttpClient) {
  }

  signIn = (data: SignInRequestInterface): Observable<AuthResponseInterface> => {
    const url = `${environment.baseApiUrl}/users/login`

    return this.http.post<AuthResponseInterface>(url, data)
  }
}
