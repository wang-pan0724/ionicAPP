import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { SignService } from '../services/sign.service'
import { AppConfig } from '../services/app-config';
import { Router } from '@angular/router'
import { HttpClient } from "@angular/common/http";

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  @ViewChild('passwordType',{static: false}) passwordType: ElementRef
  public title: string = "手机注册";
  public sendCode: boolean = false;
  public seconds:number;
  public showPop: boolean = false;
  public showTips: any = "";
  public val: any;
  public tel = "";
  public code: any;
  public providerInvite: any;
  public password: any = '';

  constructor(private signService: SignService, private http: HttpClient, private router: Router) { }

  ngOnInit() {
    this.tel = localStorage.getItem('userName') != 'null' ? localStorage.getItem('userName') : '';
    this.password = localStorage.getItem('userPassword') != 'null' ? localStorage.getItem('userPassword') : '';
    this.code = localStorage.getItem('userPhoneCode') != 'null' ? localStorage.getItem('userPhoneCode') : '';
    this.providerInvite = localStorage.getItem('userProviderInvite') != 'null' ? localStorage.getItem('userProviderInvite') : ''
  }

  visible(e) {
    if (e.target.className == "iconfont icon-eye-slash") {
      e.target.className = "iconfont icon-eye";
      this.passwordType.nativeElement.type = "text";
    } else {
      e.target.className = "iconfont icon-eye-slash";
      this.passwordType.nativeElement.type = "password"
    }
  }

  handle(e) {
    console.log(e)
    this.val = e;
  }

  submit() {
    this.signService.getsecretkey();

    if (this.tel.length != 11) {
      this.showPopFun("手机号输入错误")
      return;
    }

    if (this.passwordType.nativeElement.value.length < 6 || this.passwordType.nativeElement.value.length > 15) {
      this.showPopFun("请输入6-15位密码");
      return;
    }

    var regu = "^[0-9a-zA-Z]{6,16}$"
    var re = new RegExp(regu)
    if (!re.test(this.password)) {
      this.showPopFun("密码只能输入字母和数字");
      return;
    }

    if (!!!this.code) {
      this.showPopFun("验证码不能为空");
      return;
    }

    if (!!!this.providerInvite) {
      this.showPopFun("请填写彩店邀请码");
      return;
    }

    if (!this.val) {
      this.showPopFun("请同意平台服务协议");
      return;
    }

    // this.providerInvite ==== 969636
    window.setTimeout(e => {
      this.regeister(this.tel, this.code, this.passwordType.nativeElement.value, this.providerInvite)
    }, 1500)
  }

  regeister(phone, code, passw, providerInvite) {
    var password = this.signService.getPassword(passw);
    let data = {
      "code": code,
      "password": password,
      "phone": phone,
      "providerInvite": providerInvite
    }

    this.http.post(AppConfig.baseUrl + '/m/consumer/memberRegiste.do?' + this.signService.getStrUrl(data), AppConfig.httpOptions).subscribe(response => {
      this.doRegeisterData(response)
    });
  }

  doRegeisterData(res) {
    if (res.ro.code !== '0000') {
      this.showPopFun(res.ro.msg);
    } else {
      localStorage.setItem('sid', res.resp.sessionId);
      localStorage.setItem('loginData', JSON.stringify(res))
      this.router.navigate(['/mine']);
      
      localStorage.setItem('userName', '');
      localStorage.setItem('userPassword', '');
      localStorage.setItem('userPhoneCode', '');
      localStorage.setItem('userProviderInvite', '')
    }
  }

  getCode() {
    if (this.tel == null) {
      this.showPopFun("请输入11位手机号")
      return;
    }
    if (this.tel.length != 11 && this.tel != '') {
      this.showPopFun("请输入正确手机号")
      return;
    }

    let data = {
      'phone': this.tel,
      "tag": 0
    }
    var that = this;
    this.http.post(AppConfig.baseUrl + '/m/consumer/phoneCode.do?' + this.signService.getStrUrl(data), AppConfig.httpOptions).subscribe(response => {
      console.log(response)
      that.showPopFun(response['ro']['msg'])
    });

    this.sendCode = true;
    this.seconds = 120;
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
  }

  agreements() {
    localStorage.setItem('userName', this.tel);
    localStorage.setItem('userPassword', this.password);
    localStorage.setItem('userPhoneCode', this.code);
    localStorage.setItem('userProviderInvite', this.providerInvite)
    this.router.navigate(['/mine/agreement'])
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
