import { Component, OnInit } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { SignService } from '../services/sign.service'
import { AppConfig } from '../services/app-config';

@Component({
  selector: 'app-score',
  templateUrl: './score.component.html',
  styleUrls: ['./score.component.css']
})
export class ScoreComponent implements OnInit {
  public titleHeader = "比分直播-"
  public title = ""
  public titleId = 407;
  public itemData = [
    {
      title: '精彩足球',
      id: 407
    },
    {
      title: '北京单场',
      id: 405
    },
    {
      title: '竞彩篮球',
      id: 406
    }
  ];
  public tabIndex = 0;
  public LivezcMatchListData: any = [];
  constructor(private http: HttpClient, private signService: SignService) { }

  ngOnInit() {
    this.getData();
    this.title = this.titleHeader+this.itemData[0].title
  }

  getData() {
    let data = {
      'matchType': 1,
      'gameId': this.titleId
    }
    this.http.get(AppConfig.leagueUrl + '/instantscore/zqscore/livezcmatchList.do?' + this.signService.getLivezcmatchListUrl(data), AppConfig.httpOptions).subscribe(response => {
      console.log(response)
      this.doLivezcmatchList(response)
    });
  }

  getTitleId(el){
    this.titleId = this.itemData[el].id;
    this.title = this.titleHeader+this.itemData[el].title;
    this.getData()
  }

  doLivezcmatchList(res) {
    if (res.ro.respCode == '0000') {
      this.LivezcMatchListData = res.resp;
      var matchTime = res.resp.list[0].matchTime.split(' ')[0];
      this.LivezcMatchListData.list[0].showMatch = true;
      var number = 1;
      // this.LivezcMatchListData.list[0].matchNum = 1;
      var matchListNum = [];
      for (var i = 1; i < res.resp.list.length; i++) {
        if (matchTime == res.resp.list[i].matchTime.split(' ')[0]) {
          res.resp.list[i].showMatch = false;
          number++;
        } else {
          res.resp.list[i].showMatch = true;
          matchTime = res.resp.list[i].matchTime.split(' ')[0];
          matchListNum.push(number);
          number = 1;
        }

        if (i == res.resp.list.length - 1) {
          matchListNum.push(number);
        }
      }
      var matchListNumIndex = 0;
      for (var i = 0; i < this.LivezcMatchListData.list.length; i++) {
        if (this.LivezcMatchListData.list[i].showMatch == true) {
          this.LivezcMatchListData.list[i].matchLength = matchListNum[matchListNumIndex];
          matchListNumIndex++;
        }
      }

      console.log(this.LivezcMatchListData)
      console.log(matchListNum)
    }
  }

  handle(index) {
    console.log(index)
    this.tabIndex = index;
  }

  onScrollRefresh() {
    // this.IsNextPageFinish = true
    console.log("下拉刷新");
    // this._IsRefreshFinish = true;

    var that = this;
    window.setTimeout(function () {
      // that._IsRefreshFinish = false;
    }, 1000);

  }

  onSlideLeft() {
    console.log('向左边滑动啦...');
  }

  onSlideRight() {
    console.log('向右边滑动..');
  }

}
