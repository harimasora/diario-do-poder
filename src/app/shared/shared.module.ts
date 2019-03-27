import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { HeaderComponent } from './header/header.component';
import { NewsComponent } from './news/news.component';
import { RouterModule } from '@angular/router';
import { ReaderComponent } from './reader/reader.component';
import { NewsChComponent } from './news-ch/news-ch.component';

@NgModule({
  declarations: [
    ProfileComponent,
    LoginComponent,
    HeaderComponent,
    NewsComponent,
    ReaderComponent,
    NewsChComponent,
  ],
  imports: [CommonModule, IonicModule, RouterModule],
  exports: [
    ProfileComponent,
    LoginComponent,
    HeaderComponent,
    NewsComponent,
    ReaderComponent,
    NewsChComponent,
  ],
})
export class SharedModule {}
