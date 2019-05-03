import { Component, OnInit } from '@angular/core';
import {UserService} from '../../services/user.service';
import { Router} from "@angular/router";
import {FormGroup, FormControl, FormBuilder, Validators} from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/auth';
import { LoadingController } from '@ionic/angular';
import * as firebase from 'firebase/app';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  username: string = ""
	password: string = ""

	constructor(
    public afAuth: AngularFireAuth, public user: UserService,
    public router: Router, private formBuilder: FormBuilder,
    public loadingController: LoadingController) { }

///lOADING
	async presentLoading() {
    const loading = await this.loadingController.create({
      duration: 2000
    });
  
    await loading.present();

    const { role, data } = await loading.onDidDismiss();

    console.log('Loading dismissed!');

  }

  async presentLoadingWithOptions() {
    const loading = await this.loadingController.create({
      spinner: null,
      duration: 5000,
      message: 'Please wait...',
      translucent: true,
      cssClass: 'custom-class custom-loading'
    });
    return await loading.present();
  }
///LOADING

	errorMessage: string;
  validations_form: FormGroup;
  validation_messages = {
    /*
    'email': [{type: 'required', messages: 'Email es necesario'},
              { type: 'pattern', messages: 'Por favor ingrese un email valido'}],*/
    'password': [{type: 'required', messages: 'Contrasena es necesaria'},
                 {type: 'minLength', messages: 'Contrasena debe tener almenos 5 caracteres'}]
  };

	ngOnInit() {
		this.validations_form = this.formBuilder.group({      
      username: ['', Validators.required],
      cpassword: new FormControl('', Validators.compose([
      ])), 
      password: new FormControl('', Validators.compose([
          Validators.minLength(5),
          Validators.required,
			])),
    });
	}

	goToRegisterPage() {
		this.router.navigate(['/register']);
} 


  async login() {
    const { username, password } = this
		try {
      // kind of a hack.
      const res = await this.afAuth.auth.signInWithEmailAndPassword(username + '@hotmail.com', password)

      
			if(res.user) {
				this.user.setUser({
            username,
            uid: res.user.uid
        })

        console.log("Username :", username)
        console.log("UID :", res.user.uid)
				this.router.navigate(['/tabs/home'])
			}
		
		} catch(err) {
      console.log("Username :", username)
			console.dir(err)
			if(err.code === "auth/user-not-found") {
        console.log("User not found")
        alert('Los datos son incorrectos o no existe el usuario')
			}
		}
	}

}
