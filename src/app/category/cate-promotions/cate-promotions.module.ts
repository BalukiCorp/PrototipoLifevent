import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { CatePromotionsPage } from './cate-promotions.page';

const routes: Routes = [
  {
    path: '',
    component: CatePromotionsPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [CatePromotionsPage]
})
export class CatePromotionsPageModule {}
