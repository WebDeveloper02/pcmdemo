import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpClientModule } from '@angular/common/http';
import { Response, HttpModule } from "@angular/http";
import { Observable } from "rxjs";
import 'rxjs/add/operator/map';
import { UserModel } from './user.model';

@Injectable()
export class UserService {
    readonly rootURL = "http://localhost:56678";
    constructor(private http: HttpClient) {}

    authenticateUser(username, password) { //Returns the JSON format 
        var body = "username="+username+"&password="+password+"&grant_type=password";
        var requestHeader = new HttpHeaders({'Content-Type':'application/x-www-urlencoded'});
        return this.http.post(this.rootURL+'/Token', body, {headers: requestHeader});
    }
    //Above method/API call Returuns JSON object as shown below 
    // {
    //     "access_token": "msTqigNsn30AjwogAg53suGf6N0poDd0AJd35VBdAVkPX6d2UTV79QvRRqCyxooH770RuBdtmqWXCYtd_w6dEv7hgQ5Oxtl_cJ28x1awL2zTnlcIIDIhE6LDKTlb57WHizJugyt-sn-xnITJW3dB8_Syn4Wn5-ACsZnF3gveV7IZ-aZ4xZ8PdOF2lZAhY_tVRGlcugJ9ma7-a4111_VUzw",
    //     "token_type": "bearer",
    //     "expires_in": 1799,
    //     "userName": "Samvid",
    //     ".issued": "Tue, 17 Apr 2018 04:00:54 GMT",
    //     ".expires": "Tue, 17 Apr 2018 04:30:54 GMT"
    // }
}