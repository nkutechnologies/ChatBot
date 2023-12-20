import { Component, OnInit } from '@angular/core';
import { Message, ChatService } from '../chat.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  messages: Message[] = [];
  value: string | undefined;

  constructor(public chatService: ChatService) { }

  displayval: any;
  ngOnInit(): void {
    this.chatService.conversation.subscribe((val) => {
      this.messages = this.messages.concat(val);
    });

  }
  sendMessage() {
    this.chatService.getBotAnswer(this.value);
    this.value = '';
  }

  getValue(val: string) {
    console.warn(val);
    this.displayval = val;
  }

}