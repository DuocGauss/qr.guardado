
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { QRScanner, QRScannerStatus } from '@ionic-native/qr-scanner/ngx';



@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  nombreusuario='';

  constructor(private activeroute:ActivatedRoute, private router:Router, private alertController:AlertController, private qr:QRScanner) {
    this.activeroute.queryParams.subscribe(params => {

      if (this.router.getCurrentNavigation().extras.state) {
 
        this.nombreusuario = this.router.getCurrentNavigation().extras.state.miusuario.username;
 
        console.log(this.nombreusuario);
 
     }
 
   });
  }
  

  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'En proceso',
      message: 'Funcionalidad actualmente en desarrollo, disculpe las molestias',
      buttons: ['Vale']
    });

    await alert.present();

    const { role } = await alert.onWillDismiss();
    console.log('onDidDismiss resolved with role', role);
  }

ngOnInit(){
  this.StartScanning();
}

  StartScanning(){

  
// Optionally request the permission early
this.qr.prepare()
.then((status: QRScannerStatus) => {
   if (status.authorized) {
     // camera permission was granted
     this.qr.show();
     document.getElementsByTagName("body")[0].style.opacity = "0.5";
     this.qr.scan().subscribe((val)=>{
       alert(val);
       document.getElementsByTagName("body")[0].style.opacity = "1";
     })    

   } else if (status.denied) {
     // camera permission was permanently denied
     // you must use QRScanner.openSettings() method to guide the user to the settings page
     // then they can grant the permission from there
   } else {
     // permission was denied, but not permanently. You can ask for permission again at a later time.
   }
})
.catch((e: any) => console.log('Error is', e));

} 
  
}
