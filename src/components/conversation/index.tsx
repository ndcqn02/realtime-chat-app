import React, { useEffect, useRef } from "react";
import { IChat } from "@/constant";
import Image from "next/image";
import "@/styles/Message.css";
import { formatDateTime } from "@/utils/utils";

interface IConversationProps {
  conversation: IChat[];
  userId: string;
  friendId: string | undefined;
  name: string;
  senderAvatar: string;
}

export const Conversation: React.FC<IConversationProps> = ({
  conversation,
  userId,
  friendId,
  senderAvatar,
  name,
}) => {
  const chatBoxRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    if (chatBoxRef.current) {
      chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
    }
  }, [conversation]);

  const checkMessage = conversation.find(
    (item) =>
      (item.senderId === friendId || item.recipientId === friendId) &&
      (item.senderId === userId || item.recipientId === userId),
  );
  console.log("🚀 ~ file: index.tsx:31 ~ checkMessage:", checkMessage);

  return (
    <div className='chat-container'>
      <ul
        className='chat-box chatContainerScroll'
        ref={chatBoxRef}
      >
        {Array.isArray(conversation) &&
          conversation.length > 0 &&
          checkMessage &&
          conversation.map((message) =>
            message.senderId === userId ? (
              <li
                key={message.createdAt}
                className='chat-right'
              >
                <div className='chat-hour'>
                  {formatDateTime(message.createdAt || "")}
                  <span className='fa fa-check-circle'></span>
                </div>
                <div className='chat-text-right'>
                  <p>{message.message}</p>
                </div>
              </li>
            ) : (
              friendId === message.senderId && (
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
                      quality={100}
                      priority
                    />
                  </div>
                  <div className='chat-text-left'>
                    <p> {message.message}</p>
                  </div>
                  <div className='chat-hour'>
                    {formatDateTime(message.createdAt || "")}
                    <span className='fa fa-check-circle'></span>
                  </div>
                </li>
              )
            ),
          )}
      </ul>
    </div>
  );
};
