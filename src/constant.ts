export const hostSocket = process.env.NEXT_PUBLIC_HOST_SOCKET;

export interface IChat {
  _id: string;
  message: string;
  senderId: string;
  recipientId: string;
  createdAt?: string;
  senderAvatar?: string;
  __v?: number;
}
