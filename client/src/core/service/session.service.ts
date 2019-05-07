import {Injectable} from "@angular/core";
import {HttpService} from "./http.service";
import {IResponse, RESPONSE_CODE} from "./response.service";
import {Observable} from "rxjs";

@Injectable()
export class SessionService {

  private LOCAL_STORAGE_NAME: string = "soborrow-session";
  // private sub$: any;

  constructor(private http: HttpService) { }

  init(data: any): void {

    this.destory();
    localStorage.setItem(this.LOCAL_STORAGE_NAME, JSON.stringify(data));
    // this.setPing();
  }

  // isAuthenticated(): boolean {
  //   const localSession = JSON.parse(localStorage.getItem(this.LOCAL_STORAGE_NAME));
  //   return (localSession != null && !this.isExpired(localSession["expire"])) ? true : false;
  // }
  //
  // public setPing(): void {
  //   const expire = JSON.parse(localStorage.getItem(this.LOCAL_STORAGE_NAME))["expire"];
  //   const timeoutCount = Date.parse(expire) - Date.now() - 60000;
  //   this.sub$ = Observable
  //     .interval(timeoutCount)
  //     .switchMap(() => this.refresh())
  //     .subscribe();
  // }

  // public refresh(): Observable<boolean> {
  //   return this.http.put<IResponse<any>>(`session`, {})
  //     .map((res: IResponse<any>) => {
  //       if (res && res.code === RESPONSE_CODE.SUCCESS) {
  //         this.destory();
  //         this.init(res.data);
  //         return true;
  //       } else {
  //         return false;
  //       }
  //     });
  // }

  public getValue(key: string) {
    const localSession = JSON.parse(localStorage.getItem(this.LOCAL_STORAGE_NAME));
    return (!!localSession) ? localSession[key] : false;
  }


  public destory() {
    // if (this.sub$) {
    //   this.sub$.unsubscribe();
    // }
    localStorage.removeItem(this.LOCAL_STORAGE_NAME);
    localStorage.clear();
  }

  public getLocation() {
    return JSON.parse(localStorage.getItem("location"));
  }

  public setLocation(locationData: any){
    localStorage.setItem("location", JSON.stringify(locationData));
  }

  public getAddress() {
    return localStorage.getItem("address");
  }

  public setAddress(address: string){
    localStorage.setItem("address", address);
  }

}
