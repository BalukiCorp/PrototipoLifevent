import { NgModule } from '@angular/core';
import { PreloadAllModules, Routes, RouterModule } from '@angular/router';
import { AuthGuard} from "./guards/auth.guard";
import { NologinGuard} from "./guards/nologin.guard";
import { AuthService } from '../app/services/auth.service'

const routes: Routes = [
  {path: '', redirectTo: 'tabs', pathMatch: 'full'},
  { path: 'tabs', loadChildren: './tabs/tabs.module#TabsPageModule',canActivate: [AuthService] },
  { path: 'home', loadChildren: './home/home.module#HomePageModule', canActivate : [AuthGuard]},
  { path: 'search', loadChildren: './search/search.module#SearchPageModule', canActivate : [AuthGuard]},
  { path: 'calendar/:id', loadChildren: './calendar/calendar.module#CalendarPageModule' },
  { path: 'settings', loadChildren: './settings/settings.module#SettingsPageModule' },
  { path: 'idea', loadChildren: './cate-food/cate-food.module#CateFoodPageModule' },
  { path: 'cate-business', loadChildren: './cate-business/cate-business.module#CateBusinessPageModule' },
  { path: 'cate-arte/:id', loadChildren: './cate-arte/cate-arte.module#CateArtePageModule' },
  { path: 'login', loadChildren: './user/login/login.module#LoginPageModule', canActivate : [NologinGuard] },
  { path: 'register', loadChildren: './user/register/register.module#RegisterPageModule' },

  { path: 'cate-cultura', loadChildren: './category/cate-cultura/cate-cultura.module#CateCulturaPageModule' },
  { path: 'cate-technologies', loadChildren: './category/cate-technologies/cate-technologies.module#CateTechnologiesPageModule' },
  { path: 'cate-sports', loadChildren: './category/cate-sports/cate-sports.module#CateSportsPageModule' },
  { path: 'cate-promotions', loadChildren: './category/cate-promotions/cate-promotions.module#CatePromotionsPageModule' },
  { path: 'cate-party', loadChildren: './category/cate-party/cate-party.module#CatePartyPageModule' },
  { path: 'cate-festivals/:id', loadChildren: './category/cate-festivals/cate-festivals.module#CateFestivalsPageModule' },
  { path: 'cate-concert', loadChildren: './category/cate-concert/cate-concert.module#CateConcertPageModule' },
  { path: 'cate-education', loadChildren: './category/cate-education/cate-education.module#CateEducationPageModule' },
  { path: 'cate-foods', loadChildren: './category/cate-foods/cate-foods.module#CateFoodsPageModule' },
  { path: 'slide', loadChildren: './slide/slide.module#SlidePageModule' },



 




];

@NgModule({
  imports: [RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
