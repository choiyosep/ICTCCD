import {Injectable} from "@angular/core";
import {BaseService} from "./base.service";
import {HttpService} from "../service/http.service";
import {IModel} from "../model/interface";
import {Observable} from "rxjs";
import {IResponse} from "../service/response.service";
import {CartProduct} from "../model/CartProduct";

@Injectable()
export class CartService extends BaseService {

  constructor(http: HttpService) {
    super('Cart', http);
  }

  public order(cartNum: number): Observable<IResponse<any>> {
    return this.http.post(`${this.controllerName}/order`, {cartNum: cartNum});
  }
  public cartAdd<T>(cartProduct : CartProduct): Observable<IResponse<T>> {
    return this.http.put(`${this.controllerName}`, cartProduct.toObject(), false);
  }

  public cartDelete<T>(data: any): Observable<IResponse<T>> {
    return this.http.delete(`${this.controllerName}/product`, data);
  }

}
