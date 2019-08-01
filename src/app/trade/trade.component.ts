import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from "@angular/common/http";
import { SignService } from '../services/sign.service'
import { AppConfig } from '../services/app-config';

@Component({
  selector: 'app-trade',
  templateUrl: './trade.component.html',
  styleUrls: ['./trade.component.css']
})
export class TradeComponent implements OnInit {

  public title = "我的方案"
  public GameIddata: any[] = [{
    id: 0,
    label: '全部'
  }, {
    id: 407,
    label: '竞彩足球'
  }, {
    id: 406,
    label: '竞彩篮球'
  }];
  public winStatus: any = [{
    id: 0,
    label: '全部'
  }, {
    id: 1,
    label: '待开奖'
  }, {
    id: 2,
    label: '未中奖'
  }, {
    id: 3,
    label: '已中奖'
  }];
  public planStatus: any = [{
    id: 0,
    label: '全部'
  }, {
    id: 1,
    label: '待出票'
  }, {
    id: 2,
    label: '出票成功'
  }, {
    id: 3,
    label: '方案失败'
  }, {
    id: 5,
    label: '待接单'
  }];
  public tradeData: any = []
  public value = '全部彩种';
  public value2 = "中奖状态";
  public value3 = "方案状态";
  public pageNo: number = 1;
  public ps = 10;
  public realTimeQuery: boolean = true;
  public type: number = 0;
  public isDanguan: number = 0;
  public gameId: number = 0;
  public winStatusId: number = 0;
  public planStatusId: number = 0;
  public showPop: boolean = false;
  public showTips: any = "";
  public tradePop: boolean = false;
  public popIndex: number = 5;
  public planAmount: number = 0.00;
  public popData: any;
  private interval:any;
  public seconds:number = 7;
  public haveNextPage:boolean = false;
  constructor(private signService: SignService, private router: Router, private http: HttpClient) { }

  ngOnInit() {
    this.getData()
  }

  getData() {
    if(this.planStatusId == 0){
      this.type = 0;
    }else{
      this.type = 1;
    }
    let data = {
      'winStatus': this.winStatusId,
      'gameId': this.gameId,
      'planStatus': this.planStatusId,
      'isDanguan': this.isDanguan,
      'pn': this.pageNo,
      'ps': this.ps,
      'type': this.type,
      'realTimeQuery': this.realTimeQuery
    }

    var that = this;
    this.http.get(AppConfig.baseUrl + '/m/plan/queryAll.do?' + this.signService.getStrUrl(data), AppConfig.httpOptionsApiVersion).subscribe(response => {
      console.log(response);
      that.doData(response)
    });
  }

  onScrollRefresh() {
    console.log("下拉刷新");
    this.pageNo = 1;
    this.tradeData = [];
    this.getData()
  }

  onNextPage() {
    console.log('刷新下一页啦...');
    this.pageNo += 1;
    this.getData()
  }

  doData(res) {
    console.log(res)
    if (res.ro.code == '0000') {
      this.tradeData = this.tradeData.concat(res.resp.list);
      // console.log(this.tradeData)
      if(res.resp.totalPage > this.pageNo){
        this.haveNextPage = true;
      }else{
        this.haveNextPage = false;
      }
    } else {
      this.showPopFun(res.ro.msg);
    }
  }

  checkGameId(e) {
    console.log(e)
    this.gameId = e.id;
    this.tradeData = [];
    if (e.id == 0) {
      this.value = "全部彩种"
    } else {
      this.value = e.label
    }
    this.pageNo = 1;
    this.getData()
  }

  checkWinStatus(e) {
    this.winStatusId = e.id;
    this.tradeData = [];
    console.log(e)
    if (e.id == 0) {
      this.value2 = "中奖状态"
    } else {
      this.value2 = e.label;
    }
    this.pageNo = 1;
    this.getData()
  }

  checkPlanStatus(e) {
    console.log(e)
    this.planStatusId = e.id;
    this.tradeData = [];
    if (e.id == 0) {
      this.value3 = "方案状态"
    } else {
      this.value3 = e.label;
    }
    this.pageNo = 1;
    this.getData()
  }

  teadeDetail(list) {
    this.router.navigate(['trade/tradedetail'], { queryParams: { planNo: list.planNo, orderId: list.orderId, orderNo: list.orderNo } });
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

  // 设置金额
  setPrice(item) {
    console.log(item);
    this.planAmount = item.planPrice.split(' ')[1];
    this.popData = item;
    this.popData.min = Number(item.planPrice.split(' ')[1]);
    this.popData.max = Number(item.maxBudgetPrize)
    if (item.isAutoMatic) {
      this.tradePop = true;
      this.popIndex = 0;
    } else {
      this.tradePop = true;
      this.popIndex = 1;
    }
  }

  // 发起交易
  tradeOrder(item) {
    this.popData = item;
    if (item.isAutoMatic) {
      this.tradePop = true;
      this.popIndex = 3;
    } else {
      this.tradePop = true;
      this.popIndex = 2;
      this.tradeNext(item);
    }
  }

  // 确认发起交易
  confirmTradeOrder(item) {
    console.log(item);
    clearInterval(this.interval);
    var data = {
      planNo: item.planNo,
      amount:this.planAmount
    }
    var that = this;
    that.tradePop = false;
    this.http.get(AppConfig.baseUrl + '/m/plan/planRepo.do?' + this.signService.getStrUrl(data), AppConfig.httpOptionsApiVersion).subscribe(response => {
      console.log(response);
      that.doTradeData(response)
    });
  }

  // 继续发起交易
  tradeNext(item){
    console.log(item)
    this.getLastPlanPrice(item);
    this.tradePop = true;
    this.popIndex = 2;
    this.seconds = 7;
    this.planAmount = 0.00;
    this.getInterval(item)
  }

  // 定时询价
  getInterval(item){
    var that = this;
    that.interval = setInterval(()=>{
      if(that.seconds == 0){
        that.seconds = 7;
        that.getLastPlanPrice(item)
      }else{
        that.seconds --;
      } 
    },1000);
  }

  getLastPlanPrice(item){
    var data = {
      planNo: item.planNo,
    }
    var that = this;
    this.http.get(AppConfig.baseUrl + '/m/plan/lastPlanPrice.do?' + this.signService.getStrUrl(data), AppConfig.httpOptionsApiVersion).subscribe(response => {
      console.log(response);
      if(response['ro'].code == '0000'){
        that.planAmount = response['resp'].curPrice
      }
    });
  }

  // 取消自动交易
  cancelTrade(item) {
    var data = {
      planNo: item.planNo,
    }
    var that = this;
    that.tradePop = false;
    this.http.get(AppConfig.baseUrl + '/m/plan/updAutomaticStatus.do?' + this.signService.getStrUrl(data), AppConfig.httpOptionsApiVersion).subscribe(response => {
      console.log(response);
      that.doTradeData(response)
    });
  }

  // 设置自动交易
  setAutoTrade(item) {
    var data = {
      planNo: item.planNo,
      amount: this.planAmount
    }
    var that = this;
    that.tradePop = false;
    this.http.get(AppConfig.baseUrl + '/m/plan/saveAutomaticRepo.do?' + this.signService.getStrUrl(data), AppConfig.httpOptionsApiVersion).subscribe(response => {
      console.log(response);
      that.doTradeData(response)
    });
  }

  doTradeData(response) {
    var that = this;
    that.showPopFun(response['ro'].msg)
    if (response['ro'].code == '0000') {
      window.setTimeout(function () {
        that.tradeData = [];
        that.getData();
      }, 2500);
    }
  }

  // 滑块值
  changeValue(e) {
    // console.log(e)
    this.planAmount = e;
  }

  // 关闭弹窗
  closePop() {
    clearInterval(this.interval)
    this.tradePop = false;
  }

  ngOnDestroy(): void {
    clearInterval(this.interval)  
  }

}
