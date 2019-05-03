import { Component} from '@angular/core';
import { Router} from "@angular/router";

@Component({
  selector: 'app-slide',
  templateUrl: './slide.page.html',
  styleUrls: ['./slide.page.scss'],
})
export class SlidePage {

  slides = [
    {
      img: '../../assets/img/mujer.svg',
      titulo: 'Los mejores evento <br> de todo el Mundo'
    },
    {
      img: '../../assets/img/pastel.svg',
      titulo: 'Con las mejores<br> fiestas'
    },
    {
      img: '../../assets/img/dinero.svg',
      titulo: 'Invierte tu <br> dinero'
    }
  ]

  constructor(
    public router: Router,) 
  { }
  

  login(){
    this.router.navigate(['/login'])
  }

  signin(){
    this.router.navigate(['/register'])
  }

}
