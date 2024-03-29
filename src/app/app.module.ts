import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { HttpClientModule, HttpClient } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';


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
import { InAppBrowser } from '@ionic-native/in-app-browser';

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
import { IonicStorageModule } from '@ionic/storage';
import { IonRating } from '../components/ion-rating/ion-rating';
import {ProDetailPage} from "../pages/pro-detail/pro-detail";
import {ActivatePage} from "../pages/activate/activate";
import {LogoutPage} from "../pages/logout/logout";
import {SplashPage} from "../pages/splash/splash";
import {MapPage} from "../pages/map/map";
import {AdvancedSearchedPage} from "../pages/advanced-searched/advanced-searched";
import {PasswordChangePage} from "../pages/password-change/password-change";
import { LocalNotifications } from '@ionic-native/local-notifications';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { Base64 } from '@ionic-native/base64';
import { Network } from '@ionic-native/network';
import { File } from '@ionic-native/file';
import {ShowLocationPage} from "../pages/show-location/show-location";
import { LaunchNavigator } from '@ionic-native/launch-navigator';
import {ExhibitionSearchPage} from "../pages/exhibition-search/exhibition-search";
import { Badge } from '@ionic-native/badge';
import { DocumentViewer } from '@ionic-native/document-viewer';
import { FileTransfer } from '@ionic-native/file-transfer';
import { FileOpener } from '@ionic-native/file-opener';
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, "./assets/i18n/", ".json");
}
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
    Contact1Page,
    IonRating,
    ProDetailPage,
    ActivatePage,
    LogoutPage,
    SplashPage,
    MapPage,
    AdvancedSearchedPage,
    PasswordChangePage,
    ShowLocationPage,
    ExhibitionSearchPage
  ],
  imports: [
    StarRatingModule,
    BrowserModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(),
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
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
    Contact1Page,
    IonRating,
    ProDetailPage,
    ActivatePage,
    LogoutPage,
    SplashPage,
    MapPage,
    AdvancedSearchedPage,
    PasswordChangePage,
    ShowLocationPage,
    ExhibitionSearchPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    GloaleVariablesProvider,
    InAppBrowser,
    LocalNotifications,
    Camera,
    Base64,
    Network,
    File,
    LaunchNavigator,
    Badge,
    DocumentViewer,
    FileTransfer,
    FileOpener
  ]
})
export class AppModule {}
