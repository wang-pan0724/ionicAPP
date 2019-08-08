import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppConfig } from '../services/app-config';
import { SignService } from '../services/sign.service'
import { HttpClient } from "@angular/common/http";

@Component({
  selector: 'app-forgotpwd-checkcode',
  templateUrl: './forgotpwd-checkcode.component.html',
  styleUrls: ['./forgotpwd-checkcode.component.css']
})
export class ForgotpwdCheckcodeComponent implements OnInit {

  @ViewChild('passwordType') passwordType: ElementRef
  public title: string = "找回密码";
  public showPop: boolean = false;
  public showTips: any = "";
  public phone:any;

  constructor(private ActivatedRoute: ActivatedRoute, private router: Router,private http: HttpClient,private signService:SignService) {
    // console.log(this.ActivatedRoute.queryParams['phone'])
    console.log(this.ActivatedRoute.queryParams['_value']['phone'])
    this.phone = this.ActivatedRoute.queryParams['_value']['phone']
  }

  ngOnInit() {

  }

  submit() {
    if (this.passwordType.nativeElement.value.length < 6 || this.passwordType.nativeElement.value.length>15) {
      this.showPopFun("请输入6-15位密码");
      return;
    }

    let data = {
      "password":this.passwordType.nativeElement.value,
      "phone":this.phone
    }

    this.http.post(AppConfig.baseUrl + '/m/consumer/findPwd.do?'+ this.signService.getStrUrl(data), AppConfig.httpOptions).subscribe(response => {
      this.doData(response)
    });
  }

  doData(res){
    if(res.ro.code !== '0000'){
      this.showPopFun(res.ro.msg);
    }else{
      this.showPopFun(res.ro.msg);
      window.setTimeout(e=>{
        this.router.navigate(['/mine/signin']);
      },1500)
    }
  }

  visible(e) {
    if (e.target.className == "iconfont icon-eye-slash") {
      e.target.className = "iconfont icon-eye";
      this.passwordType.nativeElement.type = "text";
    } else {
      e.target.className = "iconfont icon-eye-slash";
      this.passwordType.nativeElement.type = "password";
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
