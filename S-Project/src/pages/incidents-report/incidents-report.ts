import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';

//import firebase
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
//end import firebase

@Component({
  selector: 'page-incidents-report',
  templateUrl: 'incidents-report.html',
})
export class IncidentsReportPage {
  selectedItem: any;
  editItem: any;
  asd

  items: Observable<any[]>;

  constructor(private db: AngularFireDatabase, public navCtrl: NavController, public navParams: NavParams,public alertCtrl: AlertController) {

    this.selectedItem = navParams.get('item');
    this.editItem = navParams.get('edit');

    this.items = this.db.list('/incident_report', ref => ref.orderByChild('time_report')).snapshotChanges().map(
      change => {
        return change.map(
          c=>({
          key:c.payload.key,
          ...c.payload.val(),
          }));
      }).map((array) => array.reverse());

      this.asd = this.items['-LBQ9mKlEe2MYgVNTE1K']

  }

  approve(itemTitle,itemKey){
    this.db.list('/incident_report').update(itemKey,{ status: 'APPROVED' });
    this.showAlert(itemTitle,'approved')
  }

  reject(itemTitle,itemKey){
    this.db.list('/incident_report').update(itemKey,{ status: 'REJECTED' });
    this.showAlert(itemTitle,'rejected')
  }

  rejectConfirm(itemTitle,itemKey) {
    let alert = this.alertCtrl.create({
      title: 'Confirm purchase',
      message: 'Do you want reject '+itemTitle+' incident ?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
        },
        {
          text: 'Reject',
          handler: () => {
            this.reject(itemTitle,itemKey)
          }
        }
      ]
    });
    alert.present();
  }

  edit(edit){
    this.navCtrl.push(IncidentsReportPage, {
      edit: edit
    });
  }

  update(itemKey){
    this.db.list('/incident_report').update(itemKey,{
      incident_type:  this.editItem.incident_type,
      incident_title:  this.editItem.incident_title,
      incident_time:  this.editItem.incident_time,
      incident_description:  this.editItem.incident_description,
      location:  this.editItem.location,
      projects_floors:  this.editItem.projects_floors
    })

    this.showAlert(this.editItem.incident_title,'updated')
  }

  delete(itemTitle,itemKey){
    this.db.list('/incident_report').remove(itemKey);
    this.showAlert(itemTitle,'deleted')
  }

  deleteConfirm(itemTitle,itemKey) {
    let alert = this.alertCtrl.create({
      title: 'Confirm purchase',
      message: 'Do you want delete '+itemTitle+' incident ?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
        },
        {
          text: 'Delete',
          handler: () => {
            this.delete(itemTitle,itemKey)
          }
        }
      ]
    });
    alert.present();
  }

  showAlert(itemTitle,action) {
    let alert = this.alertCtrl.create({
      title: 'Successful !',
      message: itemTitle+' incident '+action+'!',
      buttons: ['OK']
    });
    alert.onDidDismiss(res => {
      if(action=='updated'){
        this.navCtrl.pop()
      }else{
        this.navCtrl.setRoot (IncidentsReportPage);
      }
    })
    alert.present();
  }
  
  itemTapped(item) {
    // That's right, we're pushing to ourselves!
    this.navCtrl.push(IncidentsReportPage, {
      item: item
    });
  }
}
