import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-set-paypwd',
  templateUrl: './set-paypwd.component.html',
  styleUrls: ['./set-paypwd.component.css']
})
export class SetPaypwdComponent implements OnInit {
  public title = "管理支付密码";
  public isSetUserInfo:any;
  constructor() { }

  ngOnInit() {
    this.isSetUserInfo = JSON.parse(localStorage.getItem("isSetUserInfo"));
    console.log(this.isSetUserInfo)
  }
}
