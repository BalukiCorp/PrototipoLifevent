import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { CateArtePage } from './cate-arte.page';
import { IonicRatingModule } from "ionic4-rating";

const routes: Routes = [
  {
    path: '',
    component: CateArtePage
  }
];

@NgModule({
  imports: [
    IonicRatingModule,
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [CateArtePage],
  exports: [
    CateArtePage
  ]
})
export class CateArtePageModule {}
