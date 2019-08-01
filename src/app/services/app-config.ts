import { HttpHeaders } from "@angular/common/http";
import { environment } from '../../environments/environment'
export class AppConfig {
  static baseUrl: string = environment.baseUrl;
  static leagueUrl:string = environment.leagueUrl;
  static liveUrl:string = environment.liveUrl;
  static agentId: number = 1025;
  static version: string = 'repo_android_1.0.0';
  static clientType: string = '1';
  static imei: string = '860758044968719';
  static appType: string = '21';
  static iv: string = '2';
  static format: string = 'json';
  static phoneModel: string = 'h5';
  static macAdrs: string = "02:00:00:00:00:00";
  static DeviceToken: any = {
    "xgDeviceToken": "38ab50020688478645f0aec582ceea6b3c71ea59",
    "miDeviceToken": null,
    "hwDeviceToken": ""
  };
  static httpOptions: any = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json;charset=UTF-8', "Access-Control-Allow-Origin": "*" })
  };
  static httpOptionsApiVersion: any = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json;charset=UTF-8', "Access-Control-Allow-Origin": "*" ,'api-version':'2'})
  };
  static HAD:number = 4076;  //胜平负
  static HHAD:number = 4071; //让球胜平负
  static HAFU:number = 4074; //半全场胜负
  static TTG:number = 4072; //总进球数
  static CRS:number = 4073; //正确比分
  static FB_HH:number = 4075; //足球混投
  static HDC:number = 4062; // 让分胜负
  
  static HILO:number = 4064; //大小分
  static MNL:number = 4061; //胜负
  static WNM:number = 4063; //胜分差
  static BK_HH:number = 4065; //篮球混投
}

