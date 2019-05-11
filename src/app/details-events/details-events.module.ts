import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { DetailsEventsPage } from './details-events.page';
import { IonicRatingModule } from "ionic4-rating";

const routes: Routes = [
  {
    path: '',
    component: DetailsEventsPage
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
  declarations: [DetailsEventsPage],
  exports: [
    DetailsEventsPage
  ]
})
export class DetailsEventsPageModule {}
