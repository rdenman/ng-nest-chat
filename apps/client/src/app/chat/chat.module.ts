import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ChatRoutingModule } from './chat-routing.module';
import { ChatBoxComponent, ChatMessageListComponent } from './components';
import { RoomListComponent } from './components/room-list/room-list.component';
import { ChatHomeComponent } from './pages';
import { ChatService } from './services';
import { RoomService } from './services/room.service';

@NgModule({
  imports: [ChatRoutingModule, CommonModule, FormsModule],
  declarations: [ChatBoxComponent, ChatHomeComponent, ChatMessageListComponent, RoomListComponent],
  providers: [ChatService, RoomService],
})
export class ChatModule {}
