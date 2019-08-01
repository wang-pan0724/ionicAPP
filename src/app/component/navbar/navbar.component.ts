import { Component, OnInit,Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  @Output() onNavChanged = new EventEmitter();
  @Output() onTabChanged = new EventEmitter();
  @Input() navData:any;
  @Input() ballType:any;

  public switchIndex: number = 0;
  public switchNavIndex: number = 0;
  constructor(private router:Router) { }

  ngOnInit() {
  }

   // 切换nav 向父组件传值   全部/单关
   switchNav(navIndex){
    this.switchNavIndex = navIndex;
    this.onNavChanged.emit(navIndex);
  }

  onClickBtn(){
    if(this.ballType == 0){
      this.router.navigate(['/home/football/howToPlayFootball'])
    }else if(this.ballType == 1){
      this.router.navigate(['/home/basketball/howToPlayBassketball'])
    }
  }

  // 切换tab
  switchTab(index) {
    this.switchIndex = index;
    this.onTabChanged.emit(index);
    // localStorage.setItem('SWITCH_INDEX', this.switchIndex);
  }
  
  // 返回上一页
  goBack() {
    history.go(-1);
  }

}
