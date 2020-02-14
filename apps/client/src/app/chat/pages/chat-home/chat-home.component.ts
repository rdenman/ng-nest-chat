import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { Message, Room, User } from '@ng-nest-chat/api-interfaces';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { UserService } from '../../../core/auth';
import { ChatService } from '../../services';

@Component({
  selector: 'app-chat-home',
  templateUrl: './chat-home.component.html',
})
export class ChatHomeComponent implements OnInit, OnDestroy {
  public currentRoom: Room;

  public messages: Message[] = [];
  public connectedUsersCount: number;

  private currentUser: User;

  private ngUnsubscribe: Subject<void> = new Subject();

  constructor(
    @Inject(ChatService) private readonly chatService: ChatService,
    @Inject(UserService) private readonly userService: UserService
  ) {}

  public ngOnInit(): void {
    this.currentUser = this.userService.currentUserValue;
    this.chatService.connect();
    this.chatService.messages.pipe(takeUntil(this.ngUnsubscribe)).subscribe((message: Message) => {
      this.messages.push(message);
    });
    this.chatService.userCount.pipe(takeUntil(this.ngUnsubscribe)).subscribe((count: number) => {
      this.connectedUsersCount = count;
    });
    this.chatService.currentRoom.pipe(takeUntil(this.ngUnsubscribe)).subscribe((room: Room) => {
      this.messages = room.messages;
    });
  }

  public ngOnDestroy(): void {
    this.chatService.disconnect();
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  public addChat(message: string): void {
    // TODO update room
    const text: string = message.trim();
    if (text) {
      this.chatService.sendChat({ text, from: this.currentUser, room: this.currentRoom });
    }
  }

  public switchRooms(room: Room): void {
    this.chatService.leaveRoom(this.currentRoom);
    this.currentRoom = room;
    this.chatService.joinRoom(this.currentRoom);
  }
}
