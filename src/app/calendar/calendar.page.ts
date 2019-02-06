import { Component, OnInit } from '@angular/core';
import {NavController} from '@ionic/angular';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.page.html',
  styleUrls: ['./calendar.page.scss'],
})
export class CalendarPage implements OnInit {

  constructor(public navCtrl: NavController) { }

  ngOnInit() {
  }

  backClicked() {
    this.navCtrl.pop();
  }

}
