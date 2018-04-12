import { Component } from '@angular/core';
import { IonicPage, NavController} from 'ionic-angular';
import { Validators, FormBuilder, FormGroup} from '@angular/forms';
import {LoginPage} from "../login/login";

import {AuthServiceProvider} from "../../providers/auth-service/auth-service";
import {HomePage} from "../home/home";
/**
 * Generated class for the RegisterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@IonicPage ()
@Component ({
  selector: 'page-register' ,
  templateUrl: 'register.html' ,
})
export class RegisterPage {
  signUpError:string;
  signUpForm:FormGroup;

  constructor (public navCtrl:NavController , private authProvider:AuthServiceProvider ,fb:FormBuilder) {
    this.signUpForm = fb.group ({
      email: ['' , Validators.compose ([Validators.required , Validators.email])] ,
      password: ['' , Validators.compose ([Validators.required , Validators.minLength (6)])]
    });
  }

  ionViewDidLoad () {
    console.log ('ionViewDidLoad RegisterPage');
  }

  async login () {
    this.navCtrl.push (LoginPage);
  }

  async signUpAuth () {
    let data = this.signUpForm.value;
    let credentials = {
      email: data.email,
      password: data.password
    };
    this.authProvider.singUp (credentials).then (()=> {
      this.navCtrl.push (HomePage);
    } , error=> {
      this.signUpError = error.message;
    });
  }
}
