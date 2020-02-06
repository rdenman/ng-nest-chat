import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { IMessage, IUser } from '@ng-nest-chat/api-interfaces';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { UserService } from '../../../core/auth';
import { ChatService } from '../../services';

@Component({
  selector: 'app-chat-home',
  templateUrl: './chat-home.component.html',
})
export class ChatHomeComponent implements OnInit, OnDestroy {
  public messages: IMessage[] = [];
  public connectedUsersCount: number;

  private currentUser: IUser;

  private ngUnsubscribe: Subject<void> = new Subject();

  constructor(
    @Inject(ChatService) private readonly chatService: ChatService,
    @Inject(UserService) private readonly userService: UserService
  ) {}

  public ngOnInit(): void {
    this.currentUser = this.userService.currentUserValue;
    this.chatService.connect();
    this.chatService.messages.pipe(takeUntil(this.ngUnsubscribe)).subscribe((message: IMessage) => {
      this.messages.push(message);
    });
    this.chatService.userCount.pipe(takeUntil(this.ngUnsubscribe)).subscribe((count: number) => {
      this.connectedUsersCount = count;
    });
  }

  public ngOnDestroy(): void {
    this.chatService.disconnect();
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  public addChat(message: string): void {
    // TODO update room
    this.chatService.sendChat({ text: message.trim(), to: 'Whatever room', from: this.currentUser });
  }
}
