import {Injectable} from '@angular/core';
import {HttpService} from '../service/http.service';
import {BaseService} from './base.service';
import {Observable} from 'rxjs/Observable';
import {IResponse} from '../service/response.service';

@Injectable()
export class AwsService extends BaseService {
  constructor(http: HttpService) {
    super('aws', http);
  }

  getUploadUrl(userName: string): Observable<IResponse<any>> {
    console.log(userName)//sell4
    return this.http.get<IResponse<any>>(`${this.controllerName}/uploadUrl/${userName}`);
  }

}
