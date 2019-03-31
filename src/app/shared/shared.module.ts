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
import { NewsHumorComponent } from './news-humor/news-humor.component';
import { BookmarkButtonComponent } from './bookmark-button/bookmark-button.component';
import { MenuComponent } from './menu/menu.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    ProfileComponent,
    LoginComponent,
    HeaderComponent,
    NewsComponent,
    ReaderComponent,
    NewsChComponent,
    NewsHumorComponent,
    BookmarkButtonComponent,
    MenuComponent,
    SignUpComponent,
  ],
  imports: [
    CommonModule,
    IonicModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [
    ProfileComponent,
    LoginComponent,
    HeaderComponent,
    NewsComponent,
    ReaderComponent,
    NewsChComponent,
    NewsHumorComponent,
    BookmarkButtonComponent,
    MenuComponent,
    SignUpComponent,
  ],
})
export class SharedModule {}
