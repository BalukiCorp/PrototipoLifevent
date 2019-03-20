import { Component, OnInit } from '@angular/core';
import {UserService} from '../../services/user.service';
import { Router} from "@angular/router";
import {FormGroup, FormControl, FormBuilder, Validators} from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  //email: string;
  //password: string;

  constructor(private authServices: UserService, public router: Router, private formBuilder: FormBuilder) { }
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
    });
  }
  loginUser(email: string, password: string) {
    this.authServices.login(email, password).then(
        res => {
          console.log(res);
          this.errorMessage = '';
          this.router.navigate(['tabs/home']);
        }, err => {
          this.errorMessage = err.message;
        }
    );
  }
  goToRegisterPage() {
      this.router.navigate(['/register']);
  }
}
