import { DOCUMENT } from '@angular/common';
import { Router } from '@angular/router';
import { Component, Inject, OnInit } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';

@Component({
  selector: 'app-recipe-header',
  templateUrl: './recipe-header.component.html',
  styleUrls: ['./recipe-header.component.css']
})
export class RecipeHeaderComponent implements OnInit {
  title = 'RecipeApp'

  isAuthenticated$ = this.auth.isAuthenticated$



  constructor(@Inject(DOCUMENT) public document: Document, public auth: AuthService) {}

  ngOnInit(): void {
  }

  handleLogout() {
    this.auth.logout()
  }
  
  handleLogin() {
    this.auth.loginWithRedirect({appState: { target: '/profile',}})
  }
  handleSignUp() {
    this.auth.loginWithRedirect({screen_hint:"signup"})
  }
}
