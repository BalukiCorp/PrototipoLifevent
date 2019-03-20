import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { CateCulturaPage } from './cate-cultura.page';

const routes: Routes = [
  {
    path: '',
    component: CateCulturaPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [CateCulturaPage]
})
export class CateCulturaPageModule {}
