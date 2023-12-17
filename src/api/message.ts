import { IFriendChat } from "@/pages/message/[[...message]]";
import { api } from "./axios";

export interface IUser {
  id: string;
  createdAt: string;
  imageUrl: string;
  hasImage: boolean;
  gender: string;
  birthday: string;
  fullName: string;
  emailAddress: string;
}

export interface IUserRes {
  message: string;
  result: IUser[];
}
export interface IListFriendRes {
  message: string;
  result: IFriendChat[];
}

export const getAllUser = async (): Promise<IUser[]> => {
  try {
    const res = await api.get<IUserRes>(`/api/users`);
    return res.data.result;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};
export const getListFiendChat = async (userId: string): Promise<IFriendChat[]> => {
  try {
    const res = await api.get<IListFriendRes>(`/api/messages/getChatListUser/${userId}`);
    return res.data.result;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};
