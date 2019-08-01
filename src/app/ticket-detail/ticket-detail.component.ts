import { Component, OnInit } from '@angular/core';
import { SignService } from '../services/sign.service'
import { HttpClient } from "@angular/common/http";
import { AppConfig } from '../services/app-config';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-ticket-detail',
  templateUrl: './ticket-detail.component.html',
  styleUrls: ['./ticket-detail.component.css']
})
export class TicketDetailComponent implements OnInit {
  public title: string = '出票详情';
  public planNo: string = "";
  public orderId: string = "";
  public orderNo: string = '';
  public detailList: Array<ArrayBuffer> = []
  constructor(private signService: SignService, private http: HttpClient, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    var that = this;
    this.activatedRoute.queryParams.subscribe((params) => {
      console.log(params)
      that.planNo = params.planNo;
      that.orderNo = params.orderNo;
      that.orderId = params.orderId;
    });
    this.getTradePrice()
  }

  getTradePrice() {
    var data = {
      orderNo: this.orderNo,
      planNo: this.planNo
    };
    var that = this;
    this.http.post(AppConfig.baseUrl + '/h5/query/ticketAndRemindDetailHtm5.do?' + this.signService.getStrUrl(data), { plan: this.planNo, format: 'json' }).subscribe(response => {
      console.log(response)
      that.detailList = response['detail'].list;

    });
  }


}
