import {Injectable} from '@angular/core';
import {HttpClient, HttpRequest, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs';
import {catchError, filter, map} from 'rxjs/operators';
import {environment} from '../../../environments/environment';
import {RequestMethod} from '../models';


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(
    private http: HttpClient
  ) {
  }

  private static throwError(error: any): any {
    throw error;
  }

  get(path: string): Observable<any> {
    return this.request(RequestMethod.Get, path);
  }

  post(path: string, body: object): Observable<any> {
    return this.request(RequestMethod.Post, path, body);
  }

  put(path: string, body: object): Observable<any> {
    return this.request(RequestMethod.Put, path, body);
  }

  delete(path: string): Observable<any> {
    return this.request(RequestMethod.Delete, path);
  }

  private request(method: RequestMethod, path: string, body?: object): Observable<any> {
    const req = new HttpRequest(method, `${environment.apiURL}${path}`, body, {
      withCredentials: true
    });

    return this.http.request(req)
      .pipe(
        filter(response => response instanceof HttpResponse),
        map((response: HttpResponse<any>) => response.body),
        catchError(error => ApiService.throwError(error))
      );
  }
}
