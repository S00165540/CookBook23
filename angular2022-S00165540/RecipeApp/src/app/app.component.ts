import { DOCUMENT } from '@angular/common';
import { Component, Inject, Input } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { HomeComponent } from './recipe/home/home.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})


export class AppComponent {
  title = 'Cookbook';
  


  
}
