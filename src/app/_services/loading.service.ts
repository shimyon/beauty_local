import { Injectable } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  loading = {};
  constructor(private loadingController: LoadingController) { }

  isLoading = new Subject<boolean>();
  async show(num) {
    await this.presentLoadingWithOptions(num);
    this.isLoading.next(true);
  }

  async hide(num) {
    await this.onDidDismiss(num);
    this.isLoading.next(false);
  }

  async presentLoadingWithOptions(num) {
    this.loading[num] = await this.loadingController.create({
      spinner: "dots",
      //duration: 5000,
      message: 'Loading...',
      translucent: true,
      cssClass: 'custom-class custom-loading'
    });
    return await this.loading[num].present();
  }

  async onDidDismiss(num) {
    if (this.loading[num]) {
      await this.loading[num].dismiss();
    } else {
      setTimeout(() => {
        this.onDidDismiss(num);
      }, 200);
    }
  }

}
