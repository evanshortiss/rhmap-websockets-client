import { Component, NgZone } from '@angular/core';
import { NavController, LoadingController } from 'ionic-angular';
import * as storage from '../../services/storage';
import { TabsPage } from '../tabs/tabs';
import { setHost } from '../../services/socket';
import * as fh from 'fh-js-sdk';

@Component({
  selector: 'page-user-details',
  templateUrl: 'user-details.html'
})
export class UserDetailsPage {
  private firstname: string;
  private lastname: string;

  constructor(public navCtrl: NavController, private loadingCtrl: LoadingController, private zone: NgZone) {
    this.firstname = '';
    this.lastname = '';

    Promise.all([
      storage.getUserFirstname(),
      storage.getUserLastname()
    ])
      .then((names) => {
        this.firstname = names[0];
        this.lastname = names[1];

        if (this.firstname && this.lastname) {
          // If the user has already entered their details, then we just proceed to the application
          this.navigateToApplication();
        }
      });
  }

  public onSubmit () {
    return Promise.all([
      storage.setUserFirstname(this.firstname),
      storage.setUserLastname(this.lastname)
    ])
      .then(() => this.navigateToApplication());
  }

  private navigateToApplication () {
    const loader = this.loadingCtrl.create({
      content: 'Intialising connection to server. Please wait.'
    });

    loader.present();

    fh.on('fhinit', (err) => {
      if (err) {
        return alert(`Failed to initilise FH SDK - ${err.toString()}`)
      } else {
        this.zone.run(() => {
          loader.dismiss();
          setHost(fh.getCloudURL());
          this.navCtrl.setRoot(TabsPage);
        });
      }
    });
  }
}
