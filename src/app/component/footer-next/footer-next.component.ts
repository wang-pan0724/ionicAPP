import { Component, OnInit, Input, Output } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-footer-next',
  templateUrl: './footer-next.component.html',
  styleUrls: ['./footer-next.component.css']
})
export class FooterNextComponent implements OnInit {

  @Input() selectData: any;
  public loginData;

  constructor(private router: Router) { }

  ngOnInit() {
   
    this.loginData = JSON.parse(localStorage.getItem("loginData"))
  }

  nextStep() {
    localStorage.setItem('firmOrder',JSON.stringify(this.selectData));
    if (this.selectData.canGoMext) {
      if(this.loginData==null){
        this.router.navigate(['/mine/signin']);
      }else{
        if(this.loginData.ro.code=='0000'){
          this.router.navigate(['home/firmorder']);
        }else{
          this.router.navigate(['/mine/signin']);
        }
      }
    }
  }
}
