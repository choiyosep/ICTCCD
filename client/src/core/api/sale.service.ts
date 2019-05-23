import {Injectable} from "@angular/core";
import {BaseService} from "./base.service";
import {HttpService} from "../service/http.service";


@Injectable()
export class SaleService extends BaseService {

  constructor(http: HttpService) {
    super('sale', http);
  }

}