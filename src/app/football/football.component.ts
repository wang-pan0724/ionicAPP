import { Component, OnInit } from '@angular/core';
import { MenusService } from '../services/menus.service';
import { SelectMatchListService } from '../services/select-match-list.service'

import { Router } from '@angular/router';
import { SignService } from '../services/sign.service'
import { AppConfig } from '../services/app-config'
import { HttpClient } from "@angular/common/http";

@Component({
  selector: 'app-football',
  templateUrl: './football.component.html',
  styleUrls: ['./football.component.css']
})
export class FootballComponent implements OnInit {
  public navId: number = 0;
  public tabId: number = 0;
  public id: number = 0;
  public listItem: number = 0;
  public showPop: boolean = false;
  public clickTabId: number = 0;
  public ballType: number = 0;
  public navData = [
    {
      id: 0,
      name: '胜平负'
    },
    {
      id: 1,
      name: '混合过关'
    },
    {
      id: 2,
      name: '比分'
    },
    {
      id: 3,
      name: '总进球'
    },
    {
      id: 4,
      name: '半全场'
    },
  ];
  // 胜平负
  public footballList: any = [];
  // 混合过关
  public footballList2: any = [];
  // 比分
  public footballList3: any = [];
  // 总进球
  public footballList4: any = [];
  // 半全场
  public footballList5: any = [];
  // 比赛详情
  public footballDetail: any = [];
  // 弹出层数据
  public popData: any = [];
  // 选择的竞彩比赛
  public selectMatchDataList: any = [];
  // 显示提示信息
  public showTips: boolean = false;

  public haveNoData: boolean = false;

  public pn = 1;
  public ps = 50;
  public gameId = 4077;
  public tipsInfo: string = '';
  public haveNextPage:boolean = false;

  constructor(private router: Router, private signService: SignService, private http: HttpClient, private _menusService: MenusService, private _selectMatchService: SelectMatchListService) { }

  ngOnInit() {
    this.getData(this.gameId, this.pn, this.ps, 'footballList');
  }

  getData(gameId, pn, ps, listName) {
    let data = {
      'gameId': gameId,
      'pn': pn,
      'matchType': 3,
      'playType': this.navId,
      'ps': ps
    }
    var that = this;
    this.http.get(AppConfig.baseUrl + '/m/info/zcmatchlist.do?' + this.signService.getStrUrl(data)).subscribe(response => {
      console.log(response)
      if(!!response && response['ro'].code == '0000'){
        that.doData(response, listName)
      }
    });
  }


  onScrollRefresh() {
    console.log("下拉刷新");
    var footballName;
    if (this.tabId == 0) {
      footballName = 'footballList'
    } else {
      var num = this.tabId + 1
      footballName = 'footballList' + num
    }
    this.pn = 1;
    this[footballName] = [];
    this.getData(this.gameId, this.pn, this.ps, footballName)
  }

  onNextPage() {
    console.log('刷新下一页啦...');
    var footballName;
    if (this.tabId == 0) {
      footballName = 'footballList'
    } else {
      var num = this.tabId + 1
      footballName = 'footballList' + num
    }
    if(this[footballName].totalPages>this.pn){
      this.pn += 1;
    }else{
      this.pn = 1;
    }
    this.getData(this.gameId, this.pn, this.ps, footballName)
    // this._IsNextPageFinish = true;
  }

  doData(data, listName) {
    // console.log(this[listName].length)
    var  dataResp = data.resp
    
    if (data.resp.list.length != 0) {
      this.haveNoData = false;
      var matchTime = "";
      dataResp.list[0].showMatch = true;
      var expend = 0;
      for (var i = 0; i < dataResp.list.length; i++) {
        dataResp.list[i].expend = false;
        dataResp.list[i].selectSpMap = this.selectedSpMap(dataResp.list[0].spMap);
        dataResp.list[i].canSelect = [0, 0, 0, 0, 0];
        dataResp.list[i].selectedSpmapers = [];
        if (matchTime != dataResp.list[i].publishTime) {
          expend++;
          dataResp.list[i].showMatch = true;
          dataResp.list[i].expendShowMatch = expend;
          matchTime = dataResp.list[i].publishTime;
        } else {
          dataResp.list[i].showMatch = false;
          dataResp.list[i].expendShowMatch = expend;
        }
        dataResp.list[i].expendShowMatchNum = expend;
      }

      if(data.resp.totalPages>this.pn){
        this.haveNextPage = true;
      }else{
        this.haveNextPage = false;
      }
    } else {
      this.haveNoData = true;
    }

    if(this[listName].list){
      this[listName].list = this[listName].list.concat(dataResp.list)
    }else{
      this[listName] = dataResp;
    }
    console.log(this[listName])
  }

  showTip() {
    var that = this
    that.showTips = true;
    that.tipsInfo = '一场比赛只能选择一种玩法进行串关计算；如计算单关，请删除已选的未开单关的选项！'
    window.setTimeout(function () {
      that.showTips = false;
    }, 2000);
  }

  showTipNoSp() {
    var that = this
    that.showTips = true;
    that.tipsInfo = '当前选项无sp值，请投其他选项'
    window.setTimeout(function () {
      that.showTips = false;
    }, 2000);
  }


  // 给每个竞彩选项设置选择的状态
  selectedSpMap(obj) {
    var arr = [];
    var newArr = [];
    for (var key in obj) {
      arr.push(key)
    }
    for (var i = 0; i < arr.length; i++) {
      newArr[arr[i]] = false;
    }
    return newArr;
  }

  selectThisItem() {
    if (this.tabId == 0) {
      this.canSelectFun(this.footballList)
      this.selectMatchDataList = this._selectMatchService.setData(this.footballList, this.tabId);
    }
    if (this.tabId == 3) {
      this.selectMatchDataList = this._selectMatchService.setData(this.footballList4, this.tabId);
    }

    if (this.tabId == 1) {
      // this.canSelectFun(this.footballList2)
      var selectNum = 0;
      for(var key in this.popData.selectSpMap){
        if (this.popData.selectSpMap[key] == true) {
          selectNum++;
          if (key.split('_')[0] == 'spf') {
            this.popData.canSelect = [1, -1, -1, -1, -1]
          } else if (key.split('_')[0] == 'rqspf') {
            this.popData.canSelect = [-1, 1, -1, -1, -1]
          } else if (key.indexOf('zjq_') > -1) {
            this.popData.canSelect = [-1, -1, 1, -1, -1]
          } else if (key.indexOf('bqc_') > -1) {
            this.popData.canSelect = [-1, -1, -1, 1, -1]
          } else if (key.indexOf('dcbf_') > -1) {
            this.popData.canSelect = [-1, -1, -1, -1, 1]
          }
        }
      }

      if (selectNum == 0) {
        this.popData.canSelect = [0, 0, 0, 0, 0];
      }
    }
  }

  canSelectFun(dataList) {
    for (var i = 0; i < dataList.list.length; i++) {
      var selectNum = 0
      for (var key in dataList.list[i].selectSpMap) {
        if (dataList.list[i].selectSpMap[key] == true) {
          selectNum++;
          if (key.split('_')[0] == 'spf') {
            dataList.list[i].canSelect = [1, -1, -1, -1, -1]
          } else if (key.split('_')[0] == 'rqspf') {
            dataList.list[i].canSelect = [-1, 1, -1, -1, -1]
          } else if (key.indexOf('zjq_') > -1) {
            dataList.list[i].canSelect = [-1, -1, 1, -1, -1]
          } else if (key.indexOf('bqc_') > -1) {
            dataList.list[i].canSelect = [-1, -1, -1, 1, -1]
          } else if (key.indexOf('dcbf_') > -1) {
            dataList.list[i].canSelect = [-1, -1, -1, -1, 1]
          }
        }
      }
      if (selectNum == 0) {
        dataList.list[i].canSelect = [0, 0, 0, 0, 0];
      }
    }
  }

  // 查看详细数据
  goDetail(e, item) {
    var that = this;
    if (e.currentTarget.firstElementChild.className == "iconfont icon-down") {
      e.currentTarget.firstElementChild.className = "iconfont icon-up"
      this._menusService.getFootballDetail().then(data => {
        this.footballDetail = data.resp;
      });

      item.expend = true;
    } else {
      e.currentTarget.firstElementChild.className = "iconfont icon-down"
      item.expend = false;
    }
  }

  doList(name, clickData) {
    var clickNum = this[name].list[clickData].expendShowMatchNum
    for (let i = 0; i < this[name].list.length; i++) {
      if (clickNum == this[name].list[i].expendShowMatchNum) {
        if (this[name].list[i].expendShowMatch != 0) {
          this[name].list[i].expendShowMatch = 0;
        } else {
          this[name].list[i].expendShowMatch = clickNum;
        }
      }
    }
  }

  // nav切换
  navChanged(navid) {
    this.navId = navid;
    var footballName;
    if (this.tabId == 0) {
      footballName = 'footballList'
    } else {
      var num = this.tabId + 1
      footballName = 'footballList' + num
    }
    this.pn = 1;
    this.haveNextPage = true;
    this.haveNoData = true;
    this[footballName] = []
    this.getData(this.gameId, this.pn, this.ps, footballName);
  }

  // tab切换
  tabChanged(tabid) {
    if(this.tabId == tabid){
      return;
    }
    this.pn = 1;
    this.haveNextPage = true;
    var footballName = ''
    if(tabid == 0){
      this.gameId = 4077;
      footballName = 'footballList';
    }
    if (tabid == 1) {
      this.gameId = 4075
      footballName = 'footballList2';
    }
    if (tabid == 2) {
      this.gameId = 4073;
      footballName = 'footballList3';
    }
    if (tabid == 3) {
      this.gameId = 4072;
      footballName = 'footballList4';
    }
    if (tabid == 4) {
      this.gameId = 4074
      footballName = 'footballList5';
    }
    this[footballName] = [];
    this.getData(this.gameId, this.pn, this.ps, footballName);
    this.tabId = tabid;
    this.selectMatchDataList = {
      canGoMext:false,
      list:{},
      selectMatchNum:0
    }
  }

  selectContent(item, clickTabId) {
    this.popData = this.deepCopy(item);
    this.clickTabId = clickTabId;
    this.showPop = true;
  }

  // 取消按钮
  cancel() {
    this.popData = [];
    this.showPop = false;
    var list = this.tabId == 0 ? this.footballList : this.tabId == 1 ? this.footballList2 : this.tabId == 2 ? this.footballList3 : this.tabId == 3 ? this.footballList4 : this.footballList5;
    this.selectMatchDataList = this._selectMatchService.setData(list, this.tabId);
  }

  // 确定按钮
  sure() {
    this.showPop = false;
    var list = this.tabId == 0 ? this.footballList : this.tabId == 1 ? this.footballList2 : this.tabId == 2 ? this.footballList3 : this.tabId == 3 ? this.footballList4 : this.footballList5;
    for(let i=0;i<list.list.length;i++){
      if(this.popData.publishTime == list.list[i].publishTime && this.popData.matchNo == list.list[i].matchNo){
        list.list[i].canSelect = this.popData.canSelect;
        list.list[i].selectContantList = this.popData.selectContantList;
        list.list[i].selectSpMap = this.popData.selectSpMap;
        list.list[i].selectedList = this.popData.selectedList;
        list.list[i].selectedSpmapers = this.popData.selectedSpmapers;
      }
    }
    this.popData = [];
    this.selectMatchDataList = this._selectMatchService.setData(list, this.tabId);
  }

  deepCopy(obj) {
    if (typeof obj !== 'object') return;
    var newObj = obj instanceof Array ? [] : {};
    for (var key in obj) {
      if (obj.hasOwnProperty(key)) {
        newObj[key] = typeof obj[key] === 'object' ? this.deepCopy(obj[key]) : obj[key];
      }
    }
    return newObj;
  }
}
