import { Component,OnInit } from '@angular/core';
import { ViewController } from 'ionic-angular';
import { google } from 'google-maps';
/**
 * Generated class for the GmapAutocompleteItemPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
declare var google:google;
@Component({
  selector: 'page-gmap-autocomplete-item' ,
  templateUrl: 'gmap-autocomplete-item.html' ,
})
export class ModalAutocompleteItems implements OnInit {
  autocompleteItems:any;
  autocomplete:any = { query: '' };
  acService:any;
  placesService:any;

  constructor( public viewCtrl:ViewController ) {
  }

  /**
   * @inheritdoc
   */
  ngOnInit() {
    this.acService = new google.maps.places.AutocompleteService();
    this.autocompleteItems = [];
    console.log(this.autocomplete);
    this.autocomplete = {
      query: ''
    };
  }

  /**
   * @inheritdoc
   */
  dismiss() {
    this.viewCtrl.dismiss();
  }

  /**
   * @inheritdoc
   */
  chooseItem( item:any ) {
    console.log('modal > chooseItem > item > ' , item);
    this.viewCtrl.dismiss(item);
  }

  /**
   * @inheritdoc
   */
  updateSearch() {
    console.log('modal > updateSearch');
    if (this.autocomplete.query == '') {
      this.autocompleteItems = [];
      return;
    }
    let self = this;
    let config = {
      types: ['geocode'] , // other types available in the API: 'establishment', 'regions', and 'cities'
      input: this.autocomplete.query ,
      componentRestrictions: { country: 'VN' }
    }
    this.acService.getPlacePredictions(config , function ( predictions , status ) {
      console.log('modal > getPlacePredictions > status > ' , status);
      if (status !== 'ZERO_RESULTS') {
        self.autocompleteItems = [];
        predictions.forEach(function ( prediction ) {
          self.autocompleteItems.push(prediction);
        });
      }
    });
  }
}
