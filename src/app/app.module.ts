import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Directive } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ElModule } from 'element-angular';
import { ReactiveFormsModule } from '@angular/forms';
import { HashLocationStrategy, LocationStrategy } from "@angular/common";
import { HttpClientModule, HttpClientJsonpModule } from '@angular/common/http';

import { NgxEchartsModule } from 'ngx-echarts';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './/app-routing.module';
import { HomeComponent } from './home/home.component';
import { ScoreComponent } from './score/score.component';
import { TradeComponent } from './trade/trade.component';
import { MineComponent } from './mine/mine.component';
import { NavbarComponent } from './component/navbar/navbar.component';
import { CommonTitleComponent } from './component/common-title/common-title.component';
import { FootballComponent } from './football/football.component';
import { BasketballComponent } from './basketball/basketball.component';
import { FooterComponent } from './component/footer/footer.component';
import { FooterNextComponent } from './component/footer-next/footer-next.component';
import { MatchTitleComponent } from './component/match-title/match-title.component';
import { MatchDetailComponent } from './component/match-detail/match-detail.component';
import { MatchEndtimeComponent } from './component/match-endtime/match-endtime.component';
import { HowToTradeComponent } from './how-to-trade/how-to-trade.component';
import { HowToIssueOrdersComponent } from './how-to-issue-orders/how-to-issue-orders.component';
import { HowToAwardPrizesComponent } from './how-to-award-prizes/how-to-award-prizes.component';
import { AskedQuestionsComponent } from './asked-questions/asked-questions.component';
import { UserinfoComponent } from './userinfo/userinfo.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ChangeNickComponent } from './user/change-nick/change-nick.component';
import { ChangePhonenumComponent } from './user/change-phonenum/change-phonenum.component';
import { ChangeWeixinComponent } from './user/change-weixin/change-weixin.component';
import { ChangezhifubaoComponent } from './user/changezhifubao/changezhifubao.component';
import { ChangeQQComponent } from './user/change-qq/change-qq.component';
import { ChangeLoginpasswordComponent } from './user/change-loginpassword/change-loginpassword.component';
import { MystoreComponent } from './mystore/mystore.component';
import { SetupComponent } from './setup/setup.component';
import { AboutUsComponent } from './setup/about-us/about-us.component';
import { WeekPipe } from './pipe/week.pipe';
import { TimePipe } from './pipe/time.pipe';
import { LeagueResultDescPipe } from './pipe/league-result-desc.pipe';
import { AgainstRecordPipe } from './pipe/against-record.pipe';
import { FirmOrderComponent } from './firm-order/firm-order.component';
import { DealWithDataPipe } from './pipe/deal-with-data.pipe';
import { TradeDetailComponent } from './trade-detail/trade-detail.component';
import { StepsComponent } from './component/steps/steps.component';
import { AlertComponent } from './component/alert/alert.component';
import { ForgotpwdCheckcodeComponent } from './forgotpwd-checkcode/forgotpwd-checkcode.component';
import { AgreementComponent } from './agreement/agreement.component';
import { PhonenumPipe } from './pipe/phonenum.pipe';
import { ChangePhonenextComponent } from './user/change-phonenext/change-phonenext.component';
import { PasswordComponent } from './component/password/password.component';
import { ConfirmComponent } from './component/confirm/confirm.component';
import { SetPaypwdComponent } from './user/set-paypwd/set-paypwd.component';
import { ChangePaypwdComponent } from './user/change-paypwd/change-paypwd.component';
import { ResetPaypwdComponent } from './user/reset-paypwd/reset-paypwd.component';
import { SubmitSuccessfullyComponent } from './submit-successfully/submit-successfully.component';
import { HowtoplayFootballComponent } from './howtoplay-football/howtoplay-football.component';
import { HowtoplayBassketballComponent } from './howtoplay-bassketball/howtoplay-bassketball.component';
import { TeadeAgreementsComponent } from './teade-agreements/teade-agreements.component';
import { SetPaypasswordComponent } from './user/set-paypassword/set-paypassword.component';
import { WalletLogComponent } from './wallet-log/wallet-log.component';
import { DropdownComponent } from './component/dropdown/dropdown.component';
import { TicketDetailComponent } from './ticket-detail/ticket-detail.component';
import { SliderComponent } from './component/slider/slider.component';
import { RefreshComponent } from './component/refresh/refresh.component';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { RouteReuseStrategy } from '@angular/router';

import { JPush } from '@jiguang-ionic/jpush/ngx';
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ScoreComponent,
    TradeComponent,
    MineComponent,
    NavbarComponent,
    CommonTitleComponent,
    FootballComponent,
    BasketballComponent,
    FooterComponent,
    FooterNextComponent,
    MatchTitleComponent,
    MatchDetailComponent,
    MatchEndtimeComponent,
    HowToTradeComponent,
    HowToIssueOrdersComponent,
    HowToAwardPrizesComponent,
    AskedQuestionsComponent,
    UserinfoComponent,
    SignInComponent,
    SignUpComponent,
    ForgotPasswordComponent,
    ChangeNickComponent,
    ChangePhonenumComponent,
    ChangeWeixinComponent,
    ChangezhifubaoComponent,
    ChangeQQComponent,
    ChangeLoginpasswordComponent,
    MystoreComponent,
    SetupComponent,
    AboutUsComponent,
    WeekPipe,
    TimePipe,
    LeagueResultDescPipe,
    AgainstRecordPipe,
    FirmOrderComponent,
    DealWithDataPipe,
    TradeDetailComponent,
    StepsComponent,
    AlertComponent,
    ForgotpwdCheckcodeComponent,
    AgreementComponent,
    PhonenumPipe,
    ChangePhonenextComponent,
    PasswordComponent,
    ConfirmComponent,
    SetPaypwdComponent,
    ChangePaypwdComponent,
    ResetPaypwdComponent,
    SubmitSuccessfullyComponent,
    HowtoplayFootballComponent,
    HowtoplayBassketballComponent,
    TeadeAgreementsComponent,
    SetPaypasswordComponent,
    WalletLogComponent,
    DropdownComponent,
    TicketDetailComponent,
    SliderComponent,
    RefreshComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    ElModule.forRoot(),
    HttpClientModule,
    HttpClientJsonpModule,
    NgxEchartsModule,
    IonicModule.forRoot({mode:'ios'})
  ],
  providers: [
    StatusBar,
    SplashScreen,
    JPush,
    { provide: LocationStrategy, useClass: HashLocationStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
