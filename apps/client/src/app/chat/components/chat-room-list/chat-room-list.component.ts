import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Room } from '@ng-nest-chat/api-interfaces';
import { UserService } from '../../../core/auth';
import { RoomService } from '../../services/room.service';

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
    @Inject(FormBuilder) private readonly formBuilder: FormBuilder,
    @Inject(RoomService) private readonly roomService: RoomService,
    @Inject(UserService) private readonly userService: UserService
  ) {}

  public ngOnInit(): void {
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
    });

    this.roomService.findAll().subscribe((rooms: Room[]) => {
      console.log(rooms);
      this.rooms = rooms;
    });
  }

  public onSubmit(): void {
    console.log('submit...');
    if (this.form.invalid) {
      this.message = 'Invalid room name.';
      return;
    }
    console.log('valid');

    this.loading = true;
    this.message = '';
    // TODO should get user on server side rather than sending as part of this
    this.roomService
      .create({
        name: this.form.controls.name.value,
        owner: this.userService.currentUserValue,
      })
      .subscribe((room: Room) => {
        console.log(room);
        this.rooms.push(room);
      });
  }

  public onRoomSelect(room: Room): void {
    this.selectRoom.emit(room);
  }
}
