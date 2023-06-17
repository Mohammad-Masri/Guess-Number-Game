export class Message {
  senderName: string;
  messageText: string;
  isYou: boolean;
  createdAt: Date;

  constructor(senderName: string, messageText: string, isYou: boolean = false) {
    this.messageText = messageText;
    this.isYou = isYou;
    this.senderName = isYou ? "You" : senderName;
    this.createdAt = new Date();
  }
}
