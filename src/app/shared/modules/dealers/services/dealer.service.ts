import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { map, Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { DealerInterface } from "src/app/shared/modules/identity/types/dealer.interface";
import { DealerGetAllResponseInterface } from "src/app/shared/modules/dealers/types/dealer-get-all-response.interface";

@Injectable()
export class DealerService {
  constructor(private http: HttpClient) { }

  getAllDealers(): Observable<DealerInterface[]> {
    const fullUrl = `${environment.baseApiUrl}/identity-dealers/search/findAllByOrderByName`

    return this.http.get<DealerGetAllResponseInterface>(fullUrl)
      .pipe(map((response) => response._embedded.dealers))
  }
}
