import { Component } from '@angular/core';

@Component({
selector: 'control-comp',
templateUrl: './control.component.html',
styleUrls: ['./control.component.css']
})
export class Control { 
    name= "Евгений";
    error: boolean = true;
}
