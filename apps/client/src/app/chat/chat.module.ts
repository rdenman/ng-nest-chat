import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ChatRoutingModule } from './chat-routing.module';
import { ChatService } from './chat.service';
import { ChatBoxComponent } from './components/chat-box/chat-box.component';
import { ChatHomeComponent } from './pages/chat-home/chat-home.component';

@NgModule({
  imports: [ChatRoutingModule, CommonModule, FormsModule],
  declarations: [ChatBoxComponent, ChatHomeComponent],
  providers: [ChatService],
})
export class ChatModule {}
