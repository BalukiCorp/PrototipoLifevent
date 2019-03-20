import { NgModule } from '@angular/core';
import { PreloadAllModules, Routes, RouterModule } from '@angular/router';
import {AuthGuard} from "./guards/auth.guard";
import {NologinGuard} from "./guards/nologin.guard";

const routes: Routes = [
  {path: '', redirectTo: '/login', pathMatch: 'full'},
  { path: '', loadChildren: './tabs/tabs.module#TabsPageModule' },
  { path: 'home', loadChildren: './home/home.module#HomePageModule', canActivate : [AuthGuard]},
  { path: 'search', loadChildren: './search/search.module#SearchPageModule', canActivate : [AuthGuard]},
  { path: 'calendar', loadChildren: './calendar/calendar.module#CalendarPageModule' },
  { path: 'settings', loadChildren: './settings/settings.module#SettingsPageModule' },
  { path: 'cate-party', loadChildren: './cate-party/cate-party.module#CatePartyPageModule' },
  { path: 'cate-concert', loadChildren: './cate-concert/cate-concert.module#CateConcertPageModule' },
  { path: 'idea', loadChildren: './cate-food/cate-food.module#CateFoodPageModule' },
  { path: 'cate-festivals', loadChildren: './cate-festivals/cate-festivals.module#CateFestivalsPageModule' },
  { path: 'cate-culture', loadChildren: './cate-culture/cate-culture.module#CateCulturePageModule' },
  { path: 'cate-education', loadChildren: './cate-education/cate-education.module#CateEducationPageModule' },
  { path: 'cate-business', loadChildren: './cate-business/cate-business.module#CateBusinessPageModule' },
  { path: 'cate-sports', loadChildren: './cate-sports/cate-sports.module#CateSportsPageModule' },
  { path: 'cate-arte/:id', loadChildren: './cate-arte/cate-arte.module#CateArtePageModule' },
  { path: 'cate-technologies', loadChildren: './cate-technologies/cate-technologies.module#CateTechnologiesPageModule' },
  { path: 'cate-promotions', loadChildren: './cate-promotions/cate-promotions.module#CatePromotionsPageModule' },
  { path: 'login', loadChildren: './user/login/login.module#LoginPageModule', canActivate : [NologinGuard] },  { path: 'register', loadChildren: './user/register/register.module#RegisterPageModule' },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
