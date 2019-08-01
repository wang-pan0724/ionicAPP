import { Component, OnInit } from '@angular/core';
import { SignService } from '../../services/sign.service'
import { AppConfig } from '../../services/app-config';
import { Router } from '@angular/router'
import { HttpClient } from "@angular/common/http";

@Component({
  selector: 'app-change-loginpassword',
  templateUrl: './change-loginpassword.component.html',
  styleUrls: ['./change-loginpassword.component.css']
})
export class ChangeLoginpasswordComponent implements OnInit {
  title = '修改登录密码';
  public oldPwd:string = "";
  public newPwd:string = "";
  public rePwd:string = "";
  public showPop: boolean = false;
  public showTips: any = "";
  constructor(private signService: SignService, private http: HttpClient, private router: Router) { }

  ngOnInit() {
  }

  commitPwd(){
    if(this.newPwd !== this.rePwd){
      this.showPopFun("新密码和确认密码不一致");
      return;
    }
    let oldPassword =  this.signService.getPassword(this.oldPwd);
    let newPassword =  this.signService.getPassword(this.newPwd);
    let data = {
      'oldPassword':oldPassword,
      'newPassword':newPassword
    }

    this.http.post(AppConfig.baseUrl + '/m/consumer/modifyPwd.do?' + this.signService.getStrUrl(data), AppConfig.httpOptions).subscribe(response => {
      // this.changeNicknameData(response)
      console.log(response)
      this.doResponseData(response)
    });
  }

  doResponseData(res){
    if(res.ro.code != '0000'){
      this.showPopFun(res.ro.msg);
    }else{
      this.showPopFun(res.ro.msg);
      window.setTimeout(() => {
        this.router.navigate(['/mine/userinfo']);
      }, 1000);
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
