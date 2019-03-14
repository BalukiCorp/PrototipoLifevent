import { Component } from '@angular/core';
import { Todo, TodoService } from '../services/todo.service';
import {NavController, NavParams, LoadingController} from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  todos: Todo[];
 
  constructor(public navCtrl: NavController, private todoService: TodoService) { }
 
  ngOnInit() {
    this.todoService.getTodos().subscribe(res => {
      this.todos = res;
    });
  }
 
add_event(){
  this.navCtrl.navigateForward(['/tabs/calendar']);
}


fecha1 = new Date();
  //  fecha2='2018-12-01';

f = new Date(this.fecha1).toISOString().split('T')[0];

}
