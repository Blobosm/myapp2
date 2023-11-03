import { FormControl,FormGroup,Validators   } from '@angular/forms';
import { Router,NavigationExtras } from '@angular/router';
import { AnimationController, IonCard } from '@ionic/angular';
import type { Animation } from '@ionic/angular';
import type { QueryList } from '@angular/core';
import { Component,OnInit, ElementRef, ViewChildren, ViewChild } from '@angular/core';
import { usuario } from '../../modelo/usuario';
import { perfil } from '../../modelo/perfil';
import { curso } from '../../modelo/curso';
import { ConsumoAPIService } from 'src/app/services/consumo-api.service';
import { AlertController } from '@ionic/angular';
import { Guard1Guard } from '../../guards/guard1/guard1.guard';
import { Guard2Guard } from '../../guards/guard2/guard2.guard';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  @ViewChild(IonCard, { read: ElementRef }) card: ElementRef<HTMLIonCardElement> | undefined;

  private animation!: Animation;
  private typeuser!: usuario;
  private tipoPerfil!: perfil;
  private curso!:curso;

  textBtn = "INGRESAR";
  textUser = "Usuario";
  textPass = "Contraseña";
  desUser = "ingrese usuario";
  desPass = "ingrese contraseña";



    usuario = new FormGroup({
    user: new FormControl('',[Validators.required, Validators.minLength(4),Validators.maxLength(20)]),
    pass: new FormControl('',[Validators.required, Validators.minLength(4),Validators.maxLength(20)]),
  });

  apiLogin() {
    this.consumoApi.login(this.usuario.value.user!, this.usuario.value.pass!).subscribe(
      (HttpResponse) => {
        this.typeuser = HttpResponse.body as unknown as usuario;
        console.log("bbb" + HttpResponse.status);
        if (HttpResponse.status == 200) {
          let setData: NavigationExtras = {
            state: {
              id: this.typeuser.id,
              user: this.typeuser.user,
              correo: this.typeuser.correo,
              nombre: this.typeuser.nombre,
              tipoPerfil: this.typeuser.tipoPerfil
            }
          };

          console.log("aaas"+this.typeuser.tipoPerfil);

          if (this.typeuser.tipoPerfil === 1) {
            this.auth.setProfeAuthenticationStatus(true);
            this.router.navigate(['/home2'], setData);
          }

          if (this.typeuser.tipoPerfil === 2) {
            this.auth2.setAlumnoAuthenticationStatus(true);
            this.router.navigate(['/home'], setData);
          }
        }

        if (HttpResponse.status === 401) {
          this.presentAlert();

        }
      },
      (error) => {
        console.error('Error en inicio de sesión:', error);
      });
  }

  async presentAlert(){
    const alert = await this.alertController.create({
      header: 'Error Login',
      subHeader: 'Infomación : ',
      message: 'Usuario o contraseña son incorrecto',
      buttons: ['Aceptar'],
    });
    await alert.present();
  }


  constructor(private consumoApi:ConsumoAPIService, private router: Router, private animationCtrl: AnimationController, private auth:Guard1Guard,
    private auth2:Guard2Guard, private alertController :AlertController) { }
  ngOnInit() {}
}
