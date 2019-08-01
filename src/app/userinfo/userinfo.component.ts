import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SignService } from '../services/sign.service'
import { AppConfig } from '../services/app-config';
import { HttpClient } from "@angular/common/http";

@Component({
  selector: 'app-userinfo',
  templateUrl: './userinfo.component.html',
  styleUrls: ['./userinfo.component.css']
})
export class UserinfoComponent implements OnInit {

  title = "个人信息";
  imageUrl = "../../assets/userLogo.png"
  public userInfo: any = [];
  public isSetUserInfo: any = [];
  public imgaeData: any;

  constructor(private router: Router, private signService: SignService, private http: HttpClient) { }

  ngOnInit() {
    this.userInfo = JSON.parse(localStorage.getItem('loginData')).resp
    this.getData()
  }

  getData() {
    let data = {
      'type': 3
    }

    this.http.post(AppConfig.baseUrl + '/m/consumer/queryStatus.do?' + this.signService.getStrUrl(data), AppConfig.httpOptions).subscribe(response => {
      // this.doRegeisterData(response)
      console.log(response)
      this.isSetUserInfo = response['resp'];
      localStorage.setItem('isSetUserInfo',JSON.stringify(response['resp']))
    });
  }

  upLoadImg(e) {
    console.log(this.imgaeData)
    let file: File = this.imgaeData;
    let formData: FormData = new FormData();
    formData.append('uploadFile', file, file.name);

    this.http.post(AppConfig.baseUrl + '/m/file/upload?', this.signService.getStrUrl(formData), AppConfig.httpOptions).subscribe(response => {
      console.log(response)
      // this.isSetUserInfo = response['resp']
    });
  }

  signOut() {
    window.localStorage.clear();
    setTimeout(() => {
      this.router.navigate(['/mine']);
    }, 1000);
  }

}
