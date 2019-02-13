import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ExhibitionPage } from './exhibition';

@NgModule({
  declarations: [
    ExhibitionPage,
  ],
  imports: [
    IonicPageModule.forChild(ExhibitionPage),
  ],
})
export class ExhibitionPageModule {}
