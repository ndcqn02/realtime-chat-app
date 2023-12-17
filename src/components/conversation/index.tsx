import React, { useEffect, useRef, useState } from "react";
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
  const [selectedMessage, setSelectedMessage] = useState<IChat | null>(null);
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    // Scroll to the bottom when conversation changes
    if (chatBoxRef.current) {
      chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
    }
  }, [conversation]);

  const handleEllipsisClick = (message: IChat) => {
    setSelectedMessage(message);
    setShowDropdown(true);
  };

  const handleDelete = () => {
    // Logic xử lý khi click vào tùy chọn xóa
    console.log("Delete message:", selectedMessage);
    setShowDropdown(false);
  };
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
              <li key={message.createdAt} className='chat-right'>
                <div className='ellipsis-container' style={{ margin: '10px' }}>
                  <a
                    id='dropdownToggle'
                    onClick={() => handleEllipsisClick(message)}
                  >
                    <i className='fas fa-ellipsis-h'></i>
                  </a>
                  {showDropdown && selectedMessage === message && (
                    <div className='dropdown-menu'>
                      <div onClick={handleDelete}><i className='fas fa-trash-alt' style={{ color: 'red' }}> Xóa</i></div>
                    </div>
                  )}
                </div>
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
