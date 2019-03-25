import { Component } from '@angular/core';
import { Todo, TodoService } from '../services/todo.service';
import {NavController, NavParams, LoadingController, AlertController} from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  todos: Todo[];
 
  constructor(public alertController: AlertController,
     public navCtrl: NavController, private todoService: TodoService) { }

  //Refrescar la pagina
  doRefresh(event) {
    console.log('Begin async operation');

    setTimeout(() => {
      console.log('Async operation has ended');
      event.target.complete();
    }, 2000);
  }
 
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


/*removEvent(item) {
  // if(this.todoService)
   this.todoService.removeTodo(item.id);
 }
*/
 async removEvent(item) {
  const alert = await this.alertController.create({
    header: '¿Deseas eliminar el evento?',
    buttons: [
      {
        text: 'No',
        role: 'cancel',
        cssClass: 'secondary',
        handler: (blah) => {
          console.log('Confirm Cancel: blah');
        }
      }, {
        text: 'Si',
        handler: () => {
          console.log('Confirm Okay');
          this.todoService.removeTodo(item.id);

        }
      }
    ]
  });

  await alert.present();
}
 
async editEvent(item) {
  const alert = await this.alertController.create({
    header: '¿Deseas editar el evento?',
    buttons: [
      {
        text: 'No',
        role: 'cancel',
        cssClass: 'secondary',
        handler: (blah) => {
          console.log('Confirm Cancel: blah');
        }
      }, {
        text: 'Si',
        handler: () => {
          console.log('Confirm Okay');
          this.navCtrl.navigateForward(['cate-arte/:id']);


        }
      }
    ]
  });

  await alert.present();
}





}
