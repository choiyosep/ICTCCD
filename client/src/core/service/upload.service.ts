import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpRequest, HttpResponse} from '@angular/common/http';
import * as aws from "aws-sdk";
import {environment} from "../../environments/environment";

// import {environment} from '../../../environments/environment';
// import {IResponse} from './response.service';




@Injectable()
export class UploadService {
  constructor(private http: HttpClient) { }

  upload(url: string, data: File) {

    const headers = new HttpHeaders({
      'Content-Type': ''
      // 'Origin': ''
    });
    const options = {
      headers: headers,
      withCredentials: true
    };
    const httpRequest: HttpRequest<any> = new HttpRequest<any>('PUT', url, data, options);
    return this.http.request<any>(httpRequest)
      .map((res: HttpResponse<any>) => {
        return res.body;
      });
  }
}
