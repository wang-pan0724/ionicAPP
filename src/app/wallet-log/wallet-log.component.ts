import { Component, OnInit } from '@angular/core';
import { SignService } from '../services/sign.service'
import { AppConfig } from '../services/app-config'
import { HttpClient } from "@angular/common/http";

@Component({
  selector: 'app-wallet-log',
  templateUrl: './wallet-log.component.html',
  styleUrls: ['./wallet-log.component.css']
})
export class WalletLogComponent implements OnInit {
  public title: string = '交易记录';
  public value = '全部';
  public navData: any = [
    {
      label: "全部",
      id: 0
    },
    {
      label: "出票",
      id: 1
    },
    {
      label: "中奖",
      id: 3
    },
    {
      label: "交易",
      id: 5
    },
    {
      label: "预存彩金",
      id: 6
    },
    {
      label: "提款",
      id: 2
    },
    {
      label: "奖励",
      id: 7
    }
  ];

  public dayLength:Object = [
    {
      id: 0,
      len:0,
      label:"今天"
    },
    {
      id: 1,
      len:7,
      label:"一周"
    },
    {
      id: 2,
      len:30,
      label:"一月"
    },
    {
      id: 3,
      len:90,
      label:"三月"
    }
  ];
  public dayLen:number = 7;
  public dayLenLabel:string = "一周"
  public switchIndex: number = 0;
  public navList: any = [];
  public pn: number = 1;
  public ps: number = 20;
  public haveData: boolean = true;
  public haveNextPage:boolean = false;
  constructor(private signService: SignService, private http: HttpClient) { }

  ngOnInit() {
    this.getData()
  }
  getData() {
    let data = {
      'transType': this.switchIndex,
      'pn': this.pn,
      'dayLen': this.dayLen,
      'ps': this.ps
    }
    var that = this;
    this.http.get(AppConfig.baseUrl + '/m/charge/queryWalletLog.do?' + this.signService.getStrUrl(data)).subscribe(response => {
      console.log(response)
      that.doData(response)
    });
  }

  doData(res) {
    if (res.ro.code == '0000') {
      this.navList = this.navList.concat(res.resp.list);
      if (res.resp.totalPage > res.resp.pageNo) {
        this.haveData = true;
      } else {
        this.haveData = false;
      }
    }
  }

  changeDayLen(item){
    console.log(item)
    this.dayLen = item.len;
    this.dayLenLabel = item.label;
    this.pn = 1;
    this.navList = [];
    this.getData()
  }

  changeNavData(item){
    this.switchIndex = item.id;
    this.value = item.label
    this.navList = [];
    this.haveData = false;
    this.getData()
  }

  onScrollRefresh() {
    console.log("下拉刷新");
    this.pn = 1;
    this.navList = []
    this.getData()
  }

  onNextPage() {
    console.log('刷新下一页啦...');
    // this._IsNextPageFinish = true;
    if (this.haveData) { 
      this.pn += 1;
      this.getData()
    }
  }
}
