import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../authservice.service'; // Import the AuthService
import { Router } from '@angular/router'; // Optionally, you can navigate to a different page after successful login

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent {
  loginForm: FormGroup;
  errorMessage: string = ''; // To hold any error messages

  constructor(
    private fb: FormBuilder,
    private authService: AuthService, // Inject AuthService
    private router: Router // Inject Router for navigation (optional)
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;

      // Call login method from AuthService
      this.authService.login(email, password).subscribe({
        next: (response: any) => {
          // Handle successful login
          console.log('Login successful:', response);

          // Optionally, redirect the user to another page after login
          this.router.navigate(['/dashboard/blogs']); // Change '/dashboard' to your desired route
        },
        error: (err: any) => {
          // Handle error during login
          console.error('Login error:', err);
          this.errorMessage = 'Invalid credentials or server error'; // Display an error message
        },
      });
    }
  }
}
