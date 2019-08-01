import { Component, OnInit } from '@angular/core';
import { SignService } from '../../services/sign.service'
import { AppConfig } from '../../services/app-config';
import { Router } from '@angular/router'
import { HttpClient } from "@angular/common/http";

@Component({
  selector: 'app-set-paypassword',
  templateUrl: './set-paypassword.component.html',
  styleUrls: ['./set-paypassword.component.css']
})
export class SetPaypasswordComponent implements OnInit {
  public title:string = '设置支付密码';
  public numberList = ['', '', '', '', '', ''];
  public NewPwd = "";
  public reNewpwd = "";
  public step = 2;
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

  modifyPayPwd(){
    var password = this.signService.getPassword(this.reNewpwd.toString());
    let data = {
      'payPassword': password
    }

    let that = this;
    
    this.http.get(AppConfig.baseUrl + '/m/consumer/setPayPwd.do?' + this.signService.getStrUrl(data), AppConfig.httpOptions).subscribe(response => {
      console.log(response)
      if(response['ro']['code']=='0000'){
        that.showPopFun('设置支付密码成功！')
        window.setTimeout(e=>{
          that.router.navigate(['/mine/userinfo']);
        },1500); 
      }else{
        this.NewPwd = ""
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
