import {Injectable} from "@angular/core";
import {BaseService} from "./base.service";
import {HttpService} from "../service/http.service";
import {IModel} from "../model/interface";
import {Observable} from "rxjs";
import {IResponse} from "../service/response.service";


@Injectable()
export class ReviewService extends BaseService {

  constructor(http: HttpService) {
    super('review', http);
  }

  public add(data: any): Observable<IResponse<any>> {
    return this.http.post(`${this.controllerName}`, data);
  }
}
