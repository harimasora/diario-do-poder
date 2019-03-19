import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';

@NgModule({
	declarations: [ProfileComponent, LoginComponent],
	imports: [CommonModule, IonicModule],
	exports: [ProfileComponent, LoginComponent],
})
export class SharedModule {}
