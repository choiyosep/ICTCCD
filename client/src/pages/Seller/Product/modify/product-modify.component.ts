import { Component } from '@angular/core';
import {AlertController, IonicPage, NavController, NavParams, ToastController} from "ionic-angular";
import {Product} from "../../../../core/model/Product";
import {Converter} from "../../../../core/helper/converter";
import {UserStore} from "../../../../core/model/UserStore";
import {TimePick} from "../../../../core/model/timePick";
import {IResponse, RESPONSE_CODE} from "../../../../core/service/response.service";
import {HttpResponse} from "@angular/common/http";
import {SessionService} from "../../../../core/service/session.service";
import {AwsService} from "../../../../core/api/aws.service";
import {UploadService} from "../../../../core/service/upload.service";
import {ProductService} from "../../../../core/api/product.service";


/**
 * Generated class for the StoreDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({
    name: 'ProductModifyComponent',
    segment: 'product/modify'
})
@Component({
  selector: 'page-product-modify',
  templateUrl: 'product-modify.component.html',
})
export class ProductModifyComponent{
  private product: Product;
  private items = [];
  private onsale: boolean;


  constructor(
              private navParam: NavParams,
              private alertCtrl: AlertController,
              private toastCtrl : ToastController,
              public navCtrl: NavController,
              private sessionService : SessionService,
              private awsService : AwsService,
              private uploadService : UploadService,
              private productService: ProductService
  ) {
    this.product= new Product();
    this.items.push(1);

    if(this.navParam.get("product")!=undefined){
      this.product= Converter.jsonToInstance(Product, this.navParam.get("product"));

      this.onsale = (this.product.state=="1")? true: false;

      for(let i=0; i<this.product.images.length; i++) {
        this.items.push(1);
      }
    }

  }

  toast(str: string = '') {
    this.toastCtrl.create({
      message: str,
      duration: 2000,
      position: 'top'
    }).present();
  }

  prodmodify(){

    if(this.items.length<2){
      this.toast("사진을 1장 이상 등록해주세요");
      return false;
    }

    if(this.product.prodName==undefined || this.product.prodName == ''){
      this.toast("상품명을 입력해주세요");
      return false;
    }

    if(this.product.originalPrice==undefined || this.product.originalPrice == null){
      this.toast("정상 가격을 입력해주세요");
      return false;
    }

    if(this.product.state=="1" && this.product.stock <= 0){
      this.toast("상품 수량을 1개 이상 입력해주세요");
      return false;
    }



    let confirm = this.alertCtrl.create({
      title: '변경사항을 저장 하시겠습니까?',
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
          text: '확인',
          cssClass: 'del',
          handler: () => {
            //수정작업

            this.productService.modify(this.product, this.product.prodNum).subscribe((res) =>{
              if(res&&res.code!=undefined){
                if(res.code==1) {
                  this.toast("수정 완료");
                  this.navCtrl.setRoot("StoreDetailComponent");
                }else{
                  this.toast(res.msg);
                }
              }
            });
          }
        }
      ]
    });
    confirm.present();
  }



  goToPage(str: string,product?: Product) {
    switch (str) {
      case 'store-detail' :
        this.navCtrl.setRoot('StoreDetailComponent');
        break;
      case 'product-modify' :
        this.navCtrl.push('ProductModifyComponent',{product: product});
        break;
    }


  }


  discountRateChanged( discountRate: number) {
    this.product.salePrice= Math.round(this.product.originalPrice*((100-discountRate)/100));
  }

  discountPriceChanged(salePrice: number) {
    this.product.discountRate =  (this.product.originalPrice - salePrice)/this.product.originalPrice*100
  }

  addButtonClicked() {
    this.product.stock++;
  }
  removeButtonClicked() {
    this.product.stock--;
  }


  delete() {
    let confirm = this.alertCtrl.create({
      title: '상품을 삭제 하시겠습니까?',
      subTitle: '상품 삭제시 저장된<br>모든 데이터가 삭제됩니다',
      cssClass: 'storeDelete',
      buttons: [
        {
          text: '취소',
          cssClass: 'cancle',
          handler: () => {
          }
        },
        {
          text: '삭제',
          cssClass: 'del',
          handler: () => {
            //삭제작업

            this.productService.delete(this.product.prodNum).subscribe(
              (res) =>{
                //응답오면
                if(res&&res.code!=undefined){
                  //성공시
                  if(res.code==1) {
                    this.navCtrl.setRoot("StoreDetailComponent");
                    this.toast("삭제 완료");
                  }else{
                    this.toast(res.msg);
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





  imageUpload(event, i: number) {
    const file = event.target.files[0];
    const loginId = this.sessionService.getValue("loginId");
    this.awsService.getUploadUrl(loginId+"-product")
      .subscribe((res: IResponse<any>) => {
        if (res&&res.code === RESPONSE_CODE.SUCCESS) {
          this.uploadService.upload(res.data.url, file).subscribe((response: HttpResponse<any>) => {
            if(response && response.status==200){
              const key = Converter.keyToAWSSource(res.data.key);
              if(this.product.images[i]==undefined){
                this.product.images.push(key);
                this.items.push(1);
              }else{
                this.product.images[i]=key;
              }
            }
          }, (err) => console.log(err));
        }
      });

  }

  imageDelete(i: number) {
    this.items.pop();
    this.product.images.splice(i, 1);
  }

  changeState($event) {
    this.product.state = ($event.value==true)? "1": "0";
  }
}
