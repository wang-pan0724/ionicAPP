import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-agreement',
  templateUrl: './agreement.component.html',
  styleUrls: ['./agreement.component.css']
})
export class AgreementComponent implements OnInit {
  public title:string = '“彩e通”平台服务协议'
  constructor() { }

  ngOnInit() {
  }

}
