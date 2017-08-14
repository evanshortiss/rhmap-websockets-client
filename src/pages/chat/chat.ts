import { Component, ViewChild, NgZone } from '@angular/core';
import { NavController, Content, ToastController } from 'ionic-angular';
import { Message } from '../../models/message';
import { getMessageObservable, getMessageErrorObservable, sendMessage } from '../../services/messaging';

@Component({
  selector: 'page-chat',
  templateUrl: 'chat.html'
})
export class ChatPage {
  @ViewChild(Content) content: Content;

  public messages: Array<Message>;
  public textInput: string;

  constructor(public navCtrl: NavController, private toastCtrl: ToastController, private zone: NgZone) {
    console.log('creating chat view!');

    this.messages = [];
    this.textInput = '';

    getMessageObservable()
      .subscribe(this.onMessageReceived.bind(this));

    getMessageErrorObservable()
      .subscribe(this.onErrorReceived.bind(this));
  }

  public onTextSubmit () {
    console.log('send message!')

    sendMessage(this.textInput)
      .then((result) => {
        // Clear input box
        this.textInput = '';

        // Ensure message is visibile
        this.scrollToBottom();
      });
  }

  private onErrorReceived (err: any) {
    this.toastCtrl.create({
      position: 'top',
      duration: 2500,
      message: `Message failed to send. ${err.err}`
    });
  }

  private scrollToBottom () {
    const scroller = this.content.getNativeElement().getElementsByTagName('ion-list')[0];

    // Required to ensure messages have rendered before trying to scroll
    setTimeout(() => scroller.scrollTop = scroller.scrollHeight, 0);
  }

  private onMessageReceived (msg: Message) {
    // wWthout this there seems to be some undetected angular exception that breaks the UI
    this.zone.run(() => {
      this.messages.push(msg);
      this.scrollToBottom();
    });
  }

}
