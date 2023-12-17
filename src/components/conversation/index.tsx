import React, { useEffect, useRef } from "react";
import { IChat } from "@/constant";
import Image from "next/image";
import "@/styles/Message.css";
import { formatDateTime } from "@/utils/utils";

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
  const chatBoxRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    // Scroll to the bottom when conversation changes
    if (chatBoxRef.current) {
      chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
    }
  }, [conversation]);

  return (
    <div className='chat-container'>
      <ul className='chat-box chatContainerScroll' ref={chatBoxRef}>
        {Array.isArray(conversation) &&
          conversation.length > 0 &&
          conversation.map((message) =>
            message.senderId === userId ? (
              <li key={message.createdAt} className='chat-right'>
                <div className='chat-hour'>
                  {formatDateTime(message.createdAt || '')}
                  <span className='fa fa-check-circle'></span>
                </div>
                <div className='chat-text-right'>
                  <p>{message.message}</p>
                </div>
              </li>
            ) : (
              <li key={message.createdAt} className='chat-left'>
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
                  {formatDateTime(message.createdAt || '')}
                  <span className='fa fa-check-circle'></span>
                </div>
              </li>
            ),
          )}
      </ul>
    </div>
  );
};
