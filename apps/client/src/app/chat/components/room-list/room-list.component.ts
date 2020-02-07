import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IRoom } from '@ng-nest-chat/api-interfaces';
import { RoomService } from '../../services/room.service';

@Component({
  selector: 'app-room-list',
  templateUrl: './room-list.component.html',
  styles: [],
})
export class RoomListComponent implements OnInit {
  public form: FormGroup;
  public loading: boolean = false;
  public rooms: IRoom[] = [];
  public message: string = '';

  constructor(
    @Inject(FormBuilder) private readonly formBuilder: FormBuilder,
    @Inject(RoomService) private readonly roomService: RoomService
  ) {}

  public ngOnInit(): void {
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
    });

    this.roomService.findAll().subscribe((rooms: IRoom[]) => {
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
    // this.roomService.create({  })
  }
}
