import { Component, OnInit } from '@angular/core';
import { MenusService } from '../services/menus.service';

@Component({
  selector: 'app-how-to-award-prizes',
  templateUrl: './how-to-award-prizes.component.html',
  styleUrls: ['./how-to-award-prizes.component.css']
})
export class HowToAwardPrizesComponent implements OnInit {
  title = "如何颁奖";
  menus = [];
  public modelData = ['5'];

  constructor(private _menusService: MenusService) { }
  
  ngOnInit() {
    this._menusService.getMenu().then(data => {
      this.menus = data;
    });
  }

}
