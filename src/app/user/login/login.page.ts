import { Component, OnInit } from '@angular/core';
import {TodoService} from "../../services/todo.service"
import { Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  email: string;
  password: string;

  constructor(private authServices: TodoService, public router: Router) { }

  ngOnInit() {
  }

  onSubmitLogin(){
    this.authServices.login(this.email, this.password).then( res =>{
      this.router.navigate(['/tabs/home']);
    }).catch(err => alert('Los datos son incorrectos o no existe el usuario'))
  }

}
