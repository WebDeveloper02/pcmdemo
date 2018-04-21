import { RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { PricelistEditComponent } from './productCatalog/pricelist-edit/pricelist-edit.component';
import { PricelistEditAllComponent } from './productCatalog/pricelist-edit-all/pricelist-edit-all.component';
import { LoginComponent } from './user/login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { ErrorComponent } from './error/error.component';
import { AuthGuard } from './auth/auth.guard';

export const routing = RouterModule.forRoot([    
    {
        path: '', redirectTo: 'login', pathMatch: 'full'
    }
    ,{
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'home',
        component: HomeComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'editpricelist',
        component: PricelistEditComponent,
        canActivate: [AuthGuard]        
    },
    {
        path: 'editpricelistAll',
        component: PricelistEditAllComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'logout',
        component: LogoutComponent
    },
    {
        path: 'sessionExpired',
        component: ErrorComponent,
        canActivate: [AuthGuard]
    }
]);