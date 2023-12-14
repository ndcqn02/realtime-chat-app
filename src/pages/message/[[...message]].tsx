import '@clerk/nextjs'
import '@/styles/Message.css'
import 'next/app'
import Image from 'next/image'
import ChatForm from '@/components/chatForm'
import { useEffect, useState } from 'react'

const listFriendChat = [
  {
    avatarPath: 'https://www.bootdey.com/img/Content/avatar/avatar3.png',
    name: 'Emily Russell',
    createAt: '15/02/2019',
    message: 'Hi, Russell',
  },
  {
    avatarPath: 'https://www.bootdey.com/img/Content/avatar/avatar3.png',
    name: 'Emily Russell',
    createAt: '15/02/2019',
    message: 'Hi, Russell',
  },
  {
    avatarPath: 'https://www.bootdey.com/img/Content/avatar/avatar3.png',
    name: 'Emily Russell',
    createAt: '15/02/2019',
    message: 'Hi, Russell',
  },
]

const userId = 'user_2WnkbS2Yl0i2lKN3pxN3qXajNgM'

const listMessage = [
  {
    senderId: '12345',
    recipientId: 'user123',
    senderAvatar: 'https://www.bootdey.com/img/Content/avatar/avatar3.png',
    message: 'Chào bạn! Đây là tin nhắn phản hồi từ bot.',
    createAt: '15/02/2019 08:56',
  },
  {
    senderId: 'user123',
    recipientId: 'user123',
    senderAvatar: 'https://www.bootdey.com/img/Content/avatar/avatar3.png',
    message: 'Tao ne may',
    createAt: '15/02/2019 08:56',
  }
]

export interface IChat {
  _id: string
  message: string
  senderId: string
  recipientId: string
  createdAt?: string
  senderAvatar: string
  __v?: number
}

export default function Page() {
  const [chat, setChat] = useState<IChat[]>([])

  useEffect(() => {
    const fetchChatDetail = async () => {
      const response = await fetch(
        'http://localhost:8000/api/messages/chat/user_2WnkbS2Yl0i2lKN3pxN3qXajNgM/user_2Xo1uuwA1hqvwPGVsdOe78nQrDk',
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        },
      )
      const data = await response.json()
      console.log('🚀 ~ file: [[...message]].tsx:84 ~ fetchChatDetail ~ result:', data)

      setChat(data.result)
    }

    fetchChatDetail()
  }, [])

  return (
    <div className="layout">
      <div className="fixed-top">
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css"
        />
        <div className="page-title">
          <div className="row">
            <h4>Chat Web App</h4>
            <Image
              height={200}
              width={200}
              src="https://www.bootdey.com/img/Content/avatar/avatar5.png"
              alt="Retail Admin"
            />
          </div>
        </div>
        <div className="top-bar">
          <div className="navbar">
            <a href="home">
              <i className="fas fa-home"></i>
            </a>
            <a href="message">
              <i className="far fa-comment-dots"></i>
            </a>
            <a href="#">
              <i className="fas fa-users"></i>
            </a>
            <a href="#">
              <i className="far fa-bell"></i>
            </a>
          </div>
        </div>
      </div>
      <div className="card m-0">
        <div className="layout-main">
          <div className="layout-left">
            <div className="users-container">
              <div className="box">
                <div className="container-1">
                  <p>
                    <strong>Active users</strong>
                  </p>

                  <Image
                    height={200}
                    width={200}
                    src="https://www.bootdey.com/img/Content/avatar/avatar1.png"
                    alt="Retail Admin"
                    className="avt-new"
                  />

                  <Image
                    height={200}
                    width={200}
                    src="https://www.bootdey.com/img/Content/avatar/avatar2.png"
                    alt="Retail Admin"
                    className="avt-new"
                  />

                  <Image
                    height={200}
                    width={200}
                    src="https://www.bootdey.com/img/Content/avatar/avatar3.png"
                    alt="Retail Admin"
                    className="avt-new"
                  />
                  <Image
                    height={200}
                    width={200}
                    src="https://www.bootdey.com/img/Content/avatar/avatar4.png"
                    alt="Retail Admin"
                    className="avt-new"
                  />

                  <Image
                    height={200}
                    width={200}
                    src="https://www.bootdey.com/img/Content/avatar/avatar5.png"
                    alt="Retail Admin"
                    className="avt-new"
                  />
                </div>
              </div>
              <div className="box">
                <div className="container-1">
                  <span className="icon">
                    <i className="fa fa-search" style={{ color: '#b4b5b6' }}></i>
                  </span>
                  <input type="search" id="search" placeholder="Search or star new chat" />
                </div>
              </div>
              <div className="box">
                <div className="container-1">
                  <h5>ALL CHATS</h5>
                </div>
              </div>

              {/* Left slide */}
              <ul className="users">
                {listFriendChat.map((item) => (
                  <li className="person active-user" data-chat="person1" key={item.name}>
                    <div className="user">
                      <Image
                        height={200}
                        width={200}
                        src={item.avatarPath} // Use the avatarPath from the item
                        alt={item.name}
                      />
                      <span className="status online"></span>
                    </div>
                    <div className="group-name-time">
                      <div className="name-time">
                        <p className="name">{item.name}</p>
                        <p className="time">{item.createAt}</p>
                      </div>
                      <p className="content">{item.message}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="layout-center">
            <div className="selected-user">
              <div className="name-chat">
                <Image
                  height={200}
                  width={200}
                  src="https://www.bootdey.com/img/Content/avatar/avatar3.png"
                  alt="Retail Admin"
                />
                <div>
                  <span className="name">Emily Russell</span>
                  <p className="content">online</p>
                </div>
              </div>
              <div>
                <button type="button" className="btn ">
                  <i className="fas fa-video" style={{ color: '#b8b8b8' }}></i>
                </button>
                <button type="button" className="btn ">
                  <i className="fas fa-phone-alt" style={{ color: '#b8b8b8' }}></i>
                </button>
                <button type="button" className="btn ">
                  <i className="fas fa-ellipsis-v" style={{ color: '#b8b8b8' }}></i>
                </button>
              </div>
            </div>

            {/* chat session */}
            <div className="chat-container">
              <ul className="chat-box chatContainerScroll">
                {Array.isArray(chat) &&
                  chat.length > 0 &&
                  chat.map((message) =>
                    message.senderId === userId ? (
                      <li key={message.createdAt} className="chat-left">
                        <div className="chat-avatar">
                          <Image
                          height={100}
                          width={100}
                          src={message.senderAvatar}
                          alt="Retail Admin"
                        />
                        </div>
                        <div className="chat-text-left">
                          <p> {message.message}</p>
                        </div>
                        <div className="chat-hour">
                          {message.createdAt}
                          <span className="fa fa-check-circle"></span>
                        </div>
                      </li>
                    ) : (
                      <li key="sender" className="chat-right">
                        <div className="chat-hour">
                          {message.createdAt} <span className="fa fa-check-circle"></span>
                        </div>
                        <div className="chat-text-right">
                          <p>{message.message}</p>
                        </div>
                      </li>
                    ),
                  )}
              </ul>
            </div>
            <ChatForm />
          </div>
        </div>
      </div>
    </div>
  )
}
