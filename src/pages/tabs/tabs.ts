import { Component } from '@angular/core';

import { AboutPage } from '../about/about';
import { ChatPage } from '../chat/chat';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = ChatPage;
  tab2Root = AboutPage;

  constructor() {

  }
}
