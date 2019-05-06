import {Injectable} from "@angular/core";
import {BaseService} from "./base.service";
import {HttpService} from "../service/http.service";

@Injectable()
export class ProductService extends BaseService {

  constructor(http: HttpService) {
    super('Product', http);
  }

}