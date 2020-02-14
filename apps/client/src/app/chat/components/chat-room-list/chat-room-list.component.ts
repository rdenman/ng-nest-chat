import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Room } from '@ng-nest-chat/api-interfaces';
import { UserService } from '../../../core/auth';
import { RoomService } from '../../services/room.service';
import { ChatService } from '../../services';

@Component({
  selector: 'app-chat-room-list',
  templateUrl: './chat-room-list.component.html',
})
export class ChatRoomListComponent implements OnInit {
  @Output()
  public selectRoom: EventEmitter<Room> = new EventEmitter<Room>();

  public form: FormGroup;
  public loading: boolean = false;
  public rooms: Room[] = [];
  public message: string = '';

  constructor(
    @Inject(ChatService) private readonly chatService: ChatService,
    @Inject(FormBuilder) private readonly formBuilder: FormBuilder,
    @Inject(RoomService) private readonly roomService: RoomService,
    @Inject(UserService) private readonly userService: UserService
  ) {}

  public ngOnInit(): void {
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
    });

    this.roomService.findAll().subscribe((rooms: Room[]) => {
      this.rooms = rooms;
    });
  }

  public onSubmit(): void {
    if (this.form.invalid) {
      this.message = 'Invalid room name.';
      return;
    }

    this.loading = true;
    this.message = '';
    // TODO should get user on server side rather than sending as part of this
    this.roomService
      .create({
        name: this.form.controls.name.value,
        owner: this.userService.currentUserValue,
      })
      .subscribe((room: Room) => {
        this.rooms.push(room);
        this.form.controls.name.setValue('');
      });
  }

  public onRoomSelect(room: Room): void {
    this.selectRoom.emit(room);
  }
}
