import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router'
import { SignService } from '../services/sign.service'
import { AppConfig } from '../services/app-config';
import { HttpClient } from "@angular/common/http";

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {
  
  title = "找回密码";
  public tel:any;
  public code:any;
  public showPop: boolean = false;
  public showTips: any = "";
  public sendCode:boolean = false;
  public seconds;
  constructor(private signService:SignService,private router: Router,private http: HttpClient) { }

  ngOnInit() {
  }

  next(){
    if (!!!this.tel || this.tel.length != 11) {
      this.showPopFun("手机号输入错误")
      return;
    }

    if(!!!this.code){
      this.showPopFun("验证码输入错误");
      return;
    }

    this.findPwdCheck(this.tel,this.code)
  }

  findPwdCheck(phone,code){
    let data = {
      "code":code,
      "phone":phone
    }

    this.http.post(AppConfig.baseUrl + '/m/consumer/findPwdCheck.do?'+ this.signService.getStrUrl(data), AppConfig.httpOptions).subscribe(response => {
      this.doData(response)
    });
  }

  getCode(){
    if(this.tel == null){
      this.showPopFun("请输入11位手机号")
      return;
    }
    if (this.tel.length != 11 && this.tel != '') {
      this.showPopFun("请输入正确手机号")
      return;
    }

    this.sendCode = true
    this.seconds = 120
    var that = this;
    var endTime = new Date().getTime() + 120000;
    var timeIn = setInterval(function () {
      var nowTime = new Date().getTime()
      
      if (nowTime > endTime) {
        clearInterval(timeIn)
        that.sendCode = false
      }else{
        that.seconds = parseInt(((endTime - nowTime)/1000)+'')
      }
    }, 1000);

    let data = {
      "account":this.tel,
      "phone":this.tel,
      "tag":1
    }

    this.http.post(AppConfig.baseUrl + '/m/consumer/phoneCode.do?'+ this.signService.getStrUrl(data), AppConfig.httpOptions).subscribe(response => {
      // this.doData(response)
      this.showPopFun(response["ro"]["msg"]);
    });
  }

  doData(res){
    let navigationExtras:NavigationExtras = {
      queryParams:{
        "phone":this.tel
      }
    }
    if(res.ro.code !== '0000'){
      this.showPopFun(res.ro.msg);
    }else{
      this.router.navigate(['/mine/forgotpwdcheckcode'],navigationExtras);
    }
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
