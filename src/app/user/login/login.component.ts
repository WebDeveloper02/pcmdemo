import { element } from 'protractor';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { UserService } from './../../shared/user.service';
import { HttpErrorResponse } from "@angular/common/http";


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  // usernamepasswordEmpty: Boolean;
  // usernamepasswordIncorrect: Boolean;

  // ngOnInit() {
  //   this.usernamepasswordEmpty = false;
  //   this.usernamepasswordIncorrect = true;
  // }

  // loginUser(event) {
  //   var username = event.target.elements[0].value;
  //   var password = event.target.elements[1].value;
  //   if (username == '' || password == '') {
  //     this.usernamepasswordEmpty = true;
  //     this.toastr.error('Username or Password is empty. Please try again!', 'Product Catalog Module Login', {
  //       positionClass: 'toast-top-center',
  //       timeOut: 3000
  //     }); 
  //   }
  //   if ((username == 'Admin' && password == 'password@02') || (username == 'Samvid' && password == 'password@04')) {
  //     this.usernamepasswordIncorrect = false;
  //     this.router.navigate(['home']);
  //     this.toastr.success('"' + username + '" logged in successfully.', 'Product Catalog Module Login', {
  //       timeOut: 3000,
  //       positionClass: 'toast-top-right',
  //     });
  //   }
  //   if (!this.usernamepasswordEmpty && this.usernamepasswordIncorrect) {
  //     this.toastr.error('Username or Password is incorrect. Please try again!', 'Product Catalog Module Login', {
  //       positionClass: 'toast-top-center',
  //       timeOut: 3000
  //     });
  //   }
  // }

  ngOnInit() {
    console.log('LOGIN PAGE LOADED.\n' + 'AccessToken is  ' +localStorage.getItem('accessToken'));
  }

  constructor(private userService: UserService, private toastr: ToastrService, private router: Router) { }

  onLogin(username: string, password: string) {
    this.userService.authenticateUser(username, password).subscribe((data: any) => {
      console.log(data);
      //Store the token in the Web Browser's local storage
      localStorage.setItem('accessToken', data.access_token);
      localStorage.setItem('tokenExpiryTime', data[".expires"]);

      console.log("Token Auth Successful!");
      this.router.navigate(['home']); //Navigate to Home component if Auth is successful
      // this.toastr.success('"' + username + '" logged in successfully.', 'Product Catalog Module Login', {
      //   timeOut: 3000,
      //   positionClass: 'toast-top-left',
      // });
      this.toastr.success("Welcome to PCM " + "'" + username + "'", 'Product Catalog Module Login', {
        timeOut: 3000,
        positionClass: 'toast-top-left',
      });
    }, (error: HttpErrorResponse) => {
      this.toastr.error('Username or Password is incorrect. Please try again!', 'Product Catalog Module Login', {
        positionClass: 'toast-top-center',
        timeOut: 3000
      });
    });
  }

  resetLoginForm(form?: NgForm) {
    if (form != null)
      form.reset();
    this.ngOnInit();
  }
}
