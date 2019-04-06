import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ExhibitionSearchPage } from './exhibition-search';

@NgModule({
  declarations: [
    ExhibitionSearchPage,
  ],
  imports: [
    IonicPageModule.forChild(ExhibitionSearchPage),
  ],
})
export class ExhibitionSearchPageModule {}
