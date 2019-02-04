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
    AboutPage,
    ContactPage,
    About1Page,
    Tab1Page,
    Contact1Page
  ],
  imports: [
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
    AboutPage,
    ContactPage,
    About1Page,
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
