import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { CateTechnologiesPage } from './cate-technologies.page';

const routes: Routes = [
  {
    path: '',
    component: CateTechnologiesPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [CateTechnologiesPage]
})
export class CateTechnologiesPageModule {}
