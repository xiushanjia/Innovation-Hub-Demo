import { Component } from '@angular/core';
import {Http,Headers} from '@angular/http';
import 'rxjs/Rx';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private http: Http) {
   
  }
  username;
  PassWord;
  title = 'app works!';
  submitForm() {
    let headers= new Headers();
    const time = new Date();
    headers.append('Content-Type','application/json');

    const myData= JSON.stringify({ userName:this.username, password:this.PassWord,timeStamp:time})
    this.http.post('/api',myData, {headers})
    .map(res=>res.json()) 
    .subscribe( 
    data=>console.log(data),
    err=>console.log('Something went wrong!')
    )}
}
