import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { WalkthroughGuard } from './guards/walkthrough.guard';

const routes: Routes = [
  {
    path: '',
    loadChildren: './tabs/tabs.module#TabsPageModule',
    canActivate: [WalkthroughGuard],
  },
  {
    path: 'walkthrough',
    loadChildren: './walkthrough/walkthrough.module#WalkthroughPageModule',
  },
  { path: 'editorial', loadChildren: './editorial/editorial.module#EditorialPageModule' },
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
