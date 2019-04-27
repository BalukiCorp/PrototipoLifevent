import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/models/evento.model';
import { TodoService } from 'src/app/services/todo.service';

@Component({
  selector: 'app-cate-technologies',
  templateUrl: './cate-technologies.page.html',
  styleUrls: ['./cate-technologies.page.scss'],
})
export class CateTechnologiesPage implements OnInit {

  public usuarios : any = [];

  constructor(public buscareventos: TodoService) { }

  ngOnInit(){
    this.buscareventos.geteventos().subscribe(chats => {
    chats.map(chat => {
    
    const data : Usuario = chat.payload.doc.data() as Usuario
    data.id = chat.payload.doc.id;

    this.usuarios.push(data);

  })
})

}

}
