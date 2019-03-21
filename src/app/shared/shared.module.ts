import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { HeaderComponent } from './header/header.component';

@NgModule({
	declarations: [ProfileComponent, LoginComponent, HeaderComponent],
	imports: [CommonModule, IonicModule],
	exports: [ProfileComponent, LoginComponent, HeaderComponent],
})
export class SharedModule {}
