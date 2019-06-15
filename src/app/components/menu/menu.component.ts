import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { TodoService } from '../../services/todo.service';
import { Componente } from 'src/app/Interfaces/menu';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {

  componentes: Observable<Componente[]>;

  constructor(
    public authservice: UserService,
    private dataService: TodoService) { }

  ngOnInit() {
    this.componentes = this.dataService.getMenuOpts();
  }

  Onlogout() {
    this.authservice.logout();
  }

}
