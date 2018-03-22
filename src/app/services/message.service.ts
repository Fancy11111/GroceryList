import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/observable/of';

@Injectable()
export class MessageService {
  messages: string[] = [];
  messageObservable: Subject<string> = new Subject();

  constructor() { }

  public log(message: string, notify?: boolean) {
    console.log(message);
    if (notify) {
      this.notify(message);
    }
  }

  public notify(message: string) {
    this.messages.push(message);
    this.messageObservable.next(message);
    // TODO: Actually notify users using a message display component
  }

  public getMessagesSubject(): Subject<string> {
    console.log('Debug: getMessages() called');
    return this.messageObservable;
  }

}
