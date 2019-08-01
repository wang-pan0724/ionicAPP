import { Injectable } from '@angular/core';
import jsrsasign from 'jsrsasign'
import CryptoJS from 'crypto-js'
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { AppConfig } from './app-config'
import HmacSHA1 from 'crypto-js/hmac-sha1';
import Base64 from 'crypto-js/enc-base64';

@Injectable({
  providedIn: 'root'
})
export class SignService {

  constructor(private http: HttpClient) { }

  public httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json;charset=UTF-8', "Access-Control-Allow-Origin": "*" })
  };

  public mustPassParam = {
    "agentId": AppConfig.agentId,
    "sid": localStorage.getItem('sid'),
    "version": AppConfig.version,
    "clientType": AppConfig.clientType,
    "appType": AppConfig.appType,
    "imei": AppConfig.imei,
    "phoneModel": AppConfig.phoneModel,
    "macAdrs": AppConfig.macAdrs,
    "format": AppConfig.format,
    "iv": AppConfig.iv
  }

  getsecretkey() {  //RSA
    let nowTime = new Date().getTime();
    localStorage.timeTag = nowTime.toString();
    localStorage.token = (nowTime + 3600000).toString();
    let data = {
      "timeTag": localStorage.getItem("timeTag"),
      "token": localStorage.getItem('token')
    }

    var jsonToStr = this.doJson(data);
    this.http.post(AppConfig.baseUrl + '/m/support/secretkey.do?' + jsonToStr, this.httpOptions).subscribe(res => {
      localStorage.secretkey = res['key'];
    });
  }

  processJson(obj) {
    let arr = [];
    for (var key in obj) {
      arr.push(key)
    }
    arr.sort();
    let str = "";
    for (var key in arr) {
      str += arr[key] + '=' + obj[arr[key]] + '&'
    }

    str = str.substr(0, str.length - 1);
    // console.log(str);
    return str;
  }

  //SHA1加密
  getSign(value) {
    var key = "ZTjx2kz@@XtFnbfCrM+MArh@h";
    var base64 = Base64.stringify(HmacSHA1(value,key))
    return base64;
  }

  // Base64加密
  getBase64(value){
    return Base64.stringify(CryptoJS.enc.Utf8.parse(value))
  }

  getPassword(password) {
    let rsa = new jsrsasign.RSAKey();
    let publicKey = "-----BEGIN PUBLIC KEY-----\n" + localStorage.getItem('secretkey') + "\n-----END PUBLIC KEY-----";
    rsa = jsrsasign.KEYUTIL.getKey(publicKey)
    var enc = jsrsasign.KJUR.crypto.Cipher.encrypt(password, rsa);
    let loginPassword = jsrsasign.hextob64(enc);
    // console.log(loginPassword)
    return loginPassword;
  }

  doJson(json) {
    json = Object.assign(json, this.mustPassParam);
    // json = json.assign(this.mustPassParam);
    var str = this.processJson(json);
    var sign = this.getSign(str);
    str += "&sign=" + sign;
    return str;
  }

  getStrUrl(json) {
    var staticJson = {
      "agentId": AppConfig.agentId,
      "sid": localStorage.getItem('sid'),
      "version": AppConfig.version,
      "clientType": AppConfig.clientType,
      "appType": AppConfig.appType,
      "imei": AppConfig.imei,
      "phoneModel": AppConfig.phoneModel,
      "macAdrs": AppConfig.macAdrs,
      "format": AppConfig.format,
      "iv": AppConfig.iv,
      "timeTag": localStorage.getItem("timeTag"),
      "token": localStorage.getItem('token'),
    }

    staticJson = Object.assign(json, staticJson, AppConfig.DeviceToken);
    var str = this.processJson(staticJson);
    var sign = this.getSign(str);
    str += "&sign=" + sign;
    return str;
  }

  getLivezcmatchListUrl(json){
    var staticJson = {
      "agentId": AppConfig.agentId,
      "sid": localStorage.getItem('sid'),
      "version": AppConfig.version,
      "clientType": AppConfig.clientType,
      "appType": AppConfig.appType,
      "imei": AppConfig.imei,
      "phoneModel": AppConfig.phoneModel,
      "macAdrs": AppConfig.macAdrs,
      "format": AppConfig.format,
      "iv": AppConfig.iv,
      "timeTag": localStorage.getItem("timeTag"),
      "token": localStorage.getItem('token'),
    }

    staticJson = Object.assign(json, staticJson);
    var str = this.processJson(staticJson);
    var sign = this.getSign(str);
    // str = encodeURIComponent(str).replace("%3F", "?").replace("%2B", "+").replace("%26", "&").replace("%3D", "=").replace("%3A", ":").replace("%21", "!").replace("%2F", "/").replace("%2F%2F", "//").replace("", "").replace("%3B",";");
    str += "&sign=" + sign;
    return str;
  }
}
