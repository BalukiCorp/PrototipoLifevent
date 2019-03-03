import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import {ReactiveFormsModule} from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CateFoodPage } from './cate-food.page';

const routes: Routes = [
  {
    path: '',
    component: CateFoodPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [CateFoodPage]
})
export class CateFoodPageModule {}
