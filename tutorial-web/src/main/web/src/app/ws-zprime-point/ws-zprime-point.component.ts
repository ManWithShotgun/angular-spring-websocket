import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-ws-zprime-point',
  templateUrl: './ws-zprime-point.component.html',
  styleUrls: ['./ws-zprime-point.component.css']
})
export class WsZprimePointComponent implements OnInit {

  requestData = this.fb.group({
    ksi: [null, Validators.required],
    mass: [null, Validators.required],
  });

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
  }

}
