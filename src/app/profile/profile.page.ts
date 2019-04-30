import { Component, OnInit } from '@angular/core';
import {NavController} from '@ionic/angular';
import {TodoService} from "../services/todo.service";
import {UserService, User} from "../services/user.service";
import { AngularFireStorage} from "@angular/fire/storage";
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { WebView } from '@ionic-native/ionic-webview/ngx';
import {AngularFireAuth} from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore'
//import { User } from 'firebase';


interface image {
  id: string;
  img : string;
}


@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  user2: User = {
  username: '',
  uid: '',
  email: '',
    
  };
  mainuser: AngularFirestoreDocument
	userPosts
	sub
  posts
  email: string;
	username: string
	profilePic: string
  public imageProfile :any = [];
  myphoto:any; 
  public userUid: string = null;
  constructor(private authService: UserService, private afs: AngularFirestore, private user: UserService,
    private webView: WebView,private camera: Camera,private storage: AngularFireStorage,public chatservice : TodoService,public navCtrl: NavController) { 
     /* this.mainuser = afs.doc(`users/${user.getUID()}`)
      this.sub = this.mainuser.valueChanges().subscribe(event => {
        this.posts = event.posts
        this.username = event.username
        this.profilePic = event.profilePic
      })
*/
    }
    public providerId: string = 'null';

  ngOnInit() {
    this.authService.isAuth().subscribe(user => {
      if (user) {
        this.user2.username = user.displayName;
        this.user2.email = user.email;
        //this.user2.photoUrl = user.photoURL;
        this.providerId = user.providerData[0].providerId;
      }
    })
   /* this.authservice.isAuth().subscribe(user=>{
      if(user){
        this.user2.name = user.displayName;
        this.user2.email = user.email;
        this.user2.userId = user.uid;
        console.log('USER', user);
        console.log(this.user2.email);
        console.log(this.user2.userId);
        this.providerId = user.providerData[0].providerId;
        console.log(this.providerId);
        
      }
   });

*/
    this.chatservice.getImageProfile().subscribe( images => {
      images.map( image => {
        
        const data : image = image.payload.doc.data() as image;
        data.id = image.payload.doc.id;
        
        this.imageProfile.push(data);

      })
    })  
  }

  emailUser(){
    
  }

  ngOnDestroy() {
		this.sub.unsubscribe()
	}

  onUpload(e){
    const id = Math.random().toString(36).substring(2);
    const file = e.target.files[0];
    const filePath = 'upload/imagen';
    const ref = this.storage.ref(filePath);
    const task = this.storage.upload(filePath,file);

    const options: CameraOptions = {
      quality: 70,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
     // mediaType: this.camera.MediaType.PICTURE,
  
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      saveToPhotoAlbum:true
      
    }
    this.camera.getPicture(options).then((imageData) => {
        this.myphoto = this.webView.convertFileSrc(imageData);
    }, (err) => {
    });
  }

  calendarButtonClicked() {
    this.navCtrl.navigateForward('/calendar');
  }
  settingsButtonClicked() {
    this.navCtrl.navigateForward('/settings');
  }
}

