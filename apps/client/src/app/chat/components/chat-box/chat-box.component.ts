import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-chat-box',
  templateUrl: './chat-box.component.html',
})
export class ChatBoxComponent {
  @Output()
  public send: EventEmitter<string> = new EventEmitter<string>();

  public message: string;

  public onSend() {
    this.send.emit(this.message);
    this.message = '';
  }
}
