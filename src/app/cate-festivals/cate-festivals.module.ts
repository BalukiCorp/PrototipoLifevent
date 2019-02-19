import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { CateFestivalsPage } from './cate-festivals.page';

const routes: Routes = [
  {
    path: '',
    component: CateFestivalsPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [CateFestivalsPage]
})
export class CateFestivalsPageModule {}
