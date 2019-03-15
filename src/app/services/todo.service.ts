import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Time } from '@angular/common';
import { IonDatetime } from '@ionic/angular';
import { DatetimeOptions } from '@ionic/core';
import {AngularFireStorage} from '@angular/fire/storage';
import {finalize} from 'rxjs/operators';


export interface Todo {
  id?: string;
  event_name: string;
  manager_name: string;
  category: string;
  hour: string;
  ubication: string;
  date: string;
  description: string;
  final_date: string;
  final_hour: string;
  value: string;
  urlImage:string;
}
 
@Injectable({
  providedIn: 'root'
})
export class TodoService {
  uploadPercent: Observable<number>;

  private todosCollection: AngularFirestoreCollection<Todo>;
 
  private event_register: Observable<Todo[]>;
 
  constructor(db: AngularFirestore, private storage: AngularFireStorage) {
    this.todosCollection = db.collection<Todo>('event_register');
 
    this.event_register = this.todosCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data };
        });
      })
    );
  }
 
  getTodos() {
    return this.event_register;
  }
 
  getTodosTechnology(id){
    return this.event_register;
  }

  getTodo(id) {
    return this.todosCollection.doc<Todo>(id).valueChanges();
  }
 
  updateTodo(todo: Todo, id: string) {
    return this.todosCollection.doc(id).update(todo);
  }
 
  addTodo(todo: Todo) {
    return this.todosCollection.add(todo);
  }
 
  removeTodo(id) {
    return this.todosCollection.doc(id).delete();
  }

 
}