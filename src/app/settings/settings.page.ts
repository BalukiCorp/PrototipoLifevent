import { Component, OnInit } from '@angular/core';
import {NavController} from '@ionic/angular';
import {TodoService} from "../services/todo.service"

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {

  constructor(public navCtrl: NavController,public authservice : TodoService) { }


  

  ngOnInit() {
  }
  backClicked() {
    this.navCtrl.pop();
  }

  Onlogout(){
    this.authservice.logout();
  }

}
