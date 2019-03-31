import { SignInComponent } from './../shared/sign-in/sign-in.component';
import { SignUpComponent } from './../shared/sign-up/sign-up.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { WalkthroughPage } from './walkthrough.page';
import { SharedModule } from '../shared/shared.module';

const routes: Routes = [
  { path: '', component: WalkthroughPage },
  { path: 'signUp', component: SignUpComponent },
  { path: 'signIn', component: SignInComponent },
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    RouterModule.forChild(routes),
  ],
  declarations: [WalkthroughPage],
})
export class WalkthroughPageModule {}
