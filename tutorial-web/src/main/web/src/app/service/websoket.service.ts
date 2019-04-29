import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';

@Injectable({
  providedIn: 'root'
})
export class WebsoketService {
  private requestsInProgress = 0;
  private requestsCompleted = 0;
  private requestsLimit = 2;
  private serverUrl = environment.wsScoketUrl
  private stompClientPromise;
  private stompClient;
  private queue = [];

  constructor() {
    let ws = new SockJS(this.serverUrl);
    this.stompClient = Stomp.over(ws);
    let that = this;
    this.stompClientPromise = new Promise(resolve => {
        this.stompClient.connect({}, () => resolve(this.stompClient));
    });
  }

  public getRequestsInProgress(): number {
    return this.requestsInProgress;
  }

  public pointReceived() {
    this.requestsInProgress--;
    this.requestsCompleted++;
    this.requestFromQueue();
  }

  public requestFromQueue() {
    if (this.getQueueLength() == 0) {
      return;
    }
    const request: any = this.queue.shift();
    this.getData(request.ksi, request.mass);
  }

  public getQueueLength(): number {
    return this.queue.length;
  }

  public getRequestsCompleted(): number {
    return this.requestsCompleted;
  }

  public getRequestsLimit(): number {
    return this.requestsLimit;
  }

  // This is not save when commection was lost; Should chech CONNECTED status for client and if need reconnect
  public getConnection(): Promise<any> {
    return this.stompClientPromise;
  }

  getData(ksi, mass): void {
    this.getConnection().then(stompClient => {
      if (this.getRequestsInProgress() >= this.getRequestsLimit()) {
        this.queue.push({ksi, mass});
        return stompClient;
      }
      this.requestsInProgress++;
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
