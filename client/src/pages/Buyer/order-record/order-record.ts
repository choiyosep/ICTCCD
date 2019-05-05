import { Component } from '@angular/core';
import {  IonicPage, NavController, NavParams} from 'ionic-angular';
import {UserStore} from "../../../core/model/UserStore";
import {Product} from "../../../core/model/Product";

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
  private orderArray: Product[] = [];
  private Product1 : Product;
  private Product2 : Product;
  private Product3 : Product;

  private DateArray : string[]=[];

  data: Array<{date: string, name : string ,price : number, qty: number,icon: string, showDetails: boolean}> = [];

  // name:string, price: number,qty:number,
  constructor(public navCtrl: NavController, public navParams: NavParams)
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

      date : this.DateArray[i],
      name: this.orderArray[i].prodName,
      price: this.orderArray[i].salePrice *this.orderArray[i].qty,
      qty:this.orderArray[i].qty,
      icon: 'ios-add-circle-outline',
      showDetails: false
    });
  }

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


}}
