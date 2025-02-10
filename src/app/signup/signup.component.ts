import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../authservice.service';// Import the AuthService
import { Router } from '@angular/router'; // Optionally, you can navigate to a different page after successful signup

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
})
export class SignupComponent {
  signupForm: FormGroup;
  errorMessage: string = ''; // To hold any error messages

  constructor(
    private fb: FormBuilder,
    private authService: AuthService, // Inject AuthService
    private router: Router // Inject Router for navigation (optional)
  ) {
    this.signupForm = this.fb.group({
      name: ['', Validators.required],
      age: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  onSubmit() {
    if (this.signupForm.valid) {
      const { name, age, email, password } = this.signupForm.value;

      // Call signup method from AuthService
      this.authService.signup({name , age , email , password}).subscribe({
        next: (response: any) => {
          // Handle successful signup
          console.log('Signup successful:', response);

          // Optionally, redirect the user to another page after signup
          this.router.navigate(['/login']); // Change '/login' to your desired route
        },
        error: (err: any) => {
          // Handle error during signup
          console.error('Signup error:', err);
          this.errorMessage = 'Signup failed. Please try again.'; // Display an error message
        },
      });
    }
  }
}
