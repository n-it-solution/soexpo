import { Component } from '@angular/core';

import { AboutPage } from '../about/about';
import { ContactPage } from '../contact/contact';
import { HomePage } from '../home/home';
import {Contact1Page} from "../contact1/contact1";
import {About1Page} from "../about1/about1";

@Component({
  templateUrl: './tabs.html'
})
export class Tab1Page {
  tab2Root = Contact1Page;
  tab3Root = About1Page;

  constructor() {

  }
}
