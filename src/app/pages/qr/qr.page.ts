import {Component, ViewChild, ViewEncapsulation, OnInit} from '@angular/core';
import {QrScannerComponent} from 'angular2-qrscanner';
import { AlertController, NavController } from '@ionic/angular';
import { Register } from 'src/app/interfaces/register';
import { NavigationExtras, Router } from '@angular/router';
import { Storage } from '@ionic/storage-angular'

@Component({
  selector: 'app-qr',
  templateUrl: './qr.page.html',
  styleUrls: ['./qr.page.scss'],
  encapsulation: ViewEncapsulation.None
})
export class QrPage implements OnInit {

  register:Register=
  {
    nombre:''
  }

  code:string;
  key:string;


  constructor(private alertController:AlertController, private navCtrl:NavController, private storage:Storage, private router:Router) { 
  }
  @ViewChild(QrScannerComponent,
    {static:true}) qrScannerComponent: QrScannerComponent ;

  ngOnInit() {

    this.qrScannerComponent.getMediaDevices().then(devices => {
      console.log(devices);
      const videoDevices: MediaDeviceInfo[] = [];
      for (const device of devices) {
          if (device.kind.toString() === 'videoinput') {
              videoDevices.push(device);
          }
      }
      if (videoDevices.length > 0){
          let choosenDev;
          for (const dev of videoDevices){
              if (dev.label.includes('front')){
                  choosenDev = dev;
                  break;
              }
              
          }
          if (choosenDev) {
              this.qrScannerComponent.chooseCamera.next(choosenDev);  
              
          } else {
              this.qrScannerComponent.chooseCamera.next(videoDevices[1]);
              
          }
      }
  });

  this.qrScannerComponent.capturedQr.subscribe(result => {
      this.code = result 
      this.key = result
      this.guardar() 
      this.guardarcode()
      console.log(result)
      
      
    
    
  });
}
ngAfterViewInit():void {

}

async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Exito!',
      subHeader: 'Datos guardados correctamente',
      message: 'Gracias por usar nuestra aplicación',
      buttons: [
        {
          text: 'Vale',
          role: 'cancel',
          handler: (data) => {
            this.navCtrl.navigateRoot('tabs/home');
          }
        }
      ]
    });

    await alert.present();
  }

  async guardar()
  {

    //coleccion temporal y vaciar datos encima
    //agrgar nuevo escaneo a la coleccion temporal
    await this.storage.set(this.key, this.code);
    
  } 
   
 
 guardarcode()
 {
   let navigationExtras:NavigationExtras = {
     state:{
       codigo:this.code
     }
   }
   this.router.navigate(['/asistencia'],navigationExtras)
 }

 
  

}

  


