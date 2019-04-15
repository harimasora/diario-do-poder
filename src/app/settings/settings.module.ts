import { LoginGuard } from './../guards/login.guard';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { SettingsPage } from './settings.page';
import { CategoryPickerComponent } from '../shared/category-picker/category-picker.component';
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
