import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ShowLocationPage } from './show-location';

@NgModule({
  declarations: [
    ShowLocationPage,
  ],
  imports: [
    IonicPageModule.forChild(ShowLocationPage),
  ],
})
export class ShowLocationPageModule {}
