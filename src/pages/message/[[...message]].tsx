import '@clerk/nextjs'
import '@/styles/Message.css'
import 'next/app'
import Image from 'next/image'

const listFriendChat = [
  {
    avatarPath: 'https://www.bootdey.com/img/Content/avatar/avatar3.png',
    name: 'Emily Russell',
    time: '15/02/2019',
    content: 'Hi, Russell',
  },
  {
    avatarPath: 'https://www.bootdey.com/img/Content/avatar/avatar3.png',
    name: 'Emily Russell',
    time: '15/02/2019',
    content: 'Hi, Russell',
  },
  {
    avatarPath: 'https://www.bootdey.com/img/Content/avatar/avatar3.png',
    name: 'Emily Russell',
    time: '15/02/2019',
    content: 'Hi, Russell',
  },
  {
    avatarPath: 'https://www.bootdey.com/img/Content/avatar/avatar3.png',
    name: 'Emily Russell',
    time: '15/02/2019',
    content: 'Hi, Russell',
  },
  {
    avatarPath: 'https://www.bootdey.com/img/Content/avatar/avatar3.png',
    name: 'Emily Russell',
    time: '15/02/2019',
    content: 'Hi, Russell',
  },
  {
    avatarPath: 'https://www.bootdey.com/img/Content/avatar/avatar3.png',
    name: 'Emily Russell',
    time: '15/02/2019',
    content: 'Hi, Russell',
  },
  {
    avatarPath: 'https://www.bootdey.com/img/Content/avatar/avatar3.png',
    name: 'Emily Russell',
    time: '15/02/2019',
    content: 'Hi, Russell',
  },
]

const userId = '12345'

const listMessage = [
  {
    senderId: '12345',
    recipientId: 'user123',
    message: 'Chào bạn! Đây là tin nhắn phản hồi từ bot.',
    createAt: '15/02/2019 08:56',
  },
  {
    senderId: 'user123',
    recipientId: 'user123',
    message: 'Tao ne may',
    createAt: '15/02/2019 08:56',
  },
  {
    senderId: '12345',
    recipientId: 'user123',
    message: 'Ahi hi đồ ngốc',
    createAt: '15/02/2019 08:56',
  },
  {
    senderId: 'user123',
    recipientId: '12345',
    message: 'nói chuyện như một professional',
    createAt: '15/02/2019 08:56',
  },
  {
    senderId: 'user123',
    recipientId: '12345',
    message: 'nói chuyện như một professional',
    createAt: '15/02/2019 08:56',
  },
]
export default function Page() {
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
                        <p className="time">{item.time}</p>
                      </div>
                      <p className="content">{item.content}</p>
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
                {listMessage.map((message) =>
                  message.senderId === userId ? (
                    <li key="recipient" className="chat-left">
                      <div className="chat-avatar">
                        <Image
                          height={200}
                          width={200}
                          src="https://www.bootdey.com/img/Content/avatar/avatar3.png"
                          alt="Retail Admin"
                        />
                      </div>
                      <div className="chat-text-left">
                        <p> {message.message}</p>
                      </div>
                      <div className="chat-hour">
                        {message.createAt}
                        <span className="fa fa-check-circle"></span>
                      </div>
                    </li>
                  ) : (
                    <li key="sender" className="chat-right">
                      <div className="chat-hour">
                        08:56 <span className="fa fa-check-circle"></span>
                      </div>
                      <div className="chat-text-right">
                        <p>{message.message}</p>
                      </div>
                    </li>
                  ),
                )}
              </ul>
            </div>
            <div className="form-group">
              <div className="input-group">
                <button type="button" className="btn ">
                  <i className="far fa-smile" style={{ color: '#b8b8b8' }}></i>
                </button>
                <textarea
                  className="form-control no-border"
                  placeholder="Nhập nội dung tin nhắn..."
                ></textarea>
                <button type="button" className="btn ">
                  <i className="fas fa-paperclip" style={{ color: '#b8b8b8' }}></i>
                </button>
              </div>
              <button type="button" className="btn ">
                <i className="fas fa-microphone" style={{ color: '#b8b8b8' }}></i>
              </button>
              <button type="button" className="btn ">
                <i className="fas fa-paper-plane" style={{ color: '#9ec94a' }}></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
