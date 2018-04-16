import { Injectable } from '@angular/core';
import { Camera, CameraOptions } from '@ionic-native/camera';
import 'rxjs/add/operator/map';
import * as firebase from  "firebase/app";
/*
 Generated class for the ImageProvider provider.

 See https://angular.io/guide/dependency-injection for more info on providers
 and Angular DI.
 */
@Injectable()
export class ImageProvider {
  public cameraImage:String

  constructor( public camera:Camera ) {
    console.log('Hello ImageProvider Provider');
  }

  /**
   * @inheritdoc
   *
   */

  public selectImage():Promise<any> {
    return new Promise(( resolve )=> {
      console.log(this.camera);
      let cameraOption:CameraOptions = {
        sourceType: this.camera.PictureSourceType.PHOTOLIBRARY ,
        destinationType: this.camera.DestinationType.DATA_URL ,
        quality: 100 ,
        targetWidth: 320 ,
        targetHeight: 240 ,
        encodingType: this.camera.EncodingType.JPEG ,
        correctOrientation: true
      };
      this.camera.getPicture(cameraOption).then(( data )=> {
        this.cameraImage = "data:image/jpeg;base64," + data;
        return resolve(this.cameraImage);
      })
    });
  }

  /**
   * @inheritdoc
   */
  public uploadImageToStore( imageUrl:any ):Promise<any> {
    return new Promise(( resolve )=> {
      let storageRef = firebase.storage().ref();
      const filename = Math.floor(Date.now() / 1000);
      const imageRef = storageRef.child(`images/${filename}.jpg`);
      imageRef.putString(imageUrl , firebase.storage.StringFormat.DATA_URL).then(( snapshot )=> {
        return resolve(snapshot);
      });
    });
  }
}
