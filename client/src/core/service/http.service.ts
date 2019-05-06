import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams, HttpRequest, HttpResponse} from "@angular/common/http";
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/finally';
import 'rxjs/add/observable/of';
// import {HTTP} from '@ionic-native/http'

import {environment} from '../../environments/environment';
import {IResponse} from "./response.service";

@Injectable()
export class HttpService {

  /**
   * Constructor
   *
   * @param {HttpClient} http
   */
  constructor(private http: HttpClient) { }

  public delete<T>(url: string, params?: object): Observable<IResponse<T>> {
    return this.request<T>('DELETE', url, params);
  }

  public get<T>(url: string, params?: object): Observable<IResponse<T>> {
    return this.request<T>('GET', url, params);
  }

  public post<T>(url: string, params?: object, withFileUpload: boolean = false): Observable<IResponse<T>> {
    return this.request<T>('POST', url, params, withFileUpload);
  }

  public put<T>(url: string, params?: object, withFileUpload: boolean = false): Observable<IResponse<T>> {
    return this.request<T>('PUT', url, params, withFileUpload);
  }

  private request<T>(method: string, url: string, params?: object, withFileUpload: boolean = false): Observable<IResponse<T>> {
    const requestUrl = environment.API_ENDPOINT + url;
    const options = {
      headers: this.getHeaders(withFileUpload),
      withCredentials: true
    };

    let parameter = {};
    if (!!params) {
      Object.keys(params).forEach(key => {
        if (params[key] !== undefined && params[key] !== null && params[key].length !== 0) {
          parameter[key] = params[key];
        }
      });
    }


    if (method === "GET" || method === "DELETE") {
        options['params'] = this.getHttpParams(parameter);
    } else if (withFileUpload) {
      const formData = new FormData();
      Object.keys(parameter).forEach(function(key){
        if (typeof parameter[key] === 'object') {
          if (parameter[key] instanceof File) {
            formData.append(key, parameter[key]);
          } else {
            formData.append(key, JSON.stringify(parameter[key]));
          }
        } else {
          formData.append(key, parameter[key]);
        }
      });
      parameter = formData;
    }

    const httpRequest: HttpRequest<any> = new HttpRequest<any>(method, requestUrl, parameter, options);
    return this.http.request<IResponse<T>>(httpRequest)
      .map((res: HttpResponse<IResponse<any>>) => res.body)
  }

  private getHeaders(isFileUpload: boolean): HttpHeaders {
    const defaultHeader: HttpHeaders = new HttpHeaders();
    defaultHeader.append('Content-Type', (isFileUpload) ? 'multipart/form-data' : 'application/json;charset=utf-8');
    return defaultHeader;
  }

  private getHttpParams(params?: object) {
    let httpParams = new HttpParams();
    if (params) {
      Object.keys(params).forEach(function (key) {
        httpParams = httpParams.append(key, params[key]);
      });
    }
    return httpParams;
  }
}
