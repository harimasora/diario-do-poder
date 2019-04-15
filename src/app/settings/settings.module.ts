import { LoginGuard } from './../guards/login.guard';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { SettingsPage } from './settings.page';
import { CategoryPickerComponent } from '../shared/category-picker/category-picker.component';
import { TermsOfUseComponent } from './../shared/terms-of-use/terms-of-use.component';
import { PrivacyPolicyComponent } from './../shared/privacy-policy/privacy-policy.component';
import { SharedModule } from '../shared/shared.module';

const routes: Routes = [
  {
    path: '',
    component: SettingsPage,
  },
  {
    path: 'category-picker',
    component: CategoryPickerComponent,
    canActivate: [LoginGuard],
  },
  {
    path: 'terms-of-use',
    component: TermsOfUseComponent,
  },
  {
    path: 'privacy-policy',
    component: PrivacyPolicyComponent,
  },
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    RouterModule.forChild(routes),
  ],
  declarations: [SettingsPage],
})
export class SettingsPageModule {}
