import { ReaderComponent } from './../shared/reader/reader.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { SearchPage } from './search.page';
import { SharedModule } from '../shared/shared.module';

const routes: Routes = [
  { path: '', component: SearchPage },
  { path: 'reader', component: ReaderComponent },
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    RouterModule.forChild(routes),
  ],
  declarations: [SearchPage],
})
export class SearchPageModule {}
