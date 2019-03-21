import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import {AgmCoreModule} from '@agm/core';

import { IonicModule } from '@ionic/angular';
import {ReactiveFormsModule} from '@angular/forms';
import { CateBusinessPage } from './cate-business.page';

const routes: Routes = [
  {
    path: '',
    component: CateBusinessPage
  }
];

@NgModule({
  imports: [
    AgmCoreModule,
    ReactiveFormsModule,
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [CateBusinessPage]
})
export class CateBusinessPageModule {}
