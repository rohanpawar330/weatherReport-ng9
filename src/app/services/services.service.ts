import { Injectable } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from "rxjs/operators";
import { Constants } from '../constants/constants';



@Injectable({
  providedIn: 'root'
})
export class ServicesService {

  constructor(private http: HttpClient) { }



  getData(url): Observable<{}> {

    let headers = {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Credentials": "true",
      "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
      "Access-Control-Allow-Headers": "Origin, Content-Type, Accept",
      "X-Requested-With": "XMLHttpRequest"
    }
    return this.http
      .get(url, { headers: headers })
      .pipe(
        map(res => res),
        catchError(res => res)
      );
  }

  getMethodData(url: string): Observable<{}> {
    let api = url + `&appid=` + Constants.weatherApiKey
    return this.http
      .get(api)
      .pipe(
        map(res => res),
        catchError(res => this.handleError(res))
      );
  }

  callForecastApi(url): Observable<any> {
    return this.http.get(`${url}&key=83d60b33-fc09-4fbd-a5ab-1d4cd7e2e76b`)
      .pipe(catchError(res => this.handleError(res)))
  }

  handleError(error: Response | any) {
    let errorFromServer = error.error.data.message;
    return throwError(errorFromServer);
  }
}
