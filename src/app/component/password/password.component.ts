import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-password',
  templateUrl: './password.component.html',
  styleUrls: ['./password.component.css']
})
export class PasswordComponent implements OnInit {
  @Input() showPwdPop: boolean;
  @Output() onPwdChanged = new EventEmitter();
  @Output() onClosePop = new EventEmitter();

  public numberList = ['', '', '', '', '', ''];
  public pwd = ""
  constructor() { }

  ngOnInit() {
  }

  change(num) {
    var number = num.value;
    var reg = /^[0-9]*$ /;
    if (number.length > 6 || reg.test(number)) {
      return false;
    }
    var arr = number.split('');
    for (var i = 0; i < this.numberList.length; i++) {
      if (arr[i]) {
        this.numberList[i] = "*";
      } else {
        this.numberList[i] = '';
      }
    }

    if (number.length == 6) {
      this.onPwdChanged.emit(number);
      this.pwd = "";
      this.numberList = ['', '', '', '', '', ''];
    }
  }

  closePop() {
    this.pwd = "";
    this.numberList = ['', '', '', '', '', ''];
    this.onClosePop.emit(false);
  }

}
