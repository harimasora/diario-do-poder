import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { EditorialPage } from './editorial.page';
import { SharedModule } from '../shared/shared.module';
import { ReaderComponent } from '../shared/reader/reader.component';

const routes: Routes = [
  {
    path: '',
    component: EditorialPage,
  },
  {
    path: ':id',
    component: EditorialPage,
  },
  {
    path: ':id/reader',
    component: ReaderComponent,
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
  declarations: [EditorialPage],
})
export class EditorialPageModule {}
