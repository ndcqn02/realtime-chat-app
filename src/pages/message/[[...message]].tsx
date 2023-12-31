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
import { useQuery } from "@tanstack/react-query";
import { IUser, getAllUser, getListFiendChat } from "@/api/message";

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
  const [reLoadDelete, setReLoadDelete] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const [friendCurrent, setFriendCurrent] = useState<IFriendChat>();
  const [searchTerm, setSearchTerm] = useState("");
  const [listUserMatch, setListUserMatch] = useState<IUser[] | null>([]);
  const { isLoaded, userId } = useAuth();

  const { data } = useQuery({
    queryKey: ["LIST_USER"],
    queryFn: getAllUser,
  });

  useEffect(() => {
    const socket = hostSocket && io(hostSocket, {});
    socket && setSocket(socket);
  }, []);


  const listFriendData = useQuery({
    queryKey: ["LIST_FRIEND"],
    queryFn: async () => {
      const res = userId && (await getListFiendChat(userId));
      if (res) {
        setListFriend(res);
        if (!friendCurrent) {
          setFriendCurrent(res[0]);
        }
      }
      return res;
    },
  });

  useEffect(() => {
    console.log("reload lai ");

    listFriendData.refetch();
  }, [userId, isReload, listFriendData.data ]);

  useEffect(() => {
    const socket = hostSocket && io(hostSocket, {});
    if (socket) {
      socket.on("replyMessageRes", (data: IChat[]) => {
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
  }, [friendCurrent, reLoadDelete]);

  const getMessage = async (socket: Socket, senderId: string, recipientId: string) => {
    try {
      const payload = {
        recipientId: recipientId,
        senderId: senderId,
      };
      console.log("emit call io");
      
      socket.emit("getMessage", payload);
    } catch (error) {
      console.error("Error connect:", error);
    }
  };

  const scrollToBottom = () => {
    if (containerRef.current) {
      containerRef.current.scrollTo({
        left: 0,
        top: containerRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [conversation]);

  if (!isLoaded || !userId) {
    return null;
  }

  const handleSearch = () => {
    const listUser =
      data && data.filter((item) => item.fullName.toLowerCase().includes(searchTerm.toLowerCase()));
    setListUserMatch(listUser || []);
  };

  return (
    <div className='layout'>
      <div className='fixed-top'>
        <link
          rel='stylesheet'
          href='https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css'
        />
        <div className='page-title'>
          <div className='row'>
          <Image
              style={{ height: "40px", width: "170px" }}
              height={40}
              width={170}
              src='/logo.jpg'
              alt='logo'
              quality={100}
              priority
            />
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
                    onChange={(e) => {
                      setSearchTerm(e.target.value);
                      handleSearch();
                    }}
                    onBlur={()=> {setIsReload(!isReload)}}
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
                {searchTerm === ""
                  ? listFriend.map((item) => (
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
                    ))
                  : listUserMatch &&
                    listUserMatch.map((item) => (
                      <li
                        className='person active-user'
                        data-chat='person1'
                        key={item.id}
                        onClick={() => {
                          console.log("item", item);
                          setFriendCurrent({
                            _id: item.id,
                            otherUserId: item.id,
                            currentUserId: userId,
                            createdAt: item.createdAt,
                            lastedMessage: "",
                            avatarPath: item.imageUrl,
                            name: item.fullName,
                          });
                        }}
                      >
                        <div className='user'>
                          <Image
                            height={200}
                            width={200}
                            src={item.imageUrl}
                            alt={item.fullName}
                          />
                          <span className='status online'></span>
                        </div>
                        <div className='group-name-time'>
                          <div className='name-time'>
                            <p className='name'>{item.fullName}</p>
                          </div>
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
              friendId={friendCurrent?.otherUserId}
              senderAvatar={friendCurrent?.avatarPath || ""}
              name={friendCurrent?.name || ""}
              handleReload={()=> setReLoadDelete(!reLoadDelete)}
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
