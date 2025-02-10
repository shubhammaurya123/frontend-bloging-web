import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { AuthService } from '../authservice.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  isLoginPage: boolean = false;
  isSignupPage: boolean = false;
  isLoggedIn: boolean = false;
  userName: string = '';
  userEmail: string = '';
  userAge: string | null = null;
  userProfileImage: string = 'assets/default-profile.png'; // Default Profile Image
  dropdownOpen = false;

  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit(): void {
    // Subscribe to auth state changes
    this.authService.isLoggedIn.subscribe(status => {
      this.isLoggedIn = status;
      if (status) {
        this.userName = this.authService.getUserName();
        this.userEmail = this.authService.getUserEmail(); // Get email from auth service
        this.userAge = this.authService.getUserAge(); // Get age from auth service
        this.userProfileImage = this.authService.getUserProfileImage();
      }
    });

    // Detect page route changes
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.isLoginPage = this.router.url === '/login';
        this.isSignupPage = this.router.url === '/signup';
      }
    });
  }

  toggleDropdown() {
    this.dropdownOpen = !this.dropdownOpen;
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
