import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { TabsPage } from './tabs.page';
import {AuthGuard} from "../guards/auth.guard";

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'home',
        loadChildren: '../home/home.module#HomePageModule',canActivate : [AuthGuard]
      },
      {
        path: 'search',
        loadChildren: '../search/search.module#SearchPageModule',canActivate : [AuthGuard]
      },
      {
        path: 'profile',
        loadChildren: '../profile/profile.module#ProfilePageModule',canActivate : [AuthGuard]
      },
      {
        path: 'ranking',
        loadChildren: '../ranking/ranking.module#RankingPageModule',canActivate : [AuthGuard]
      },
      {
        path: 'add-event',
        loadChildren: '../add-event/add-event.module#AddEventPageModule'
      },
      {
        path: 'calendar',
        loadChildren: '../calendar/calendar.module#CalendarPageModule'
      },
      {
        path: 'settings',
        loadChildren: '../settings/settings.module#SettingsPageModule'
      }
    ]
  },
  {
   path: '',
   redirectTo: '/tabs/home',
   pathMatch: 'full'
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
  ],
  declarations: [TabsPage]
})
export class TabsPageModule {}
