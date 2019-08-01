import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-teade-agreements',
  templateUrl: './teade-agreements.component.html',
  styleUrls: ['./teade-agreements.component.css']
})
export class TeadeAgreementsComponent implements OnInit {
  public title:string = '彩票评估和回购交易协议'
  constructor() { }

  ngOnInit() {
  }

}
