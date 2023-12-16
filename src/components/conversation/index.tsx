import { IChat } from "@/constant";
import Image from "next/image";
import React from "react";

interface IConversationProps {
  conversation: IChat[];
  userId: string;
  name: string;
  senderAvatar: string;
}
export const Conversation: React.FC<IConversationProps> = ({
  conversation,
  userId,
  senderAvatar,
  name,
}) => {
  console.log("🚀 ~ file: index.tsx:10 ~ conversation:", conversation);
  return (
    <div className='chat-container'>
      <ul className='chat-box chatContainerScroll'>
        {Array.isArray(conversation) &&
          conversation.length > 0 &&
          conversation.map((message) =>
            message.senderId === userId ? (
              <li
                key={message.createdAt}
                className='chat-right'
              >
                <div className='chat-hour'>
                  {message.createdAt} <span className='fa fa-check-circle'></span>
                </div>
                <div className='chat-text-right'>
                  <p>{message.message}</p>
                </div>
              </li>
            ) : (
              <li
                key={message.createdAt}
                className='chat-left'
              >
                <div className='chat-avatar'>
                  <Image
                    height={100}
                    width={100}
                    src={senderAvatar}
                    alt={name}
                  />
                </div>
                <div className='chat-text-left'>
                  <p> {message.message}</p>
                </div>
                <div className='chat-hour'>
                  {message.createdAt}
                  <span className='fa fa-check-circle'></span>
                </div>
              </li>
            ),
          )}
      </ul>
    </div>
  );
};
