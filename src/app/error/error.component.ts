import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.css']
})
export class ErrorComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    //Remove the expired access token and token expiry time values stored in browser 
    localStorage.removeItem('accessToken');
    localStorage.removeItem('tokenExpiryTime');

    console.log('SESSION EXPIRED PAGE LOADED.\n' + 'AccessToken is  ' + localStorage.getItem('accessToken'));    
  }
}
