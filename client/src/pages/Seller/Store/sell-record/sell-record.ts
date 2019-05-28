import { Component} from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {Product} from "../../../../core/model/Product";
import {Sale} from "../../../../core/model/Sale";
import {SessionService} from "../../../../core/service/session.service"
import {SaleService} from "../../../../core/api/sale.service"
import {ToastService} from "../../../../core/service/toast.service";
import {Converter} from "../../../../core/helper/converter";




/**
 * Generated class for the SellRecordPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({
  name: 'SellRecordComponent',
  segment: 'Seller/Store'
})
@Component({
  selector: 'page-sell-record',
  templateUrl: 'sell-record.html',
})
export class SellRecordPage{
  private sellArray: Sale[] = [];
  private Product1 : Product;
  private Product2 : Product;
  private Product3 : Product;

  private DateArray : string[]=[];

  data: Array<{
    date: string, 
    name : string ,
    price : number, 
    qty: number,
    icon: string, 
    showDetails: boolean}> = [];

  // name:string, price: number,qty:number,
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public sessionService:SessionService,
    private toastService: ToastService,
    public saleService:SaleService)
  {

    this.getOrderRecordList();

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad sellRecordPage');
  }

  goToPage(str: string) {
    switch (str) {
      case 'main':
        this.navCtrl.push('MainComponent');
        break;
    }
  } toggleDetails(data) {
    if (data.showDetails) {
      data.showDetails = false;
      data.icon = 'ios-add-circle-outline';
    } else {
      data.showDetails = true;
      data.icon = 'ios-remove-circle-outline';
    }


  }


  getOrderRecordList() {

    //해당 로그인한 사용자 이름 불러오기
    //불러온 이름으로 사용자 order list get해오기
    const sellerId = this.sessionService.getValue('loginId');
    this.saleService.get(sellerId).subscribe(
      (res) => {
        //응답오면
        console.log(sellerId)//ok
        
        if (res && res.code != undefined) {
          //성공시
          console.log(res.code);
          if (res.code == 1) {
            //sale_record데이터 받아오기
            this.sellArray = res.data;
             console.log(JSON.stringify(this.sellArray))
             for (let i = 0; i < this.sellArray.length; i++) {
               const date = new Date(this.sellArray[i].saleDate);
               this.sellArray[i].saleDate = date.getFullYear() + "."
                 + (date.getMonth()+1) +"."
                 + date.getDate()+"."
                 +Converter.dayToString(date.getDay());
              this.DateArray.push(this.sellArray[i].saleDate)
              console.log(this.DateArray[0]);
              this.data.push({
                date : this.DateArray[i],
                name: this.sellArray[i].prodName,
                price: this.sellArray[i].price,
                qty:this.sellArray[i].quantity,
                icon: 'ios-add-circle-outline',
                showDetails: false
              });
             }
      
            //알림메시지
            console.log(this.DateArray)
          } else {
            this.toastService.presentToast(res.msg);
          }
        }
      }
    )
  }

}
