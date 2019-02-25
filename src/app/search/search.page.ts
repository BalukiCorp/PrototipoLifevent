import { Component} from '@angular/core';
import { Router } from '@angular/router';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer/ngx';
import { File } from '@ionic-native/file/ngx';
import { NavController, LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
})
export class SearchPage  {
  myphoto:any;


 
  constructor( 
    private router:Router, public navCtrl: NavController, private camera: Camera, private transfer: FileTransfer, private file: File, private loadingCtrl:LoadingController)
  {}

  


  /*pushCateSegunda(){
    this.router.navigate(['/cate-party']);
  }
  */
}