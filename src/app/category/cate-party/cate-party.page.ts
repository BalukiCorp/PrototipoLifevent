import { Component, OnInit } from '@angular/core';
import { Todo, TodoService } from '../../services/todo.service';
import { Usuario } from 'src/app/models/evento.model';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-cate-party',
  templateUrl: './cate-party.page.html',
  styleUrls: ['./cate-party.page.scss'],
})
export class CatePartyPage implements OnInit {

  public usuarios : any = [];

  constructor(
    public alertController: AlertController,
    public buscareventos: TodoService,private todoService: TodoService) { }

// ;Refrescar la pagina

  doRefresh(event) {
    console.log('Begin async operation');

    setTimeout(() => {
      console.log('Async operation has ended');
      event.target.complete();
    }, 2000);
  }

  ngOnInit(){
    this.buscareventos.geteventos().subscribe(chats => {
    chats.map(chat => {

    const data : Usuario = chat.payload.doc.data() as Usuario;
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
