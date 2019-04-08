import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {WebsoketService} from "./service/websoket.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'np-app';

  constructor(private http: HttpClient, private websoketService: WebsoketService) {

  }

  ngOnInit(): void {
    // this.http.get<String>("api/home").subscribe(result => console.log(result));
    // this.http.post("api/create", {"qq":"123"}).subscribe(result => console.log(result));
    // this.websoketService.initializeWebSocketConnection();
  }

  sendMessage(message): void {
    // this.websoketService.sendMessage("qqq");
    // this.websoketService.sendMessage("www");
    // this.websoketService.getData("0.001", "1044");
    // this.websoketService.getData("0.001", "4327");
    this.websoketService.getWholeLineData("0.001");
    // this.websoketService.getConnection().then(client => console.log("qwe"));
  }
}
