import { Component } from '@angular/core';
import {AlertController, IonicPage, NavController, NavParams} from 'ionic-angular';
import {CartService} from "../../../core/api/cart.service";
import {SessionService} from "../../../core/service/session.service";
import {ToastService} from "../../../core/service/toast.service";

/**
 * Generated class for the PayPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-pay',
  templateUrl: 'pay.html',
})
export class PayPage {
private price: number;
private cartNum : number;
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
  private cartService : CartService,
  private sessionService: SessionService,
  private alertCtrl: AlertController,
  private toastService: ToastService) {

    this.price = this.navParams.get("price");
    this.cartNum= this.navParams.get("cartNum");

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PayPage');
    console.log(this.price);
    console.log(this.cartNum);
  }

  goToback(){
    this.navCtrl.setRoot('CartListPage');
  }

  order(){

    let confirm = this.alertCtrl.create({
      title: '결제 하시겠습니까?',
      subTitle: '',
      cssClass: 'storeDelete',
      buttons: [
        {
          text: '취소',
          cssClass: 'cancle',
          handler: () => {
          }
        },
        {
          text: '결제',
          cssClass:'del',
          handler: () => {
            this.cartService.order(this.cartNum).subscribe((res)=>{
                if(res&&res.code!=undefined) {
                  //성공시
                  if (res.code == 1) {
                    this.toastService.presentToast("결제 성공!!");
                    this.navCtrl.push("OrderRecordPage");
                  } else {
                    this.toastService.presentToast(res.msg);
                  }
                }
              }
            )
          }
        }
      ]
    });
    confirm.present();
  }

}
