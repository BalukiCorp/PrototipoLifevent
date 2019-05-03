import { Component, OnInit, ViewChild} from '@angular/core';
import { Router } from '@angular/router';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer/ngx';
import { File } from '@ionic-native/file/ngx';
import { NavController, LoadingController } from '@ionic/angular';
import { TodoService, Todo } from "../services/todo.service";
import { Usuario } from '../models/evento.model';
import { ValueAccessor } from '@ionic/angular/dist/directives/control-value-accessors/value-accessor';


@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
})
export class SearchPage {

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

  public usuarios : any = [];
  
  textoBuscar = '';


  constructor(public buscareventos: TodoService,public loadingController: LoadingController,
    private router:Router, public navCtrl: NavController, 
    private camera: Camera, private transfer: FileTransfer, 
    private file: File, private loadingCtrl:LoadingController,){
   
  }


  async presentLoading() {
    const loading = await this.loadingController.create({
      duration: 2000
    });
  
    await loading.present();

    const { role, data } = await loading.onDidDismiss();

    console.log('Loading dismissed!');

  }

  ngOnInit(){
        this.buscareventos.geteventos().subscribe(chats => {
        chats.map(chat => {
        
        const data : Usuario = chat.payload.doc.data() as Usuario
        data.id = chat.payload.doc.id;

        this.usuarios.push(data);

      })
    })
  }


  buscarEvento( event){

    const texto = event.target.value;
    this.textoBuscar = texto;
  }



  /*pushCateSegunda(){
    this.router.navigate(['/cate-party']);
  }
  */
}