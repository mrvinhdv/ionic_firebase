import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
//import * as firebase from  "firebase/app";
//import { Observable } from "rxjs/Observable";
/*
 Generated class for the DatabaseServiceProvider provider.

 See https://angular.io/guide/dependency-injection for more info on providers
 and Angular DI.
 */
@Injectable()
export class DatabaseServiceProvider {
  constructor( public afFB:AngularFireDatabase ) {
    console.log('Hello DatabaseServiceProvider Provider');
  }

  /**
   * @inheritdoc
   */
  public getData() {
    return this.afFB.list('/playLists');
  }

  /**
   * @inheritdoc
   */
  public addData( param:any ) {
    this.afFB.list('/playLists').push(param);
  }

  /**
   * @inheritdoc
   */
  public removeItem( id ) {
    this.afFB.list('/playLists').remove(id);
  }

}
