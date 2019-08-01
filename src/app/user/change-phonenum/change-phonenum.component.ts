import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'
import { SignService } from '../../services/sign.service'
import { AppConfig } from '../../services/app-config';
import { HttpClient } from "@angular/common/http";

@Component({
  selector: 'app-change-phonenum',
  templateUrl: './change-phonenum.component.html',
  styleUrls: ['./change-phonenum.component.css']
})
export class ChangePhonenumComponent implements OnInit {
  title = "绑定手机号码";
  numberList = ['', '', '', '', '', '', '', '', '', '', ''];
  public showPop: boolean = false;
  public showTips: any = "";
  constructor(private signService: SignService, private router: Router, private http: HttpClient) { }

  ngOnInit() {
  }

  change(str) {
    var number = str.value;

    var reg = /^[0-9]*$ /;
    if (number.length > 11 || reg.test(number)) {
      return false;
    }
    var arr = number.split('');
    for (var i = 0; i < this.numberList.length; i++) {
      if (arr[i]) {
        this.numberList[i] = arr[i];
      } else {
        this.numberList[i] = '';
      }

    }

    if (number.length == 11) {
      this.modifyPhone(number)
    }
  }

  modifyPhone(number) {
    let data = {
      "account": null,
      "oldPhone": number,
      "step": 1
    }

    this.http.post(AppConfig.baseUrl + '/m/consumer/modifyPhone.do?' + this.signService.getStrUrl(data), AppConfig.httpOptions).subscribe(response => {
      this.doResponseData(response, number)
    });
  }

  showPopFun(message) {
    this.showPop = true;
    this.showTips = message;
    var that = this
    window.setTimeout(function () {
      that.showPop = false;
      that.showTips = ""
    }, 2000);
  }

  doResponseData(res, number) {
    console.log(res)
    if (res.ro.code == '0000') {
      this.router.navigate(['/mine/userinfo/changephonenext'], {
        queryParams: {
          'num': number
        }
      });
    }else{
      this.showPopFun(res.ro.msg)
    }
  }

}
