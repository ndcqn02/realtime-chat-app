import "@clerk/nextjs";
import "@/styles/Message.css";
import "next/app";
import Image from "next/image";
import ChatForm from "@/components/chatForm";
import { useEffect, useRef, useState } from "react";
import { useAuth } from "@clerk/nextjs";
import io, { Socket } from "socket.io-client";
import { IChat, hostSocket } from "@/constant";
import { Conversation } from "@/components/conversation";
import { UserButton } from "@clerk/nextjs";
import { formatDateTime } from "@/utils/utils";

export interface IFriendChat {
  _id: string;
  otherUserId: string;
  currentUserId: string;
  createdAt: string;
  lastedMessage: string;
  avatarPath: string;
  name: string;
}

interface IReplyMessageRes {
  chatDetail: IChat[];
  conversations: IFriendChat[];
}

export default function Page() {
  const [conversation, setConversation] = useState<IChat[]>([]);
  const [listFriend, setListFriend] = useState<IFriendChat[]>([]);
  const [socket, setSocket] = useState<Socket>();
  const [isReload, setIsReload] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const [friendCurrent, setFriendCurrent] = useState<IFriendChat>();
  const { isLoaded, userId } = useAuth();

  useEffect(() => {
    const socket = hostSocket && io(hostSocket, {});
    socket && setSocket(socket);
  }, []);

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
  }, [userId, isReload]);

  useEffect(() => {
    const socket = hostSocket && io(hostSocket, {});
    if (socket) {
      socket.on("replyMessageRes", (data: IChat[]) => {
        console.log("🚀 ~ file: [[...message]].tsx:67 ~ socket.on ~ data:", data);
        setConversation(data);
      });
      return () => {
        socket.disconnect();
      };
    } else {
      console.error("Could not socket connect");
    }
  }, [friendCurrent]);

  useEffect(() => {
    const socket = hostSocket && io(hostSocket, {});
    if (friendCurrent && socket) {
      getMessage(socket, friendCurrent?.otherUserId, friendCurrent?.currentUserId);
    } else {
      console.error(`Has not friendCurrent: ${friendCurrent} or socket: ${socket}`);
    }
  }, [friendCurrent]);

  const getMessage = async (socket: Socket, senderId: string, recipientId: string) => {
    try {
      const payload = {
        recipientId: recipientId,
        senderId: senderId,
      };
      socket.emit("getMessage", payload);
    } catch (error) {
      console.error("Error connect:", error);
    }
  };

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

  useEffect(() => {
    scrollToBottom();
  }, [conversation]);

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
            <UserButton afterSignOutUrl='/sign-in' />
          </div>
        </div>
        <div className='top-bar'>
          <div className='navbar'>
            <a href='home'>
              <i className='fas fa-home'></i>
            </a>
            <a
              href='message'
              style={{ color: "#00fe2a" }}
            >
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
                  {listFriend.map((friend) => {
                    return (
                      <Image
                        key={friend._id}
                        height={200}
                        width={200}
                        src={friend.avatarPath}
                        alt='Retail Admin'
                        className='avt-new'
                      />
                    );
                  })}
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
                        <p className='time'>{formatDateTime(item.createdAt || "")}</p>
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
              senderId={userId}
              recipientId={friendCurrent?.otherUserId || ""}
              onSendMessage={() => {
                setIsReload(!isReload);
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
