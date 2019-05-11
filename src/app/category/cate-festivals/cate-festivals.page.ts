import { Component, OnInit } from '@angular/core';
import {Todo, TodoService} from '../../services/todo.service';
import {ActionSheetController, NavController, NavParams, LoadingController,  ToastController} from '@ionic/angular';
import {ActivatedRoute} from 'node_modules/@angular/router';

@Component({
  selector: 'app-cate-festivals',
  templateUrl: './cate-festivals.page.html',
  styleUrls: ['./cate-festivals.page.scss'],
})
export class CateFestivalsPage implements OnInit {
  todo: Todo = {
    event_name: '',
    manager_name: '',
    category: '',
    hour: '',
    ubication: '',
    date: '', 
    description: '',
    final_date: '',
    final_hour: '',
    value: '',
    urlImage: '',
  //  imageRef:'',
  };

  public orderForm: any;
  todoId = null;


  constructor(
    private route: ActivatedRoute, private actionSheetController: ActionSheetController,
    public navCtrl: NavController, public toastCtrl: ToastController,
    private todoService: TodoService, private loadingController: LoadingController,
    private loadingCtrl: LoadingController) { }

  ngOnInit() {
    this.todoId = this.route.snapshot.params['id'];
    if (this.todoId)  {
      this.loadTodo();
    }
  }

/***********************CARGA DE DATOS/LOAD****************** */

  async loadTodo() {
    const loading = await this.loadingController.create({
      message: 'Loading..'
    });
    await loading.present();
 
    this.todoService.getTodo(this.todoId).subscribe(res => {
      loading.dismiss();
      this.todo = res;
    });
  }

/*******  GUARDAR DATOS EN CLOUD FIRESTORE ****************/
async saveTodo() {

  const loading = await this.loadingController.create({
    message: 'Actualizando evento..'
  });
  await loading.present();

  if (this.todoId) {
    this.todoService.updateTodo(this.todo, this.todoId).then(() => {
      loading.dismiss();
      this.navCtrl.navigateForward(['/tabs/home']);
    });
  } else {
    console.log('entro aqui');
  }
}
}
