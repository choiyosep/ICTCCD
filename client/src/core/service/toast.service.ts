import {Injectable} from "@angular/core";
import {ToastController} from "ionic-angular";

@Injectable()
export class ToastService {

  constructor(private toast: ToastController) { }

  presentToast(message) {
    let toast = this.toast.create({
      message: message,
      duration: 2000,
      cssClass: 'toast'
    });

    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });

    toast.present();
  }
}
