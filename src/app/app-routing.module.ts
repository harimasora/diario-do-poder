import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { WalkthroughGuard } from './guards/walkthrough.guard';

const routes: Routes = [
	{ path: '', loadChildren: './tabs/tabs.module#TabsPageModule', canActivate: [WalkthroughGuard] },
	{ path: 'walkthrough', loadChildren: './walkthrough/walkthrough.module#WalkthroughPageModule' },
	{ path: 'news', loadChildren: './news/news.module#NewsPageModule' },
	{ path: 'home', loadChildren: './home/home.module#HomePageModule' },
  { path: 'bookmark', loadChildren: './bookmark/bookmark.module#BookmarkPageModule' },
  { path: 'search', loadChildren: './search/search.module#SearchPageModule' },
  { path: 'settings', loadChildren: './settings/settings.module#SettingsPageModule' },
];
@NgModule({
	imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
	exports: [RouterModule],
})
export class AppRoutingModule {}
