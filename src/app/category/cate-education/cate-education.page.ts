import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { TodoService } from '../../services/todo.service';
import { Usuario } from '../../models/evento.model';

@Component({
  selector: 'app-cate-education',
  templateUrl: './cate-education.page.html',
  styleUrls: ['./cate-education.page.scss'],
})
export class CateEducationPage implements OnInit {

  public usuarios: any = [];


  constructor(
    public alertController: AlertController,
    public buscareventos: TodoService) { }

  ngOnInit(){
    this.buscareventos.geteventos().subscribe(chats => {
    chats.map(chat => {

    const data: Usuario = chat.payload.doc.data() as Usuario;
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
