import { Injectable } from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import {Router} from '@angular/router';
import * as firebase from 'firebase/app';
//import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable, from } from 'rxjs';
import { map } from 'rxjs/operators';
import { Time } from '@angular/common';
import { IonDatetime } from '@ionic/angular';
import { DatetimeOptions } from '@ionic/core';
import {AngularFireStorage} from '@angular/fire/storage';
import {finalize} from 'rxjs/operators';

//import {AngularFireAuth} from "@angular/fire/auth"
import { promise } from 'protractor';
//import {Router} from "@angular/router"
import { auth } from 'firebase';

export interface userList {
  id?: string;
  name: string;
  lastName: string;
  username: string;
  email: string;
  password: string;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  
  private todosCollection: AngularFirestoreCollection<userList>;
  private userRegister: Observable<userList[]>;
  constructor( private db: AngularFirestore, 
    private AFauth: AngularFireAuth, 
    private router: Router) { 

    this.todosCollection = db.collection<userList>('userRegister');
    this.userRegister = this.todosCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data };
        });
      })
    );
  }
  login(email: string, password: string) {
    return new Promise((resolve, rejected) => {
      this.AFauth.auth.signInWithEmailAndPassword(email, password).then(user => {
        resolve(user);
      }).catch(err => rejected(err));
    });
  }
  logout() {
    this.AFauth.auth.signOut().then(() => {
      this.router.navigate(['/login']);
    });
  }
  userDetails() {
    return firebase.auth().currentUser;
  }
  registerUser(email: string, password: string) {
    return new Promise<any>((resolve, reject) => {
      firebase.auth().createUserWithEmailAndPassword(email, password).then(
          res => resolve(res), err => reject(err));
    });
  }

  //------------CRUD---------
  getUser() {
    return this.userRegister;
  }
  
  getUserOnly(id) {
    return this.todosCollection.doc<userList>(id).valueChanges();
  }
  updateUser(user: userList, id: string) {
    return this.todosCollection.doc(id).update(user);
  }
  addTodo(user: userList) {
    return this.todosCollection.add(user);
  }
  removeUser(id) {
    return this.todosCollection.doc(id).delete();
  }
}
