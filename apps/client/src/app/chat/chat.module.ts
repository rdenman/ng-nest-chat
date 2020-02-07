import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ChatRoutingModule } from './chat-routing.module';
import { ChatBoxComponent, ChatMessageListComponent } from './components';
import { ChatRoomListComponent } from './components/chat-room-list/chat-room-list.component';
import { ChatHomeComponent } from './pages';
import { ChatService } from './services';
import { RoomService } from './services/room.service';

@NgModule({
  imports: [ChatRoutingModule, CommonModule, FormsModule, ReactiveFormsModule],
  declarations: [ChatBoxComponent, ChatHomeComponent, ChatMessageListComponent, ChatRoomListComponent],
  providers: [ChatService, RoomService],
})
export class ChatModule {}
