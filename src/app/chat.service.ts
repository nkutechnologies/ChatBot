
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { NgxSpinnerService } from 'ngx-spinner';
export class Message {
  constructor(public author: string, public content: string) { }
}

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  private BASE_URL =
    'https://api.wit.ai/event?v=20230704&session_id=prod2wn&context_map=%7B%7D';
  private ACCESS_TOKEN = 'OUQL2X7FOPYEPMCGHUG3LNZXPYXCRW3A';

  constructor(private spinner: NgxSpinnerService) { }

  conversation = new Subject<Message[]>();
  messageMap: any = {
    hi: 'Hello',
    Hi: 'Hello',
    'who are you': 'I am an AI chatbot',
    'what is angular':
      'Angular is an open-source, TypeScript-based, full-stack web application framework led by the Angular Team at Google',
    default:
      "I can't understand. Can you please repeat otherwise contact the owner",
  };

  async getBotAnswer(msg: any) {
    this.spinner.show();
    const userMessage = new Message('user', msg);
    this.conversation.next([userMessage]);
    const botMessage = new Message('bot', await this.getBotMessage(msg));
    setTimeout(() => {
      this.spinner.hide();
      this.conversation.next([botMessage]);
    }, 1500);
  }

  async getBotMessage(question: string) {
    let answer = '';
    try {
      const response = await this.askQuestion(question);
      answer = response.response.text;
      console.log("answer", answer)
    } catch (error) {
      console.error(error);

    }
    return answer;
  }

  private async askQuestion(question: string): Promise<any> {
    const headers = {
      Authorization: 'Bearer ' + this.ACCESS_TOKEN,
    };

    const params = {
      q: question,
    };

    const obj = { type: 'message', message: params.q };
    const requestOptions = {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(obj),
    };

    try {
      const response = await fetch(this.BASE_URL, requestOptions);
      const data = await response.json();
      return data;
    } catch (error) {
      throw new Error('Request failed: ' + error);
    }
  }
}

