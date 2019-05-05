import { Component} from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {Product} from "../../../../core/model/Product";



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
  private sellArray: Product[] = [];
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
      this.Product2.salePrice=800;

    this.Product3 = new Product();
    this.Product3.prodName="소보루빵",
      this.Product3.qty=3,
      this.Product3.salePrice=500;


    this.sellArray.push(this.Product1);
    this.sellArray.push(this.Product2);
    this.sellArray.push(this.Product3);

    for(let i = 0; i < 3; i++ ){



      this.data.push({

        date : this.DateArray[i],
        name: this.sellArray[i].prodName,
        price: this.sellArray[i].salePrice *this.sellArray[i].qty,
        qty:this.sellArray[i].qty,
        icon: 'ios-add-circle-outline',
        showDetails: false
      });
    }

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

}
