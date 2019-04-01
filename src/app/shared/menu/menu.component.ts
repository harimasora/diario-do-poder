import { AuthService } from './../../services/auth.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import {
  NavigationExtras,
  Router,
  ActivatedRoute,
  Params,
} from '@angular/router';
import { IonMenu } from '@ionic/angular';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {
  @ViewChild(IonMenu)
  menu: IonMenu;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private auth: AuthService,
  ) {}

  ngOnInit() {}

  navigateToWalkthrough(slideId?: number) {
    const navigationExtras: NavigationExtras = {
      queryParams: {
        slideIndex: slideId || 0,
      },
    };
    this.router.navigate(['/walkthrough'], navigationExtras);
    this.menu.close();
  }

  async signOut() {
    await this.auth.signOut();
    this.navigateToWalkthrough(0);
  }

  navigateToEditorial(type) {
    this.router.navigate(['/tabs/editorial', type]);
    this.menu.close();
  }
}
