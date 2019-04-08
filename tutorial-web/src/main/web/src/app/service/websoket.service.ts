import { Injectable } from '@angular/core';
import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';

@Injectable({
  providedIn: 'root'
})
export class WebsoketService {
  private serverUrl = 'http://localhost:8090/socket'
  private title = 'WebSockets chat';
  private stompClientPromise;
  private stompClient;

  constructor() {
    let ws = new SockJS(this.serverUrl);
    this.stompClient = Stomp.over(ws);
    let that = this;
    this.stompClientPromise = new Promise(resolve => {
        this.stompClient.connect({}, () => resolve(this.stompClient));
    });
  }

  public getConnection(): Promise<any> {
    return this.stompClientPromise;
  }

  sendMessage(message): void {
    this.stompClient.send("/app/send/message", {}, message);
  }

  getData(ksi, mass): void {
    this.stompClient.send("/app/get-data", {}, JSON.stringify({ ksi, mass }));
  }

  getWholeLineData(ksi): void {
    this.stompClient.send("/app/get-data-all", {}, JSON.stringify({ ksi }));
  }
}
