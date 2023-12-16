import "@clerk/nextjs";
import "@/styles/Message.css";
import "next/app";
import Image from "next/image";
import ChatForm from "@/components/chatForm";
import { useEffect, useRef, useState } from "react";
import { useAuth, useUser } from "@clerk/nextjs";
import io, { Socket } from "socket.io-client";
import { IChat, hostSocket } from "@/constant";
import { Conversation } from "@/components/conversation";

export interface IFriendChat {
  _id: string;
  otherUserId: string;
  currentUserId: string;
  createdAt: string;
  lastedMessage: string;
  avatarPath: string;
  name: string;
}

interface IResponse {
  message: "";
  result: any[];
}

export default function Page() {
  const [conversation, setConversation] = useState<IChat[]>([]);
  const [listFriend, setListFriend] = useState<IFriendChat[]>([]);
  const [socket, setSocket] = useState<Socket | null>(null);

  const [friendCurrent, setFriendCurrent] = useState<IFriendChat>();

  const containerRef = useRef<HTMLDivElement>(null);
  const { isLoaded, userId } = useAuth();

  useEffect(() => {
    const newSocket = hostSocket && io(hostSocket, {});
    newSocket && setSocket(newSocket);
    newSocket &&
      newSocket.on("messageResponse", (data: IChat[]) => {
        setConversation(data);
      });

    return () => {
      newSocket && newSocket.disconnect();
    };
  }, []);

  // const sendMessage = () => {
  //   friendCurrent &&
  //     socket?.emit("sendMessage", {
  //       recipientId: userId,
  //       senderId: friendCurrent.otherUserId,
  //     });
  // };

  useEffect(() => {
    console.log("Conversation updated:", conversation);
  }, [conversation]);

  const scrollToBottom = () => {
    console.log("containerRef", containerRef);

    if (containerRef.current) {
      // containerRef.current.scrollTop = containerRef.current.scrollHeight
      containerRef.current.scrollTo({
        left: 0,
        top: containerRef.current.scrollHeight,
        behavior: "smooth",
      });
      console.log("containerRef.current.scrollHeight", containerRef.current.scrollHeight);
    }
  };

  // useEffect(() => {
  //   scrollToBottom()
  // }, [conversation])

  useEffect(() => {
    const fetchListFriendChat = async () => {
      if (userId) {
        const response = await fetch(
          `http://localhost:8000/api/messages/getChatListUser/${userId}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          },
        );
        const data = await response.json();
        setListFriend(data.result);

        if (data.result[0]) {
          setFriendCurrent(data.result[0]);
        }
      }
    };

    fetchListFriendChat();
  }, [userId]);

  // useEffect(() => {
  //   const fetchChatDetail = async () => {
  //     if (userId && friendCurrent?.otherUserId) {
  //       const response = await fetch(
  //         `http://localhost:8000/api/messages/chat/${userId}/${friendCurrent.otherUserId}`,
  //         {
  //           method: 'GET',
  //           headers: {
  //             'Content-Type': 'application/json',
  //           },
  //         },
  //       )
  //       const data = await response.json()

  //       setConversation(data.result)
  //     }
  //   }

  //   fetchChatDetail()
  // }, [userId, friendCurrent?.otherUserId])

  if (!isLoaded || !userId) {
    return null;
  }

  return (
    <div className='layout'>
      <div className='fixed-top'>
        <link
          rel='stylesheet'
          href='https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css'
        />
        <div className='page-title'>
          <div className='row'>
            <h4>Chat Web App</h4>
            <Image
              height={200}
              width={200}
              src='https://www.bootdey.com/img/Content/avatar/avatar5.png'
              alt='Retail Admin'
            />
          </div>
        </div>
        <div className='top-bar'>
          <div className='navbar'>
            <a href='home'>
              <i className='fas fa-home'></i>
            </a>
            <a href='message'>
              <i className='far fa-comment-dots'></i>
            </a>
            <a href='#'>
              <i className='fas fa-users'></i>
            </a>
            <a href='#'>
              <i className='far fa-bell'></i>
            </a>
          </div>
        </div>
      </div>
      <div className='card m-0'>
        <div className='layout-main'>
          <div className='layout-left'>
            <div className='users-container'>
              <div className='box'>
                <div className='container-1'>
                  <p>
                    <strong>Active users</strong>
                  </p>

                  <Image
                    height={200}
                    width={200}
                    src='https://www.bootdey.com/img/Content/avatar/avatar1.png'
                    alt='Retail Admin'
                    className='avt-new'
                  />

                  <Image
                    height={200}
                    width={200}
                    src='https://www.bootdey.com/img/Content/avatar/avatar2.png'
                    alt='Retail Admin'
                    className='avt-new'
                  />

                  <Image
                    height={200}
                    width={200}
                    src='https://www.bootdey.com/img/Content/avatar/avatar3.png'
                    alt='Retail Admin'
                    className='avt-new'
                  />
                  <Image
                    height={200}
                    width={200}
                    src='https://www.bootdey.com/img/Content/avatar/avatar4.png'
                    alt='Retail Admin'
                    className='avt-new'
                  />

                  <Image
                    height={200}
                    width={200}
                    src='https://www.bootdey.com/img/Content/avatar/avatar5.png'
                    alt='Retail Admin'
                    className='avt-new'
                  />
                </div>
              </div>
              <div className='box'>
                <div className='container-1'>
                  <span className='icon'>
                    <i
                      className='fa fa-search'
                      style={{ color: "#b4b5b6" }}
                    ></i>
                  </span>
                  <input
                    type='search'
                    id='search'
                    placeholder='Search or star new chat'
                  />
                </div>
              </div>
              <div className='box'>
                <div className='container-1'>
                  <h5>ALL CHATS</h5>
                </div>
              </div>

              {/* Left slide */}
              <ul className='users'>
                {listFriend.map((item) => (
                  <li
                    className='person active-user'
                    data-chat='person1'
                    key={item._id}
                    onClick={() => {
                      // setOtherUserId(item.otherUserId)
                      // setName(item.name)
                      // setSenderAvatar(item.avatarPath)
                      setFriendCurrent(item);
                    }}
                  >
                    <div className='user'>
                      <Image
                        height={200}
                        width={200}
                        src={item.avatarPath} // Use the avatarPath from the item
                        alt={item.name}
                      />
                      <span className='status online'></span>
                    </div>
                    <div className='group-name-time'>
                      <div className='name-time'>
                        <p className='name'>{item.name}</p>
                        <p className='time'>{item.createdAt}</p>
                      </div>
                      <p className='content'>{item.lastedMessage}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className='layout-center'>
            <div className='selected-user'>
              <div className='name-chat'>
                <Image
                  height={200}
                  width={200}
                  src={friendCurrent?.avatarPath || ""}
                  alt={friendCurrent?.name || ""}
                />
                <div>
                  <span className='name'>{friendCurrent?.name}</span>
                  <p className='content'>online</p>
                </div>
              </div>
              <div>
                <button
                  type='button'
                  className='btn '
                >
                  <i
                    className='fas fa-video'
                    style={{ color: "#b8b8b8" }}
                  ></i>
                </button>
                <button
                  type='button'
                  className='btn '
                >
                  <i
                    className='fas fa-phone-alt'
                    style={{ color: "#b8b8b8" }}
                  ></i>
                </button>
                <button
                  type='button'
                  className='btn '
                >
                  <i
                    className='fas fa-ellipsis-v'
                    style={{ color: "#b8b8b8" }}
                  ></i>
                </button>
              </div>
            </div>

            {/* chat session */}
            <Conversation
              conversation={conversation}
              userId={userId}
              senderAvatar={friendCurrent?.avatarPath || ""}
              name={friendCurrent?.name || ""}
            />
             <ChatForm
              socket={socket}
              senderId={userId}
              recipientId={friendCurrent?.otherUserId || ""}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
