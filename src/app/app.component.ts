import { Component, ViewChild } from '@angular/core';
import { Nav, Platform,MenuController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { LoginPage } from '../pages/login/login';
import {AuthServiceProvider} from "../providers/auth-service/auth-service";
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav:Nav;
  rootPage:any;
  pages:Array<{title: string, component: any}>;

  constructor( public platform:Platform ,
               public statusBar:StatusBar ,
               public splashScreen:SplashScreen ,
               public auth:AuthServiceProvider ,
               private menuCtrl:MenuController ) {
    this.initializeApp();
    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Home' , component: HomePage } ,
      { title: 'List' , component: ListPage }
    ];
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
    //check auth
    this.auth.afAuth.authState.subscribe(user=> {
      if (user) {
        this.rootPage = HomePage;
      } else {
        this.rootPage = LoginPage;
      }
    } , ()=> {
      this.rootPage = LoginPage;
    });
  }

  openPage( page ) {
    this.nav.setRoot(page.component);
  }

  async logout() {
    this.menuCtrl.close();
    this.auth.signOut();
    this.nav.setRoot(HomePage);
  }
}
