import {Injectable} from "@angular/core";
import {BaseService} from "./base.service";
import {HttpService} from "../service/http.service";
import {Observable} from "rxjs";
import {IResponse} from "../service/response.service";

@Injectable()
export class StoreService extends BaseService {

  constructor(http: HttpService) {
    super('Store', http);
  }


  public getStores(lat: number, lng: number, catNum: number, keyword?: string): Observable<IResponse<any>> {
    const params = {
      keyword: keyword
    };
    return this.http.get<IResponse<any>>(`${this.controllerName}?lat=${lat}&lng=${lng}&catNum=${catNum}&radius=1000000`, params);
  }

}
