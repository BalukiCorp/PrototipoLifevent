import { Component, OnInit } from '@angular/core';
import { Todo, TodoService } from '../../services/todo.service';

@Component({
  selector: 'app-cate-party',
  templateUrl: './cate-party.page.html',
  styleUrls: ['./cate-party.page.scss'],
})
export class CatePartyPage implements OnInit {

  constructor(private todoService: TodoService) { }

 //Refrescar la pagina
 doRefresh(event) {
   console.log('Begin async operation');

   setTimeout(() => {
     console.log('Async operation has ended');
     event.target.complete();
   }, 2000);
 }

  ngOnInit() {
  }

}
