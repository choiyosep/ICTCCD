import {Injectable} from "@angular/core";
import {BaseService} from "./base.service";
import {HttpService} from "../service/http.service";
import {Observable} from "rxjs";
import {IResponse} from "../service/response.service";
import {IModel} from "../model/interface";

@Injectable()
export class BookmarkService extends BaseService {

  constructor(http: HttpService) {
    super('bookmark', http);
  }

  public BMdelete<T>(item: IModel): Observable<IResponse<T>> {
    console.log("object"+item.toObject());
    const rs = item.toObject();
    //rs.sellerId
    return this.http.delete(`${this.controllerName}`,item.toObject());
  }

  
}