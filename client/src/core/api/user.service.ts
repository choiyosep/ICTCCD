import {Injectable} from "@angular/core";
import {BaseService} from "./base.service";
import {HttpService} from "../service/http.service";
import {Observable} from "rxjs";
import {IResponse} from "../service/response.service";



@Injectable()
export class UserService extends BaseService {

  constructor(http: HttpService) {
    super('Users', http);
  }

  public getUsersDetailsById(buyerId: string): Observable<IResponse<any>>{
    return this.http.get<IResponse<any>>(`${this.controllerName}/${buyerId}`);
  }
  /*  public get<T>(id: string): Observable<IResponse<T>> {
     return this.http.get<IResponse<T>>(`${this.controllerName}/${id}`);
   } */

  public putToken(buyerId: string, token: string): Observable<IResponse<any>> {
    console.log(buyerId, token);
    return this.http.put<IResponse<any>>(`${this.controllerName}/me/token`, {buyerId: buyerId, token: token});
  }

  public send(buyerId: string, push_con: string): Observable<IResponse<any>> {
    console.log(buyerId, push_con);
    return this.http.put<IResponse<any>>(`${this.controllerName}/me/push`, {buyerId: buyerId, push_con: push_con});
  }


}
