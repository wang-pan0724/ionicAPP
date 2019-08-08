import { Component } from '@angular/core';
import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
// import { LocalNotifications } from '@ionic-native/local-notifications/ngx';
// import { PhonegapLocalNotification } from '@ionic-native/phonegap-local-notification/ngx';

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
    // private localNotification: PhonegapLocalNotification
    // private localNotifications: LocalNotifications
  ) {
    this.initializeApp();
  }

  initializeApp() {
    // this.testStatus();
    // this.testInfo();
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
    
  }

  // testInfo(){
  //   this.localNotification.requestPermission().then(
  //     (permission) => {
  //       if (permission === 'granted') {
    
  //         // Create the notification
  //         this.localNotification.create('My Title', {
  //           tag: 'message1',
  //           body: 'My body',
  //           icon: 'assets/icon/favicon.ico'
  //         });
    
  //       }
  //     }
  //   );
  // }

  
  // testStatus() {


    
  //   // var data = new Date(new Date().getTime() + 3000)+''
  //   this.localNotifications.schedule({
  //     id: 1,
  //     title: '彩易通通知',
  //     text: '这是显示通知栏的内容',
  //     // icon: 'https://www.baidu.com/img/bd_logo1.png?where=super',
  //     trigger: {at: new Date(new Date().getTime() + 3000)},
  //   });

  //   // this.localNotifications.on('click', (notification) => {
  //   //   alert(JSON.stringify(notification));
  //   // });
  // }
}
