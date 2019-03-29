import { IonSlides } from '@ionic/angular';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-walkthrough',
  templateUrl: './walkthrough.page.html',
  styleUrls: ['./walkthrough.page.scss'],
})
export class WalkthroughPage implements OnInit {
  @ViewChild(IonSlides)
  slides: IonSlides;

  constructor(
    private storage: Storage,
    private router: Router,
    private route: ActivatedRoute,
  ) {}

  async finish() {
    await this.storage.set('walkthroughComplete', true);
    this.router.navigate(['/tabs/home']);
  }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      const navigation = this.router.getCurrentNavigation();
      if (navigation && navigation.extras.state) {
        const slideIndex = this.router.getCurrentNavigation().extras.state
          .slideIndex;
        this.slides.slideTo(slideIndex);
      }
    });
  }
}
