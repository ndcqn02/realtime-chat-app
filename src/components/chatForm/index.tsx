import React, { useState, KeyboardEvent } from "react";
import { Socket } from "socket.io-client";

interface ISendMessage {
  senderId: string;
  recipientId: string;
  message: string;
}

interface ChatFormProps {
  socket: Socket | undefined;
  senderId: string;
  recipientId: string;
  onSendMessage: () => void;
}

const ChatForm: React.FC<ChatFormProps> = (props) => {
  const [message, setMessage] = useState("");

  const handleEnterPress = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault(); // Ngăn chặn xuống dòng trong textarea
      sendMessage();
      props.onSendMessage();
    }
  };

  const sendMessage = async () => {
    try {
      if (!props.socket) {
        console.error(`Not found socket: ${props.socket}`);
        return;
      }

      const messageData: ISendMessage = {
        senderId: props.senderId,
        recipientId: props.recipientId,
        message: message,
      };
      props.socket.emit("sendMessage", messageData);

      setMessage("");
    } catch (error) {
      console.error("Lỗi kết nối:", error);
    }
  };

  return (
    <div className='form-group'>
      <div className='input-group'>
        <button
          type='button'
          className='btn '
        >
          <i
            className='far fa-smile'
            style={{ color: "#b8b8b8" }}
          ></i>
        </button>
        <textarea
          className='form-control no-border'
          placeholder='Nhập nội dung tin nhắn...'
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleEnterPress}
        ></textarea>
        <button
          type='button'
          className='btn '
        >
          <i
            className='fas fa-paperclip'
            style={{ color: "#b8b8b8" }}
          ></i>
        </button>
        <button
          type='button'
          className='btn '
        >
          <i
            className='fas fa-microphone'
            style={{ color: "#b8b8b8" }}
          ></i>
        </button>
        <button
          type='button'
          className='btn'
          onClick={sendMessage}
        >
          <i
            className='fas fa-paper-plane'
            style={{ color: "#9ec94a" }}
          ></i>
        </button>
      </div>
    </div>
  );
};

export default ChatForm;
