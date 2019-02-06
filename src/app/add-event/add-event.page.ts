import { Component, OnInit } from '@angular/core';
import {finalize} from 'rxjs/operators';

import {pipe} from 'rxjs';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {NavController, NavParams} from '@ionic/angular';


@Component({
  selector: 'app-add-event',
  templateUrl: './add-event.page.html',
  styleUrls: ['./add-event.page.scss'],
})
export class AddEventPage implements OnInit {

  constructor(public frmBuilder: FormBuilder) { }

  event_name = '';
  manager_name = '';
  category = '';
  hour = '';
  ubication = '';
  date = '';
  description: '';
  final_date: '';
  final_hour = '';
  value = '';
  photoUrl = '';
  today = Date.now();
  register = [];
  myForm: FormGroup;
  public orderForm: any;
  ngOnInit() {
  }
}
