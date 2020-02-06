import { Component, Input } from '@angular/core';
import { IMessage } from '@ng-nest-chat/api-interfaces';

@Component({
  selector: 'app-chat-message-list',
  templateUrl: './chat-message-list.component.html',
})
export class ChatMessageListComponent {
  @Input()
  public messages: IMessage[];
}
