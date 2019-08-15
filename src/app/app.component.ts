import { Component } from '@angular/core';
import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
// import { LocalNotifications } from '@ionic-native/local-notifications/ngx';
// import { PhonegapLocalNotification } from '@ionic-native/phonegap-local-notification/ngx';

import { JPush } from '@jiguang-ionic/jpush/ngx';

@Component({
  selector: 'app-root',
  template: '<router-outlet></router-outlet>'
})
export class AppComponent {
  title = 'app';


  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private jpush:JPush
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.jpush.setDebugMode(true);
      this.jpush.init();
    });
    
  }

}
