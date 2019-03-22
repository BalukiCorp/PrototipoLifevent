import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {UserService, userList} from '../../services/user.service';
import {NavController, LoadingController} from '@ionic/angular';
import {Router} from '@angular/router';
//import {userList, TodoService} from './../services/todo.service';
import {ActivatedRoute} from 'node_modules/@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  user: userList = {
   name: '',
   lastName:'',
   username:'',
   email:'',
   password:'',
  };
  userId = null;
  constructor(private route: ActivatedRoute, private userService: UserService, private loadingController: LoadingController, private authServices: UserService, public navCrl: NavController, private formBuilder: FormBuilder) {}
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
    this.userId = this.route.snapshot.params['id'];
    if (this.userId)  {
     // this.loadTodo();
    }
    this.validations_form = this.formBuilder.group({
      email: new FormControl('', Validators.compose([
        Validators.required, Validators.pattern('^[a-zA-Z0-9_.+-]+[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$'),
      ])),
      password: new FormControl('', Validators.compose([
        Validators.minLength(5),
        Validators.required,
      ])),
      name: ['', Validators.required],
      lastName: ['', Validators.required],
      username: ['', Validators.required],
    });
  }
///****************carga de registro */
  async loadTodo() {
    const loading = await this.loadingController.create({
      message: 'Loading Todo..'
    });
    await loading.present();
 
    this.userService.getUserOnly(this.userId).subscribe(res => {
      loading.dismiss();
      this.user = res;
    });
  }

//*****************GUARDAR REGISTRO */
  async saveTodo() {
 console.log();
    const loading = await this.loadingController.create({
      message: 'Añadiendo evento..'
    });
    await loading.present();
 
    if (this.userId) {
      this.userService.updateUser(this.user, this.userId).then(() => {
        let textInput = document.querySelector("#imageUser");
        
        loading.dismiss();
      //  this.nav.goBack('home');
      });
    } else {
      this.userService.addTodo(this.user).then(() => {
        console.log(this.validations_form);
        console.log(this.formBuilder);
        loading.dismiss();
       // console.log(this.formRegister.value);

       // this.navCtrl.navigateForward(['/tabs/home']);

       // this.nav.goBack('home');
      });
    }
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
