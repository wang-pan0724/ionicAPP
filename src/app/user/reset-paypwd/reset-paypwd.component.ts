import { Component, OnInit } from '@angular/core';
import { SignService } from '../../services/sign.service'
import { AppConfig } from '../../services/app-config';
import { Router } from '@angular/router'
import { HttpClient } from "@angular/common/http";

@Component({
  selector: 'app-reset-paypwd',
  templateUrl: './reset-paypwd.component.html',
  styleUrls: ['./reset-paypwd.component.css']
})
export class ResetPaypwdComponent implements OnInit {
  public title:string = '重置支付密码';
  public phoneNumList = ['', '', '', '', '', '', '', '', '', '', ''];
  public numberList = ['', '', '', '', '', ''];
  public phone = ''
  public code = "";
  public NewPwd = "";
  public reNewpwd = "";
  public step = 0;
  public showPop: boolean = false;
  public showTips: any = "";
  constructor(private signService: SignService, private http: HttpClient, private router: Router) { }

  ngOnInit() {
  }

  checkPwd(number){
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
  }

  change(str) {
    var number = str.value;
    var reg = /^[0-9]*$ /;
    if (number.length > 11 || reg.test(number)) {
      return false;
    }
    var arr = number.split('');
    for (var i = 0; i < this.phoneNumList.length; i++) {
      if (arr[i]) {
        this.phoneNumList[i] = arr[i];
      } else {
        this.phoneNumList[i] = '';
      }
    }

    if (number.length == 11) {
      this.getPhoneCode()
    }
  }

  getPhoneCode(){
    let data = {
      'phone':this.phone,
      'tag':4
    }
    let that = this;
    this.http.post(AppConfig.baseUrl + '/m/consumer/phoneCode.do?' + this.signService.getStrUrl(data), AppConfig.httpOptions).subscribe(response => {
      console.log(response)
      if(response['ro']['code']=='0000'){
        that.step += 1;
      }else{
        that.showPopFun(response['ro']['msg'])
      }
    });
  }

  setPhoneCode(num) {
    var number = num.value;
    var reg = /^[0-9]*$ /;
    if (number.length > 6 || reg.test(number)) {
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

    if (number.length == 6) {
      this.resetPayPwdCheck();
     
      this.numberList = ['', '', '', '', '', ''];
    }
  }
  
  setNewPwd(num){
    var number = num.value;
    this.checkPwd(number);
    if (number.length == 6) {
      this.step += 1;
      this.numberList = ['', '', '', '', '', ''];
    }
  }
  
  resetNewPwd(num){
    var number = num.value;
    this.checkPwd(number);

    if (number.length == 6) {
      console.log(this.NewPwd)
      console.log(this.reNewpwd)
      if(this.NewPwd == this.reNewpwd){
        this.resetPayPwd()
      }else{
        this.showPopFun("两次输入密码不同，请重新设置");
        this.step = 2;
      }
      
      this.numberList = ['', '', '', '', '', ''];
    }
  }

  resetPayPwdCheck(){
    let data = {
      'code': this.code,
      'phone': this.phone
    }
    let that = this;    
    this.http.post(AppConfig.baseUrl + '/m/consumer/resetPayPwdCheck.do?' + this.signService.getStrUrl(data), AppConfig.httpOptions).subscribe(response => {
      console.log(response)
      that.code = '';
      if(response['ro']['code']=='0000'){
        that.step += 1;
      }else{
        that.showPopFun(response['ro']['msg'])
      }
    });
  }

  resetPayPwd(){
    let data = {
      'type': 0,
      'payPassword': this.reNewpwd
    }

    let that = this;
    
    this.http.post(AppConfig.baseUrl + '/m/consumer/resetPayPwd.do?' + this.signService.getStrUrl(data), AppConfig.httpOptions).subscribe(response => {
      console.log(response)
      that.reNewpwd = '';
      that.NewPwd = '';
      if(response['ro']['code']=='0000'){
        that.showPopFun('修改支付密码成功！')
        window.setTimeout(()=>{
          that.router.navigate(['/mine']);
        },1500);
        window.setTimeout(()=>{
          that.router.navigate(['/mine/userinfo']);
        },1550); 
      }else{
        that.step = 2;
        that.showPopFun(response['ro']['msg'])
      }
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


}
