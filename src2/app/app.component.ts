import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
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

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = BrandPage;

  pages: Array<{title: string, component: any}>;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Exhibition', component: ExhibitionPage },
      { title: 'Companies', component: CompanyPage },
      { title: 'Brands', component: BrandPage },
      { title: 'Announcements', component: AnnouncementsPage },
      { title: 'Profile', component: ProfilePage },
      { title: 'Register', component: RegisterPage },
      { title: 'Login', component: LoginPage }
      // { title: 'List', component: ListPage }
    ];

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