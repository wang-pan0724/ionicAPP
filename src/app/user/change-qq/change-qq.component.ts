import { Component, OnInit } from '@angular/core';
import { SignService } from '../../services/sign.service'
import { AppConfig } from '../../services/app-config';
import { Router } from '@angular/router'
import { HttpClient } from "@angular/common/http";

@Component({
  selector: 'app-change-qq',
  templateUrl: './change-qq.component.html',
  styleUrls: ['./change-qq.component.css']
})
export class ChangeQQComponent implements OnInit {
  public title = "修改QQ账号";
  public QQnum: string = "";
  public showPop: boolean = false;
  public showTips: any = "";
  public payPassword: any = "";
  public showPwdPop: boolean = false;
  public showConfirmPop: boolean = false;
  public isSetPlatPayPwd: number;
  public loginData: any
  constructor(private signService: SignService, private http: HttpClient, private router: Router) { }

  ngOnInit() {
    this.loginData = JSON.parse(localStorage.getItem('loginData'))
    this.getData();
  }

  getPwd(pwd) {
    console.log(pwd)
    this.payPassword = pwd;
    this.checkPayPwd()
  }

  getClosePop(close) {
    console.log(close);
    this.payPassword = "";
    this.showPwdPop = close;
  }

  confirm() {
    this.showConfirmPop = false;
    this.loginData.resp.qq = this.QQnum;
    localStorage.setItem('loginData', JSON.stringify(this.loginData))
    this.router.navigate(['/mine']);
    setTimeout(() => {
      this.router.navigate(['/mine/userinfo/']);
    }, 50)
  }

  clearCode() {
    this.QQnum = "";
  }

  changeQQ() {
    if (this.QQnum.length < 4) {
      this.showPopFun("请输入正确的QQ账号");
    }

    if (this.isSetPlatPayPwd == 0) {
      this.router.navigate(['/mine/userinfo/setpaypassword'])
    } else {
      this.showPwdPop = true;
    }
  }

  checkPayPwd() {
    let data = {
      'type': 1,
      'payPassword': this.payPassword
    }

    this.http.post(AppConfig.baseUrl + '/m/consumer/checkPayPwd.do?' + this.signService.getStrUrl(data), AppConfig.httpOptions).subscribe(response => {
      this.doResponsePwdData(response)
    });
  }

  doResponsePwdData(res) {
    this.payPassword = '';
    this.showPwdPop = false;
    if (res.ro.code == '0000') {
      let data = {
        'snsAccountType': 2,
        'qq': this.QQnum
      }

      this.http.post(AppConfig.baseUrl + '/m/consumer/modifySnsAccount.do?' + this.signService.getStrUrl(data), AppConfig.httpOptions).subscribe(response => {
        this.modifySnsAccount(response)
        console.log(response)
      });
    } else {
      this.showPopFun(res.ro.msg);
    }
  }

  modifySnsAccount(res) {
    if (res.ro.code == '0000') {
      this.showConfirmPop = true;
    } else {
      this.showPop = true;
      this.showTips = res.ro.msg;
    }
  }

  getData() {
    let data = {
      'type': 3
    }
    this.http.post(AppConfig.baseUrl + '/m/consumer/queryStatus.do?' + this.signService.getStrUrl(data), AppConfig.httpOptions).subscribe(response => {
      this.doResponseData(response)
    });
  }

  doResponseData(res) {
    if (res.resp.isSetQQ == 1) {
      this.title = "修改QQ账号";
      this.QQnum = this.loginData.resp.qq;
    } else {
      this.title = "绑定QQ账号";
    }

    this.isSetPlatPayPwd = res.resp.isSetPlatPayPwd;
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

}
