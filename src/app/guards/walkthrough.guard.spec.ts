import { TestBed, async, inject } from '@angular/core/testing';

import { WalkthroughGuard } from './walkthrough.guard';

describe('WalkthroughGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [WalkthroughGuard]
    });
  });

  it('should ...', inject([WalkthroughGuard], (guard: WalkthroughGuard) => {
    expect(guard).toBeTruthy();
  }));
});
