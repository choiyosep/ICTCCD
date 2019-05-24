import {Injectable} from "@angular/core";
import {BaseService} from "./base.service";
import {HttpService} from "../service/http.service";
import {Observable} from "rxjs";
import {IResponse} from "../service/response.service";



@Injectable()
export class UserService extends BaseService {

  constructor(http: HttpService) {
    super('users', http);
  }

  public getUsersDetailsById(buyerId: string): Observable<IResponse<any>>{
    return this.http.get<IResponse<any>>(`${this.controllerName}/${buyerId}`);
  }
  /*  public get<T>(id: string): Observable<IResponse<T>> {
     return this.http.get<IResponse<T>>(`${this.controllerName}/${id}`);
   } */


}
