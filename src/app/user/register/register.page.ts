import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {UserService} from '../../services/user.service';
import {NavController} from '@ionic/angular';
import {Router} from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  constructor(private authServices: UserService, public navCrl: NavController, private formBuilder: FormBuilder) {}
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
    });
  }
  tryRegister(email: string, password: string) {
    this.authServices.registerUser(email, password).then(
        res => {
          console.log(res);
          this.errorMessage = '';
          this.successMessage = 'Tu cuenta ha sido creada exitosamente';
        }, err => {
          console.log(err);
          this.errorMessage = err.message;
          this.successMessage = '';
        });
  }
  goLoginPage() {
    this.navCrl.navigateBack('');
  }

}
