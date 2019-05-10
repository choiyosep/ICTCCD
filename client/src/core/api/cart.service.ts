import {Injectable} from "@angular/core";
import {BaseService} from "./base.service";
import {HttpService} from "../service/http.service";
import {IModel} from "../model/interface";
import {Observable} from "rxjs";
import {IResponse} from "../service/response.service";

@Injectable()
export class CartService extends BaseService {

  constructor(http: HttpService) {
    super('Cart', http);
  }

  public order(item: IModel): Observable<IResponse<any>> {
    return this.http.post(`${this.controllerName}/order`, item.toObject());
  }

}
