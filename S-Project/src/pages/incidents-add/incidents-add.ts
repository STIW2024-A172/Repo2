import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';

import { IncidentsReportPage } from '../incidents-report/incidents-report';

//import firebase
import { AngularFireDatabase } from 'angularfire2/database';
import { ServerValue } from '@firebase/database';
//end import firebase

@Component({
  selector: 'page-incidents-add',
  templateUrl: 'incidents-add.html',
})
export class IncidentsAddPage {

    today = new Date(Date.now());
 
    dd = ''
    mm = ''
    hour = ''
    minute = ''
  
    inputData = {
      inc_type: '',
      inc_title: '',
      inc_time: '',
      inc_description: '',
      location: '',
      project: ''
    }
  
    //add private db: AngularFireDatabase
    constructor(private db: AngularFireDatabase, public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController) {
     
      this.datetime()
      
    }
  
    //set date format
    datetime(){
      
      if(this.today.getDate() < 10){
        this.dd = '0'+this.today.getDate()
      }else{
        this.dd = ''+this.today.getDate()     
      }
  
      if(this.today.getMonth() < 9){
        this.mm = '0'+(this.today.getMonth()+1)
      }else{
        this.mm = ''+(this.today.getMonth()+1)    
      }
  
      if(this.today.getHours() < 10){
        this.hour = '0'+this.today.getHours()
      }else{
        this.hour = ''+this.today.getHours()
      }
  
      if(this.today.getMinutes() < 10){
        this.minute = '0'+this.today.getMinutes()
      }else{
        this.minute = ''+this.today.getMinutes()
      }
  
      this.inputData.inc_time = this.today.getFullYear() +'-'+ this.mm +'-'+ this.dd+'T'+this.hour +':'+ this.minute+':00+08:00'
    }
  
    onSubmit(){
      this.db.list('/incident_report').push({
        incident_type:  this.inputData.inc_type,
        incident_title:  this.inputData.inc_title,
        incident_time:  this.inputData.inc_time,
        incident_description:  this.inputData.inc_description,
        location:  this.inputData.location,
        projects_floors:  this.inputData.project,
        time_report: ServerValue.TIMESTAMP,
        status: 'IN PROGRESS'
      });
  
      this.showAlert()
    }
  
    showAlert() {
      let alert = this.alertCtrl.create({
        title: 'Successful !',
        subTitle: 'Your incident recorded !',
        buttons: ['OK']
      });
      alert.onDidDismiss(res => {

        this.navCtrl.setRoot (IncidentsReportPage);
      })
      alert.present();
    }
  }
