import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-ws-zprime-line',
  templateUrl: './ws-zprime-line.component.html',
  styleUrls: ['./ws-zprime-line.component.css']
})
export class WsZprimeLineComponent implements OnInit {

  requestData = this.fb.group({
    ksi: [null, Validators.required],
  });

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
  }

}
