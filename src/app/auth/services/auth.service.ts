import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { SignInRequestInterface } from "src/app/auth/types/sign-in-request.interface";
import { AuthResponseInterface } from "src/app/auth/types/auth-response.interface";
import { environment } from "src/environments/environment";
import { SignOutResponseInterface } from "src/app/auth/types/sign-out-response.interface";
import { SignUpRequestInterface } from "src/app/auth/types/sign-up-request.interface";


@Injectable()
export class AuthService {
  constructor(private http: HttpClient) {
  }

  signIn = (data: SignInRequestInterface): Observable<AuthResponseInterface> => {
    const url = `${environment.baseApiUrl}/auth/signin`

    return this.http.post<AuthResponseInterface>(url, data)
  }

  signUp = (data: SignUpRequestInterface): Observable<AuthResponseInterface> => {
    const url = `${environment.baseApiUrl}/auth/signup`

    return this.http.post<AuthResponseInterface>(url, data)
  }

  signOut = (): Observable<SignOutResponseInterface> => {
    const url = `${environment.baseApiUrl}/auth/signout`

    return this.http.post<SignOutResponseInterface>(url, null)
  }
}
