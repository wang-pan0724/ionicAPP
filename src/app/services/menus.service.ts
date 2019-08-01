import { Injectable } from '@angular/core';
import { MENUS } from './help-mock';
import { FootballDetail } from './footballDetali-mock'
import { BASKETBALLDETAILS } from './basketballDetail'

@Injectable({
  providedIn: 'root'
})
export class MenusService {

  constructor() { }

  getMenu(): Promise<any[]> {
    return Promise.resolve(MENUS);
  }

  getFootballDetail():Promise<any>{
    return Promise.resolve(FootballDetail);
  }

  getBassketballDetail():Promise<any>{
    return Promise.resolve(BASKETBALLDETAILS);
  }
}
