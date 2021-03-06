import { Component, ViewChild } from '@angular/core';
import {AlertController, Events, Nav, Platform} from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
// import { SplashScreen } from '@ionic-native/splash-screen';
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
import {MapPage} from "../pages/map/map";
import {el} from "@angular/platform-browser/testing/src/browser_util";
import {AdvancedSearchedPage} from "../pages/advanced-searched/advanced-searched";

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = SplashPage;

  pages: Array<{title: string, component: any,icon: string}>;
  LoginText:any;
  checkActivate(){
    if (this.loginSatatus){
      if (!this.loginData.confirmed){
        this.pages.splice(6,1);
        this.pages.push({ title: 'menu.Logout', component: LogoutPage, icon: 'log-out'});
        this.pages.push({ title: 'menu.Activate', component: ActivatePage, icon: 'information-circle'})
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
      { title: 'menu.Exhibition', component: TabsPage, icon: 'home' },
      { title: 'menu.advancedSearched', component: AdvancedSearchedPage, icon: 'search'},
      { title: 'menu.Login', component: LoginPage, icon: 'lock'},
      { title: 'menu.Register', component: RegisterPage, icon: 'person-add'},
      { title: 'menu.Activate', component: ActivatePage, icon: 'key'},
      { title: 'menu.About', component: AboutPage, icon: 'information-circle'},
      { title: 'menu.Contact', component: ContactPage, icon: 'help'},
    ];
    console.log('withOutLoginMenu');
  }
  loginMenu(){
    console.log(1000000);
    this.pages = [
      { title: 'menu.Exhibition', component: TabsPage, icon: 'home'},
      { title: 'menu.advancedSearched', component: AdvancedSearchedPage, icon: 'search'},
      { title: 'menu.Notification', component: NotificationPage, icon: 'notifications-outline' },
      { title: 'menu.Profile', component: ProfilePage, icon: 'person' },
      { title: 'menu.Cart', component: CartPage, icon: 'cart' },
      { title: 'menu.About', component: AboutPage, icon: 'information-circle'},
      { title: 'menu.Contact', component: ContactPage, icon: 'help'},
      { title: 'menu.Logout', component: LogoutPage, icon: 'log-out'},
    ];
    console.log('with login menu');
    console.log(this.pages);
    this.checkActivate();
  }
  constructor(public platform: Platform, public statusBar: StatusBar,
              // public splashScreen: SplashScreen,
              public translate: TranslateService,public events: Events,public globalVar: GloaleVariablesProvider,
              private storage: Storage,
              private alertCtrl: AlertController,
  ) {
    this.withOutLoginMenu();
    events.subscribe('user:logged', (data) => {
      console.log('logged in');
      this.loginSatatus = true;
      this.loginData = data;
      this.loginMenu();
    });
    events.subscribe('user:logout', () => {
      this.withOutLoginMenu();
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
      // this.splashScreen.hide();
    });
  }
  logoutConfirm(page){
    let yesText;
    this.translate.get('logout.yes').subscribe(
      value => {
        yesText = value;
      }
    );
    console.log(yesText);
    let noText;
    this.translate.get('logout.no').subscribe(
      value => {
        noText = value;
      }
    );
    console.log(noText);
    let title;
    this.translate.get('logout.title').subscribe(
      value => {
        title = value;
      }
    );
    let alert = this.alertCtrl.create({
      title: title,
      buttons: [
        {
          text: noText,
          role: 'cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: yesText,
          handler: data => {
            console.log('ok clicked');
            console.log(data);
            this.nav.setRoot(page);
            // this.viewCtrl.dismiss();
            // this.changeLang(data)
          }
        }
      ]
    });
    alert.present();
  }
  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    if (page.component == NotificationPage || page.component == ProfilePage ||
        page.component == CartPage || page.component == ContactPage || page.component == AboutPage ||
        page .component == AdvancedSearchedPage
    ){
      // this.events.publish('open:tab',page.component);
      this.nav.setRoot(TabsPage,{'openPageInTab' : page.component});
    }else{
      if (page.component == LogoutPage) {
        this.logoutConfirm(page.component);
      } else {
        this.nav.setRoot(page.component);
      }
    }
  }
}
