import { Injectable } from '@angular/core';
import * as firebase from  "firebase/app";
import {AngularFireAuth} from "angularfire2/auth/auth";
/*
 Generated class for the AuthServiceProvider provider.

 See https://angular.io/guide/dependency-injection for more info on providers
 and Angular DI.
 */
@Injectable()
export class AuthServiceProvider {
  private user:firebase.User;

  constructor( public afAuth:AngularFireAuth ) {
    afAuth.authState.subscribe(user=> {
      console.log(user);
      this.user = user;
    })
  }

  /**
   *
   * @param credentials
   * @returns {Promise<any>}
   */

  public singUp( credentials ) {
    return this.afAuth.auth.createUserWithEmailAndPassword(credentials.email , credentials.password);
  }

  /**
   *
   * @param credentials
   * @returns {Promise<any>}
   */
  public signInWithEmail( credentials ) {
    return this.afAuth.auth.signInWithEmailAndPassword(credentials.email , credentials.password);
  }

  /**
   * @inheritdoc
   */

  public updateInfo( fields:any ) {
    return this.afAuth.auth.currentUser.updateProfile(fields).then(( user )=> {
      console.log(user);
    }).catch(err=> {
      console.log(err)
    });
  }

  /**
   * @inheritdoc
   */
  public signInWithGoogle() {
    //return this.oauthSignIn(new firebase.auth.GoogleAuthProvider());
  }

  /**
   *
   * @returns {User}
   */
  public getUserInfo() {
    return this.afAuth.auth.currentUser;
  }

  /**
   *
   * @returns {Promise<any>}
   */
  public signOut():Promise<void> {
    return this.afAuth.auth.signOut();
  }

  /**
   * @inheritdoc
   */
  //private oauthSignIn( provider:AuthServiceProvider ) {
  //  //if (!(<any>window).cordova) {
  //  //  return this.afAuth.auth.signInWithPopup(provider);
  //  //} else {
  //  //  return this.afAuth.auth.signInWithRedirect(provider).then(()=> {
  //  //    return this.afAuth.auth.getRedirectResult().then(( result )=> {
  //  //      let token = result.credential.accessToken;
  //  //      let user = result.user;
  //  //      console.log(token , user);
  //  //    }).catch(err=> {
  //  //      throw new Error('ouath=>' + err.message);
  //  //    })
  //  //  })
  //  //}
  //}
  /**
   * @inheritdoc
   */
  authenticated():boolean {
    return this.user !== null;
  }

  /**
   * @inheritdoc
   */
  public getEmail() {
    return this.user && this.user.email;
  }

  /**
   * @inheritdoc
   */
  public getAvatar() {
    return this.user && this.user.photoURL;
  }

  /**
   * @inheritdoc
   */
  public cancelAccount() {
    return this.user.delete();
  }
}
