import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  isDashboard: boolean = false;

  constructor(private router: Router) {
    // Subscribe to router changes to detect when on /dashboard
    this.router.events.subscribe(() => {
      this.isDashboard = this.router.url.startsWith('/dashboard');
    });
  }
}
