import { Component, OnInit, ViewChild  } from '@angular/core';
import {NavController, MenuController} from '@ionic/angular';
import { TodoService} from "../services/todo.service";
import { UserService, User} from "../services/user.service";
import { AngularFireStorage} from "@angular/fire/storage";
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { WebView } from '@ionic-native/ionic-webview/ngx';
import {AngularFireAuth} from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore'
import { Http } from '@angular/http';
import { Router } from '@angular/router';
import { firestore } from 'firebase/app'
import { ActivatedRoute } from '@angular/router';
import { Componente } from '../Interfaces/menu';


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
export class ProfilePage  {


  componentes: Componente[] = [];

  //Variables de GetPost//
  postID: string
	effect: string = ''
  post
  sub2
	postReference: AngularFirestoreDocument
	

  heartType: string = "heart-empty"
  //-------------------//

  userInfos={
    name:"",
    photo:"",
    email:"",
    loggedIn:false
  }
  
  user2: User = {
  username: '',
  uid: '',
  
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


  @ViewChild('fileBtn') fileBtn: {
		nativeElement: HTMLInputElement
  }
  
  constructor(
    private menuCtrl: MenuController,
    private route: ActivatedRoute, 
    private http: Http, private router: Router, 
    private authService: UserService, public afs: AngularFirestore, 
    private user: UserService,
    private camera: Camera,private storage: AngularFireStorage,public chatservice : TodoService,public navCtrl: NavController) { 

      this.mainuser = this.afs.doc(`users/${user.getUID()}`)
      this.sub = this.mainuser.valueChanges().subscribe(event => {
        this.posts = event.posts;
        this.username = event.username;
        this.profilePic = event.profilePic;
        this.email = event.email;
        console.log(this.posts);
      });
    }

    public providerId: string = 'null';

  

  ngOnInit(event) {
    console.log(event);
  }

  segmentChanged() {

  }

  ngOnDestroy() {
    this.sub.unsubscribe()
  }

  toggleMenu(){
    this.menuCtrl.toggle();
  }

  /*onUpload(e){
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
  }*/

  updateProfilePic() {
		this.fileBtn.nativeElement.click()
	}

  uploadPic(event) {
		const files = event.target.files

		const data = new FormData()
		data.append('file', files[0])
		data.append('UPLOADCARE_STORE', '1')
		data.append('UPLOADCARE_PUB_KEY', 'ada5e3cb2da06dee6d82')
		
		this.http.post('https://upload.uploadcare.com/base/', data)
		.subscribe(event => {
			const uuid = event.json().file
			this.mainuser.update({
				profilePic: uuid
			})
		})
  }

  goTo(postID: string) {

		this.navCtrl.navigateForward(['/tabs/post/' + postID.split('/')[0]])
	}
  
  
  calendarButtonClicked() {
    this.navCtrl.navigateForward('/calendar');
  }
  settingsButtonClicked() {
    this.navCtrl.navigateForward('/settings');
  }

}

