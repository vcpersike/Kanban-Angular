import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="dashboard-container">
      <nav class="navbar">
        <div class="navbar-brand">Dashboard</div>
        <div class="navbar-user">
          <span *ngIf="currentUser">Bem-vindo, {{currentUser.name}}</span>
          <button class="btn btn-outline-light" (click)="logout()">Logout</button>
        </div>
      </nav>

      <div class="dashboard-content">
        <h2>Dashboard Content</h2>
        <!-- Adicione seu conteúdo aqui -->
      </div>
    </div>
  `,
  styles: [`
    .dashboard-container {
      min-height: 100vh;
      background-color: #f5f5f5;
    }

    .navbar {
      background-color: #333;
      color: white;
      padding: 1rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .navbar-brand {
      font-size: 1.5rem;
      font-weight: bold;
    }

    .navbar-user {
      display: flex;
      align-items: center;
      gap: 1rem;
    }

    .btn-outline-light {
      color: white;
      border: 1px solid white;
      padding: 0.5rem 1rem;
      border-radius: 4px;
      background: transparent;
      cursor: pointer;
      transition: all 0.3s ease;

      &:hover {
        background-color: white;
        color: #333;
      }
    }

    .dashboard-content {
      padding: 2rem;
    }
  `]
})
export class DashboardComponent implements OnInit {
  currentUser: User | null = null;

  constructor(
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.authService.currentUser.subscribe(user => {
      this.currentUser = user;
    });
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
