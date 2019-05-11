import { Component, OnInit } from '@angular/core';
import { Todo, TodoService } from '../services/todo.service';
import { NavController, NavParams} from '@ionic/angular';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-details-events',
  templateUrl: './details-events.page.html',
  styleUrls: ['./details-events.page.scss'],
})
export class DetailsEventsPage implements OnInit {

  content: object = [];
  contentId = null;
  numeroRating = null;
  estrellas = null;

  constructor(
    private activatedRoute: ActivatedRoute,
    public navCtrl: NavController, private todoService: TodoService) { 
  }

  ngOnInit() {
    this.contentId = this.activatedRoute.snapshot.paramMap.get('id');
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    this.todoService.getTodo(id).subscribe(res => {
      this.content = res;
      // = res;
    });
  }

  onModelChange( event)
  {
    const rating = event;
    this.numeroRating = rating;
  }

  promedioEstrellas() {
  // tslint:disable-next-line: no-unused-expression
      this.estrellas;
  }

  add_event(){
    this.navCtrl.navigateForward(['/tabs/calendar']);
  }

  today = new Date().toISOString();
  hourToday = new Date().getHours();
  today3 = new Date().toDateString();


  fecha1 = new Date();    
  f = new Date(this.fecha1).toISOString().split('T')[0];


}
