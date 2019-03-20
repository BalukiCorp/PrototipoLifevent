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


  categorias = [
    {
      navegation: '/cate-party',
      imagen: '../../assets/img/nuevafiesta.jpg',
      nombre: 'Fiestas',
    },
    {
      navegation: '/cate-concert',
      imagen: '../../assets/img/conciertos.jpg',
      nombre: 'Conciertos',
    },
    {
      navegation: '/cate-foods',
      imagen: '../../assets/img/gastronomia.jpg',
      nombre: 'Comida',
    },
    {
      navegation: '/cate-festivals',
      imagen: '../../assets/img/fiestas.jpg',
      nombre: 'Festivales',
    },
    {
      navegation: '/cate-cultura',
      imagen: '../../assets/img/cultura.jpg',
      nombre: 'Cultura',
    },
    {
      navegation: '/cate-educatione',
      imagen: '../../assets/img/educacion.jpg',
      nombre: 'Educacion',
    },
    {
      navegation: '/cate-business',
      imagen: '../../assets/img/empresarial.jpg',
      nombre: 'Empresarial',
    },
    {
      navegation: '/cate-sports',
      imagen: '../../assets/img/deportes.jpg',
      nombre: 'Deportes',
    },
    {
      navegation: '/cate-arte',
      imagen: '../../assets/img/arte.jpg',
      nombre: 'Arte',
    },
    {
      navegation: '/cate-technologies',
      imagen: '../../assets/img/tecnologia.jpg',
      nombre: 'Tecnologia',
    },
  ]

 
  constructor( 
    private router:Router, public navCtrl: NavController, private camera: Camera, private transfer: FileTransfer, private file: File, private loadingCtrl:LoadingController)
  {}

  


  /*pushCateSegunda(){
    this.router.navigate(['/cate-party']);
  }
  */
}