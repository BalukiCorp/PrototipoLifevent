import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { CateBusinesPage } from './cate-busines.page';

const routes: Routes = [
  {
    path: '',
    component: CateBusinesPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [CateBusinesPage]
})
export class CateBusinesPageModule {}
