import { Component, OnInit, ViewChild, ElementRef, NgZone } from '@angular/core';
import {finalize} from 'rxjs/operators';
import {Todo, TodoService} from './../services/todo.service';
import {pipe} from 'rxjs';
import {AngularFireStorage} from '@angular/fire/storage';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActionSheetController, NavController, NavParams, LoadingController,  ToastController} from '@ionic/angular';
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
import {Geolocation} from '@ionic-native/geolocation/ngx';
import { load } from '@angular/core/src/render3';
import {
  GoogleMaps,
  GoogleMap,
  Geocoder,
  BaseArrayClass,
  GeocoderResult,
  Marker
} from '@ionic-native/google-maps';
import {} from 'googlemaps';
import { Platform } from '@ionic/angular';

declare var google;


@Component({
  selector: 'app-cate-food',
  templateUrl: './cate-food.page.html',
  styleUrls: ['./cate-food.page.scss'],
})
export class CateFoodPage implements OnInit {
  map1: GoogleMap;
  map2: GoogleMap;
  loading: any;
  @ViewChild('search_address') search_address: ElementRef;
  mapRef = null;

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
   urlImage: '',
 //  imageRef:'',
 };

 public orderForm:any;
 formRegister: FormGroup;
 todoId = null;
  constructor(
    private actionSheetController: ActionSheetController, public navCtrl: NavController, public toastCtrl: ToastController, public imagePicker: ImagePicker,    
    private webView: WebView, private route: ActivatedRoute,  private camera: Camera, private transfer: FileTransfer, private file: File, private nav: NavController, private todoService: TodoService, private loadingController: LoadingController,
    public formBuilder: FormBuilder, private storage: AngularFireStorage, 
    private geolocation: Geolocation,
    private loadingCtrl: LoadingController) {
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
 urlImage: ['', Validators.required],
  });
 }

 async ngOnInit() {

    this.loadMap();
    await this.loadMap1();

    this.todoId = this.route.snapshot.params['id'];
    if (this.todoId)  {
      this.loadTodo();
    }

    
  }
//----------------carga de mapa geocoder------------
  loadMap1() {
    console.log(this.search_address);
    (this.search_address as any).value = '1600 Amphitheatre Parkway, Mountain View, CA 94043, United States';
    this.map1 = GoogleMaps.create('map_canvas1');
  }

//---------------EVENTO DE BÚSQUEDA EN EL MAPA-----------  
  async onButton1_click(event) {
    this.loading = await this.loadingCtrl.create({
      message: 'Please wait...'
    });
    await this.loading.present();
    this.map1.clear();

    // Address -> latitude,longitude
    Geocoder.geocode({
      "address": (this.search_address as any).value
    })
    .then((results: GeocoderResult[]) => {
      //console.log(results);
      this.loading.dismiss();

      if (results.length > 0) {
        let marker: Marker = this.map1.addMarkerSync({
          'position': results[0].position,
          'title':  JSON.stringify(results[0].position)
        });
        this.map1.animateCamera({
          'target': marker.getPosition(),
          'zoom': 17
        });

        marker.showInfoWindow();
      } else {
        alert("Not found");
      }
    });
  }

  //Agregar Google Maps -------------------------------------

  async loadMap() {
    const loading = await this.loadingCtrl.create();
    loading.present();
    const myLatLng = await this.getLocation();
    const mapEle: HTMLElement = document.getElementById('map');
    this.mapRef = new google.maps.Map(mapEle, {
      center: myLatLng,
      zoom: 12
    });
    google.maps.event
    .addListenerOnce(this.mapRef, 'idle', () => {
      loading.dismiss();
      this.addMarket(myLatLng.lat, myLatLng.lng);
    });
  }


  private addMarket(lat: number, lng: number){
    const marker = new google.maps.Marker({
      position: {
        lat: lat,
        lng: lng
      },
      map: this.mapRef,
      tittle: 'Hello World!'
    });
  }

  private async getLocation(){
    const rta = await this.geolocation.getCurrentPosition();
    return {
      lat: rta.coords.latitude,
      lng: rta.coords.longitude
    };
  }

//---------------------------------------------------------


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
        console.log(this.formRegister.value);

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
 // this.formRegister.reset();
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
    encodingType: this.camera.EncodingType.JPEG,
   // mediaType: this.camera.MediaType.PICTURE,

    sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
    saveToPhotoAlbum:true
    
  }
  this.camera.getPicture(options).then((imageData) => {
  //  for (var i = 0; i < imageData.length; i++) {
      this.myphoto = this.webView.convertFileSrc(imageData);

    //}
    // imageData is either a base64 encoded string or a file URI
    // If it's base64:
   // this.myphoto = 'data:image/jpeg;base64,' + imageData;
 
  }, (err) => {
    // Handle error
  });
  
  const id = Math.random().toString(36).substring(2);
  const file = e.target.files[0];
  const filePath = `event_image/event_${id}`;
  const ref = this.storage.ref(filePath);
  const task = this.storage.upload(filePath, file);
this.uploadPercent = task.percentageChanges();
//if(this.inputImageUser.nativeElement)
task.snapshotChanges().pipe(finalize(()=>this.urlImage = ref.getDownloadURL())).subscribe();
//this.urlImage = this.myphoto;

  // if(this.todoService)
//this.todoService.addTodo(e.urlImage);
 
}



}
