import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {UserService} from '../../services/user.service';
import {NavController, LoadingController} from '@ionic/angular';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import {finalize} from 'rxjs/operators';
//import {userList, TodoService} from './../services/todo.service';
import {ActivatedRoute} from 'node_modules/@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import {Observable} from 'rxjs';
import { WebView } from '@ionic-native/ionic-webview/ngx';
import {AngularFireStorage} from '@angular/fire/storage';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  urlImage: Observable<string>;
  uploadPercent: Observable<number>;
  myphoto:any;

 /* user: userList = {
   name: '',
   lastName: '',
   username: '',
   email: '',
   password: '',
  };*/
  userId = null;
  //uid: string="";
  email: string = "";
  roles: string = "";
  username: string = ""
	password: string = ""
	cpassword: string = ""
  constructor(public afAuth: AngularFireAuth,
		public afstore: AngularFirestore, private storage: AngularFireStorage, 
		public user: UserService, public alertController: AlertController, private camera: Camera,
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
 //    urlImage: ['', Validators.required],


      
    });
  }
/// ****************carga de registro */



/******MIO********************** */
  async useRegister() {
		const {email, username, password, cpassword, urlImage } = this
		if(password !== cpassword) {
			return console.error("Las contraseñas no coinciden")
		}

		try {
			const res = await this.afAuth.auth.createUserWithEmailAndPassword(email, password)

			this.afstore.doc(`users/${res.user.uid}`).set({
        username, email
			})

			this.user.setUser({
				username,
        uid: res.user.uid,
        email: res.user.email,
    //    urlImage: res.user.photoURL,
			})

			this.presentAlert('EXCELENTE', 'USUARIO CREADO');
		} catch(error) {
			console.dir(error)
		}
  }
  
  getImage(e) {
  
    const options: CameraOptions = {
      quality: 70,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
     // mediaType: this.camera.MediaType.PICTURE,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      saveToPhotoAlbum:true     
    }
    this.camera.getPicture(options).then((imageData) => {
        this.myphoto = this.webView.convertFileSrc(imageData);
    }, (err) => {
    });
    
    const id = Math.random().toString(36).substring(2);
    const file = e.target.files[0];
    const filePath = `event_image/event_${id}`;
    const ref = this.storage.ref(filePath);
    const task = this.storage.upload(filePath, file);
  this.uploadPercent = task.percentageChanges();
  task.snapshotChanges().pipe(finalize(()=>this.urlImage = ref.getDownloadURL())).subscribe();
 
  }
 

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
