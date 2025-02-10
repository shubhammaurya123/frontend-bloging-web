import { Component, OnInit } from '@angular/core';
// import { ChartOptions, ChartData, ChartType } from 'chart.js';
// import { Label } from 'ng2-charts';

@Component({
  selector: 'app-analytics',
  templateUrl: './analytics.component.html',
  styleUrls: ['./analytics.component.css']
})
export class AnalyticsComponent implements OnInit {
  // For Chart.js
  // public barChartOptions: ChartOptions = {
  //   responsive: true,
  // };
  // public barChartLabels: Label[] = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
  // public barChartType: ChartType = 'bar';
  // public barChartLegend = true;
  // public barChartData: ChartData<'bar'> = {
  //   labels: this.barChartLabels,
  //   datasets: [
  //     {
  //       data: [65, 59, 80, 81, 56, 55],
  //       label: 'Views',
  //       backgroundColor: 'rgba(0, 123, 255, 0.5)',
  //       borderColor: 'rgba(0, 123, 255, 1)',
  //       borderWidth: 1,
  //     },
  //   ],
  // };

  // Analytics card data
  analyticsCards = [
    {
      title: 'Total Views',
      value: 1200,
      icon: 'bi-eye',
      bgColor: 'bg-primary'
    },
    {
      title: 'Total Comments',
      value: 450,
      icon: 'bi-chat-left',
      bgColor: 'bg-success'
    },
    // {
    //   title: 'Total Likes',
    //   value: 300,
    //   icon: 'bi-heart',
    //   bgColor: 'bg-danger'
    // },
  ];

  constructor() {}

  ngOnInit(): void {}
}
