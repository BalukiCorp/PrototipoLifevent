import { Component, OnInit } from '@angular/core';
import { Todo, TodoService } from '../services/todo.service';
import {NavController, NavParams, LoadingController} from '@ionic/angular';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-cate-arte',
  templateUrl: './cate-arte.page.html',
  styleUrls: ['./cate-arte.page.scss'],
})
export class CateArtePage implements OnInit {
content: object= null;
todos: Todo[];
 
constructor(private activatedRoute: ActivatedRoute,
  public navCtrl: NavController, private todoService: TodoService) { }
 
ngOnInit() {
  let id = this.activatedRoute.snapshot.paramMap.get('id');
  this.todoService.getTodo(id).subscribe(res => {
    this.content = res;
    // = res;
  });
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





