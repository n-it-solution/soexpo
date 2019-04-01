import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AdvancedSearchedPage } from './advanced-searched';
import {TranslateModule} from "@ngx-translate/core";

@NgModule({
  declarations: [
    AdvancedSearchedPage,
  ],
  imports: [
    IonicPageModule.forChild(AdvancedSearchedPage),
    TranslateModule,
  ],
})
export class AdvancedSearchedPageModule {}
