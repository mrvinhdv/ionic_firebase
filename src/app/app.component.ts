import { Component, ViewChild } from '@angular/core';
import { Nav, Platform,MenuController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Geolocation } from '@ionic-native/geolocation';



import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { LoginPage } from '../pages/login/login';
import {AuthServiceProvider} from "../providers/auth-service/auth-service";
import {GmapPage} from "../pages/gmap/gmap";
import {ProfilePage} from "../pages/profile/profile";
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav:Nav;
  rootPage:any;
  pages:Array<{title: string, component: any,icon: any}>;

  constructor( public platform:Platform ,
               public statusBar:StatusBar ,
               public splashScreen:SplashScreen ,
               public auth:AuthServiceProvider ,
               private menuCtrl:MenuController ,
               public geolocation:Geolocation ) {
    this.initializeApp();
    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Home' , component: HomePage , icon: 'home' } ,
      { title: 'List' , component: ListPage , icon: 'list' } ,
      { title: 'Gmap' , component: GmapPage , icon: 'map' }
    ];
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.getPosition();
    });
    //check auth
    this.auth.afAuth.authState.subscribe(user=> {
      if (user) {
        this.rootPage = HomePage;
        this.pages.push({title:'Profile',component: ProfilePage,icon:'person'});
      } else {
        this.rootPage = LoginPage;
      }
    } , ()=> {
      this.rootPage = LoginPage;
    });
  }

  openPage( page ) {
    this.menuCtrl.close();
    this.nav.setRoot(page.component);
  }

  async logout() {
    this.menuCtrl.close();
    this.auth.signOut();
    this.nav.setRoot(HomePage);
  }

  async getPosition() {
    this.geolocation.getCurrentPosition().then(( position )=> {
      const fields = {
        location: {
          lat: position.coords.latitude ,
          lng: position.coords.longitude
        }
      };
      this.auth.updateInfo(fields).then(()=> {
        console.log('xxx');
      }).catch(( err )=> {
        console.log(err);
      })
    } , err=> {
      console.log(err);
    })
  }
}
