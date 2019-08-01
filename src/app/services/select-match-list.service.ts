import { Injectable } from '@angular/core';
import { strictEqual } from 'assert';
// import { flatten } from '@angular/core/src/render3/util';

@Injectable({
  providedIn: 'root'
})
export class SelectMatchListService {

  public listData: any = [];
  public selectMatchNum: number = 0;
  public canGoNext: boolean = false;

  constructor() { }

  setData(dataList, tabId) {

    this.setMatchData(dataList, tabId);

    // TODO
    this.canGoNextPage(dataList);

    var selectDataL = {
      list: dataList,
      selectMatchNum: this.selectMatchNum,
      canGoMext: this.canGoNext
    }
    return selectDataL;
  }

  //190418001(3-1.94){4076}|190418002[-1](1-3.45){4071}==1,1
  // 记录已选比赛的信息
  setMatchData(dataList: any, tabId) {
    this.selectMatchNum = 0;
    for (var i = 0; i < dataList.list.length; i++) {
      if (this.matchIsSelect(dataList.list[i].selectSpMap)) {
        this.selectMatchNum++;
      }
      var list = this.findAllKey(dataList.list[i].selectSpMap, true);
      dataList.list[i].selectedList = list;
      var spmapersList = [];
      // if (dataList.gameId > 4070) {
      var contantList = [];
      var matchTypePl = ''
      for (var j = 0; j < list.length; j++) {
        var arrItem = this.findKey(dataList.spmapers, list[j]);
        var matchType = ""
        if (list[j].indexOf('_') > -1) {
          matchType = list[j].split('_')[1]
        } else {
          matchType = list[j]
        }
        // console.log(matchType)
        var concede = dataList.list[i].concede;
        var newArrItem = this.doConcede(arrItem, concede)[0];
        // console.log(this.doConcede(arrItem, concede)[1])
        var playType = '';
        var getConcede = '';
        if (dataList.gameId > 4070) {
          if (dataList.gameId == 4077 || dataList.gameId == 4075) {
            playType = this.getGameId(dataList.list[i].canSelect, tabId);
          }
          getConcede = this.doConcede(arrItem, concede)[1];
          if (!!getConcede) {
            getConcede = '[' + getConcede + ']'
          }
        } else {
          if (dataList.gameId == 4065) {
            // console.log(dataList.list[i])
            var canSelectList = dataList.list[i].canSelect;
            var num = 0;
            for (var canSelectIndex = 0; canSelectIndex < canSelectList.length; canSelectIndex++) {
              if (canSelectList[canSelectIndex] == 1) {
                if (0 == canSelectIndex) {
                  num = 4061;
                  matchType = matchType.substr(1, 2)
                } else if (1 == canSelectIndex) {
                  num = 4062;
                  getConcede = '[' + dataList.list[i].wapconcede + ']';
                  matchType = matchType.substr(1, 2)
                } else if (2 == canSelectIndex) {
                  num = 4064;
                  getConcede = '[' + dataList.list[i].advancedscore + ']';
                  matchType = matchType.substr(1, 2)
                } else if (3 == canSelectIndex) {
                  num = 4063;
                }
              }
            }
            playType = '{' + num + '}'
          } else if (dataList.gameId == 4062 || dataList.gameId == 4064) {
            getConcede = '[' + dataList.list[i].concede + ']'
          }

          if (dataList.gameId == 4062) {
            newArrItem = '让分' + newArrItem
          }
        }
        var pl = dataList.list[i].spMap[list[j]];
        matchTypePl = matchTypePl + matchType + '-' + pl + ',';
        spmapersList.push(newArrItem + ' ' + pl);
      }
      if (!!matchTypePl) {
        matchTypePl = matchTypePl.substring(0, matchTypePl.length - 1);
        var contentStr = dataList.list[i].publishTime + dataList.list[i].matchNo + getConcede + '(' + matchTypePl + ')' + playType;
        contantList.push(contentStr)
      }
      dataList.list[i].selectContantList = contantList;

      dataList.list[i].selectedSpmapers = spmapersList;
    }
  }

  doConcede(arrItem, concede) {
    var newArrItem = "";
    var newConcede = ''
    if (arrItem == "让球平" || arrItem == "让球胜" || arrItem == "让球负") {
      newConcede = concede > 0 ? "+" + concede : concede;
      if (arrItem == "让球平") {
        newArrItem = newConcede + arrItem.substring(2)
      } else {
        newArrItem = newConcede + '主' + arrItem.substring(2)
      }
    } else if (arrItem == "rq_平" || arrItem == "rq_胜" || arrItem == "rq_负") {// 处理rq_平，rq_胜，rq_负 字段
      newConcede = concede > 0 ? "+" + concede : concede;
      if (arrItem == "rq_平") {
        newArrItem = newConcede + arrItem.split('_')[1]
      } else {
        newArrItem = newConcede + '主' + arrItem.split('_')[1]
      }
    } else if (arrItem == "胜" || arrItem == "负") {
      newArrItem = '主' + arrItem;
    } else {
      newArrItem = arrItem;
    }
    return [newArrItem, newConcede];
  }

  getGameId(canSelectList, tabId) {
    var playType = 0;
    if (tabId == 0 || tabId == 1) {
      for (var i = 0; i < canSelectList.length; i++) {
        if (canSelectList[i] == 1) {
          playType = i == 0 ? 4076 : i == 1 ? 4071 : i == 2 ? 4072 : i == 3 ? 4074 : i == 4 ? 4073 : 4075
        }
      }
    } else if (tabId == 2) {
      playType = 4073
    } else if (tabId == 3) {
      playType = 4072
    } else if (tabId == 4) {
      playType == 4074
    }

    return '{' + playType + '}';
  }

  // 查看每一场竞彩比赛是否被选
  matchIsSelect(obj): boolean {
    var selectArr = this.objToArr(obj);
    for (var j = 0; j < selectArr.length; j++) {
      if (selectArr[j] == true) {
        return true;
      }
    }
    return false;
  }

  // 对象转数组
  objToArr(obj) {
    var arr = []
    for (let i in obj) {
      arr.push(obj[i]);
    }
    return arr;
  }

  // 获取一个场次比赛的选项
  getOneSelectSpMap(obj, str): any {
    var arr = [];
    arr = this.findAllKey(obj, str);
    return arr;
  }

  // 判断是否可以下一步跳转到提交订单页面
  canGoNextPage(dataList) {
    if (this.selectMatchNum == 0) {
      this.canGoNext = false;
    } else if (this.selectMatchNum > 1) {
      this.canGoNext = true;
    } else {
      if (dataList.gameId == 4077) {
        this.canGoNext = false;
        var canGo = false;
        for (let i = 0; i < dataList.list.length; i++) {
          var arr = dataList.list[i].selectedList;
          if (arr.length > 0 && dataList.list[i].betSinglePlaytype.indexOf('4076') > -1) {
            if (arr.indexOf("spf_0") > -1 || arr.indexOf("spf_1") > -1 || arr.indexOf("spf_3") > -1) {
              canGo = true;
            }
          } else if (arr.length > 0 && dataList.list[i].betSinglePlaytype.indexOf('4071') > -1) {
            if (arr.indexOf("rqspf_0") > -1 || arr.indexOf("rqspf_1") > -1 || arr.indexOf("rqspf_3") > -1) {
              canGo = true;
            } 
          }
        }
        this.canGoNext = canGo;
      } else if (dataList.gameId == 4075) {
        this.canGoNext = false;
        var canGo = false;
        for (let i = 0; i < dataList.list.length; i++) {
          var arr = dataList.list[i].selectedList;
          if (arr.length > 0) {
            if ((arr.indexOf("spf_0") > -1 || arr.indexOf("spf_1") > -1 || arr.indexOf("spf_3") > -1) && dataList.list[i].betSinglePlaytype.indexOf('4076') > -1) {
              canGo = true;
            } else if((arr.indexOf("rqspf_0") > -1 || arr.indexOf("rqspf_1") > -1 || arr.indexOf("rqspf_3") > -1) && dataList.list[i].betSinglePlaytype.indexOf('4071') > -1){
              canGo = true;
            }else if (arr[0].split('_')[0].indexOf("bqc") > -1 || arr[0].split('_')[0].indexOf("zjq") > -1 || arr[0].split('_')[0].indexOf("dcbf") > -1) {
              canGo = true;
            }
          }
        }
        this.canGoNext = canGo;
      } else if (dataList.gameId == 4065) {
        this.canGoNext = false;
        var canGo = false;
        for (let i = 0; i < dataList.list.length; i++) {
          var arr = dataList.list[i].selectedList;
          var betSinglePlaytype = dataList.list[i].betSinglePlaytype;
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
        this.canGoNext = canGo;
      } else if (dataList.gameId == 4062) {
        this.canGoNext = false;
        var canGo = false;
        for (let i = 0; i < dataList.list.length; i++) {
          var arr = dataList.list[i].selectedList;
          if (arr.length > 0 && dataList.list[i].betSinglePlaytype.indexOf('4062') > -1) {
            canGo = true
          }
        }
        this.canGoNext = canGo;
      } else if (dataList.gameId == 4061) {
        this.canGoNext = false;
        var canGo = false;
        for (let i = 0; i < dataList.list.length; i++) {
          var arr = dataList.list[i].selectedList;
          if (arr.length > 0 && dataList.list[i].betSinglePlaytype.indexOf('4061') > -1) {
            canGo = true
          }
        }
        this.canGoNext = canGo;
      } else if (dataList.gameId == 4064) {
        this.canGoNext = false;
        var canGo = false;
        for (let i = 0; i < dataList.list.length; i++) {
          var arr = dataList.list[i].selectedList;
          if (arr.length > 0 && dataList.list[i].betSinglePlaytype.indexOf('4064') > -1) {
            canGo = true
          }
        }
        this.canGoNext = canGo;
      } else {
        this.canGoNext = true;
      }
    }
  }

  // 通过value找到key
  findAllKey(obj, value) {
    var arr = [];
    for (var key in obj) {
      if (obj[key] == value) {
        arr.push(key)
      }
    }
    return arr;
  }

  findKey(obj, value) {
    var str = "";
    for (var key in obj) {
      if (obj[key] == value) {
        str = key;
      }
    }
    return str;
  }
}
