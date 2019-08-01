import { Component, OnInit} from '@angular/core';
import { MenusService } from '../services/menus.service'
import { Router, ActivatedRoute } from '@angular/router';
import { SignService } from '../services/sign.service'
import { HttpClient } from "@angular/common/http";
import { AppConfig } from '../services/app-config';
import { EChartOption } from 'echarts';

@Component({
  selector: 'app-trade-detail',
  templateUrl: './trade-detail.component.html',
  styleUrls: ['./trade-detail.component.css']
})
export class TradeDetailComponent implements OnInit {

  public title = "方案详情";
  public tradeDetailData: any = [];
  public tradeDetailList: any = [];
  public tabIndex: number = 0;
  public stepsData: any = [
    {
      title: '预约出票',
      description: ''
    },
    {
      title: '站点接单',
      description: ''
    },
    {
      title: '确认出票',
      description: '',
    },
    {
      title: '实体票录入',
      description: '',
      tips: '待开奖'
    },
    {
      title: '已中奖',
      description: '',
    },
    {
      title: '已兑奖',
      description: '',
    },
  ];
  public planNo: string = "";
  public orderId: string = "";
  public orderNo: string = '';
  public navData: any = [
    {
      id: 0,
      name: '方案交易'
    },
    {
      id: 1,
      name: '方案明细'
    }
  ];
  public haveChartData: boolean = false;
  option: EChartOption = {
    tooltip: {
      trigger: 'axis',
      formatter: function (params) {
        return params[0].name + '<br/>'
          + '￥' + params[0].value;
      }
    },
    grid: {
      x: 60
    },
    xAxis: [
      {
        type: 'category',
        boundaryGap: false,
        axisLine: { onZero: true },
        data: [],
        axisTick: {
          show: false
        },
        axisLabel: {
          show: true,
          interval: 100000,
          showMinLabel: false,
          showMaxLabel: true,
        },
        splitNumber: 1,
      }
    ],
    yAxis: [
      {
        type: 'value',
        splitLine: false,
        axisTick: {
          show: false
        },
        axisLabel: {
          show: true,
          interval: 100000,
          showMinLabel: true,
          showMaxLabel: true,
        },
        splitNumber: 1
      }
    ],
    series: [
      {
        type: 'line',
        itemStyle: { normal: { areaStyle: { type: 'default' } } },
        data: [],
        symbol: 'none'
      }
    ],
    expend: true
  };
  public tradePop: boolean = false;
  public popIndex: number = 5;
  public planAmount: number = 0.00;
  public popData: any;
  private interval: any;
  public seconds: number = 7;
  public showPop: boolean = false;
  public showTips: any = "";
  public val: boolean = true;
  public echartsIntance;
  constructor(private router: Router, private signService: SignService, private http: HttpClient, private activatedRoute: ActivatedRoute, private _menusService: MenusService) { }
  ngOnInit() {
    var that = this;
    this.activatedRoute.queryParams.subscribe((params) => {
      console.log(params)
      that.planNo = params.planNo;
      that.orderNo = params.orderNo;
      that.orderId = params.orderId;
    });

    this.getQueryPlanDetailData(0);
  }

  getPlanInquiryData() {
    var data = {
      planNo: this.planNo
    };
    var that = this;
    this.http.get(AppConfig.baseUrl + '/m/plan/planInquiry.do?' + this.signService.getStrUrl(data)).subscribe(response => {
      console.log(response)
      that.doPlanInquiryData(response)
    });
  }

  queryuserfocuslcmatch(index, datalist) {
    var gameId = datalist.gameId.toString().slice(0, 3);
    var data = datalist.contentList[index].jsonContent.fxId
    var that = this;
    if (!!data) {
      if (gameId == 406) {
        this.http.get(AppConfig.leagueUrl + '/spiderWeb/basketball/appBasketballMatchInfo.do?matchUniqueIds=' + data).subscribe(response => {
          console.log(response)
          if (response['ro'].respCode == '0000' && response['matchList'].length > 0) {
            that.tradeDetailList.contentList[index].queryUserFocusMatch = response['matchList']
          }
          console.log(that.tradeDetailList)
        });
      } else {
        this.http.get(AppConfig.leagueUrl + '/spiderWeb/football/appFootballMatchInfo.do?matchUniqueIds=' + data).subscribe(response => {
          console.log(response)
          if (response['ro'].respCode == '0000' && response['matchList'].length > 0) {
            that.tradeDetailList.contentList[index].queryUserFocusMatch = response['matchList']
          }
          console.log(that.tradeDetailList)
        });
      }
    }
  }

  ticketDetail() {
    this.router.navigate(['trade/tradedetail/ticketdetail'], { queryParams: { planNo: this.planNo, orderId: this.orderId, orderNo: this.orderNo } });
  }

  continueIssu() {
    var gameId = this.tradeDetailList.gameId;
    if (gameId > 4070) {
      this.router.navigate(['/home/football'])
    } else {
      this.router.navigate(['/home/basketball'])
    }
  }

  doPlanInquiryData(data) {
    if (data.ro.code == '0000') {
      this.haveChartData = false;
      this.tradeDetailData = data.resp;
      var inquiryList = data.resp.inquiryList;
      var createTimeArr: any = [];
      var planPriceArr: any = [];
      createTimeArr.push(this.tradeDetailList.time);
      planPriceArr.push(this.tradeDetailList.amount);
      if (!!inquiryList) {
        this.haveChartData = true;
        for (var i = inquiryList.length - 1; i > -1; i--) {
          createTimeArr.push(inquiryList[i].createTime);
          planPriceArr.push(inquiryList[i].planPrice);
        }
      }else{
        this.haveChartData = false
      }
      createTimeArr[0] = createTimeArr[0] + '出票';
      createTimeArr[createTimeArr.length - 1] = '当前';
      this.option.xAxis[0].data = createTimeArr;
      this.option.series[0].data = planPriceArr; 
    } else {
      this.haveChartData = false;
    }
  }


  getQueryPlanDetailData(event) {
    var data = {
      planNo: this.planNo,
      orderNo: this.orderNo,
      orderId: this.orderId,
      payPwdreturnUrl: 'dididapiao://openType=TZPay',
      realTimeQuery: true
    };
    var that = this;
    this.http.get(AppConfig.baseUrl + '/m/plan/queryPlanDetail.do?' + this.signService.getStrUrl(data), AppConfig.httpOptionsApiVersion).subscribe(response => {
      console.log(response)
      if (event) {
        event.target.complete();
      }
      that.doQueryPlanDetailData(response)
    });
  }

  doQueryPlanDetailData(data) {
    var dataList = data.resp;
    this.option.xAxis[0].data.unshift(data.resp.openTime);
    this.option.series[0].data.unshift(data.resp.orderAmount);

    if (!!dataList.planPrice) {
      dataList.lostPrice = (Number(dataList.planPrice.split(' ')[1]) - Number(dataList.orderAmount)).toFixed(2);
    }

    if (!!dataList.contentList) {
      for (var i = 0; i < dataList.contentList.length; i++) {
        dataList.contentList[i].jsonContent = JSON.parse(data.resp.contentList[i].jsonContent);
        dataList.contentList[i].expend = true;
        dataList.contentList[i].queryUserFocusMatch = [];
        this.queryuserfocuslcmatch(i, dataList)
      }
    }
    this.tradeDetailList = dataList;
    this.getPlanInquiryData();
  }

  onScrollRefresh(event){
    debugger;
    this.getQueryPlanDetailData(event);
    // setTimeout(()=>{
    //   this.echartsIntance.setOption(this.option)
    // },5000)
  }

  goDetail(e, item) {
    if (e.currentTarget.className == "iconfont icon-down iconDown") {
      e.currentTarget.className = "iconfont icon-up iconDown";
      item.expend = false;
    } else {
      e.currentTarget.className = "iconfont icon-down iconDown"
      item.expend = true;
    }
  }

  onChartInit(e){
    this.echartsIntance = e;
    console.log(e)
  }

  // resizeChart() {
  //   if (this.echartsIntance) {
  //     this.echartsIntance.resize();
  //   }
  // }

  // 切换tab
  switchTab(index) {
    this.tabIndex = index;
  }

  handle(e) {
    console.log(e);
    this.val = e;
  }

  // 设置金额
  setPrice(item) {
    console.log(item);
    this.planAmount = item.planPrice.split(' ')[1];
    this.popData = item;
    this.popData.min = Number(item.planPrice.split(' ')[1])
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
    if(!this.val){
      this.showPopFun('您未同意交易协议，请阅读并同意《彩票评估和交易协议》之后方可发起交易');
      return;
    }

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
      amount: this.planAmount
    }
    var that = this;
    that.tradePop = false;
    this.http.get(AppConfig.baseUrl + '/m/plan/planRepo.do?' + this.signService.getStrUrl(data), AppConfig.httpOptionsApiVersion).subscribe(response => {
      console.log(response);
      that.doTradeData(response)
    });
  }

  // 继续发起交易
  tradeNext(item) {
    console.log(item)
    this.getLastPlanPrice(item);
    this.tradePop = true;
    this.popIndex = 2;
    this.seconds = 7;
    this.planAmount = 0.00;
    this.getInterval(item)
  }

  // 定时询价
  getInterval(item) {
    var that = this;
    that.interval = setInterval(() => {
      if (that.seconds == 0) {
        that.seconds = 7;
        that.getLastPlanPrice(item)
      } else {
        that.seconds--;
      }
    }, 1000);
  }

  getLastPlanPrice(item) {
    var data = {
      planNo: item.planNo,
    }
    var that = this;
    this.http.get(AppConfig.baseUrl + '/m/plan/lastPlanPrice.do?' + this.signService.getStrUrl(data), AppConfig.httpOptionsApiVersion).subscribe(response => {
      console.log(response);
      if (response['ro'].code == '0000') {
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

  showPopFun(message) {
    this.showPop = true;
    this.showTips = message;
    var that = this
    window.setTimeout(function () {
      that.showPop = false;
      that.showTips = ""
    }, 2000);
  }

  doTradeData(response) {
    var that = this;
    that.showPopFun(response['ro'].msg)
    if (response['ro'].code == '0000') {
      window.setTimeout(function () {
        that.tradeDetailList = [];
        that.getQueryPlanDetailData(0);
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
