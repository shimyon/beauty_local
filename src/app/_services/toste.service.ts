import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { position } from '../_models/ionic/position.enum';

@Injectable({
  providedIn: 'root'
})
export class TosteService {
  constructor(public toastController: ToastController) {

  }

  ShowAutoHide(message: string, buttontext: string = 'Ok', duration: number = 2000) {
    return new Promise(async (result) => {
      const toast = await this.toastController.create({
        message: message,
        position: 'middle',//'top'
        duration: duration,
        buttons: [
          {
            text: buttontext,
            role: 'cancel',
            handler: () => {
              console.log('Cancel clicked');
            }
          }
        ]
      });
      toast.present();
    })
  }

  Show(message: string, buttontext: string = 'Ok') {
    return new Promise(async (result) => {
      const toast = await this.toastController.create({
        message: message,
        position: 'middle',
        //duration: 2000, 
        buttons: [
          {
            text: buttontext,
            role: 'cancel',
            handler: () => {
              console.log('Cancel clicked');
            }
          }
        ]
      });
      toast.present();
    })
  }

  ShowWithHeader(header: string, message: string, buttontext: string = 'Ok') {
    return new Promise(async (result) => {
      const toast = await this.toastController.create({
        header: header,
        message: message,
        position: 'middle',
        //duration: 2000, 
        buttons: [
          {
            text: buttontext,
            role: 'cancel',
            handler: () => {
              console.log('Cancel clicked');
            }
          }
        ]
      });
      toast.present();
    })
  }
}
