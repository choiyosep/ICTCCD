import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams, ToastController} from "ionic-angular";
import {Product} from "../../../../core/model/Product";
import{ProductService} from"../../../../core/api/product.service"
import {IResponse, RESPONSE_CODE} from "../../../../core/service/response.service";
import {HttpResponse} from "@angular/common/http";
import {Converter} from "../../../../core/helper/converter";
import {SessionService} from "../../../../core/service/session.service";
import {UploadService} from "../../../../core/service/upload.service";
import {AwsService} from "../../../../core/api/aws.service";

/**
 * Generated class for the StoreDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({
    name: 'ProductCreateComponent',
    segment: 'product/create'
})
@Component({
  selector: 'page-product-create',
  templateUrl: 'product-create.component.html',
})
export class ProductCreateComponent{
  contents: String;

  private product: Product;
  private items = [];

  constructor(
    private toastCtrl : ToastController,
    private productService :ProductService,
    public navCtrl: NavController,
    public navParams: NavParams,
    private sessionService : SessionService,
    private uploadService : UploadService,
    private awsService : AwsService
  ) {

    this.product = new Product();
    this.items.push(1);
  }



  ionViewDidLoad() {
    console.log('ionViewDidLoad productCreatePage');
  }


  toast(str: string = '') {
    this.toastCtrl.create({
      message: str,
      duration: 2000,
      position: 'top'
    }).present();
  }
  back() {
    this.navCtrl.pop();
  }

  discountRateChanged(discountRate: number) {
    this.product.salePrice= Math.round(this.product.originalPrice*((100-discountRate)/100));
  }

  discountPriceChanged(salePrice: number) {
    this.product.discountRate =  (this.product.originalPrice - salePrice)/this.product.originalPrice*100
  }



  add(){


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



    if(this.product.salePrice==undefined || this.product.salePrice == null){
      this.toast("할인 정보를 입력해주세요");
      return false;
    }

    if(this.product.stock==undefined || this.product.stock == null || this.product.stock <= 0){
      this.toast("수량을 정확히 입력해주세요");
      return false;
    }
    //판매자 아이디
    this.product.sellerId =this.sessionService.getValue(("loginId"));
    this.product.prodNum = "50";

    //상품 추가작업
    this.productService.add(this.product).subscribe((res) =>{
      if(res&& res.code == RESPONSE_CODE.SUCCESS){
        this.toast("등록 완료");
        this.navCtrl.setRoot("StoreDetailComponent");
      }
    });
  }

  goToPage(str: string) {
    switch (str) {
      case 'main' :
        this.navCtrl.push('MainComponent');
        break;
    }
  }

  addButtonClicked() {
    this.product.stock++;
  }
  removeButtonClicked() {
    this.product.stock--;
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
}
