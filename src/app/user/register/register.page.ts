import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {UserService} from '../../services/user.service';
import {NavController, LoadingController} from '@ionic/angular';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import {finalize} from 'rxjs/operators';
//import {userList, TodoService} from './../services/todo.service';
import {ActivatedRoute} from 'node_modules/@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import {Observable} from 'rxjs';
import { WebView } from '@ionic-native/ionic-webview/ngx';
import {AngularFireStorage} from '@angular/fire/storage';
import { User} from 'firebase';
import { reject } from 'q';
//import { reject } from 'q';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})

export class RegisterPage implements OnInit {
  urlImage: Observable<string>;
  uploadPercent: Observable<number>;
  myphoto:any;
  
 
  userId = null;
  uid: string = "";
  email: string = "";
  roles: string = "";
  username: string = ""
	password: string = ""
	cpassword: string = ""
  constructor(public afAuth: AngularFireAuth, private db: AngularFirestore,
		public afstore: AngularFirestore, private storage: AngularFireStorage, 
    public user: UserService,
     public alertController: AlertController, private camera: Camera,
		public router: Router,    private webView: WebView,
    private route: ActivatedRoute, private userService: UserService, private loadingController: LoadingController, private authServices: UserService, public navCrl: NavController, private formBuilder: FormBuilder) {}
  errorMessage: string;
  successMessage: string;
  validations_form: FormGroup;
  validation_messages = {
    'email': [{type: 'required', messages: 'Email es necesario'},
      { type: 'pattern', messages: 'Por favor ingrese un email valido'}],
    'password': [{type: 'required', messages: 'Contrasena es necesaria'},
      {type: 'minLength', messages: 'Contrasena debe tener almenos 5 caracteres'}]
      
  };

  ngOnInit() {
   
    this.validations_form = this.formBuilder.group({
      email: new FormControl('', Validators.compose([
        Validators.required, Validators.pattern('^[a-zA-Z0-9_.+-]+[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$'),
      ])),
      password: new FormControl('', Validators.compose([
        Validators.minLength(5),
        Validators.required,
      ])),
      username: ['', Validators.required],
      cpassword: new FormControl('', Validators.compose([
        Validators.minLength(5),
        Validators.required,
      ])),      
    });
  }

/**************************************REGISTRO DE USUARIO********************** */
  async useRegister() {
		const { username, password, cpassword } = this
		if(password !== cpassword) {
			return console.error("Las contraseñas no coinciden")
		}

		try {
      const res = await this.afAuth.auth.createUserWithEmailAndPassword(username + '@hotmail.com', password)
			this.afstore.doc(`users/${res.user.uid}`).set({
        username, 
			})

			this.user.setUser({
				username,
        uid: res.user.uid,
      })
      
      console.log("Username :", username)
			console.log("Res :", res.user.uid)

			this.presentAlert('Excelente', 'Usuario creado');
		} catch(error) {
			console.dir(error)
		}
  }
  
 //**********************ALERTA********************* */ 
  async presentAlert(title: string, content: string) {
		const alert = await this.alertController.create({
			header: title,
			message: content,
			buttons: ['OK']
		})

		await alert.present()
	}


  goToRegisterPage() {
		this.router.navigate(['/login']);
} 

  goLoginPage() {
    this.navCrl.navigateBack('');
  }

}
