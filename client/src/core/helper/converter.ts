import {Serializable} from './serializable';
import {environment} from "../../environments/environment";
/* */
export class Converter {

  static jsonToInstance<T extends Serializable>(type: { new(...args : any[]): T; }, data: any) {
    let result: any = null;
    if (Array.isArray(data)) {
      result = new Array<Serializable>();
      for (let i = 0; i < data.length; i++) {
        const obj = new type();
        obj.fromJson(data[i]);
        result.push(obj);
      }
    } else {
      result = new type();
      result.fromJson(data);
    }
    return result;
  }

  static timesTohours( sHour, sMinute, eHour, eMinute){
    return Converter.timeToString(sHour)+':'+Converter.timeToString(sMinute)+'~'+
      Converter.timeToString(eHour)+':'+Converter.timeToString(eMinute);
  }

  static timesTominutes(hour, minute){
    return Number(60*hour)+ Number(minute);
  }


  static timeToString( num : number): string{
    return num<10? '0'+num : num.toString();
  }

  static dayToString(num: number): string{
    let day;
    switch (num) {
      case 0:
        day = "일요일";
        break;
      case 1:
        day = "월요일";
        break;
      case 2:
        day = "화요일";
      case 3:
        day = "수요일";
      case 4:
        day = "목요일";
      case 5:
        day = "금요일";
      case 6:
        day = "토요일";
    }
    return day;
  }


  static keyToAWSSource(key:string){

    return environment.AWS.S3.FILE_URL + key;
  }

}
