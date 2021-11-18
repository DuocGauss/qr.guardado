import { Component} from '@angular/core';

import { AlertController, NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular'
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-asistencia',
  templateUrl: './asistencia.page.html',
  styleUrls: ['./asistencia.page.scss'],
})
export class AsistenciaPage{
  code='';

  codes:Array<any> = [
    {
      nombre:"ASISTENCIA REGISTRADA EN INI5111-003D INGLÉS INTERMEDIO"
    },
    {
      nombre:"ASISTENCIA REGISTRADA EN EAY4470-002D ETICA"
    },
    {
      nombre:"ASISTENCIA REGISTRADA EN CSY4111-002D CALIDAD DE SOFTWARE"
    }
  ]
  
  constructor(private storage:Storage, private alertController:AlertController, private navCtrl:NavController, private activeroute:ActivatedRoute, private router:Router,) { 
  this.activeroute.queryParams.subscribe(params => {

    if (this.router.getCurrentNavigation().extras.state) {

      this.code = this.router.getCurrentNavigation().extras.state.codigo;

      console.log(this.code);

   }

 });
}


  ngOnInit() {
  }



  



  async presentAlert() {
    const alert = await this.alertController.create({
      
      header: 'Correcto',
      message: 'Asistencia enviada',
      buttons: [
        {
          text: 'OK',
          role: 'cancel',
          handler: () => {
            this.navCtrl.navigateRoot('tabs/home');
          }
        }
      ]
    }); 

    await alert.present();

    const { role } = await alert.onWillDismiss();
    console.log('onDidDismiss resolved with role', role);
  }  

}
