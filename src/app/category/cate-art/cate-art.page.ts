import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Todo, TodoService } from '../../services/todo.service';
import { NavController, NavParams, AlertController } from '@ionic/angular';
import {ActivatedRoute} from '@angular/router';

import { Usuario } from 'src/app/models/evento.model';


@Component({
  selector: 'app-cate-art',
  templateUrl: './cate-art.page.html',
  styleUrls: ['./cate-art.page.scss'],
})
export class CateArtPage implements OnInit {

  public usuarios : any = [];
  
  constructor(
    public alertController: AlertController,
    public buscareventos: TodoService) {
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

    async removEvent(usario) {
      const alert = await this.alertController.create({
        header: '¿Deseas eliminar el evento?',
        buttons: [
          {
            text: 'No',
            role: 'cancel',
            cssClass: 'secondary',
            handler: (blah) => {
              console.log('Confirm Cancel: blah');
            }
          }, {
            text: 'Si',
            handler: () => {
              console.log('Confirm Okay');
              this.buscareventos.removeTodo(usario.id);
            }
          }
        ]
      });
  
      await alert.present();
    }

}
