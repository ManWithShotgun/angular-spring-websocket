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

  // This is not save when commection was lost; Should chech CONNECTED status for client and if need reconnect
  public getConnection(): Promise<any> {
    return this.stompClientPromise;
  }

  getData(ksi, mass): void {
    this.getConnection().then(stompClient => {
      stompClient.send("/app/get-data", {}, JSON.stringify({ ksi, mass }));
      return stompClient;
    });
  }

  getWholeLineData(ksi): void {
    this.getConnection().then(stompClient => {
      stompClient.send("/app/get-data-all", {}, JSON.stringify({ ksi }));
      return stompClient;
    });
  }
}
