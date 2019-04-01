import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'home',
        children: [
          {
            path: '',
            loadChildren: '../home/home.module#HomePageModule',
          },
        ],
      },
      {
        path: 'bookmark',
        children: [
          {
            path: '',
            loadChildren: '../bookmark/bookmark.module#BookmarkPageModule',
          },
        ],
      },
      {
        path: 'search',
        children: [
          {
            path: '',
            loadChildren: '../search/search.module#SearchPageModule',
          },
        ],
      },
      {
        path: 'settings',
        children: [
          {
            path: '',
            loadChildren: '../settings/settings.module#SettingsPageModule',
          },
        ],
      },
      {
        path: 'editorial',
        children: [
          {
            path: '',
            loadChildren: '../editorial/editorial.module#EditorialPageModule',
          },
        ],
      },
      {
        path: '',
        redirectTo: '/tabs/home',
        pathMatch: 'full',
      },
    ],
  },
  {
    path: '',
    redirectTo: '/tabs/home',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabsPageRoutingModule {}
