import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/models/evento.model';
import { TodoService } from 'src/app/services/todo.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-cate-technologies',
  templateUrl: './cate-technologies.page.html',
  styleUrls: ['./cate-technologies.page.scss'],
})
export class CateTechnologiesPage implements OnInit {

  public usuarios : any = [];

  constructor(
    public alertController: AlertController,
    public buscareventos: TodoService) { }

  ngOnInit(){
    this.buscareventos.geteventos().subscribe(chats => {
    chats.map(chat => {
    
    const data : Usuario = chat.payload.doc.data() as Usuario
    data.id = chat.payload.doc.id;

    this.usuarios.push(data);

      });
    });
  }

  async removEvent(usuario) {
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
            this.buscareventos.removeTodo(usuario.id);
  
          }
        }
      ]
    });
  
    await alert.present();
  }

}
