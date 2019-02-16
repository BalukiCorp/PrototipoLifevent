import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import {finalize} from 'rxjs/operators';
import {Todo, TodoService} from './../services/todo.service';
import {pipe} from 'rxjs';
import {AngularFireStorage} from '@angular/fire/storage';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {NavController, NavParams, LoadingController} from '@ionic/angular';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import {ActivatedRoute} from 'node_modules/@angular/router';
import { getLocaleDateTimeFormat } from '@angular/common';
import {Observable} from 'rxjs';


@Component({
  selector: 'app-add-event',
  templateUrl: './add-event.page.html',
  styleUrls: ['./add-event.page.scss'],
})
export class AddEventPage implements OnInit {
   public textInput = document.querySelector("#imageUser");
   urlImage: Observable<string>;

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
    photoURL: '',
  };
  public orderForm:any;
  todoId = null;
  ; 
  
  constructor(private route: ActivatedRoute, private nav: NavController, private todoService: TodoService, private loadingController: LoadingController,
    private storage: AngularFireStorage, public formBuilder: FormBuilder) {

      this.orderForm = this.formBuilder.group({
        event_name: ['', Validators.required],
      manager_name: ['', Validators.required],
      category: ['', Validators.required],
      ubication: ['', Validators.required],
      date: ['', Validators.required],
      final_date: ['', Validators.required],
      hour: ['', Validators.required],
      final_hour: ['', Validators.required],
      description: ['', Validators.required],
      value: ['', Validators.required],
      
      });
      this.orderForm.reset()
     }
 
  ngOnInit() {
    this.todoId = this.route.snapshot.params['id'];
    if (this.todoId)  {
      this.loadTodo();
    }
  }
  uploadPercent: Observable<number>;
  @ViewChild('imageUser') inputImageUser: ElementRef;
 
  async loadTodo() {
    const loading = await this.loadingController.create({
      message: 'Loading Todo..'
    });
    await loading.present();
 
    this.todoService.getTodo(this.todoId).subscribe(res => {
      loading.dismiss();
      this.todo = res;
    });
  }
 
  async saveTodo() {
 
    const loading = await this.loadingController.create({
      message: 'Añadiendo evento..'
    });
    await loading.present();
 
    if (this.todoId) {
      this.todoService.updateTodo(this.todo, this.todoId).then(() => {
        let textInput = document.querySelector("#imageUser");

        loading.dismiss();
      //  this.nav.goBack('home');
      });
    } else {
      this.todoService.addTodo(this.todo).then(() => {
        loading.dismiss();
        
       // this.nav.goBack('home');
      });
    }
  }

  onUpload(e){
      console.log('subir', e);
   const id = Math.random().toString(36).substring(2);
   const file = e.target.files[0];
   const filePath = `event_image/event_${id}`;
   const ref = this.storage.ref(filePath);
   const task = this.storage.upload(filePath, file);
this.uploadPercent = task.percentageChanges();
task.snapshotChanges().pipe(finalize(()=>this.urlImage = ref.getDownloadURL())).subscribe();

}


}
