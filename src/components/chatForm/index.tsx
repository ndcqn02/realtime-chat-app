import React, { useState, KeyboardEvent } from 'react'
import { useRouter } from 'next/router'
import io from 'socket.io-client'

let socket: any

interface ISendMessage {
  senderId: string
  recipientId: string
  message: string
}

const ChatForm: React.FC = () => {
  const [message, setMessage] = useState('')
  const router = useRouter()

  const handleEnterPress = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault() // Ngăn chặn xuống dòng trong textarea
      sendMessage()
    }
  }

  const sendMessage = async () => {
    try {
      const hostSocket = process.env.NEXT_PUBLIC_HOST_SOCKET
      if (hostSocket) {
        socket = io(hostSocket, {})
      } else {
        console.error('Not have URI hostSocket ')
      }

      const messageData: ISendMessage = {
        senderId: 'user_2WnkbS2Yl0i2lKN3pxN3qXajNgM',
        recipientId: 'user_2Xo1uuwA1hqvwPGVsdOe78nQrDk',
        message: message,
      }

      socket.on('connect', () => {
        console.log('connected')
        socket.emit('sendMessage', messageData)
      })

      setMessage('')
    } catch (error) {
      console.error('Lỗi kết nối:', error)
    }
  }

  return (
    <div className="form-group">
      <div className="input-group">
        <button type="button" className="btn ">
          <i className="far fa-smile" style={{ color: '#b8b8b8' }}></i>
        </button>
        <textarea
          className="form-control no-border"
          placeholder="Nhập nội dung tin nhắn..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleEnterPress}
        ></textarea>
        <button type="button" className="btn ">
          <i className="fas fa-paperclip" style={{ color: '#b8b8b8' }}></i>
        </button>
        <button type="button" className="btn ">
          <i className="fas fa-microphone" style={{ color: '#b8b8b8' }}></i>
        </button>
        <button type="button" className="btn" onClick={sendMessage}>
          <i className="fas fa-paper-plane" style={{ color: '#9ec94a' }}></i>
        </button>
      </div>
    </div>
  )
}

export default ChatForm
