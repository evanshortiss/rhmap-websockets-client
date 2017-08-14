import { Component } from '@angular/core';
import { Platform, ModalController, Keyboard } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { UserDetailsPage } from '../pages/user-details/user-details';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = UserDetailsPage;

  constructor(platform: Platform, statusBar: StatusBar, keyboardCtrl: Keyboard, splashScreen: SplashScreen, modalCtrl: ModalController) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();

      // Status bar is a little ugly when it overlays messages when the keyboard is visible.
      // This is a bit of a hack, but basically we hide the bar when the keyboard is raised
      window.addEventListener('native.keyboardshow', () => {
        statusBar.hide();
      })

      window.addEventListener('native.keyboardhide', () => {
        statusBar.show();
      })
    });
  }
}
