import { Component, OnInit } from '@angular/core';
import {NavController} from '@ionic/angular';
import {TodoService} from "../services/todo.service";
import { AngularFireStorage} from "@angular/fire/storage";



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

  public imageProfile :any = [];

  constructor(private storage: AngularFireStorage,public chatservice : TodoService,public navCtrl: NavController) { }

  ngOnInit() {
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

  onUpload(e){
    const id = Math.random().toString(36).substring(2);
    const file = e.target.files[0];
    const filePath = 'upload/imagen';
    const ref = this.storage.ref(filePath);
    const task = this.storage.upload(filePath,file);
  }

  calendarButtonClicked() {
    this.navCtrl.navigateForward('/calendar');
  }
  settingsButtonClicked() {
    this.navCtrl.navigateForward('/settings');
  }
}

