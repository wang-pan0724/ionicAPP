import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.css']
})
export class ConfirmComponent implements OnInit {
  @Input() showConfirmPop: boolean;
  @Output() confirm = new EventEmitter();
  constructor() { }

  ngOnInit() {
  }

  confirmClick(){
    this.confirm.emit();
  }
}
