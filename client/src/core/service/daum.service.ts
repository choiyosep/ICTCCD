import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders, HttpRequest, HttpResponse} from "@angular/common/http";

@Injectable()
export class DaumService {

  constructor(private http: HttpClient) { }

  getLocation(address: String){
    const headers = new HttpHeaders({
      'Authorization': 'KakaoAK 666e66fd0162f6cf4c3f7c52369ac9c8'
    });
    return this.http.get(`https://dapi.kakao.com/v2/local/search/address.json?query=${address}`, {
      headers: headers
    }).map((res : HttpResponse<any>)=>{
      console.log(res);
      if(res){
        return (res as any).documents[0];
      }
    });

  }


  getAddress(x: number, y: number) {
    const headers = new HttpHeaders({
      'Authorization': 'KakaoAK 666e66fd0162f6cf4c3f7c52369ac9c8'
    });
    return this.http.get(`https://dapi.kakao.com/v2/local/geo/coord2address.json?x=${x}&y=${y}`, {
      headers: headers
    }).map((res: HttpResponse<any>) => {
      if (res) {
        return (res as any).documents[0].address.address_name;
      }
    });
  }
}
