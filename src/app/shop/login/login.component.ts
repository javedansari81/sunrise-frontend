import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  banner: any = {
    pagetitle: 'Login',
    bg_image: 'assets/images/banner/bnr4.jpg',
    title: 'Login',
  };

  emailRegex = `^(?=.{1,256})(?=.{1,64}@.{1,255}$)[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$`;

  loginForm: FormGroup;
  isLoggedIn: boolean = false;
  user: any = null;

  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    private router: Router,
  ) {
    this.loginForm = this.fb.group({
      email: new FormControl('', [
        Validators.required,
        Validators.maxLength(30),
        Validators.minLength(13),
        Validators.pattern(this.emailRegex),
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(15),
      ]),
    });
  }

  ngOnInit(): void {
    this.checkLoginStatus();
  }

  // validation function
  getControl(value: any) {
    return this.loginForm.get(value);
  }

  onLogin() {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      this.authService.login(email, password).subscribe(
        (response) => {
          this.authService.setToken(response);
          this.checkLoginStatus(); // Update the component state after login
          this.router.navigate(['/']); // Redirect after login
        },
        (error) => {
          console.error('Login failed', error);
        }
      );
    }
  }

  checkLoginStatus() {
    this.isLoggedIn = this.authService.isLoggedIn();
    if (this.isLoggedIn) {
      this.user = this.authService.getUser();
    }
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']); // Redirect to login page after logout
    this.isLoggedIn = false;
  }
}
