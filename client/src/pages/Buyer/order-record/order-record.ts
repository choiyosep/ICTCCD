import {Order} from "../../../core/model/Order";
import { Component } from '@angular/core';
import {AlertController, IonicPage, NavController, NavParams} from 'ionic-angular';
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
  
  data: Array<{
    date: string,
    name: string,
    //price: number,
    details: string,
    //qty: number,
    icon: string,
    showDetails: boolean
  }> = [];

  // name:string, price: number,qty:number,
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private alertCtrl: AlertController,
    private toastService: ToastService,
    private orderService: OrderService,
    private storeService: StoreService,
    private sessionService: SessionService) {

    //구매이력 불러오는 method
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
        
        if (res && res.code != undefined) {
          //성공시
          if (res.code == 1) {

            //order_record데이터 받아오기
            this.orderArray = res.data;
                    //구매날짜별로 DataArray 삽입
             //let count = 0;
             for (let i = 0; i < this.orderArray.length; i++) {
            
              this.DateArray.push(this.orderArray[i].orderDate)
              console.log(this.DateArray[0]);
              this.data.push({
                date: this.DateArray[i],
                name: this.orderArray[i].storeName,
                details: this.orderArray[i].orderDetail,
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

