import { NgModule } from '@angular/core';
import { PreloadAllModules, Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', loadChildren: './tabs/tabs.module#TabsPageModule' },
  { path: 'calendar', loadChildren: './calendar/calendar.module#CalendarPageModule' },
  { path: 'settings', loadChildren: './settings/settings.module#SettingsPageModule' },  { path: 'cate-party', loadChildren: './cate-party/cate-party.module#CatePartyPageModule' },
  { path: 'cate-concert', loadChildren: './cate-concert/cate-concert.module#CateConcertPageModule' },
  { path: 'cate-food', loadChildren: './cate-food/cate-food.module#CateFoodPageModule' },
  { path: 'cate-festivals', loadChildren: './cate-festivals/cate-festivals.module#CateFestivalsPageModule' },
  { path: 'cate-culture', loadChildren: './cate-culture/cate-culture.module#CateCulturePageModule' },
  { path: 'cate-education', loadChildren: './cate-education/cate-education.module#CateEducationPageModule' },
  { path: 'cate-business', loadChildren: './cate-business/cate-business.module#CateBusinessPageModule' },
  { path: 'cate-sports', loadChildren: './cate-sports/cate-sports.module#CateSportsPageModule' },
  { path: 'cate-arte', loadChildren: './cate-arte/cate-arte.module#CateArtePageModule' },
  { path: 'cate-technologies', loadChildren: './cate-technologies/cate-technologies.module#CateTechnologiesPageModule' },
  { path: 'cate-promotions', loadChildren: './cate-promotions/cate-promotions.module#CatePromotionsPageModule' },

//{path: ''}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
