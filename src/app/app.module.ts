import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { AngularFireModule } from "angularfire2";
import { AngularFireDatabaseModule, AngularFireDatabase } from "angularfire2/database";
import { AngularFireAuthModule } from "angularfire2/auth";
import * as firebase from 'firebase';
import { FormsModule } from '@angular/forms';
import { NgxErrorsModule } from '@ultimate/ngxerrors';


import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { DatabaseServiceProvider } from '../providers/database-service/database-service';
import {LoginPage} from "../pages/login/login";
import { AuthServiceProvider } from '../providers/auth-service/auth-service';
import {RegisterPage} from "../pages/register/register";
import {AngularFireAuth} from "angularfire2/auth/auth";


export const configFirebase = {
  apiKey: "AIzaSyC7e6iSaPczCufJXKqNsfW5nj7FbHjAvuY",
  authDomain: "fir-frirebase.firebaseapp.com",
  databaseURL: "https://fir-frirebase.firebaseio.com",
  projectId: "fir-frirebase",
  storageBucket: "fir-frirebase.appspot.com",
  messagingSenderId: "855378024205"
};
firebase.initializeApp (configFirebase);
@NgModule ({
  declarations: [
    MyApp ,
    HomePage ,
    ListPage ,
    LoginPage,
    RegisterPage
  ] ,
  imports: [
    BrowserModule ,
    IonicModule.forRoot (MyApp) ,
    AngularFireModule.initializeApp (configFirebase) ,
    AngularFireDatabaseModule ,
    AngularFireAuthModule ,
    FormsModule,
    NgxErrorsModule
  ] ,
  bootstrap: [IonicApp] ,
  entryComponents: [
    MyApp ,
    HomePage ,
    ListPage ,
    LoginPage ,
    RegisterPage
  ] ,
  providers: [
    StatusBar ,
    SplashScreen ,
    AngularFireDatabase ,
    {provide: ErrorHandler , useClass: IonicErrorHandler} ,
    DatabaseServiceProvider ,
    AuthServiceProvider,
    AngularFireAuth
  ]
})
export class AppModule {
}
