import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { AngularFireModule } from "angularfire2";
import { AngularFireDatabaseModule, AngularFireDatabase } from "angularfire2/database";
import { AngularFireAuthModule } from "angularfire2/auth";
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { DatabaseServiceProvider } from '../providers/database-service/database-service';
export const config = {
   apiKey: "AIzaSyC7e6iSaPczCufJXKqNsfW5nj7FbHjAvuY" ,
   authDomain: "fir-frirebase.firebaseapp.com" ,
   databaseURL: "https://fir-frirebase.firebaseio.com" ,
   projectId: "fir-frirebase" ,
   storageBucket: "fir-frirebase.appspot.com" ,
   messagingSenderId: "855378024205"
};
@NgModule ({
   declarations: [
      MyApp ,
      HomePage ,
      ListPage
   ] ,
   imports: [
      BrowserModule ,
      IonicModule.forRoot (MyApp) ,
      AngularFireModule.initializeApp (config) ,
      AngularFireDatabaseModule ,
      AngularFireAuthModule
   ] ,
   bootstrap: [IonicApp] ,
   entryComponents: [
      MyApp ,
      HomePage ,
      ListPage
   ] ,
   providers: [
      StatusBar ,
      SplashScreen ,
      AngularFireDatabase,
      {provide: ErrorHandler , useClass: IonicErrorHandler} ,
      DatabaseServiceProvider
   ]
})
export class AppModule {
}
