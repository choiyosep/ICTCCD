import { Component } from '@angular/core';
import {AlertController, IonicPage, NavController, NavParams} from 'ionic-angular';
import {UserStore} from "../../../../../core/model/UserStore";
import {Product} from "../../../../../core/model/Product";
import {SessionService} from "../../../../../core/service/session.service";
import {Review} from "../../../../../core/model/Review";
import {ToastService} from "../../../../../core/service/toast.service";
import {StoreService} from "../../../../../core/api/store.service";
import {RESPONSE_CODE} from "../../../../../core/service/response.service";
import {Converter} from "../../../../../core/helper/converter";

/**
 * Generated class for the BuyerStoreDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
declare const naver:any;

@IonicPage()
@Component({
  selector: 'page-buyer-store-detail',
  templateUrl: 'buyer-store-detail.html',
})
export class BuyerStoreDetailPage {

  contents: String;

  private userStore : UserStore;

  private map;
  private marker;
  private products: Array<Product>;
private myInput;

  constructor(
    protected session: SessionService,
    public navCtrl : NavController,
    public navParams : NavParams,
    private alertCtrl: AlertController,
    private toastService: ToastService,
    private storeService : StoreService
  ) {
    if(this.navParams.get("sellerId")!=undefined){
      this.storeService.get(this.navParams.get("sellerId"))
        .subscribe((res)=>{
          if(res && res.code ==RESPONSE_CODE.SUCCESS) {
            this.userStore = res.data;
            // console.log(this.userStore);
            this.userStore.operatingHour =
              Converter.timesTohours(this.userStore.sHour, this.userStore.sMinute, this.userStore.eHour, this.userStore.eMinute)

            this.makeMap(this.userStore.lat, this.userStore.lng);
            if (document.getElementById("map")) {
              document.getElementById("map").style.display = "none";
            }
          }
        });
    }

    this.contents = "menu";
  }

  makeMap(lat, lng){
    this.map = new naver.maps.Map('map',
      {
        center: new naver.maps.LatLng(lat, lng),
        zoom: 10,
      }
    );
    this.marker = new naver.maps.Marker({
      position: new naver.maps.LatLng(lat, lng),
      map: this.map
    });
  }

  ionViewDidEnter() {
    console.log('ionViewDidLoad StoreDetailPage');
    if(document.getElementById("map")){
      document.getElementById("map").style.display="none";
    }
  }

  goToPage(str: string, product?: Product) {

    console.log(product);
    switch (str) {
      case 'store-create':
        this.navCtrl.push('StoreCreateComponent');
        break;
      case 'store-modify' :
        this.navCtrl.push('StoreModifyComponent');
        break;

      case 'product-detail' :
        this.navCtrl.push('ProductDetailPage', {product: product});
        break;
    }
  }

  change(contents: string){
    switch(contents){
      case 'menu':
        if(document.getElementById("map")){
          document.getElementById("map").style.display="none";
        }
        document.getElementById("product-add-button").style.display="";
        break;
      case 'info':
        if(document.getElementById("map")) {
          document.getElementById("map").style.display="";
        }
        document.getElementById("product-add-button").style.display="none";
        break;
      case 'review':
        if(document.getElementById("map")){
          document.getElementById("map").style.display="none";
        }
        document.getElementById("product-add-button").style.display="none";
        break;


    }
  }

  revise(i){
    document.getElementById(`revise${i}`).style.display = "none";
    document.getElementById(`delete${i}`).style.display = "none";
    document.getElementById(`content${i}`).style.display = "none";
    document.getElementById(`complete${i}`).style.display = "";
    document.getElementById(`revise_clicked${i}`).style.display = "";
  }

  showUpdatedItem(i){
    // let updateItem = this.userStore.reviews.find(this.findIndexToUpdate, newItem.id);
    //
    // let index = this.userStore.reviews.indexOf(updateItem);
    console.log(i);

    this.userStore.reviews[i].content = this.myInput;
    document.getElementById(`revise${i}`).style.display = "";
    document.getElementById(`delete${i}`).style.display = "";
    document.getElementById(`content${i}`).style.display = "";
    document.getElementById(`complete${i}`).style.display = "none";
    document.getElementById(`revise_clicked${i}`).style.display = "none";

  }


  hide(){
    document.getElementById('content').style.display = "none";

  }
  delete(i:number) {
    let confirm = this.alertCtrl.create({
      title: '삭제하시겠습니까??',
      subTitle: '',
      cssClass: '',
      buttons: [
        {
          text: '확인',
          cssClass: '',
          handler: () => {
            //즐겨찾기 추가 작업

            //즐겨찾기 속성 변경

            this.userStore.reviews.splice(i,1);
            //알림메시지
            this.toastService.presentToast('삭제 완료!!');

          }
        },
        {
          text: '취소',
          cssClass:'',
          handler: () => {
          }
        }
      ]
    });
    confirm.present();

  }




}
