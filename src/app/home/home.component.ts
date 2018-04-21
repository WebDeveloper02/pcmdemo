import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFontAwesomeModule } from 'angular-font-awesome'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  tokenExpiryTime: any; 
  constructor(private router: Router) { }

  ngOnInit() {
    this.tokenExpiryTime = localStorage.getItem('tokenExpiryTime');
    console.log('HOME PAGE LOADED.\n' + 'AccessToken is  ' + localStorage.getItem('accessToken'));
    console.log(localStorage.getItem('tokenExpiryTime'));
  }

  Logout() {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('tokenExpiryTime');
    this.router.navigate(['logout']);
  }
}