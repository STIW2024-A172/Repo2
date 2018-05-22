import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import chartJs from 'chart.js';

//import firebase
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
//end import firebase

@Component({
  selector: 'page-incidents-chart',
  templateUrl: 'incidents-chart.html',
})
export class IncidentsChartPage {

  @ViewChild('doughnutCanvas') doughnutCanvas;
  @ViewChild('barCanvas') barCanvas;
  @ViewChild('lineCanvas') lineCanvas;

  doughnutChart: any;
  barChart: any;
  lineChart: any;

  selectedItem2: any;

  today = new Date(Date.now());
  selectYear
  selectYear2

  count1
  count2
  count3
  count4
  date1
  date2
  month1  
  month2 
  month3  
  month4  
  month5  
  month6  
  month7  
  month8  
  month9  
  month10  
  month11  
  month12
  yearData1
  yearData2
  yearData3
  yearData4
  yearData5

  items: Observable<any[]>;


  constructor(private db: AngularFireDatabase, public navCtrl: NavController, public navParams: NavParams) {

    this.selectedItem2 = navParams.get('item2');

    this.selectYear = this.today.getFullYear()    

    if(this.selectedItem2){
      this.selectYear2 = this.selectedItem2
    }else{
      this.selectYear2 = this.today.getFullYear()
    }

    this.getdata('Reportable Incident')
    this.items.subscribe(result => { this.count1 =(result.length)})

    this.getdata('Non-Reportable Incident')
    this.items.subscribe(result => { this.count2 =(result.length)})

    this.getdata('Property Damage')
    this.items.subscribe(result => { this.count3 =(result.length)})

    this.getdata('DG Spillage')
    this.items.subscribe(result => { this.count4 =(result.length)})

    this.getCountByDate(this.selectYear2,'01','01')
    this.items.subscribe(result => { this.month1 =(result.length)})
    this.getCountByDate(this.selectYear2,'02','02')
    this.items.subscribe(result => { this.month2 =(result.length)})
    this.getCountByDate(this.selectYear2,'03','03')
    this.items.subscribe(result => { this.month3 =(result.length)})
    this.getCountByDate(this.selectYear2,'04','04')
    this.items.subscribe(result => { this.month4 =(result.length)})
    this.getCountByDate(this.selectYear2,'05','05')
    this.items.subscribe(result => { this.month5 =(result.length)})
    this.getCountByDate(this.selectYear2,'06','06')
    this.items.subscribe(result => { this.month6 =(result.length)})
    this.getCountByDate(this.selectYear2,'07','07')
    this.items.subscribe(result => { this.month7 =(result.length)})
    this.getCountByDate(this.selectYear2,'08','08')
    this.items.subscribe(result => { this.month8 =(result.length)})
    this.getCountByDate(this.selectYear2,'09','09')
    this.items.subscribe(result => { this.month9 =(result.length)})
    this.getCountByDate(this.selectYear2,'10','10')
    this.items.subscribe(result => { this.month10 =(result.length)})
    this.getCountByDate(this.selectYear2,'11','11')
    this.items.subscribe(result => { this.month11 =(result.length)})
    this.getCountByDate(this.selectYear2,'12','12')
    this.items.subscribe(result => { this.month12 =(result.length)})
    
    this.getCountByDate(this.today.getFullYear(),'01','12')
    this.items.subscribe(result => { this.yearData1 =(result.length)})
    this.getCountByDate(this.today.getFullYear()-1,'01','12')
    this.items.subscribe(result => { this.yearData2 =(result.length)})
    this.getCountByDate(this.today.getFullYear()-2,'01','12')
    this.items.subscribe(result => { this.yearData3 =(result.length)})
    this.getCountByDate(this.today.getFullYear()-3,'01','12')
    this.items.subscribe(result => { this.yearData4 =(result.length)})
    this.getCountByDate(this.today.getFullYear()-4,'01','12')
    this.items.subscribe(result => { this.yearData5 =(result.length)})
  }

  updateData(item2) {
    this.navCtrl.setRoot (IncidentsChartPage ,{
      item2: item2
    });
  }

  getdata(equal){

    this.items = this.db.list('/incident_report', ref => ref.orderByChild('incident_type').equalTo(equal)).snapshotChanges()
  }

  getCountByDate(year,monthStart,monthEnd){

    this.date1 =  year+'-'+monthStart+'-01T00:00:00+08:00'
    this.date2 =  year+'-'+monthEnd+'-31T23:59:59+08:00'
    this.items = this.db.list('/incident_report', ref => ref.orderByChild('incident_time').startAt(this.date1).endAt(this.date2)).snapshotChanges()
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.doughnutChart = this.getDoughnutChart();
      this.barChart = this.getBarChart();
      this.lineChart = this.getLineChart();
    }, 150);
  }


  getChart(context, chartType, data, options?) {
    return new chartJs(context, {
      data,
      options,
      type: chartType,
    });
  }

  getDoughnutChart() {
    const data = {
      labels: ['Reportable Incident', 'Non-Reportable Incident', 'Property Damage', 'DG Spillage'],
      datasets: [{
        label: '# of Votes',
        data: [this.count1, this.count2, this.count3, this.count4],
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)'
        ],
        hoverBackgroundColor: ['#FF6384', '#36A2EB', '#9900FF', '#FF9900',]
      }]
    };

    return this.getChart(this.doughnutCanvas.nativeElement, 'doughnut', data);
  }

  getBarChart() {
    const data = {
      labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July','August','September','October','November','December'],
      datasets: [{
        label: '',
        data: [this.month1, this.month2, this.month3, this.month4, this.month5, this.month6, this.month7, this.month8, this.month9, this.month10, this.month11, this.month12],
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)'
        ],
        borderColor: [
          'rgba(255,99,132,1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
          'rgba(255,99,132,1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)'
        ],
        borderWidth: 1
      }]
    };

    const options = {
      legend: {
        display: false
      },
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true
          }
        }]
      }
    };

    return this.getChart(this.barCanvas.nativeElement, 'bar', data, options);
  }

  getLineChart() {
    const data = {
      labels: [this.today.getFullYear()-4, this.today.getFullYear()-3 , this.today.getFullYear()-2, this.today.getFullYear()-1, this.today.getFullYear()],
      datasets: [
        {
          label: 'My First dataset',
          fill: false,
          lineTension: 0.1,
          backgroundColor: 'rgba(75,192,192,0.4)',
          borderColor: 'rgba(75,192,192,1)',
          borderCapStyle: 'butt',
          borderDash: [],
          borderDashOffset: 0.0,
          borderJoinStyle: 'miter',
          pointBorderColor: 'rgba(75,192,192,1)',
          pointBackgroundColor: '#fff',
          pointBorderWidth: 1,
          pointHoverRadius: 5,
          pointHoverBackgroundColor: 'rgba(75,192,192,1)',
          pointHoverBorderColor: 'rgba(220,220,220,1)',
          pointHoverBorderWidth: 2,
          pointRadius: 1,
          pointHitRadius: 10,
          data: [this.yearData5, this.yearData4, this.yearData3, this.yearData2, this.yearData1],
          spanGaps: false,
        }
      ]
    };

    const options = {
      legend: {
        display: false
      }
    };

    return this.getChart(this.lineCanvas.nativeElement, 'line', data, options);
  }
}
