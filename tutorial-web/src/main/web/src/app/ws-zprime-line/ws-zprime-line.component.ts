import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { MainGraphService } from '../graph/main-graph.service';

@Component({
  selector: 'app-ws-zprime-line',
  templateUrl: './ws-zprime-line.component.html',
  styleUrls: ['./ws-zprime-line.component.css']
})
export class WsZprimeLineComponent implements OnInit {

  requestData = this.fb.group({
    ksi: [null, [Validators.required, this.isDouble]],
  });

  constructor(private fb: FormBuilder, public mainGraphService: MainGraphService) { }

  ngOnInit() {
    this.mainGraphService.getLinesInfo();
  }

  public isDouble(control: AbstractControl): ValidationErrors | null {
    let value = Number.parseFloat(control.value);
    if (Number.isNaN(value)) {
      return {isNotDouble:'It is not valid double value'};
    }
    return null;
  }

  public requestLine() {
    this.mainGraphService.requestLine(this.requestData.controls.ksi.value);
  }

}
