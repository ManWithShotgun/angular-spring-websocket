import { Injectable } from '@angular/core';
import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';

@Injectable({
  providedIn: 'root'
})
export class WebsoketService {
  private serverUrl = 'http://localhost:8090/socket'
  private title = 'WebSockets chat';
  private stompClient;
  constructor() { }

  initializeWebSocketConnection(): void {
    let ws = new SockJS(this.serverUrl);
    this.stompClient = Stomp.over(ws);
    let that = this;
    this.stompClient.connect({}, function(frame) {
      that.stompClient.subscribe("/user/chat/reply", (message) => {
        if(message.body) {
          // $(".chat").append("<div class='message'>"+message.body+"</div>")
          console.log(message.body);
        }
      });
    });
  }

  sendMessage(message): void {
    this.stompClient.send("/app/send/message" , {}, message);
    // $('#input').val('');
  }
}
