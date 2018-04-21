import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { HttpClient, HttpHeaders, HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ToastrModule } from 'ngx-toastr';
import { routing } from './app.routing';  //import for the router ts file
import { AuthGuard } from './auth/auth.guard';
import { NgxPaginationModule } from 'ngx-pagination';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SlimLoadingBarModule } from 'ng2-slim-loading-bar';
import { AngularFontAwesomeModule } from 'angular-font-awesome';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { SearchFilterPipe } from './pipes/searchFilter.pipe';
import { OrderByPipe } from './pipes/orderBy.pipe';
import { PricelistEditComponent } from './productCatalog/pricelist-edit/pricelist-edit.component';
import { PricelistService } from './shared/pricelist.service';
import { UserService } from './shared/user.service';
import { LoginComponent } from './user/login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { UserComponent } from './user/user.component';
import { ErrorComponent } from './error/error.component';
import { PricelistEditAllComponent } from './productCatalog/pricelist-edit-all/pricelist-edit-all.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SearchFilterPipe,
    OrderByPipe,
    PricelistEditComponent,
    LoginComponent,
    LogoutComponent,
    UserComponent,
    ErrorComponent,
    PricelistEditAllComponent
  ],
  imports: [
    routing,  //import for the router ts file
    BrowserModule,
    FormsModule,
    HttpModule,
    HttpClientModule,
    AngularFontAwesomeModule,
    BrowserAnimationsModule, // required animations module for ToastrModule
    ToastrModule.forRoot({  // ToastrModule added
      timeOut: 2500,
      positionClass: 'toast-top-center',
      preventDuplicates: true
    }),
    NgbModule.forRoot(),
    SlimLoadingBarModule.forRoot(),
    NgxPaginationModule    
  ],
  providers: [ AuthGuard, PricelistService, UserService ],
  bootstrap: [ AppComponent ]
})

export class AppModule { }
