import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,LoadingController } from 'ionic-angular';
import {ImageProvider} from "../../providers/image/image";
import {AuthServiceProvider} from "../../providers/auth-service/auth-service";
/**
 * Generated class for the ProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-profile' ,
  templateUrl: 'profile.html' ,
})
export class ProfilePage {
  captureDataUrl:any;
  loading:any;
  user:any;

  constructor( public navCtrl:NavController ,
               public navParams:NavParams ,
               public cameraProvider:ImageProvider ,
               private loadCtrl:LoadingController ,
               public auth:AuthServiceProvider ) {
  }

  ionViewDidLoad() {
    //this.getUser();
  }

  /**
   * @inheritdoc
   */
  async uploadAvatar() {
    this.cameraProvider.selectImage().then(( image )=> {
      this.captureDataUrl = image;
      this.showSuccesfulUploadAlert();
      this.cameraProvider.uploadImageToStore(image).then(( snapshot )=> {
        const fields = {
          photoURL: snapshot.downloadURL
        };
        this.auth.updateInfo(fields).then(( res )=> {
        });
        //close loading
        this.loading.dismiss();
      });
    }).catch(err=> {
      console.log(err);
    });
  }

  /**
   * @inheritdoc
   */
  private showSuccesfulUploadAlert() {
    this.loading = this.loadCtrl.create({
      spinner: 'hide' ,
      content: 'Please wait...'
    });
    this.loading.present();
  }
  /**
   * @inheritdoc
   */
  async cancelAccount() {
    this.auth.cancelAccount();
  }
}
