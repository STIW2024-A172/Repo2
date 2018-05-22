import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { IncidentsAddPage } from '../pages/incidents-add/incidents-add';
import { IncidentsChartPage } from '../pages/incidents-chart/incidents-chart';
import { IncidentsReportPage } from '../pages/incidents-report/incidents-report';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = IncidentsReportPage;

  pages: Array<{title: string, component: any}>;

  dropdown = false

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [

    ];

  }

  drop(){
    if(this.dropdown == true){
      this.dropdown = false
    }else{
      this.dropdown = true
    }
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  open1() {
    this.nav.setRoot(IncidentsAddPage);
  }
  open2() {
    this.nav.setRoot(IncidentsReportPage);
  }
  open3() {
    this.nav.setRoot(IncidentsChartPage);
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
}
