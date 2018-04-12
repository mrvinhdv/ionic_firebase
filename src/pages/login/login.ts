import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup} from '@angular/forms';
import { HomePage } from "../home/home";
import {RegisterPage} from "../register/register";
import {AuthServiceProvider} from "../../providers/auth-service/auth-service";
/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-login' ,
  templateUrl: 'login.html' ,
})
export class LoginPage {
  loginError:string;
  loginForm:FormGroup;

  constructor( public navCtrl:NavController , private authProvider:AuthServiceProvider , fb:FormBuilder ) {
    this.loginForm = fb.group({
      email: ['' , Validators.compose([Validators.required , Validators.email])] ,
      password: ['' , Validators.compose([Validators.required , Validators.minLength(6)])]
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  /**
   * @inheritdoc
   */
  async signInWithEmail() {
    let data = this.loginForm.value;
    if (!data.email) {
      return;
    }
    let credentials = {
      email: data.email ,
      password: data.password
    };
    this.authProvider.signInWithEmail(credentials).then(()=> {
      this.navCtrl.push(HomePage);
    } , error=> {
      console.log(error);
      this.loginError = error.message;
    })
  }

  /**
   * @inheritdoc
   */

  async loginWithGoogle() {
    //this.authProvider.signInWithGoogle()
    //    .then(
    //        () => this.navCtrl.setRoot(HomePage),
    //        error => console.log(error.message)
    //    );
  }

  /**
   * @inheritdoc
   */

  async loginWithFaceBook() {
  }

  /**
   * @inheritdoc
   */
  async register() {
    this.navCtrl.push(RegisterPage);
  }
}
