import { Component, ViewChild } from '@angular/core';
import { Todo, TodoService } from '../services/todo.service';
import {NavController, NavParams, LoadingController, AlertController, IonInfiniteScroll} from '@ionic/angular';
import {UserService} from '../services/user.service';
import { AngularFireAuth } from '@angular/fire/auth';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  todos: Todo[];
  items: any[]=[];
@ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;
  constructor(public alertController: AlertController, public authservice: UserService,
     public navCtrl: NavController, private todoService: TodoService) { }
     Onlogout() {
      this.authservice.logout();
    }
  //Refrescar la pagina
  doRefresh(event) {
    setTimeout(() => {
      this.todoService.getTodos().subscribe(res => {
        this.todos = res;
      });
      event.target.complete();
     }, 1500);
  }
 data: any[]= this.todos;
  loadData(event){
  
     setTimeout(() => {
   
      if (this.todos.length > 5) {  
        this.todos.push();

        this.infiniteScroll.disabled= true;
        event.target.complete();     

      }
     }, 1000);
     
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
