import { Component, OnInit } from '@angular/core';
import { SignService } from '../../services/sign.service'
import { AppConfig } from '../../services/app-config';
import { Router } from '@angular/router'
import { HttpClient } from "@angular/common/http";

@Component({
  selector: 'app-change-weixin',
  templateUrl: './change-weixin.component.html',
  styleUrls: ['./change-weixin.component.css']
})
export class ChangeWeixinComponent implements OnInit {
  public title = "修改微信账号";
  public weixinCode: string = "";
  public showPop: boolean = false;
  public showTips: any = "";
  public payPassword: any = "";
  public showPwdPop:boolean = false;
  public showConfirmPop:boolean = false;
  public isSetPlatPayPwd:number;
  public loginData:any;
  constructor(private signService: SignService, private http: HttpClient, private router: Router) { }

  ngOnInit() {
    this.loginData = JSON.parse(localStorage.getItem('loginData'))
    this.getData();
  }

  getPwd(pwd){
    console.log(pwd)
    this.payPassword = pwd;
    this.checkPayPwd()
  }

  getClosePop(close){
    console.log(close);
    this.payPassword = "";
    this.showPwdPop = close;
  }

  confirm(){
    this.loginData.resp.weixin = this.weixinCode;
    localStorage.setItem('loginData',JSON.stringify(this.loginData))
    this.showConfirmPop = false;
    this.router.navigate(['/mine']);
    setTimeout(()=>{
     this.router.navigate(['/mine/userinfo/']);
    },50)
  }

  clearCode(){
    this.weixinCode = "";
  }

  changeWeixin() {
    if (this.weixinCode.length < 5) {
      this.showPopFun("请输入正确的微信账号");
    }

    if(this.isSetPlatPayPwd == 0){
      this.router.navigate(['/mine/userinfo/setpaypassword'])
    }else{
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

  doResponsePwdData(res){
    this.payPassword = '';
    this.showPwdPop = false;
    if(res.ro.code == '0000'){
      let data = {
        'snsAccountType': 0,
        'weixin': this.weixinCode
      }
      
      this.http.post(AppConfig.baseUrl + '/m/consumer/modifySnsAccount.do?' + this.signService.getStrUrl(data), AppConfig.httpOptions).subscribe(response => {
        this.modifySnsAccount(response)
        console.log(response)
      });
    }else{
      this.showPopFun(res.ro.msg);
    }       
  }

  modifySnsAccount(res){
    if(res.ro.code == '0000'){
      this.showConfirmPop = true;
    }else{
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
    if (res.resp.isSetWeixin == 1) {
      this.title = "修改微信账号";
      this.weixinCode = this.loginData.resp.weixin;
    } else {
      this.title = "绑定微信账号";
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
