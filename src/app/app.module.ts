import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
//import { ImageModalPageModule } from '';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import {AngularFireModule} from 'angularfire2';
import {environment} from '../environments/environment'; 
import {AngularFirestoreModule, FirestoreSettingsToken} from 'angularfire2/firestore';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import {AngularFireStorageModule} from '@angular/fire/storage';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import { Camera } from '@ionic-native/camera/ngx';
import { FileTransfer } from '@ionic-native/file-transfer/ngx';
import { File } from '@ionic-native/file/ngx';
import { WebView } from '@ionic-native/ionic-webview/ngx';
import { ImagePicker } from '@ionic-native/image-picker/ngx';
import {Geolocation} from '@ionic-native/geolocation/ngx';
import { LIBRARIES } from 'google-maps';
import { AgmDirectionModule } from 'agm-direction'; 
import {AgmCoreModule} from '@agm/core';
import {AngularFireAuthModule} from "@angular/fire/auth";



//import {FirebaseService} from '../app/services/firebase.service';
//import {IonicStorageModule} from '@ionic/storage';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [AgmDirectionModule, AgmCoreModule.forRoot({apiKey: "AIzaSyA_uVKWprjIgPURNhl1v9zzTPLQJIBdi6I",
  libraries: ["places"]}), HttpModule, BrowserModule, IonicModule.forRoot(), AppRoutingModule,
  AngularFireModule.initializeApp(environment.firebase), ReactiveFormsModule,
  AngularFirestoreModule, AngularFireStorageModule, HttpClientModule, AngularFireAuthModule],
  providers: [
    Camera,
    WebView,
    File,
    //FirebaseService,
    ImagePicker,
    FileTransfer,
    StatusBar,
    SplashScreen,
    File,
    Geolocation,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    {provide: FirestoreSettingsToken, useValue: {}}
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
