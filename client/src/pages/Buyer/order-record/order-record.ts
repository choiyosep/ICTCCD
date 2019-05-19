import {Order} from "../../../core/model/Order";
import { Component } from '@angular/core';
import {AlertController, IonicPage, NavController, NavParams} from 'ionic-angular';
import {UserStore} from "../../../core/model/UserStore";
import {ToastService} from "../../../core/service/toast.service";
import {OrderService} from "../../../core/api/order.service";
import {Product} from "../../../core/model/Product";
import {StoreService} from "../../../core/api/store.service";
import {SessionService} from "../../../core/service/session.service";

/**
 * Generated class for the OrderRecordPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage(
 
)
@Component({
  selector: 'page-order-record',
  templateUrl: 'order-record.html',
})
export class OrderRecordPage {
  private orderArray: Order[] = [];
  private Product1 : Product;
  private Product2 : Product;
  private Product3 : Product;

  private DateArray : string[]=[];

  data: Array<{date: string, name : string ,price : number, qty: number,icon: string, showDetails: boolean}> = [];

  // name:string, price: number,qty:number,
  constructor(   
    public navCtrl: NavController,
    public navParams: NavParams,
    private alertCtrl: AlertController,
    private toastService: ToastService,
    private orderService: OrderService,
    private storeService:StoreService,
    private sessionService: SessionService)
  {

    this.DateArray.push("2019-04-30");
    this.DateArray.push("2019-04-29");
    this.DateArray.push("2019-04-28");



    this.Product1 = new Product();
    this.Product1.prodName="소보루빵",
      this.Product1.qty=3,
      this.Product1.salePrice=1000;

    this.Product2 = new Product();
    this.Product2.prodName="소보루빵",
      this.Product2.qty=3,
      this.Product2.salePrice=1000;

    this.Product3 = new Product();
    this.Product3.prodName="소보루빵",
      this.Product3.qty=3,
      this.Product3.salePrice=1000;


    this.orderArray.push(this.Product1);
    this.orderArray.push(this.Product2);
    this.orderArray.push(this.Product3);

    for(let i = 0; i < 3; i++ ){

    this.data.push({

      date: this.DateArray[i],
      name: this.orderArray[i].prodName,
      price: this.orderArray[i].salePrice * this.orderArray[i].qty,
      qty: this.orderArray[i].qty,
      icon: 'ios-add-circle-outline',
      showDetails: false
    });
    }
    this.getOrderRecordList();

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad OrderRecordPage');
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
    const buyerId = this.sessionService.getValue('loginId');
    this.orderService.get(buyerId).subscribe(
      (res) => {
        //응답오면
        //console.log(JSON.stringify(res))
         if (res && res.code != undefined) {
           //성공시
           if (res.code == 1) {
             //console.log(JSON.stringify(res.data))
            this.orderArray=res.data;

           } else {
             this.toastService.presentToast(res.msg);
           }
         }
       }
    ) 

  }
}
