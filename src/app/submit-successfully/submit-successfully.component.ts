import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SignService } from '../services/sign.service'
import { AppConfig } from '../services/app-config'
import { HttpClient } from "@angular/common/http";

@Component({
  selector: 'app-submit-successfully',
  templateUrl: './submit-successfully.component.html',
  styleUrls: ['./submit-successfully.component.css']
})
export class SubmitSuccessfullyComponent implements OnInit {
  public title:string = '提交成功';
  public storeData:any;
  constructor(private router: Router, private signService: SignService, private http: HttpClient) { }

  ngOnInit() {
    this.getStoreData()
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

  toTrade(){
    this.router.navigate(['/trade'])
  }

  goBack(){
    this.router.navigate(['/home'])
  }

  continueIssu(){
    var firmOrder = JSON.parse(localStorage.getItem('firmOrder'));
    console.log(firmOrder)
    if(firmOrder['list']['gameId']>4070){
      this.router.navigate(['/home'])
      window.setTimeout(()=>{
        this.router.navigate(['/home/football'])
      },10)
    }else{
      this.router.navigate(['/home']);
      window.setTimeout(()=>{
        this.router.navigate(['/home/basketball'])
      },10) 
    }  
  }
}
