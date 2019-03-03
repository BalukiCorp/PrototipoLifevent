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
}
