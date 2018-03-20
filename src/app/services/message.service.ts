import { Injectable } from '@angular/core';

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

}
