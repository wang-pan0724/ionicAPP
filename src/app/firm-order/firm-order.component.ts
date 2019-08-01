import { Component, OnInit } from '@angular/core';
import { ConstantPool } from '@angular/compiler';
import { ActivatedRoute, Router } from '@angular/router';
import { SignService } from '../services/sign.service'
import { HttpClient } from "@angular/common/http";
import { AppConfig } from '../services/app-config'

@Component({
  selector: 'app-firm-order',
  templateUrl: './firm-order.component.html',
  styleUrls: ['./firm-order.component.css']
})
export class FirmOrderComponent implements OnInit {

  public title: string = "确认订单";
  public multiples: any = 1;
  public firmOrder: any = [];
  public minBonus: string = '0';
  public maxBonus: string = '0';
  public listZhu: number = 0;
  public showDanTips: boolean = false;
  public showDanStr: string = "";
  public showPop: boolean = false;
  public showPOPTips: any = "";
  public val: boolean = true;
  public storeData: any;
  public canGoNextStep: boolean = true;
  public maxPlayType: number = 0;
  public guanType: any = [
    {
      id: 1,
      title: "单关",
      type: '0',
      select: false,
      passType: 466
    },
    {
      id: 2,
      title: "2串1",
      type: '1',
      select: false,
      passType: 402
    },
    {
      id: 3,
      title: "3串1",
      type: '0',
      select: false,
      passType: 404
    },
    {
      id: 4,
      title: "4串1",
      type: '0',
      select: false,
      passType: 409
    },
    {
      id: 5,
      title: "5串1",
      type: '0',
      select: false,
      passType: 417
    },
    {
      id: 6,
      title: "6串1",
      type: '0',
      select: false,
      passType: 428
    },
    {
      id: 7,
      title: "7串1",
      type: '0',
      select: false,
      passType: 443
    },
    {
      id: 8,
      title: "8串1",
      type: '0',
      select: false,
      passType: 450
    }
  ]

  constructor(private router: Router, private signService: SignService, private http: HttpClient) {
  }

  ngOnInit() {
    // 获取用户所选的竞彩比赛
    this.firmOrder = JSON.parse(localStorage.getItem('firmOrder'));
    this.initGuan();
    this.initDan();
    this.getPrize();
    this.getStoreData();
  }

  getStoreData() {
    let data = {
      'realTimeQuery': true
    }
    var that = this;
    this.http.get(AppConfig.baseUrl + '/m/consumer/providerInfo.do?' + this.signService.getStrUrl(data)).subscribe(response => {
      console.log(response)
      that.storeData = response['resp'];
    });
  }

  nextStep() {
    if (!this.val) {
      this.showPopFun('请阅读并同意预约须知');
      return;
    }

    let data = {
      'gameId': this.getGameId(),
      'packageName': 'com.ballbee.repo',
      'extendInfo': 0,
      'payPwdreturnUrl': 'dididapiao://openType=TZPay',
      'setPayPwdBackUrl': 'dididapiao://openType=TZPay',
      'issueNo': this.firmOrder.list.issueNo,
      'content': this.getContant(),
      'isConfirmBet': 1,
      'appName': '%E5%BD%A9e%E9%80%9A',
      'passType': this.getPassType(),
      'amount': this.listZhu * 2 * this.multiples,
      'planSourceType': 1,
      'minBudgetPrize': this.minBonus,
      'multiple': this.multiples,
      'betCount': this.listZhu,
      'maxBudgetPrize': this.maxBonus
    }
    if (this.firmOrder.list.gameId == 4077) {
      data['spfHt'] = 0
    }
    var that = this;
    this.http.get(AppConfig.baseUrl + '/m/bet/askTicket.do?' + this.signService.getStrUrl(data)).subscribe(response => {
      console.log(response)
      that.doData(response)
    });
  }


  doData(res) {
    localStorage.setItem('token', res.resp.betToken);
    if (res.ro.code != '0000') {
      this.showPopFun(res.ro.msg)
    } else {
      this.router.navigate(['/home/submitSuccessfully'])
    }
  }

  getContant() {
    var firmorderList = this.firmOrder.list.list;
    var contentStr = '';
    var base64Value = "";
    var danNum = 0;
    if (this.firmOrder.list.gameId < 4070) {
      for (var i = 0; i < firmorderList.length; i++) {
        if (firmorderList[i].selectContantList.length > 0) {
          var strContent = "";
          strContent = strContent + firmorderList[i].selectContantList;
          if (firmorderList[i].selectDan == true) {
            if(danNum == 0){
              strContent += '#';
            }else{
              strContent += '|';
            }
            danNum++;
            contentStr = strContent + contentStr;
          } else {
            strContent += '|';
            contentStr = contentStr + strContent;
          }
        }
      }
      if (this.firmOrder.list.gameId == 4065) {
        base64Value = contentStr.substr(0, contentStr.length - 1) + '==1'
      } else {
        base64Value = contentStr.substr(0, contentStr.length - 1)
      }

    } else {
      for (var i = 0; i < firmorderList.length; i++) {
        if (firmorderList[i].selectContantList.length > 0) {
          var strContent = "";
          for (var k = 0; k < firmorderList[i].selectContantList.length; k++) {
            strContent = strContent + firmorderList[i].selectContantList[k];
            if (k != firmorderList[i].selectContantList.length - 1) {
              strContent = strContent + '~'
            }
          }
          if (firmorderList[i].selectDan == true) {
            if(danNum == 0){
              strContent += '#';
            }else{
              strContent += '|';
            }
            danNum++;
            contentStr = strContent + contentStr;
          } else {
            strContent += '|';
            contentStr = contentStr + strContent;
          }
        }
      }
      if (this.firmOrder.list.gameId == 4077 || this.firmOrder.list.gameId == 4075) {
        base64Value = contentStr.substr(0, contentStr.length - 1) + '==1,1'
      } else {
        base64Value = contentStr.substr(0, contentStr.length - 1)
      }
    }
    var base64 = this.signService.getBase64(base64Value)
    return base64;
  }

  getGameId() {
    var gameid = 0;
    if (this.firmOrder.list.gameId == 4077) {
      gameid = 4075;
    } else {
      gameid = this.firmOrder.list.gameId
    }
    return gameid;
  }

  getPassType() {
    var passtype = ''
    for (let i = 0; i < this.guanType.length; i++) {
      if (this.guanType[i].select == true) {
        passtype += this.guanType[i].passType + '-'
      }
    }
    return passtype.substring(0, passtype.length - 1);
  }

  showTips() {
    var num = 0;
    for (var i = 0; i < this.guanType.length; i++) {
      if (this.guanType[i].select == true) {
        num++
      }
    }
    if (num == 0) {
      this.showDanStr = "请选择过关方式"
    } else {
      this.showDanStr = "当前过关方式已达最大设胆数量"
    }
    var that = this
    that.showDanTips = true;
    window.setTimeout(function () {
      that.showDanTips = false;
      that.showDanStr = ""
    }, 2000);
  }

  getPrize() {
    var selectSpmaps = [];
    var bonusArrAll = [];
    var bonusArrMax = [];
    var data = []
    var index = 0;
    var danindex = 0;
    var danArr = [];
    var dan = [];
    for (var i = 0; i < this.firmOrder.list.list.length; i++) {
      var listData = this.firmOrder.list.list[i]
      if (listData.selectedSpmapers.length > 0) {
        if (listData.selectDan == true) {
          danArr[danindex] = this.firmOrder.list.list[i].selectedSpmapers;
          dan.push('dan_' + danindex);
          danindex++;
        } else {
          selectSpmaps[index] = listData.selectedSpmapers;
          data.push(index);
          index++;
        }
      }
    }

    if (data.length == 1 && dan.length == 0) {
      // 预计奖金 
      var min = Number(selectSpmaps[0][0].split(' ')[1])
      var max = Number(selectSpmaps[0][0].split(' ')[1])
      for (var i = 0; i < selectSpmaps[0].length; i++) {
        if (Number(selectSpmaps[0][i].split(' ')[1]) > max) {
          max = Number(selectSpmaps[0][i].split(' ')[1])
        }
        if (min > Number(selectSpmaps[0][i].split(' ')[1])) {
          min = Number(selectSpmaps[0][i].split(' ')[1])
        }
      }

      this.minBonus = (2 * this.multiples * min).toFixed(2);
      this.maxBonus = (2 * this.multiples * max).toFixed(2)

      // 计算注数
      this.listZhu = selectSpmaps[0].length;
    } else {
      var sortGroupData = [];
      if (dan.length > 0) {
        var sortData = this.sortGroup(data);
        for (var i = 0; i < sortData.length; i++) {
          sortData[i] = sortData[i] + ',' + dan;
        }
        sortGroupData = sortData;
      } else {
        sortGroupData = this.sortGroup(data);
      }

      var guanTypeSelectArr = [];
      for (var i = 0; i < this.guanType.length; i++) {
        if (this.guanType[i].select == true) {
          guanTypeSelectArr.push(i + 1)
        }
      }

      for (var i = 0; i < guanTypeSelectArr.length; i++) {
        var arr = [];
        for (var j = 0; j < sortGroupData.length; j++) {
          if (typeof (sortGroupData[j]) == "string" && sortGroupData[j].split(',').length == guanTypeSelectArr[i]) {
            arr.push(sortGroupData[j]);
          } else if (typeof (sortGroupData[j]) == "number" && 1 == guanTypeSelectArr[i]) {
            arr.push(sortGroupData[j]);
          }
        }

        for (var j = 0; j < arr.length; j++) {

          var newArr = [];
          if (typeof (arr[j]) == 'string') {
            var groupArr = arr[j].split(',');
            for (var k = 0; k < groupArr.length; k++) {
              if (groupArr[k].indexOf('dan_') > -1) {
                newArr[k] = danArr[groupArr[k].split('_')[1]]
              } else {
                newArr[k] = selectSpmaps[groupArr[k]];
              }
            }

            // console.log(this.hunhePrize(newArr));
            var getMinAndMaxArr = this.calculatedBonus(this.hunhePrize(newArr))
            bonusArrAll = bonusArrAll.concat(getMinAndMaxArr[0]);//奖金数组
            bonusArrMax = bonusArrMax.concat(getMinAndMaxArr[1])
          } else {
            var groupArr = arr[j];
            var priceMax = 0;
            for (var groupArrIndex = 0; groupArrIndex < selectSpmaps[groupArr].length; groupArrIndex++) {
              var price = Number(selectSpmaps[groupArr][groupArrIndex].split(' ')[1]) * 2;
              bonusArrAll = bonusArrAll.concat(price);//奖金数组
              if (price > priceMax) {
                priceMax = price;
              }
              if (groupArrIndex == selectSpmaps[groupArr].length - 1) {
                bonusArrMax = bonusArrMax.concat(priceMax)
                priceMax = 0;
              }
            }
          }
        }
      }

      // 预计奖金 
      var minprice = !!this.getMinAndMax(bonusArrAll)[0] ? this.getMinAndMax(bonusArrAll)[0] : '0'
      this.minBonus = (this.multiples * minprice).toFixed(2);
      this.maxBonus = (this.multiples * this.getMinAndMax(bonusArrMax)[1]).toFixed(2)

      // 计算注数
      this.listZhu = bonusArrAll.length;
      // console.log(minprice)
      // console.log(this.getMinAndMax(bonusArrMax)[1])
    }
  }

  handle(e) {
    console.log(e)
    this.val = e;
  }

  changeNum(v) {
    this.multiples = (v + '').replace(/[^0-9]+/, '')
    if (!!this.multiples && Number(this.multiples) > 0) {
      this.canGoNextStep = true;
    } else {
      this.canGoNextStep = false;
    }

    this.getPrize();
  }

  getMinAndMax(bonusArr) {
    var min = bonusArr[0];
    var max = 0;
    for (var i = 0; i < bonusArr.length; i++) {
      max += bonusArr[i];
      if (bonusArr[i] < min) {
        min = bonusArr[i];
      }
    }

    return [min, max];
  }

  // 计算奖金
  calculatedBonus(arr) {
    var prize = [];
    for (var i = 0; i < arr.length; i++) {
      var bonus = 2;
      for (var j = 0; j < arr[i].length; j++) {
        bonus = bonus * arr[i][j].split(' ')[1];
      }
      prize.push(bonus);
    }

    var maxPrize = prize[0]
    for (var i = 0; i < prize.length; i++) {
      if (prize[i] > maxPrize) {
        maxPrize = prize[i];
      }
    }
    return [prize, maxPrize];
  }

  // 删除所选的竞彩比赛
  deleteThisItem(matchNo, matchTime) {
    // 如果所选的比赛大于两场
    if (this.firmOrder.selectMatchNum > 2) {

      this.deleteMatch(matchNo, matchTime)

    } else if (this.firmOrder.selectMatchNum == 2) {
      // TODO
      if (this.firmOrder.list.gameId == 4077 || this.firmOrder.list.gameId == 4075) { // 胜平负
        var betSinglePlaytypeNum = 0;
        for (var i = 0; i < this.firmOrder.list.list.length; i++) {
          if (this.firmOrder.list.list[i].betSinglePlaytype.indexOf('4076') > -1) {
            if (this.firmOrder.list.list[i].selectedList.length > 0 && this.firmOrder.list.list[i].selectedList.indexOf("rqspf_") == -1) {
              betSinglePlaytypeNum++;
            }
          } else {
            if (this.isSinglePlay(this.firmOrder.list.list[i].selectedList)) {
              betSinglePlaytypeNum++;
            }
          }
        }

        if (betSinglePlaytypeNum == 0) {
          this.selectMatchTips("至少选择两场比赛")
        } else if (betSinglePlaytypeNum == 1) {
          for (var i = 0; i < this.firmOrder.list.list.length; i++) {
            var listData = this.firmOrder.list.list[i]
            if (listData.betSinglePlaytype.indexOf('4076') > -1 && listData.matchNo == matchNo && listData.matchTime == matchTime) {
              this.selectMatchTips("至少选择两场比赛")
            } else if (listData.matchNo == matchNo && listData.matchTime == matchTime) {
              if (listData.selectedList[0].indexOf('dcbf_') > -1 || listData.selectedList[0].indexOf('zjq_') > -1 || listData.selectedList[0].indexOf('bqc_') > -1) {
                this.selectMatchTips("至少选择两场比赛")
              } else {
                this.firmOrder.list.list.splice(i, 1);
                this.firmOrder.selectMatchNum--;
                this.initGuan();
              }
            }
          }
        } else if (betSinglePlaytypeNum == 2) {
          this.deleteMatch(matchNo, matchTime)
        }
      } else if (this.firmOrder.list.gameId == 4065 || this.firmOrder.list.gameId == 4061 || this.firmOrder.list.gameId == 4062 || this.firmOrder.list.gameId == 4064) { //篮球混合过关
        var betSinglePlaytypeNum = 0;
        for (var i = 0; i < this.firmOrder.list.list.length; i++) {
          if (this.firmOrder.list.gameId == 4065) {
            if (this.isSinglePlayBasketball(this.firmOrder.list.list[i].selectedList)) {
              betSinglePlaytypeNum++;
            }
          } else {
            if (this.isSingleBasketball(this.firmOrder.list.list[i].selectedList)) {
              betSinglePlaytypeNum++;
            }
          }
        }
        if (betSinglePlaytypeNum == 0) {
          this.selectMatchTips("至少选择两场比赛");
        } else if (betSinglePlaytypeNum == 1) {
          for (var i = 0; i < this.firmOrder.list.list.length; i++) {
            var listData = this.firmOrder.list.list[i];
            //hhh
            var hasSingPlay = true;
            if (listData.selectedList.length > 0) {
              for (var j = 0; j < listData.selectedList.length; j++) {
                if (listData.selectedList[j] > 20) {
                  hasSingPlay = false
                }
              }
            } else {
              hasSingPlay = false
            }

            if (hasSingPlay && listData.matchNo == matchNo && listData.matchTime == matchTime) {
              this.selectMatchTips("至少选择两场比赛")
            } else if (listData.matchNo == matchNo && listData.matchTime == matchTime) {
              this.firmOrder.list.list.splice(i, 1);
              this.firmOrder.selectMatchNum--;
              this.initGuan();
            }
          }
        } else if (betSinglePlaytypeNum == 2) {
          this.deleteMatch(matchNo, matchTime)
        }

      } else { //比分 总进球 半全场
        this.deleteMatch(matchNo, matchTime)
      }
    } else {
      this.selectMatchTips("至少选择一场比赛");
    }

    this.changeGuan();
  }

  // 初始化每场比赛的胆
  initDan() {
    var guanTypeNum = 0;
    var selectGuanType = [];
    for (var i = 0; i < this.guanType.length; i++) {
      if (this.guanType[i].select == true && this.guanType[i].type == 1) {
        guanTypeNum++;
        selectGuanType.push(i);
      }
    }

    if (this.guanType[this.maxPlayType - 1].select == true || this.guanType[0].select == true) {
      for (var i = 0; i < this.firmOrder.list.list.length; i++) {
        this.firmOrder.list.list[i].selectDan = false;
        this.firmOrder.list.list[i].canSelectDan = false;
      }
    } else {
      if (guanTypeNum == 0) {
        for (var i = 0; i < this.firmOrder.list.list.length; i++) {
          this.firmOrder.list.list[i].selectDan = false;
          this.firmOrder.list.list[i].canSelectDan = false;
        }
      } else {
        var selectDanNum = 0;
        for (var k = 0; k < this.firmOrder.list.list.length; k++) {
          if (this.firmOrder.list.list[k].selectDan == true) {
            selectDanNum++;
          }
        }

        if (selectGuanType[0] > selectDanNum) {
          for (var i = 0; i < this.firmOrder.list.list.length; i++) {
            this.firmOrder.list.list[i].canSelectDan = true;
          }
        } else {
          for (var i = 0; i < this.firmOrder.list.list.length; i++) {
            if (this.firmOrder.list.list[i].selectDan == false) {
              this.firmOrder.list.list[i].canSelectDan = false;
            }
          }
        }

      }
    }
    this.getPrize();
    console.log(this.firmOrder)
  }

  deleteMatch(matchNo, matchTime) {
    for (var i = 0; i < this.firmOrder.list.list.length; i++) {
      if (this.firmOrder.list.list[i].matchNo == matchNo && this.firmOrder.list.list[i].matchTime == matchTime) {
        this.firmOrder.list.list.splice(i, 1);
        this.firmOrder.selectMatchNum--;
        this.initGuan();
      }
    }
  }

  // 提示选择比赛场数
  selectMatchTips(str) {
    this.showDanStr = str
    var that = this
    that.showDanTips = true;
    window.setTimeout(function () {
      that.showDanTips = false;
      that.showDanStr = ""
    }, 2000);
  }

  // 判断篮球是否含有单关选项
  isSinglePlayBasketball(selectedList: any) {
    if (selectedList.length > 0) {
      let num = 0;
      for (let i = 0; i < selectedList.length; i++) {
        if (selectedList[i] < 20) {
          num++;
        }
      }
      if (num == selectedList.length) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  }

  isSingleBasketball(selectedList: any) {
    if (selectedList.length > 0) {
      let num = 0;
      for (let i = 0; i < selectedList.length; i++) {
        if (selectedList[i] > 20) {
          num++;
        }
      }
      if (num == selectedList.length) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  }

  // 判断足球是否含有单关选项
  isSinglePlay(selectedList: any) {
    if (selectedList.length > 0) {
      let num = 0;
      for (let i = 0; i < selectedList.length; i++) {
        if (selectedList[i].indexOf('spf_') == -1) {
          num++;
        }
      }
      if (num == selectedList.length) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  }

  // 设置过关方式
  initGuan() {
    for (var i = 0; i < this.guanType.length; i++) {
      this.guanType[i].type = 0;
      this.guanType[i].select = false;
    }
    var betSinglePlaytypeNum = 0;
    if (this.firmOrder.list.gameId == 4077) { //足球胜平负
      for (var i = 0; i < this.firmOrder.list.list.length; i++) {
        if (this.firmOrder.list.list[i].betSinglePlaytype.indexOf('4076') > -1 && this.firmOrder.list.list[i].selectedList.length > 0) {
          betSinglePlaytypeNum++;
        }
      }
    } else if (this.firmOrder.list.gameId == 4075) { //足球混合过关
      // TODO
      for (var i = 0; i < this.firmOrder.list.list.length; i++) {
        if (this.firmOrder.list.list[i].betSinglePlaytype.indexOf('4076') > -1 && this.firmOrder.list.list[i].selectedList.length > 0) {
          if (this.firmOrder.list.list[i].selectedList.indexOf("spf_0") > -1) {
            betSinglePlaytypeNum++;
          }else if(this.firmOrder.list.list[i].selectedList.indexOf("spf_1") > -1){
            betSinglePlaytypeNum++;
          }else if(this.firmOrder.list.list[i].selectedList.indexOf("spf_3") > -1){
            betSinglePlaytypeNum++;
          }
        }else if(this.firmOrder.list.list[i].betSinglePlaytype.indexOf('4071') > -1 && this.firmOrder.list.list[i].selectedList.length > 0){
          if (this.firmOrder.list.list[i].selectedList.indexOf("rqspf_0") > -1) {
            betSinglePlaytypeNum++;
          }else if(this.firmOrder.list.list[i].selectedList.indexOf("rqspf_1") > -1){
            betSinglePlaytypeNum++;
          }else if(this.firmOrder.list.list[i].selectedList.indexOf("rqspf_3") > -1){
            betSinglePlaytypeNum++;
          }
        } else {
          if (this.isSinglePlay(this.firmOrder.list.list[i].selectedList)) {
            betSinglePlaytypeNum++;
          }
        }
      }
    } else if (this.firmOrder.list.gameId == 4065) {
      var canGo = false;
      var firmOrderList = this.firmOrder.list.list
      for (let i = 0; i < firmOrderList.length; i++) {
        var arr = firmOrderList[i].selectedList;
        var betSinglePlaytype = firmOrderList[i].betSinglePlaytype;
        if (arr.length > 0) {
          for (let j = 0; j < arr.length; j++) {
            if ((arr[j] == 21 || arr[j] == 22) && betSinglePlaytype.indexOf('4061') > -1) {
              canGo = true;
            } else if ((arr[j] == 31 || arr[j] == 32) && betSinglePlaytype.indexOf('4062') > -1) {
              canGo = true;
            } else if ((arr[j] == 41 || arr[j] == 42) && betSinglePlaytype.indexOf('4064') > -1) {
              canGo = true;
            } else if (20 > arr[j]) {
              canGo = true;
            }
          }
        }
      }
      if (canGo) {
        betSinglePlaytypeNum++;
      }
    } else if(this.firmOrder.list.gameId == 4061){
      for (var i = 0; i < this.firmOrder.list.list.length; i++) {
        var betSinglePlaytype = this.firmOrder.list.list[i].betSinglePlaytype;
        var selectedListArr = this.firmOrder.list.list[i].selectedList
        if (betSinglePlaytype.indexOf('4061') > -1 && selectedListArr.length > 0) {
          betSinglePlaytypeNum++;
        }
      }
    }else if(this.firmOrder.list.gameId == 4062){
      for (var i = 0; i < this.firmOrder.list.list.length; i++) {
        var betSinglePlaytype = this.firmOrder.list.list[i].betSinglePlaytype;
        var selectedListArr = this.firmOrder.list.list[i].selectedList
        if (betSinglePlaytype.indexOf('4062') > -1 && selectedListArr.length > 0) {
          betSinglePlaytypeNum++;
        }
      }
    }else if (this.firmOrder.list.gameId == 4064) { //篮球胜负 让分胜负 大小分
      for (var i = 0; i < this.firmOrder.list.list.length; i++) {
        var betSinglePlaytype = this.firmOrder.list.list[i].betSinglePlaytype;
        var selectedListArr = this.firmOrder.list.list[i].selectedList
        if (betSinglePlaytype.indexOf('4064') > -1 && selectedListArr.length > 0) {
          betSinglePlaytypeNum++;
        }
      }
    } else { //比分 总进球 半全场
      for (var i = 0; i < this.firmOrder.list.list.length; i++) {
        if (this.firmOrder.list.list[i].selectedList.length > 0) {
          betSinglePlaytypeNum++;
        }
      }
    }

    if (betSinglePlaytypeNum == this.firmOrder.selectMatchNum) {
      this.guanType[0].type = 1;
    }

    this.setGuanType()
  }

  // 胜平负、让球胜平负 8
  //总进球（不含比分、半全场）6
  //比分、半全场 4
  //胜负、让分胜负、大小分 8
  //胜分差  4
  setGuanType() {
    var selectGameId = this.firmOrder.list.gameId;
    if (selectGameId == 4077 || selectGameId == 4061 || selectGameId == 4062 || selectGameId == 4064) {
      if (this.firmOrder.selectMatchNum > 8) {
        this.maxPlayType = 8;
      } else {
        this.maxPlayType = this.firmOrder.selectMatchNum
      }
    } else if (selectGameId == 4072) {
      if (this.firmOrder.selectMatchNum > 6) {
        this.maxPlayType = 6;
      } else {
        this.maxPlayType = this.firmOrder.selectMatchNum
      }
    } else if (selectGameId == 4073 || selectGameId == 4074 || selectGameId == 4063) {
      if (this.firmOrder.selectMatchNum > 4) {
        this.maxPlayType = 4;
      } else {
        this.maxPlayType = this.firmOrder.selectMatchNum
      }
    } else if (selectGameId == 4075) {
      var maxType;
      if (this.firmOrder.selectMatchNum > 8) {
        maxType = 8;
      } else {
        maxType = this.firmOrder.selectMatchNum
      }
      for (var i = 0; i < this.firmOrder.list.list.length; i++) {
        if (this.firmOrder.list.list[i].selectedList.length > 0) {
          var selectList = this.firmOrder.list.list[i].selectedList[0];
          if (selectList.indexOf('dcbf_') > -1 || selectList.indexOf('bqc_') > -1) {
            if (maxType > 4) {
              maxType = 4
            }
          } else if (selectList.indexOf('zjq_') > -1) {
            if (maxType > 6) {
              maxType = 6
            }
          }
        }
      }

      this.maxPlayType = maxType;
    } else if (selectGameId == 4065) {
      var maxType;
      if (this.firmOrder.selectMatchNum > 8) {
        maxType = 8;
      } else {
        maxType = this.firmOrder.selectMatchNum
      }
      for (var i = 0; i < this.firmOrder.list.list.length; i++) {
        if (this.firmOrder.list.list[i].selectedList.length > 0) {
          var selectList = this.firmOrder.list.list[i].selectedList[0];
          if (selectList < 20) {
            if (maxType > 4) {
              maxType = 4
            }
          }
        }
      }
      this.maxPlayType = maxType;
    }

    for (var i = 1; i < this.maxPlayType; i++) {
      this.guanType[i].type = 1
    }

    this.guanType[this.maxPlayType - 1].select = true;
  }

  // 做胆
  setDan() {
    this.initDan()
  }

  // 选择过关方式
  changeGuan() {
    for (var i = 0; i < this.firmOrder.list.list.length; i++) {
      this.firmOrder.list.list[i].canSelectDan = true;
      this.firmOrder.list.list[i].selectDan = false;
    }
    this.canNextStep();
    this.initDan();
    this.getPrize();
  }

  canNextStep() {
    console.log(this.guanType)
    var selectTypeNumber = 0;
    for (var i = 0; i < this.guanType.length; i++) {
      if (this.guanType[i].type == 1 && this.guanType[i].select == true) {
        selectTypeNumber++;
      }
    }
    if (selectTypeNumber > 0) {
      this.canGoNextStep = true;
    } else {
      this.canGoNextStep = false;
    }
  }

  // 选择倍数（输入倍数）
  changeMuitples(e) {
    this.multiples = this.multiples.replace(/[^\d]/g, '');
    this.getPrize();
  }

  // 选择倍数（点击按钮减少倍数）
  sub() {
    if (this.multiples == 0) {
      this.showDanStr = "最小倍数为1倍"
      var that = this;
      that.showDanTips = true;
      window.setTimeout(function () {
        that.showDanTips = false;
        that.showDanStr = "";
      }, 2000);
    }
    if (this.multiples > 1) {
      this.multiples--;
    } else {
      this.multiples = 0;
    }

    if (!!this.multiples && Number(this.multiples) > 0) {
      this.canGoNextStep = true;
    } else {
      this.canGoNextStep = false;
    }

    this.getPrize();
  }

  // 选择倍数（点击按钮增加倍数）
  add() {
    if (this.multiples < 10000) {
      this.multiples++;
    } else {
      this.showDanStr = "最大倍数为10000倍"
      var that = this;
      that.showDanTips = true;
      window.setTimeout(function () {
        that.showDanTips = false;
        that.showDanStr = "";
      }, 2000);
    }

    if (!!this.multiples && Number(this.multiples) > 0) {
      this.canGoNextStep = true;
    } else {
      this.canGoNextStep = false;
    }

    this.getPrize();
  }


  sortGroup(data, index = 0, group = []) {
    var needApply = new Array();
    needApply.push(data[index]);
    for (var i = 0; i < group.length; i++) {
      needApply.push(group[i] + "," + data[index]);
    }
    // group.push.apply(group, need_apply);
    group = group.concat(needApply);
    if (index + 1 >= data.length) {
      return group;
    }
    else {
      return this.sortGroup(data, index + 1, group)
    };
  }


  hunhePrize(arr) {
    var len = arr.length;
    if (len >= 2) {
      var len1 = arr[0].length;
      var len2 = arr[1].length;
      var lenBoth = len1 * len2;
      var items = new Array(lenBoth);
      var index = 0;
      for (var i = 0; i < len1; i++) {
        for (var j = 0; j < len2; j++) {
          if (arr[0][i] instanceof Array) {
            items[index] = arr[0][i].concat(arr[1][j]);
          } else {
            items[index] = [arr[0][i]].concat(arr[1][j]);
          }
          index++;
        }
      }
      var newArr = new Array(len - 1);
      for (var i = 2; i < arr.length; i++) {
        newArr[i - 1] = arr[i];
      }
      newArr[0] = items;
      return this.hunhePrize(newArr);
    } else {
      return arr[0];
    }
  }

  showPopFun(message) {
    this.showPop = true;
    this.showPOPTips = message;
    var that = this
    window.setTimeout(function () {
      that.showPop = false;
      that.showPOPTips = ""
    }, 2000);
  }

}
