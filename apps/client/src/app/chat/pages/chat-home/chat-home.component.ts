import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { EventType, IEvent } from '@ng-nest-chat/api-interfaces';
import { Subscription } from 'rxjs';
import { ChatService } from '../../chat.service';

@Component({
  selector: 'ng-nest-chat-chat-home',
  templateUrl: './chat-home.component.html',
  styleUrls: ['./chat-home.component.css'],
})
export class ChatHomeComponent implements OnInit, OnDestroy {
  public messages: string[] = [];
  public message: string = '';
  public connectedUsersCount: number;

  private messageSubscription: Subscription;

  constructor(@Inject(ChatService) private readonly chatService: ChatService) {}

  public ngOnInit(): void {
    this.messageSubscription = this.chatService.messages.subscribe((event: IEvent) => {
      this.handleEvent(event);
    });
  }

  public ngOnDestroy(): void {
    this.messageSubscription.unsubscribe();
  }

  public addChat() {
    this.chatService.sendChat(this.message, 'ass');
    this.message = '';
  }

  private handleEvent(event: IEvent): void {
    switch (event.event) {
      case EventType.Message:
        this.messages.push(event.data);
        break;
      case EventType.UpdateCount:
        this.connectedUsersCount = event.data;
        break;
    }
  }
}
