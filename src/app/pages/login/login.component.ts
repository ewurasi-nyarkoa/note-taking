import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { ThemeService } from '../../services/theme.service';

@Component({
  selector: 'app-login',
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {
  email = '';
  password = '';
  isSignUp = false;
  loading = false;
  error = '';

  constructor(
    private authService: AuthService,
    private router: Router,
    private themeService: ThemeService
  ) {}

  ngOnInit() {
    // Initialize theme on component load
    this.themeService.preferences.subscribe();
  }

  async onSubmit() {
    this.loading = true;
    this.error = '';

    try {
      if (this.isSignUp) {
        const result = await this.authService.signUp(this.email, this.password);
        if (result.user && !result.session) {
          this.error = 'Account created! Please check your email to verify your account, then sign in.';
        } else if (result.session) {
          this.router.navigate(['/dashboard']);
        }
      } else {
        await this.authService.signIn(this.email, this.password);
        this.router.navigate(['/dashboard']);
      }
    } catch (error: any) {
      if (error.message.includes('Invalid login credentials')) {
        this.error = 'Invalid email or password. If you just signed up, please verify your email first.';
      } else {
        this.error = error.message;
      }
    } finally {
      this.loading = false;
    }
  }

  toggleMode() {
    this.isSignUp = !this.isSignUp;
    this.error = '';
  }
}
