import {Injectable} from "@angular/core";
import {BaseService} from "./base.service";
import {HttpService} from "../service/http.service";

@Injectable()
export class BookmarkService extends BaseService {

  constructor(http: HttpService) {
    super('bookmark', http);
  }

}