import { Component } from '@angular/core';

const TAB_ICONS = {
  home: '/assets/icon/home-off.svg',
  bookmark: '/assets/icon/bookmark-off.svg',
  search: '/assets/icon/search-off.svg',
};
@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss'],
})
export class TabsPage {
  icons = TAB_ICONS;
  ionTabsWillChange({ tab }) {
    this.icons = {
      ...TAB_ICONS,
      [tab]: `/assets/icon/${tab}-on.svg`,
    };
  }
}
