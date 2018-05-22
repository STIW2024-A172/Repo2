import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { ChartsModule } from 'ng2-charts';

import { MyApp } from './app.component';
import { IncidentsAddPage } from '../pages/incidents-add/incidents-add';
import { IncidentsChartPage } from '../pages/incidents-chart/incidents-chart';
import { IncidentsReportPage } from '../pages/incidents-report/incidents-report';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

//Step 1 Initialize Firebase
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';

var config = {
  
};
//end Step 1 Initialize Firebase

@NgModule({
  declarations: [
    MyApp,
    IncidentsAddPage,
    IncidentsChartPage,
    IncidentsReportPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    // Step2 Initialize Firebase
    AngularFireModule.initializeApp(config),
    AngularFireDatabaseModule,
    ChartsModule
    //end step2 Initialize Firebase
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    IncidentsAddPage,
    IncidentsChartPage,
    IncidentsReportPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
