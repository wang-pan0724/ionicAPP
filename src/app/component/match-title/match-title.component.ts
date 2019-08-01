import { Component, OnInit,Input } from '@angular/core';

@Component({
  selector: 'app-match-title',
  templateUrl: './match-title.component.html',
  styleUrls: ['./match-title.component.css']
})
export class MatchTitleComponent implements OnInit {
  @Input() matchTitleData: any;
  @Input() matchExpend:number;
  @Input() matchNum:number
  public number = 1;
  constructor() { }

  ngOnInit() {
    var matchTime = this.matchTitleData.split(' ')[0].split('-');
    var matchStr = matchTime[0].substr(2,4) + matchTime[1]+matchTime[2];
    this.number = this.matchNum[matchStr];
  }
}
