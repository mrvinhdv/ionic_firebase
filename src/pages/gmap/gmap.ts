import { Component,ViewChild,ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams,ModalController } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import { google } from "google-maps";
import {ModalAutocompleteItems} from "./gmap-autocomplete-item/gmap-autocomplete-item";
/**
 * Generated class for the GmapPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
declare var google:google;
@IonicPage()
@Component({
  selector: 'page-gmap' ,
  templateUrl: 'gmap.html' ,
})
export class GmapPage {
  @ViewChild('map') mapElement:ElementRef;
  address:any = {
    place: '' ,
    set: false ,
  };
  placesService:any;
  map:any;
  markers = [];
  placedetails:any;

  constructor( public navCtrl:NavController ,
               public navParams:NavParams ,
               public geolocation:Geolocation ,
               public modalCtrl:ModalController ) {
  }

  ionViewDidLoad() {
    console.log(this.mapElement);
    this.initMap();
  }

  /**
   * @inheritdoc
   */
  initMap() {
    this.geolocation.getCurrentPosition().then(( position )=> {
      let latLng = new google.maps.LatLng(position.coords.latitude , position.coords.longitude);
      let mapOption = {
        center: latLng ,
        zoom: 15 ,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      };
      this.map = new google.maps.Map(this.mapElement.nativeElement , mapOption);
    } , err=> {
      console.log(err);
    })
  }

  /**
   * @inheritdic
   */
  showModal() {
    this.reset();
    let modal = this.modalCtrl.create(ModalAutocompleteItems);
    modal.onDidDismiss(data => {
      console.log('page > modal dismissed > data > ' , data);
      if (data) {
        this.address.place = data.description;
        this.getPlaceDetail(data.place_id);
      }
    });
    modal.present();
  }

  /**
   * @inheritdoc
   */
  private reset() {
    this.initPlacedetails();
    this.address.place = '';
    this.address.set = false;
  }

  /**
   * @inheritdoc
   */
  private getPlaceDetail( place_id:string ):void {
    var self = this;
    console.log(self);
    var request = {
      placeId: place_id
    };
    this.placesService = new google.maps.places.PlacesService(this.map);
    this.placesService.getDetails(request , callback);
    function callback( place , status ) {
      if (status == google.maps.places.PlacesServiceStatus.OK) {
        console.log('page > getPlaceDetail > place > ' , place);
        // set full address
        self.placedetails.address = place.formatted_address;
        self.placedetails.lat = place.geometry.location.lat();
        self.placedetails.lng = place.geometry.location.lng();
        for (var i = 0; i < place.address_components.length; i++) {
          const addressType = place.address_components[i].types[0];
          //const values = {
          //  short_name: place.address_components[i]['short_name'] ,
          //  long_name: place.address_components[i]['long_name']
          //}
          if (self.placedetails.components[addressType]) {
            self.placedetails.components[addressType].set = true;
            self.placedetails.components[addressType].short = place.address_components[i]['short_name'];
            self.placedetails.components[addressType].long = place.address_components[i]['long_name'];
          }
        }
        // set place in map
        self.map.setCenter(place.geometry.location);
        self.createMapMarker(place);
        // populate
        self.address.set = true;
        console.log('page > getPlaceDetail > details > ' , self.placedetails);
      } else {
        console.log('page > getPlaceDetail > status > ' , status);
      }
    }
  }

  /**
   * @inheritdoc
   */
  private initPlacedetails() {
    this.placedetails = {
      address: '' ,
      lat: '' ,
      lng: '' ,
      components: {
        route: { set: false , short: '' , long: '' } ,                           // calle
        street_number: { set: false , short: '' , long: '' } ,                   // numero
        sublocality_level_1: { set: false , short: '' , long: '' } ,             // barrio
        locality: { set: false , short: '' , long: '' } ,                        // localidad, ciudad
        administrative_area_level_2: { set: false , short: '' , long: '' } ,     // zona/comuna/partido
        administrative_area_level_1: { set: false , short: '' , long: '' } ,     // estado/provincia
        country: { set: false , short: '' , long: '' } ,                         // pais
        postal_code: { set: false , short: '' , long: '' } ,                     // codigo postal
        postal_code_suffix: { set: false , short: '' , long: '' } ,              // codigo postal - sufijo
      }
    };
  }

  /**
   * @inheritdoc
   */
  private createMapMarker( place:any ):void {
    var placeLoc = place.geometry.location;
    var marker = new google.maps.Marker({
      map: this.map ,
      position: placeLoc
    });
    this.markers.push(marker);
  }
}
