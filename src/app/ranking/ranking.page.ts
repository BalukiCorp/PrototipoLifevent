import { TodoService, Todo } from "../services/todo.service";
import { Component, OnInit, ViewChild} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer/ngx';
import { File } from '@ionic-native/file/ngx';
import { NavController, LoadingController } from '@ionic/angular';
import { Usuario } from '../models/evento.model';
import { ValueAccessor } from '@ionic/angular/dist/directives/control-value-accessors/value-accessor';
import { AngularFirestoreDocument, AngularFirestore } from "angularfire2/firestore";
import { firestore } from 'firebase/app'
import { UserService } from '../services/user.service'
import { post } from "selenium-webdriver/http";

@Component({
  selector: 'app-ranking',
  templateUrl: './ranking.page.html',
  styleUrls: ['./ranking.page.scss'],
})


export class RankingPage implements OnInit {


postID: string;
// tslint:disable-next-line: no-inferrable-types
effect: string = '';
post;
postReference: AngularFirestoreDocument;
sub;
// tslint:disable-next-line: no-inferrable-types
heartType: string = 'heart-empty';

mainuser: AngularFirestoreDocument;
userPosts;
posts;
username: string;
profilePic: string;

public usuarios: any = [];

  constructor(
    private route: ActivatedRoute, private user: UserService, private afs: AngularFirestore,
    public buscareventos: TodoService, public loadingController: LoadingController,
    private router: Router, public navCtrl: NavController,
    private camera: Camera, private transfer: FileTransfer,
    private file: File, private loadingCtrl: LoadingController) { 

      this.mainuser = afs.doc(`users/${user.getUID()}`)
		  this.sub = this.mainuser.valueChanges().subscribe(event => {
			  this.posts = event.posts;
			  this.username = event.username;
        	  this.profilePic = event.profilePic;
			})
}
    

  ngOnInit() {
		this.buscareventos.getPost().subscribe(chats => {
			chats.map(chat => {

			const data: Usuario = chat.payload.doc.data() as Usuario;
			data.id = chat.payload.doc.id;

			this.usuarios.push(data);
		}) 
	})
  }

  ngOnDestroy() {
		this.sub.unsubscribe()
	}

  goTo(postID: string) {

		this.router.navigate(['/tabs/post/' + postID.split('/')[0]])
  }
  

	toggleHeart() {
		if(this.heartType == 'heart-empty') {
			this.postReference.update({
				likes: firestore.FieldValue.arrayUnion(this.user.getUID())
			})
		} else {
			this.postReference.update({
				likes: firestore.FieldValue.arrayRemove(this.user.getUID())
			})
		}
	}


}







