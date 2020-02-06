import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ChatRoutingModule } from './chat-routing.module';
import { ChatBoxComponent, ChatMessageListComponent } from './components';
import { ChatHomeComponent } from './pages';
import { ChatService } from './services';

@NgModule({
  imports: [ChatRoutingModule, CommonModule, FormsModule],
  declarations: [ChatBoxComponent, ChatHomeComponent, ChatMessageListComponent],
  providers: [ChatService],
})
export class ChatModule {}
