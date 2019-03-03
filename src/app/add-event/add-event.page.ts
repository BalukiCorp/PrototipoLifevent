import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import {finalize} from 'rxjs/operators';
import {Todo, TodoService} from './../services/todo.service';
import {pipe} from 'rxjs';
import {AngularFireStorage} from '@angular/fire/storage';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {NavController, NavParams, LoadingController,  ToastController} from '@ionic/angular';
//import {normalizeURL } from '@ionic/angular';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import {ActivatedRoute} from 'node_modules/@angular/router';
import { getLocaleDateTimeFormat } from '@angular/common';
import {Observable} from 'rxjs';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer/ngx';
import { File } from '@ionic-native/file/ngx';
import { WebView } from '@ionic-native/ionic-webview/ngx';
import { ImagePicker } from '@ionic-native/image-picker/ngx';
//import {FirebaseService} from '../services/firebase.service';
//import {AngularFireStorage} from '@angular/fire/storage';



@Component({
  selector: 'app-add-event',
  templateUrl: './add-event.page.html',
  styleUrls: ['./add-event.page.scss'],
})
export class AddEventPage implements OnInit {
   public textInput = document.querySelector("#imageUser");
   urlImage: Observable<string>;
   myphoto:any;
//imageRef = new FirebaseService(this.imageRef);
// DATOS QUE SE ALMACENAN EN FIREBASE
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
    urlImage:'',
  };
  public orderForm:any;
  formRegister: FormGroup;
  todoId = null;
  ; 
  
  constructor(public navCtrl: NavController, public toastCtrl: ToastController, public imagePicker: ImagePicker,     
        private webView: WebView, private route: ActivatedRoute,  private camera: Camera, private transfer: FileTransfer, private file: File, private nav: NavController, private todoService: TodoService, private loadingController: LoadingController,
 public formBuilder: FormBuilder, private storage: AngularFireStorage) {
// FORMULARIO DE VALIDACIÓN DE CAMPOS
      this.formRegister = this.formBuilder.group({
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
     photo: ['', Validators.required],
      });
    //  this.formRegister.reset()
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
 
  // GUARDAR DATOS EN CLOUD FIRESTORE
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
        this.navCtrl.navigateForward(['/tabs/home']);

       // this.nav.goBack('home');
      });
    }
  }
  @ViewChild('fileInp') fileInput: ElementRef;
/*
  onUpload(e){
    const options: CameraOptions = {
      quality: 70,
      destinationType: this.camera.DestinationType.DATA_URL,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      saveToPhotoAlbum:false
    }
  
    this.camera.getPicture(options).then((imageData) => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64:
      this.fileInput.nativeElement.click();

      this.myphoto = this.webView.convertFileSrc(imageData);
//this.myphoto = 'data:image/jpeg;base64,' + imageData;
  
}, (err) => {
      // Handle error
    });
      


}
*/
//this.urlImage
submit() {
  //this.formRegister.reset()
  //this.orderForm["event_name"].reset();
  //this.formRegister.reset()
  console.log(this.formRegister.value);
  
}
/*

getImage(e) {
  const options: CameraOptions = {
    quality: 70,
    destinationType: this.camera.DestinationType.DATA_URL,
    sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
    saveToPhotoAlbum:false
  }

  this.camera.getPicture(options).then((imageData) => {
    // imageData is either a base64 encoded string or a file URI
    // If it's base64:
   // this.myphoto = 'data:image/jpeg;base64,' + imageData;
   this.myphoto = this.webView.convertFileSrc(imageData);
   const id = Math.random().toString(36).substring(2);
   const file = e.target.files[0];
   const filePath = `event_image/event_${id}`;
   const ref = this.storage.ref(filePath);
   const task = this.storage.upload(filePath, file);
this.uploadPercent = task.percentageChanges();
task.snapshotChanges().pipe(finalize(()=>this.urlImage = ref.getDownloadURL())).subscribe();
  }, (err) => {
    // Handle error
  });
  this.urlImage = this.myphoto;
}


*/
// CARGA DE IMAGEN
getImage(e) {
  const options: CameraOptions = {
    quality: 70,
    destinationType: this.camera.DestinationType.DATA_URL,
    sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
    saveToPhotoAlbum:false
    
  }
  this.camera.getPicture(options).then((imageData) => {
    // imageData is either a base64 encoded string or a file URI
    // If it's base64:
   // this.myphoto = 'data:image/jpeg;base64,' + imageData;
   this.myphoto = this.webView.convertFileSrc(imageData);

  }, (err) => {
    // Handle error
  });
  const id = Math.random().toString(36).substring(2);
  const file = e.target.files[0];
  const filePath = `event_image/event_${id}`;
  const ref = this.storage.ref(filePath);
  const task = this.storage.upload(filePath, file);
this.uploadPercent = task.percentageChanges();
task.snapshotChanges().pipe(finalize(()=>this.urlImage = ref.getDownloadURL())).subscribe();
this.urlImage = this.myphoto;

}





/*
openImagePicker(e){
  this.imagePicker.hasReadPermission().then(
    (result) => {
      if(result == false){
        // no callbacks required as this opens a popup which returns async
        this.imagePicker.requestReadPermission();
      }
      else if(result == true){
        this.imagePicker.getPictures({
          maximumImagesCount: 1
        }).then(
          (results) => {
            for (var i = 0; i < results.length; i++) {
              this.uploadImageToFirebase(results[i]);
            }
          }, (err) => console.log(err)
        );
      }
    }, (err) => {
      console.log(err);
    });
    
}
imageRef:any;
uploadImageToFirebase(image){
  image = this.webView.convertFileSrc(image);
  //uploads img to firebase storage
  
  this.firebaseService.uploadImage(image)

  .then(photoURL => {
    let textInput = document.querySelector("#imageUser");
    this.imageRef = textInput.baseURI;
    let toast = this.toastCtrl.create({
      message: 'Image was updated successfully',
      duration: 3000
    });
    toast.catch();
    })
}




*/

}
