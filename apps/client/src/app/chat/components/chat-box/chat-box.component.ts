import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ng-nest-chat-chat-box',
  templateUrl: './chat-box.component.html',
  styleUrls: ['./chat-box.component.css'],
})
export class ChatBoxComponent implements OnInit {
  public messages: string[];
  public message: string;

  constructor() {}

  ngOnInit() {}

  public addChat() {
    console.log('adding...');
  }
}
