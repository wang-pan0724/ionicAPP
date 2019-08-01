import { Component, OnInit } from '@angular/core';
import { MenusService } from '../services/menus.service'

@Component({
  selector: 'app-how-to-trade',
  templateUrl: './how-to-trade.component.html',
  styleUrls: ['./how-to-trade.component.css']
})
export class HowToTradeComponent implements OnInit {

  title="如何交易";
  menus = [];
  public modelData = ['7','8','9','10','11'];

  constructor(
    private _menusService: MenusService
  ) { }
  ngOnInit() {
    this._menusService.getMenu().then(data => {
      this.menus = data;
    });
  }

}
