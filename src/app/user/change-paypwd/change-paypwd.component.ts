import { Component, OnInit } from '@angular/core';
import { SignService } from '../../services/sign.service'
import { AppConfig } from '../../services/app-config';
import { Router } from '@angular/router'
import { HttpClient } from "@angular/common/http";

@Component({
  selector: 'app-change-paypwd',
  templateUrl: './change-paypwd.component.html',
  styleUrls: ['./change-paypwd.component.css']
})
export class ChangePaypwdComponent implements OnInit {
  public title:string = '修改支付密码';
  public numberList = ['', '', '', '', '', ''];
  public oldPwd = "";
  public NewPwd = "";
  public reNewpwd = "";
  public step = 1;
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

  changeOldPwd(num) {
    var number = num.value;
    this.checkPwd(number);

    if (number.length == 6) {
      this.checkPayPwd();
     
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
        this.modifyPayPwd()
      }else{
        this.NewPwd = "";
        this.reNewpwd = "";
        this.showPopFun("两次输入密码不同，请重新设置");
        this.step = 2;
      }
      
      this.numberList = ['', '', '', '', '', ''];
    }
  }

  checkPayPwd(){
    let data = {
      'type': 0,
      'payPassword': this.oldPwd
    }

    console.log(this.oldPwd)

    let that = this;
    
    this.http.post(AppConfig.baseUrl + '/m/consumer/checkPayPwd.do?' + this.signService.getStrUrl(data), AppConfig.httpOptions).subscribe(response => {
      console.log(response)
      if(response['ro']['code']=='0000'){
        that.step += 1;
      }else{
        this.oldPwd = ""
        that.showPopFun(response['ro']['msg'])
      }
    });
  }

  modifyPayPwd(){
    let data = {
      'type': 0,
      'payPassword': this.reNewpwd
    }

    let that = this;
    
    this.http.post(AppConfig.baseUrl + '/m/consumer/modifyPayPwd.do?' + this.signService.getStrUrl(data), AppConfig.httpOptions).subscribe(response => {
      console.log(response)
      if(response['ro']['code']=='0000'){
        that.showPopFun('修改支付密码成功！')
        window.setTimeout(e=>{
          history.go(-1);
          // that.router.navigate(['/mine/userinfo/setpaypwd']);
        },1500); 
      }else{
        this.NewPwd = ''
        this.reNewpwd = ""
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
