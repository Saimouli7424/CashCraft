import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private storageKey = 'users';

  constructor() {}

  getUsers(): any[] {
    const usersString = localStorage.getItem(this.storageKey);
    return usersString ? JSON.parse(usersString) : [];
  }

  saveUsers(users: any[]): void {
    localStorage.setItem(this.storageKey, JSON.stringify(users));
  }

  // Register a new user
  register(user: any): boolean {
    const users = this.getUsers();
    const existingUser = users.find((u: any) => u.email === user.email);
    if (existingUser) {
      return false; // User already exists
    }
    users.push(user);
    this.saveUsers(users);
    return true;
  }
  

  // Login a user
  login(email: string, password: string): boolean {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const user = users.find((u: any) => u.email === email && u.password === password);
    return !!user;
  }
}
