import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { DatabaseServiceProvider } from "../../providers/database-service/database-service";
@Component ({
   selector: 'page-home' ,
   templateUrl: 'home.html'
})
export class HomePage {
   playlistItems:Array<any> = [];

   constructor (public navCtrl:NavController , private fbDbProvider:DatabaseServiceProvider) {
      const data = this.fbDbProvider.getData ().valueChanges ().toPromise();
      console.log (data);
   }
}
