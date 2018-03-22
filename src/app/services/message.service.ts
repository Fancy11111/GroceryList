import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of'

@Injectable()
export class MessageService {
  messages: string[] = [];

  constructor() { }

  public log(message: string, notify: boolean) {
    console.log(message);
    if (notify) {
      this.notify(message);
    }
  }

  public notify(message: string) {
    this.messages.push(message);
    // TODO: Actually notify users using a message display component
  }

  public getMessages(): Observable<string[]> {
    console.log("Debug: getMessages() called");
    return Observable.of(this.messages);
  }

}
