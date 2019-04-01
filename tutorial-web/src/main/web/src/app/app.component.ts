import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'np-app';

  constructor(private http: HttpClient) {

  }

  ngOnInit(): void {
    this.http.get<String>("api/home").subscribe(result => console.log(result));
    this.http.post("api/create", {"qq":"123"}).subscribe(result => console.log(result));
  }
}
