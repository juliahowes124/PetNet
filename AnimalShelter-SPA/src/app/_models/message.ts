export class Message {
    id: number;
    senderId: number;
    senderKnownAs: string;
    senderPhotoUrl: string;
    senderLastActive: Date;
    recipientId: number;
    recipientKnownAs: string;
    recipientPhotoUrl: string;
    recipientLastActive: Date;
    content: string;
    isRead: boolean;
    dateRead: Date;
    messageSent: Date;
}
