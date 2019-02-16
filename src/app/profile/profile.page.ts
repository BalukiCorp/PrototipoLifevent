import { Component, OnInit } from '@angular/core';
import {NavController} from '@ionic/angular';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  constructor(public navCtrl: NavController) { }

  ngOnInit() {
  }
  calendarButtonClicked() {
    this.navCtrl.navigateForward('/calendar');
  }
  settingsButtonClicked() {
    this.navCtrl.navigateForward('/settings');
  }
}

