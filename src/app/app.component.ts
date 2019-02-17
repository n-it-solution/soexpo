import { Component, ViewChild } from '@angular/core';
import {Events, Nav, Platform} from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import {TabsPage} from "../pages/tabs/tabs";
import {WelcomePage} from "../pages/welcome/welcome";
import {RegisterPage} from "../pages/register/register";
import {LoginPage} from "../pages/login/login";
import {ExhibitionPage} from "../pages/exhibition/exhibition";
import {CompanyPage} from "../pages/company/company";
import {BrandPage} from "../pages/brand/brand";
import {ProfilePage} from "../pages/profile/profile";
import {UpdateProfilePage} from "../pages/update-profile/update-profile";
import {TestPage} from "../pages/test/test";
import {NewsPage} from "../pages/news/news";
import {NewsDetailPage} from "../pages/news-detail/news-detail";
import {AnnouncementsPage} from "../pages/announcements/announcements";
import {AnnouncementDetailPage} from "../pages/announcement-detail/announcement-detail";
import {CartPage} from "../pages/cart/cart";
import {NotificationPage} from "../pages/notification/notification";
import {ProDetailPage} from "../pages/pro-detail/pro-detail";
import {About1Page} from "../pages/about1/about1";
import {AboutPage} from "../pages/about/about";
import { TranslateService } from '@ngx-translate/core';
import {GloaleVariablesProvider} from "../providers/gloale-variables/gloale-variables";
import {Storage} from "@ionic/storage";
import {LogoutPage} from "../pages/logout/logout";
import {ActivatePage} from "../pages/activate/activate";
import {ContactPage} from "../pages/contact/contact";
import {SplashPage} from "../pages/splash/splash";


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = SplashPage;

  pages: Array<{title: string, component: any}>;
  LoginText:any;
  checkActivate(){
    if (this.loginSatatus){
      if (!this.loginData.confirmed){
        this.pages.push({ title: 'menu.Activate', component: ActivatePage})
      }
    }
  }
  getLang(){
    this.translate.get('menu.login').subscribe(
      value => {
        this.LoginText = value;
        console.log(11)
      }
    );
  }
  loginData:any;
  status:any = false;
  loginSatatus:any = false;
  withOutLoginMenu(){
    this.pages = [
      { title: 'menu.Exhibition', component: TabsPage },
      { title: 'menu.Login', component: LoginPage},
      { title: 'menu.Register', component: RegisterPage},
      { title: 'menu.Activate', component: ActivatePage},
      { title: 'menu.About', component: AboutPage},
      { title: 'menu.Contact', component: ContactPage},
    ];
  }
  loginMenu(){
    this.pages = [
      { title: 'menu.Exhibition', component: TabsPage },
      { title: 'menu.Notification', component: NotificationPage },
      { title: 'menu.Profile', component: ProfilePage },
      { title: 'menu.Cart', component: CartPage },
      { title: 'menu.Logout', component: LogoutPage},
      { title: 'menu.About', component: AboutPage},
      { title: 'menu.Contact', component: ContactPage},
    ];
    this.checkActivate();
  }
  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen,
              public translate: TranslateService,public events: Events,public globalVar: GloaleVariablesProvider,
              private storage: Storage,
  ) {
    events.subscribe('user:logged', (data) => {
      this.loginMenu();
    });
    events.subscribe('user:logout', () => {
      this.withOutLoginMenu();
    });
    this.storage.get('loginData').then((data)=>{
      if (data != null) {
        console.log('aa'+data);
        this.loginData = data;
        this.loginSatatus = true;
        this.loginMenu();
      }{
        this.withOutLoginMenu();
      }
    });
    this.loginSatatus = globalVar.loginStatus;
    events.subscribe('lang:changed', (value) => {
      translate.setDefaultLang(value);
      console.log(11);
      this.status = true;
    });
    translate.setDefaultLang('en');
    this.initializeApp();
    this.getLang();
    // used for an example of ngFor and navigation
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
}
