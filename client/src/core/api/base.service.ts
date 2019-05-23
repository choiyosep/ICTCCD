import {Observable} from "rxjs/Observable";

import {HttpService} from "../service/http.service";
import {IResponse} from "../service/response.service";
import {IModel} from "../model/interface";

export class BaseService {

  protected controllerName: string;
  protected http: HttpService;

  constructor(_controllerName: string, _http: HttpService) {
    this.controllerName = _controllerName;
    this.http = _http;
  }

  public add<T>(item: IModel, withFile: boolean = false): Observable<IResponse<T>> {
    console.log(item.toObject());
    return this.http.post(`${this.controllerName}`, item.toObject(), withFile);
  }

  public get<T>(id: string): Observable<IResponse<T>> {
    console.log("baseService:"+id)
    return this.http.get<IResponse<T>>(`${this.controllerName}/${id}`);
  }

  public list<T>(keyword?: string): Observable<IResponse<T>> {
    const params = {
      keyword: keyword
    };
    return this.http.get<IResponse<T>>(`${this.controllerName}`, params);
  }

  public modify<T>(item: IModel, id: string): Observable<IResponse<T>> {
    return this.http.put(`${this.controllerName}/${id}`, item.toObject(), false);
  }

  public delete<T>(id: string): Observable<IResponse<T>> {
    return this.http.delete(`${this.controllerName}/${id}`);
  }
}
