import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions, RequestMethod } from '@angular/http';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from "rxjs/Observable";
import { Router} from '@angular/router';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/Observable/throw';
import 'rxjs/add/operator/toPromise';

import { PricelistModel } from './pricelist.model';


@Injectable()
export class PricelistService {

    constructor(private http: Http, private httpc: HttpClient, private router: Router) { }

    //GET route - pagewise records fetching logic
    getPriceListAll(){
        const url = 'http://localhost:56678/api/prislistas';
        var headerOptions = new Headers({ 'Authorization':'Bearer '+localStorage.getItem('accessToken') });
        return this.http.get(url, {headers: headerOptions}).map((data: Response) => {
            // console.log(data);
            return data.json();
        }).catch(this.handleError);
    }


    //GET route - pagewise records fetching logic
    getPriceListPageWise(pageSize: number, pageNo: number) {
        const url = 'http://localhost:56678/GetPriceList';
        var headerOptions = new Headers({ 'Authorization':'Bearer '+localStorage.getItem('accessToken') });
        return this.http.get(url + '/' + pageSize + '/' + pageNo, {headers: headerOptions}).map((data: Response) => {
            // console.log(data);
            return data.json();            
        }).catch(this.handleError);
    }

    //PUT route
    putPricelists(pricelist: PricelistModel[]) {  //Bulk Update existing pricelist records
        var body = JSON.stringify(pricelist);
        var headerOptions = new Headers({ 'Content-Type': 'application/json' });
        var requestOptions = new RequestOptions({ method: RequestMethod.Put, headers: headerOptions });
        return this.http.put('http://localhost:56678/api/Prislistas', body, requestOptions).map(response => response.json());
    }

    //PUT route
    putPricelistColumn(pricelist: PricelistModel[], column: string, value: any) {  //Bulk Update specific column value
        const url = 'http://localhost:56678/UpdatePricelistColumn';
        var body = JSON.stringify(pricelist);
        var headerOptions = new Headers({ 'Content-Type': 'application/json' });
        var requestOptions = new RequestOptions({ method: RequestMethod.Put, headers: headerOptions });
        return this.http.put(url + '/' + column + '/' + value, body, requestOptions).map(response => response.json());
    }

    handleError(error) {
        //console.log('getPriceListPageWise error is \n' + error.status);
        if(error.status === 401) {
            //this.router.navigate(['home']); //Wrong way            
            window.location.href = '/sessionExpired';  //Correct way            
        }
        console.error(error);
        return Observable.throw(error);
    }
}