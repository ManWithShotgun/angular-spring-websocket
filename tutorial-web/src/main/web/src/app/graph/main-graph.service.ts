import { Injectable } from '@angular/core';
import { MainGraph } from './graphD3/main-graph';
import {WebsoketService} from "../service/websoket.service";


@Injectable({
  providedIn: 'root'
})
    export class MainGraphService {

    private mainGraphSelector: string = 'div#svg';
    private mainGraphInstance: MainGraph;

    constructor(private websoketService: WebsoketService) {
    }

    ngOnDestroy() {
        this.mainGraphInstance.onGraphDestroy();
    }

    public renderMain() {
        this.mainGraphInstance = new MainGraph(this.mainGraphSelector, this.websoketService);
        this.mainGraphInstance.init();
        this.requestLine('0.01', '3000', '1');
    }

    public getLinesInfo(): Array<string> {
        return this.mainGraphInstance.getLinesKsi();
    }

    public requestLine(ksi, events, cycles) {
        let lineInfo = this.mainGraphInstance.createLineInfo(ksi, events, cycles);
        if (!this.getLinesInfo().includes(lineInfo)) {
            this.mainGraphInstance.requestWholeLine(ksi, events, cycles);
        }
    }

    public removeLine(lineKey) {
        // 
        console.log('Remove: ' + lineKey);
    }


}
