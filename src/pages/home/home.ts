import { Component } from '@angular/core';

import { Platform, Alert, AlertController, NavController, LoadingController } from 'ionic-angular';
import {BarcodeScanner} from 'ionic-native';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  static get parameters() {
    return [[Platform], [NavController]];
  }

  constructor( public platform: Platform, 
               public navController: NavController, 
               public alertCtrl: AlertController, 
               public loadingCtrl: LoadingController) {
    this.platform = platform;
    this.navController = navController;
  }

  scan() {
    BarcodeScanner.scan().then((result) => {
      let loader = this.loadingCtrl.create({
        content: "Escaneando...",
        duration: 2000
      });
      loader.present().then(() => {
        if (!result.cancelled) {
          //const barcodeData = new BarcodeData(result.text, result.format);
          //this.scanDetails(barcodeData);
          let alert = this.alertCtrl.create({
            title: 'Resultado obtenido del código: ' + result.text,
            subTitle: '',
            buttons: ['OK']
          });
          alert.present();
        }
      });
    }).catch((error) => {
      alert(error);
    })
  }

  presentLoading() {
    let loader = this.loadingCtrl.create({
      content: "Please wait...",
      duration: 3000
    });
    loader.present();
  }

}
