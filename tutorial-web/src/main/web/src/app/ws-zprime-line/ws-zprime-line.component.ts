import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MainGraphService } from '../graph/main-graph.service';
import { DoubleValidator } from '../ws-control/double.validator';

@Component({
  selector: 'app-ws-zprime-line',
  templateUrl: './ws-zprime-line.component.html',
  styleUrls: ['./ws-zprime-line.component.css']
})
export class WsZprimeLineComponent implements OnInit {

  requestData = this.fb.group({
    ksi: [null, [Validators.required, DoubleValidator.isDouble]],
    events: [null, [Validators.required]],
    cycles: [null, [Validators.required]],
  });

  constructor(private fb: FormBuilder, public mainGraphService: MainGraphService) { }

  ngOnInit() {
    this.mainGraphService.getLinesInfo();
  }


  public requestLine() {
    this.mainGraphService.requestLine(
      this.requestData.controls.ksi.value,
      this.requestData.controls.events.value,
      this.requestData.controls.cycles.value,
    );
  }

  public removeLine(lineKey) {
    this.mainGraphService.removeLine(lineKey);
  }

}
