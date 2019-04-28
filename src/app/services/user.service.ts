import { Injectable } from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import {Router} from '@angular/router';
import * as firebase from 'firebase/app';
//import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable, from } from 'rxjs';
import { map } from 'rxjs/operators';
import { Time } from '@angular/common';
import { IonDatetime } from '@ionic/angular';
import { DatetimeOptions } from '@ionic/core';
import {AngularFireStorage} from '@angular/fire/storage';
import {finalize} from 'rxjs/operators';
import { first } from 'rxjs/operators';
//import {AngularFireAuth} from "@angular/fire/auth"
import { promise } from 'protractor';
//import {Router} from "@angular/router"
import { auth } from 'firebase';
import { extendsDirectlyFromObject } from '@angular/core/src/render3/jit/directive';


interface Roles {
  admin: boolean,
  editor: boolean,
}

interface user {
	username: string,
  uid: string,
  email: string,
 // urlImage: string,
 
}



@Injectable({
  providedIn: 'root'
})
export class UserService {
  private user: user;
  constructor( private db: AngularFirestore, private afAuth: AngularFireAuth,
    private AFauth: AngularFireAuth, 
    private router: Router) { 

    
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
 
  //------------CRUD---------
  setUser(user: user) {
    this.user = user;    
	}

	getUsername(): string {
		return this.user.username
	}

	reAuth(username: string, password: string) {
		return this.afAuth.auth.currentUser.reauthenticateWithCredential(auth.EmailAuthProvider.credential(username , password))
	}

	updatePassword(newpassword: string) {
		return this.afAuth.auth.currentUser.updatePassword(newpassword)
	}

	updateEmail(newemail: string) {
		return this.afAuth.auth.currentUser.updateEmail(newemail)
	}

	async isAuthenticated() {
		if(this.user) return true

    const user = await this.afAuth.authState.pipe(first()).toPromise();
    
  

		if(user) {
			this.setUser({
				username: user.email.split('@')[0],
        uid: user.uid,
        email: user.email.split('@')[0],
    //    urlImage: user.photoURL,
			})

			return true
		}
		return false
	}

	getUID(): string {
		return this.user.uid
	}

  isAuth(){
    return this.afAuth.authState.pipe(map(auth=> auth));
  }









    

}
