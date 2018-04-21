import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    console.log('LOGOUT PAGE LOADED.\n' + 'AccessToken is  ' + localStorage.getItem('accessToken'));
  }

}
