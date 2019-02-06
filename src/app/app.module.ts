import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { HttpClientModule } from '@angular/common/http';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import {TabsPage} from "../pages/tabs/tabs";
import {AboutPage} from "../pages/about/about";
import {ContactPage} from "../pages/contact/contact";
import {About1Page} from "../pages/about1/about1";
import {Tab1Page} from "../pages/tab1/tab1";
import {Contact1Page} from "../pages/contact1/contact1";
import {WelcomePage} from "../pages/welcome/welcome";
import {RegisterPage} from "../pages/register/register";
import {LoginPage} from "../pages/login/login";
import {ExhibitionPage} from "../pages/exhibition/exhibition";
import {CompanyPage} from "../pages/company/company";
import {BrandPage} from "../pages/brand/brand";

import { GloaleVariablesProvider } from '../providers/gloale-variables/gloale-variables';

import {ProfilePage} from "../pages/profile/profile";
import {UpdateProfilePage} from "../pages/update-profile/update-profile";
import {TestPage} from "../pages/test/test";
import { StarRatingModule } from 'ionic3-star-rating';
import {NewsPage} from "../pages/news/news";
import {NewsDetailPage} from "../pages/news-detail/news-detail";
import {AnnouncementsPage} from "../pages/announcements/announcements";
import {AnnouncementDetailPage} from "../pages/announcement-detail/announcement-detail";
import {CartPage} from "../pages/cart/cart";
import {NotificationPage} from "../pages/notification/notification";


@NgModule({
  declarations: [
    MyApp,
    HomePage,
    WelcomePage,
    RegisterPage,
    LoginPage,
    ExhibitionPage,
    CompanyPage,
    BrandPage,
    ListPage,
    TabsPage,
    TestPage,
    AboutPage,
    NotificationPage,
    ContactPage,
    NewsPage,
    NewsDetailPage,
    AnnouncementsPage,
    AnnouncementDetailPage,
    CartPage,
    About1Page,
    ProfilePage,
    UpdateProfilePage,
    Tab1Page,
    Contact1Page
  ],
  imports: [
    StarRatingModule,
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpClientModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    WelcomePage,
    RegisterPage,
    LoginPage,
    ExhibitionPage,
    CompanyPage,
    BrandPage,
    ListPage,
    TabsPage,
    TestPage,
    AboutPage,
    NotificationPage,
    ContactPage,
    NewsPage,
    NewsDetailPage,
    AnnouncementsPage,
    AnnouncementDetailPage,
    CartPage,
    About1Page,
    ProfilePage,
    UpdateProfilePage,
    Tab1Page,
    Contact1Page
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    GloaleVariablesProvider
  ]
})
export class AppModule {}
