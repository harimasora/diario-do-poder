import { Component, OnInit, ViewChild } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { IonMenu } from '@ionic/angular';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {
  @ViewChild(IonMenu)
  menu: IonMenu;

  constructor(private router: Router) {}

  ngOnInit() {}

  navigateToWalkthrough(slideId?: number) {
    const navigationExtras: NavigationExtras = {
      state: {
        slideIndex: slideId || 0,
      },
    };
    this.router.navigate(['/walkthrough'], navigationExtras);
    this.menu.close();
  }
}
