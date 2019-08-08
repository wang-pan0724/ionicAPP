import { Component, OnInit, Input, Output, OnChanges, AfterContentInit, EventEmitter, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-refresh',
  templateUrl: './refresh.component.html',
  styleUrls: ['./refresh.component.css']
})
export class RefreshComponent implements OnInit, OnChanges {

  @Input('IsRefreshFinish') _IsRefreshFinish: boolean;
  @Output('onRefresh') _onRefresh: EventEmitter<any> = new EventEmitter();

  @ViewChild('refresh') refresh: ElementRef;
  @ViewChild('divContent') divContent: ElementRef;

  public TitleTop: string = '下拉刷新';
  public TitleBottom = '上拉加载';

  public upPullToLoadMore = '上拉加载';
  public upReleaseToRefresh = '松开加载';
  public upRefreshing = '加载中…';
  public upIsLastMessage = "已经是最后一页";
  private downPullToRefresh = '下拉刷新';
  downReleaseToRefresh = '松开刷新';
  public downRefreshing = '刷新中…';
  threshold = 60;//移动距离阀值
  maxOffset = 140;//最大可拖动距离
  actionOffset = 60;//可引起操作的拖动距离
  startClientY = 0;
  endClientY = 0;
  canRefershPosition: number = 0;
  pageY: number = 0;
  startScreenY:number = 0;
  endScreenY:number = 0;
  oldScreenY:number=0;

  constructor(private el: ElementRef) { }

  ngOnInit() {
    this.canRefershPosition = Math.floor(window.innerHeight * 0.45);
    var el = this.refresh.nativeElement.querySelector('#divContent');
    var _this = this;
    el.addEventListener("touchstart", function (e) {
      _this.touchStart(e);
      _this.stopBubble(e);
    },false);
    el.addEventListener("touchmove", function (e) {
      _this.touchMove(e);
    },false);
    el.addEventListener("touchend", function (e) {
      _this.touchEnd(e);
      _this.stopBubble(e)
    },false);
  }

  ngOnChanges() { }

  touchStart(event) {
    this.startClientY = event.changedTouches[0].clientY;
    this.pageY = event.changedTouches[0].pageY;
    this.startScreenY = event.changedTouches[0].screenY;
  }

  touchMove(event) {
    this.endClientY = event.changedTouches[0].clientY;
    this.endScreenY = event.changedTouches[0].screenY;
    this.setTransition(0);
    if (this.pageY < this.canRefershPosition) {
      event.preventDefault();
      this.doDisplay();
    }
  }

  touchEnd(event) {
    this.endClientY = event.changedTouches[0].clientY;
    let offsetY = this.endClientY - this.startClientY;
    if (offsetY > this.threshold && this.pageY < this.canRefershPosition) {
      this.TitleTop = this.downRefreshing;
      this.translate(0);
      this._onRefresh.emit()
    }
  }

  stopBubble(e) {
    if (e && e.stopPropagation)
      e.stopPropagation();
    else {
      window.event.cancelBubble = true;
    }
  }

  touchMoveUp(){
    this.translate(this.endScreenY-this.startScreenY + this.oldScreenY);
    this.oldScreenY = this.endScreenY-this.startScreenY + this.oldScreenY
  }

  doDisplay() {
    let offsetY = this.endClientY - this.startClientY
    if (0 > offsetY) {
    } else if (this.threshold > offsetY && offsetY > 0) {
      // 只显示 下拉刷新
      this.TitleTop = this.downPullToRefresh;
      this.translate(offsetY);
      this.setTransition(1)
    } else if (offsetY > this.threshold && this.maxOffset > offsetY) {
      // 显示松开刷新
      this.TitleTop = this.downReleaseToRefresh;
      this.translate(offsetY);
      this.setTransition(1)
    } else {
      // 不能再下拉 显示松开刷新
      this.TitleTop = this.downReleaseToRefresh;
      this.translate(this.maxOffset);
      this.setTransition(1)
    }
  }

  setTransition(time) {//设置效果时间
    var ele = this.refresh.nativeElement.querySelector('#divContent');
    ele.style.webkitTransition = "all " + time + "s";
    ele.style.transition = "all " + time + "s";
    // //给提示ID设置动画过渡时间

    var eleID1 = this.refresh.nativeElement.querySelector('#downMessage');
    eleID1.style.webkitTransition = "all " + time + "s";
    eleID1.style.transition = "all " + time + "s";
  }

  translate(diff) {//设置移动
    var ele = this.refresh.nativeElement.querySelector('#divContent');
    ele.style.webkitTransform = "translate(0," + diff + "px)";
    ele.style.transform = "translate(0," + diff + "px)";
    // //给提示ID设置移动
    var eleID1 = this.refresh.nativeElement.querySelector('#downMessage')
    eleID1.style.height = Math.abs(diff) + "px";
  }

}
