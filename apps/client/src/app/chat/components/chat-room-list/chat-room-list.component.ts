import { Component, Inject, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IRoom } from '@ng-nest-chat/api-interfaces';
import { UserService } from '../../../core/auth';
import { RoomService } from '../../services/room.service';

@Component({
  selector: 'app-chat-room-list',
  templateUrl: './chat-room-list.component.html',
})
export class ChatRoomListComponent implements OnInit {
  @Output()
  public selectRoom: EventEmitter<IRoom> = new EventEmitter<IRoom>();

  public form: FormGroup;
  public loading: boolean = false;
  public rooms: IRoom[] = [];
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

    this.roomService.findAll().subscribe((rooms: IRoom[]) => {
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
        createdBy: this.userService.currentUserValue.userId,
      })
      .subscribe((room: IRoom) => {
        console.log(room);
        this.rooms.push(room);
      });
  }

  public onRoomSelect(room :IRoom): void {
    this.selectRoom.emit(room);
  }
}
