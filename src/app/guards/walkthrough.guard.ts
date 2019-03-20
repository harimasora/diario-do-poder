import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  CanActivate,
  Router,
} from '@angular/router';
import { Observable } from 'rxjs';
import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: 'root',
})
export class WalkthroughGuard implements CanActivate {
  constructor(private storage: Storage, private router: Router) {}

  async canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ): Promise<boolean> {
    const isComplete = await this.storage.get('walkthroughComplete');

    if (!isComplete) {
      this.router.navigateByUrl('/walkthrough');
    }

    return isComplete;
  }
}
