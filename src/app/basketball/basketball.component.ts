import { Component, OnInit } from '@angular/core';
import { MenusService } from '../services/menus.service';
import { SelectMatchListService } from '../services/select-match-list.service';
import { ActivatedRoute, Router } from '@angular/router';
import { SignService } from '../services/sign.service'
import { AppConfig } from '../services/app-config'
import { HttpClient } from "@angular/common/http";
import { flatMap } from 'rxjs/operators';

@Component({
  selector: 'app-basketball',
  templateUrl: './basketball.component.html',
  styleUrls: ['./basketball.component.css']
})
export class BasketballComponent implements OnInit {

  public navId: number = 0;
  public tabId: number = 0;
  public basketballList: any = [];
  public basketballList2: any = [];
  public basketballList3: any = [];
  public basketballList4: any = [];
  public basketballList5: any = [];
  public basketballDetail: any = [];
  public showPop: boolean = false;
  // 显示提示信息
  public showTips: boolean = false;
  // 弹出层数据
  public popData: any = [];
  public clickTabId: number = 0;
  public ballType: number = 1;
  public navData = [
    {
      id: 0,
      name: '胜负'
    },
    {
      id: 1,
      name: '让分胜负'
    },
    {
      id: 2,
      name: '混合过关'
    },
    {
      id: 3,
      name: '大小分'
    },
    {
      id: 4,
      name: '胜分差'
    },
  ];
  // 选择的竞彩比赛
  public selectMatchDataList: any = [];

  public pn = 1;
  public ps = 50;
  public gameId = 4061;
  public tipsInfo: string = "";
  public haveNoData: boolean = false;
  public haveNextPage: boolean = false;

  constructor(private router: Router, private signService: SignService, private http: HttpClient, private _menusService: MenusService, private _selectMatchService: SelectMatchListService) { }

  ngOnInit() {
    this.getData(this.gameId, this.pn, this.ps, 'basketballList')
  }

  getData(gameId, pn, ps, listName) {
    let data = {
      'gameId': gameId,
      'pn': pn,
      'matchType': 3,
      'playType': this.navId,
      'ps': ps,
      'showNba': false
    }

    var that = this;
    this.http.get(AppConfig.baseUrl + '/m/info/lcmatchlist.do?' + this.signService.getStrUrl(data)).subscribe(response => {
      console.log(response)
      if (!!response && response['ro'].code == '0000') {
        that.doData(response, listName)
      }
    });
  }

  onScrollRefresh() {
    console.log("下拉刷新");
    var basketballList;
    if (this.tabId == 0) {
      basketballList = 'basketballList'
    } else {
      var num = this.tabId + 1
      basketballList = 'basketballList' + num
    }
    this.pn = 1;
    this[basketballList] = [];
    this.getData(this.gameId, this.pn, this.ps, basketballList)
  }

  onNextPage() {
    console.log('刷新下一页啦...');
    var basketballList;
    if (this.tabId == 0) {
      basketballList = 'basketballList'
    } else {
      var num = this.tabId + 1
      basketballList = 'basketballList' + num
    }
    if (this[basketballList].totalPages > this.pn) {
      this.pn += 1;
    } else {
      this.pn = 1;
    }
    this.getData(this.gameId, this.pn, this.ps, basketballList)
  }

  doData(data, listName) {
    var dataResp = data.resp;
    if (data.resp.list.length != 0) {
      this.haveNoData = false;
      var matchTime = '';
      dataResp.list[0].showMatch = true;
      var expend = 0;
      for (var i = 0; i < dataResp.list.length; i++) {
        dataResp.list[i].expend = false;
        dataResp.list[i].selectSpMap = this.selectedSpMap(dataResp.list[0].spMap);
        dataResp.list[i].canSelect = [0, 0, 0, 0, 0];
        dataResp.list[i].selectedSpmapers = [];
        dataResp.list[i].SFC = [];
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

      if (data.resp.totalPages > this.pn) {
        this.haveNextPage = true;
      } else {
        this.haveNextPage = false;
      }
    } else {
      this.haveNoData = true;
    }

    if (this[listName].list) {
      this[listName].list = this[listName].list.concat(dataResp.list)
    } else {
      this[listName] = dataResp;
    }
  }

  selectThisItem(index, item) {
    if (this.tabId == 0) {
      this.selectMatchDataList = this._selectMatchService.setData(this.basketballList, this.tabId);
    }

    if (this.tabId == 1) {
      this.selectMatchDataList = this._selectMatchService.setData(this.basketballList2, this.tabId);
    }

    if (this.tabId == 2) {
      this.canSelectFun(item)
    }

    if (this.tabId == 3) {
      this.selectMatchDataList = this._selectMatchService.setData(this.basketballList4, this.tabId);
    }

    if (this.tabId == 4) {
      this.selectMatchDataList = this._selectMatchService.setData(this.basketballList5, this.tabId);
    }
  }

  selectContent(item, clickTabId) {
    this.popData = this.deepCopy(item);
    this.clickTabId = clickTabId;
    this.showPop = true;
  }

  canSelectFun(listData) {
    var selectNum = 0;
    for (var key in listData.selectSpMap) {
      if (listData.selectSpMap[key] == true) {
        selectNum++;
        if (key == '21' || key == '22') { //胜负
          listData.canSelect = [1, -1, -1, -1];
          this.selectMatchDataList = this._selectMatchService.setData(this.basketballList3, this.tabId);
        } else if (key == '31' || key == '32') { //让分胜负
          listData.canSelect = [-1, 1, -1, -1];
          this.selectMatchDataList = this._selectMatchService.setData(this.basketballList3, this.tabId);
        } else if (key == '41' || key == '42') { //大小分
          listData.canSelect = [-1, -1, 1, -1];
          this.selectMatchDataList = this._selectMatchService.setData(this.basketballList3, this.tabId);
        } else {   //胜分差
          listData.canSelect = [-1, -1, -1, 1]
        }
      }
    }

    if (selectNum == 0) {
      listData.canSelect = [0, 0, 0, 0];
      this.selectMatchDataList = this._selectMatchService.setData(this.basketballList3, this.tabId);
    }
    this.popData = listData;
  }

  // 查看详细数据
  goDetail(e, item) {
    var that = this;
    if (e.currentTarget.firstElementChild.className == "iconfont icon-down") {
      e.currentTarget.firstElementChild.className = "iconfont icon-up"

      this._menusService.getBassketballDetail().then(data => {
        this.basketballDetail = data;
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
      footballName = 'basketballList'
    } else {
      var num = this.tabId + 1
      footballName = 'basketballList' + num
    }
    this.pn = 1;
    this[footballName] = [];
    this.haveNoData = true;
    this.getData(this.gameId, this.pn, this.ps, footballName);
    // console.log('全部/单关' + navid);
  }

  // tab切换
  tabChanged(tabid) {
    if (this.tabId == tabid) {
      return;
    }
    this.selectMatchDataList = [];
    this.tabId = tabid;
    this.haveNextPage = true;
    var baskListName = ''
    if (tabid == 0) {
      this.gameId = 4061;
      baskListName = 'basketballList';
    } else if (tabid == 1) {
      this.gameId = 4062;
      baskListName = 'basketballList2';
    } else if (tabid == 2) {
      this.gameId = 4065;
      baskListName = 'basketballList3';
    } else if (tabid == 3) {
      this.gameId = 4064;
      baskListName = 'basketballList4';
    } else if (tabid == 4) {
      this.gameId = 4063;
      baskListName = 'basketballList5';
    }
    this[baskListName] = []
    this.getData(this.gameId, this.pn, this.ps, baskListName);
    this.selectMatchDataList = {
      canGoMext: false,
      list: {},
      selectMatchNum: 0
    }
  }

  // 给每个竞彩选项设置选择的状态
  selectedSpMap(obj) {
    var arr = [];
    var newArr = [];
    for (var key in obj) {
      arr.push(key)
    }
    for (var i = 0; i < arr.length; i++) {
      newArr[i] = false;
    }
    return newArr;
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

  // 取消按钮
  cancel() {
    this.popData = [];
    this.showPop = false;
  }

  // 确定按钮
  sure() {
    this.canSelectFun(this.popData)
    this.showPop = false;
    for(let i=0;i<this.basketballList3.list.length;i++){
      if(this.popData.publishTime == this.basketballList3.list[i].publishTime && this.popData.matchNo == this.basketballList3.list[i].matchNo){
        this.basketballList3.list[i].canSelect = this.popData.canSelect;
        this.basketballList3.list[i].selectSpMap = this.popData.selectSpMap;
      }
    }
    this.selectMatchDataList = this._selectMatchService.setData(this.basketballList3, this.tabId);
    if (!!this.selectMatchDataList.list) {
      for (let i = 0; i < this.selectMatchDataList.list.list.length; i++) {
        var selectedSpmapersData = this.selectMatchDataList.list.list[i].selectedSpmapers;
        var SFC = []; //胜分差
        if (selectedSpmapersData.length > 0) {
          for (let j = 0; j < selectedSpmapersData.length; j++) {
            if (selectedSpmapersData[j].indexOf('-') > -1 || selectedSpmapersData[j].indexOf('+') > -1) {
              SFC.push(selectedSpmapersData[j])
            }
          }
        }
        this.selectMatchDataList.list.list[i].SFC = SFC;
      }
      this.basketballList3 = this.selectMatchDataList.list
    }
    this.popData = [];
  }

  deepCopy(obj) {
    var result = Array.isArray(obj) ? [] : {};
    for (var key in obj) {
      if (obj.hasOwnProperty(key)) {
        if (typeof obj[key] === 'object' && obj[key]!==null) {
          result[key] = this.deepCopy(obj[key]);   //递归复制
        } else {
          result[key] = obj[key];
        }
      }
    }
    return result;
  }
}
