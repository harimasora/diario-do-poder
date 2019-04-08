import { IonSlides } from '@ionic/angular';
import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-walkthrough',
  templateUrl: './walkthrough.page.html',
  styleUrls: ['./walkthrough.page.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class WalkthroughPage implements OnInit {
  @ViewChild(IonSlides)
  slides: IonSlides;

  constructor(
    private storage: Storage,
    private router: Router,
    private route: ActivatedRoute,
    public auth: AuthService,
  ) {}

  async finish() {
    await this.storage.set('walkthroughComplete', true);
    this.router.navigate(['/tabs/home'], { replaceUrl: true });
  }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      const { slideIndex } = params;
      if (slideIndex) {
        this.slides.slideTo(slideIndex);
      }
    });
  }
}
