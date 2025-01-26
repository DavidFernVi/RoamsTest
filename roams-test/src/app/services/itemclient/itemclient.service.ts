import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ItemclientService {

  /*/public findNameStartsWith(offset: number, limit: number, startsWith: string): Observable<Response>{
    const uri = `${environment.apiUrl}${this.resource}`
    const params = new HttpParams()
      .set(this.timestampParamName, environment.ts)
      .set(this.apikeyParamName, environment.publicApiKey)
      .set(this.hashParamName, environment.hash)
      .set(this.offsetParamName, offset.toString())
      .set(this.limitParamName, limit.toString())
      .set(this.startWithParam, startsWith)

      return this.client.get(uri, {params}).pipe(map((response: any) => {
        return new Response(
          response.status,
          response.data.offset,
          response.data.limit,
          response.data.total,
          this.buildItems(response.data.results)
        );
      }));
  }

  constructor() { }/*/
}

