import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SignService } from '../services/sign.service'
import { AppConfig } from '../services/app-config'
import { HttpClient } from "@angular/common/http";
import { from } from 'rxjs';

@Component({
  selector: 'app-mine',
  templateUrl: './mine.component.html',
  styleUrls: ['./mine.component.css']
})
export class MineComponent implements OnInit {
  public DataList:any;
  public title:string = "个人中心"
  constructor(private router: Router,private signService: SignService, private http: HttpClient) { 
    this.getData()
  }

  ngOnInit() {
  }

  getData(){
    let data = {}

    var that = this;
    this.http.get(AppConfig.baseUrl + '/m/consumer/account.do?' + this.signService.getStrUrl(data)).subscribe(response => {
      console.log(response)
      localStorage.setItem('loginData',JSON.stringify(response))
      that.doData(response)
    });
  }

  userInfo(){
    if(!!this.DataList){
      this.router.navigate(['/mine/userinfo'])
    }else{
      this.router.navigate(['/mine/signin'])
    }
  }

  doData(res){
    if(res.ro.code == '0000'){
      this.DataList = res.resp;
      localStorage.setItem('token',res.resp.betToken)
      // this.router.navigate(['/mine/signin']);
    }
  }

  onScrollRefresh() {
    console.log("下拉刷新");
  }

  onSlideLeft() {
    console.log('向左边滑动啦...');
  }

  onSlideRight() {
    console.log('向右边滑动..');
  }

}
