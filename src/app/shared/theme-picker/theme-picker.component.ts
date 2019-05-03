import { Component, OnInit } from '@angular/core';
import { NavParams } from '@ionic/angular';

@Component({
  selector: 'app-theme-picker',
  templateUrl: './theme-picker.component.html',
  styleUrls: ['./theme-picker.component.scss'],
})
export class ThemePickerComponent implements OnInit {
  background: string;
  contentEle: any;
  textEle: any;
  fontFamily: string;

  colors: any = {
    white: {
      bg: 'rgb(255, 255, 255)',
      fg: 'rgb(0, 0, 0)',
    },
    tan: {
      bg: 'rgb(249, 241, 228)',
      fg: 'rgb(0, 0, 0)',
    },
    grey: {
      bg: 'rgb(76, 75, 80)',
      fg: 'rgb(255, 255, 255)',
    },
    black: {
      bg: 'rgb(0, 0, 0)',
      fg: 'rgb(255, 255, 255)',
    },
  };

  constructor(private navParams: NavParams) {}

  ngOnInit() {
    if (this.navParams.data) {
      this.contentEle = this.navParams.data.contentEle;
      this.textEle = this.navParams.data.textEle;

      this.background = this.getColorName(
        this.contentEle.style.backgroundColor,
      );
      this.setFontFamily();
    }
  }

  getColorName(background: any) {
    let colorName = 'white';

    if (!background) {
      return 'white';
    }

    for (const key in this.colors) {
      if (this.colors[key].bg === background) {
        colorName = key;
      }
    }

    return colorName;
  }

  setFontFamily() {
    if (this.textEle.style.fontFamily) {
      this.fontFamily = this.textEle.style.fontFamily.replace(/'/g, '');
    }
  }

  changeBackground(color: any) {
    this.background = color;
    this.contentEle.style.setProperty('--background', this.colors[color].bg);
    this.textEle.style.color = this.colors[color].fg;
  }

  changeFontSize(direction: 'smaller' | 'larger') {
    const fontSizeText: string = this.textEle.style.fontSize;
    let fontSizeNumber: number;

    if (!fontSizeText) {
      fontSizeNumber = 1; // 1em
    } else {
      fontSizeNumber = Number(fontSizeText.split('em')[0]);
    }

    switch (direction) {
      case 'larger': {
        if (fontSizeNumber >= 1.3) {
          break;
        } else {
          fontSizeNumber += 0.1;
          break;
        }
      }
      case 'smaller': {
        if (fontSizeNumber <= 0.7) {
          break;
        } else {
          fontSizeNumber -= 0.1;
        }
      }
    }

    this.textEle.style.fontSize = fontSizeNumber + 'em';
  }

  changeFontFamily() {
    if (this.fontFamily) {
      this.textEle.style.fontFamily = this.fontFamily;
    }
  }
}
