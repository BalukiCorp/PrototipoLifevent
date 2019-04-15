import { Component, OnInit } from '@angular/core';
import {UserService} from '../../services/user.service';
import { Router} from "@angular/router";
import {FormGroup, FormControl, FormBuilder, Validators} from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  username: string = ""
	password: string = ""
  email: string = ""
	constructor(public afAuth: AngularFireAuth, public user: UserService, public router: Router, private formBuilder: FormBuilder) { }
	errorMessage: string;
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
    });
	}

	goToRegisterPage() {
		this.router.navigate(['/register']);
} 


  async login() {
		const {email, username, password } = this
		try {
			// kind of a hack. 
			const res = await this.afAuth.auth.signInWithEmailAndPassword(email, password)
			
			if(res.user) {
				this.user.setUser({
					username,
					uid: res.user.uid,
					email: res.user.email,
		//			urlImage: res.user.photoURL,
				})
				this.router.navigate(['/tabs/home'])
			}
		
		} catch(err) {
			console.dir(err)
			if(err.code === "auth/user-not-found") {
				console.log("User not found")
			}
		}
	}

}
