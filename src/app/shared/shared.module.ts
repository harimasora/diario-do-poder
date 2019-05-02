import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { HeaderComponent } from './header/header.component';
import { NewsComponent } from './news/news.component';
import { RouterModule } from '@angular/router';
import { ReaderComponent } from './reader/reader.component';
import { NewsHumorComponent } from './news-humor/news-humor.component';
import { BookmarkButtonComponent } from './bookmark-button/bookmark-button.component';
import { MenuComponent } from './menu/menu.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SignInComponent } from './sign-in/sign-in.component';
import { ShareButtonComponent } from './share-button/share-button.component';
import { CategoryPickerComponent } from './category-picker/category-picker.component';
import { NewsSkeletonComponent } from './news-skeleton/news-skeleton.component';
import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component';
import { TermsOfUseComponent } from './terms-of-use/terms-of-use.component';
import { ThemePickerComponent } from './theme-picker/theme-picker.component';

@NgModule({
  declarations: [
    ProfileComponent,
    LoginComponent,
    HeaderComponent,
    NewsComponent,
    ReaderComponent,
    NewsHumorComponent,
    BookmarkButtonComponent,
    MenuComponent,
    SignUpComponent,
    SignInComponent,
    ShareButtonComponent,
    CategoryPickerComponent,
    NewsSkeletonComponent,
    PrivacyPolicyComponent,
    TermsOfUseComponent,
    ThemePickerComponent,
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
    NewsHumorComponent,
    BookmarkButtonComponent,
    MenuComponent,
    SignUpComponent,
    SignInComponent,
    ShareButtonComponent,
    CategoryPickerComponent,
    NewsSkeletonComponent,
    PrivacyPolicyComponent,
    TermsOfUseComponent,
    ThemePickerComponent,
  ],
  entryComponents: [ThemePickerComponent],
})
export class SharedModule {}
