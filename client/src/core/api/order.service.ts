import {Injectable} from "@angular/core";
import {BaseService} from "./base.service";
import {HttpService} from "../service/http.service";
import {Observable} from "rxjs";
import {IResponse} from "../service/response.service";

@Injectable()
export class OrderService extends BaseService {

  constructor(http: HttpService) {
    super('order', http);
  }

}