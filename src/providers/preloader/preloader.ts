import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoadingController } from 'ionic-angular';
/*
 Generated class for the PreloaderProvider provider.

 See https://angular.io/guide/dependency-injection for more info on providers
 and Angular DI.
 */
@Injectable()
export class PreloaderProvider {
  private loading:any;

  constructor( public http:HttpClient , public loaderCtrl:LoadingController ) {
    console.log('Hello PreloaderProvider Provider');
  }

  /**
   * @inheritdoc
   */
  public displayPreloader():void {
    this.loading = this.loaderCtrl.create({
      content: 'Please wait...'
    });
    this.loading.present();
  }

  /**
   * @inheritdoc
   */
  public hidePreloader():void {
    this.loading.dismiss();
  }
}
