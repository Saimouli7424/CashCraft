import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from '../user.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
loginForm:any;
registerForm:any;
activeForm: 'login' | 'register' = 'login';


constructor( private fb: FormBuilder,
  private router: Router,
  private snackBar: MatSnackBar,
  private userService: UserService){}
ngOnInit() {
  this.loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required]
  });


  this.registerForm = this.fb.group({
    username: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(18)]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(18)]]
  });
}

toggleForm(form: 'login' | 'register') {
  this.activeForm = form;
}

login() {
  if (this.loginForm.valid) {
    const { email, password } = this.loginForm.value;
    if (this.userService.login(email, password)) {
      console.log("Login successful!");
      this.router.navigate(['/budget-planner/dashboard']);
    } else {
      this.snackBar.open('Invalid email or password!', 'Close', { duration: 2000 });
    }
  } else {
    this.snackBar.open('Please fill in all fields correctly!', 'Close', { duration: 2000 });
  }
}

register() {
  if (this.registerForm.valid) {
    if (this.userService.register(this.registerForm.value)) {
      console.log("Register successful!");
      this.snackBar.open('Registration successful! Please log in.', 'Close', { duration: 2000 });
      this.toggleForm('login');
    } else {
      this.snackBar.open('User already exists!', 'Close', { duration: 3000 });
    }
  } else {
    this.snackBar.open('Please fill in all fields correctly!', 'Close', { duration: 2000 });
    this.registerForm.markAllAsTouched(); // Mark all fields as touched to show validation errors
  }
}
}
