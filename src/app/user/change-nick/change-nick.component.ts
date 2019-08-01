import { Component, OnInit } from '@angular/core';
import { SignService } from '../../services/sign.service'
import { AppConfig } from '../../services/app-config';
import { Router } from '@angular/router'
import { HttpClient } from "@angular/common/http";

@Component({
  selector: 'app-change-nick',
  templateUrl: './change-nick.component.html',
  styleUrls: ['./change-nick.component.css']
})
export class ChangeNickComponent implements OnInit {
  title = "修改昵称";
  haveText = false;
  public nickname = "";
  public showPop: boolean = false;
  public showTips: any = "";
  constructor(private signService: SignService, private http: HttpClient, private router: Router) { }

  ngOnInit() {
    this.nickname = JSON.parse(localStorage.getItem('loginData')).resp.nickname
  }

  commitNickname(){
    if(this.nickname.length > 15){
      this.showPopFun("最多输入15个字符");
      return;
    }

    if(this.nickname.length < 4){
      this.showPopFun("最少输入4个字符");
      return;
    }
    
    let data = {
      'nickName':this.nickname
    }

    this.http.get(AppConfig.baseUrl + '/m/consumer/modifyInfo.do?' + this.signService.getStrUrl(data), AppConfig.httpOptions).subscribe(response => {
      this.changeNicknameData(response)
      console.log(response)
    });
  }
  
  changeNicknameData(res){
    if(res.ro.code == '0000'){
      this.router.navigate(['/mine']);
    }else{
      this.showPopFun(res.ro.msg);
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
