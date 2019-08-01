import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-steps',
  templateUrl: './steps.component.html',
  styleUrls: ['./steps.component.css']
})
export class StepsComponent implements OnInit {

  @Input() stepsData: number;
  public DataList: any;
  public active: number;
  constructor() { }

  ngOnInit() {
    switch (this.stepsData) {
      case 0:
        this.DataList = [
          {
            title: '预约出票',
            tips: '待接单'
          },
          {
            title: '站点接单',
          },
          {
            title: '实体票录入'
          },
          {
            title: '已中奖',
          },
          {
            title: '已兑奖',
          }]
        this.active = 0;
        break;
      case 1:
        this.DataList = [
          {
            title: '预约出票'
          },
          {
            title: '接单失败',
          }]
        this.active = 1;
        break;
      case 2:
        this.DataList = [
          {
            title: '预约出票'
          },
          {
            title: '已撤销',
          }]
        this.active = 1;
        break;
      case 3:
        this.DataList = [
          {
            title: '预约出票'
          },
          {
            title: '站点接单',
            tips: '待出票'
          },
          {
            title: '确认出票'
          },
          {
            title: '实体票录入'
          },
          {
            title: '已中奖',
          },
          {
            title: '已兑奖',
          }]
        this.active = 1;
        break;
      case 4:
        this.DataList = [
          {
            title: '预约出票'
          },
          {
            title: '站点接单',
            tips: '待出票'
          },
          {
            title: '部分出票'
          },
          {
            title: '已中奖',
          },
          {
            title: '已兑奖',
          }]
        this.active = 2;
        break;
      case 5:
        this.DataList = [
          {
            title: '预约出票'
          },
          {
            title: '站点接单'
          },
          {
            title: '部分出票'
          },
          {
            title: '未中奖',
          }]
        this.active = 3;
        break;
      case 6:
        this.DataList = [
          {
            title: '预约出票'
          },
          {
            title: '站点接单'
          },
          {
            title: '部分出票'
          },
          {
            title: '已中奖',
            tips: "待兑奖"
          },
          {
            title: '已兑奖',
          }]
        this.active = 3;
        break;
      case 7:
        this.DataList = [
          {
            title: '预约出票'
          },
          {
            title: '站点接单'
          },
          {
            title: '部分出票'
          },
          {
            title: '已中奖'
          },
          {
            title: '已兑奖',
          }]
        this.active = 4;
        break;
      case 8:
        this.DataList = [
          {
            title: '预约出票'
          },
          {
            title: '站点接单'
          },
          {
            title: '已撤销'
          }]
        this.active = 2;
        break;
      case 9:
        this.DataList = [
          {
            title: '预约出票'
          },
          {
            title: '站点接单'
          },
          {
            title: '确认出票',
            tips: "待录入"
          },
          {
            title: "实体票录入"
          },
          {
            title: '已中奖'
          },
          {
            title: '已兑奖',
          }]
        this.active = 2;
        break;
      case 10:
        this.DataList = [
          {
            title: '预约出票'
          },
          {
            title: '站点接单'
          },
          {
            title: '确认出票'
          },
          {
            title: "未录入"
          },
          {
            title: '未中奖'
          }]
        this.active = 4;
        break;
      case 11:
        this.DataList = [
          {
            title: '预约出票'
          },
          {
            title: '站点接单'
          },
          {
            title: '确认出票'
          },
          {
            title: "未录入"
          },
          {
            title: '已中奖',
            tips:'待兑奖'
          },
          {
            title: '已兑奖',
          }]
        this.active = 4;
        break;
      case 12:
      this.DataList = [
        {
          title: '预约出票'
        },
        {
          title: '站点接单'
        },
        {
          title: '确认出票'
        },
        {
          title: "未录入"
        },
        {
          title: '已中奖'
        },
        {
          title: '已兑奖',
        }]
        this.active = 5;
        break;
      case 13:
      this.DataList = [
        {
          title: '预约出票'
        },
        {
          title: '站点接单'
        },
        {
          title: '确认出票'
        },
        {
          title: "实体票录入",
          tips:"待开奖"
        },
        {
          title: '已中奖',
        },
        {
          title: '已兑奖',
        }]
        this.active = 3;
        break;
      case 14:
      this.DataList = [
        {
          title: '预约出票'
        },
        {
          title: '站点接单'
        },
        {
          title: '确认出票'
        },
        {
          title: "实体票录入"
        },
        {
          title: '交易成功',
        }]
        this.active = 4;
        break;
      case 15:
      this.DataList = [
        {
          title: '预约出票'
        },
        {
          title: '站点接单'
        },
        {
          title: '确认出票'
        },
        {
          title: "实体票录入"
        },
        {
          title: '未中奖',
        }]
        this.active = 4;
        break;
      case 16:
      this.DataList = [
        {
          title: '预约出票'
        },
        {
          title: '站点接单'
        },
        {
          title: '确认出票'
        },
        {
          title: "实体票录入"
        },
        {
          title: '已中奖',
          tips:"待兑奖"
        },
        {
          title: '已兑奖',
        }]
        this.active = 4;
        break;
      case 17:
      this.DataList = [
        {
          title: '预约出票'
        },
        {
          title: '站点接单'
        },
        {
          title: '确认出票'
        },
        {
          title: "实体票录入"
        },
        {
          title: '已中奖'
        },
        {
          title: '已兑奖',
        }]
        this.active = 5;
        break;
      case 18:
      this.DataList = [
        {
          title: '预约出票'
        },
        {
          title: '站点接单'
        },
        {
          title: '确认出票'
        },
        {
          title: "实体票录入",
          tips:"修改中"
        },
        {
          title: '已中奖'
        },
        {
          title: '已兑奖',
        }]
        this.active = 3;
        break;
      case 19:
      this.DataList = [
        {
          title: '预约出票'
        },
        {
          title: '站点接单'
        },
        {
          title: '确认出票'
        },
        {
          title: "实体票录入",
          tips:"交易中"
        },
        {
          title: '交易成功'
        }]
        this.active = 3;
        break;
    }
  }

}
