import '@clerk/nextjs';
import '@/styles/Home.css';
import 'next/app';

export default function Page() {
  return (
    <div >
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css" />
      <div className="page-title">
        <div className="row">
          <h4>Chat Web App</h4>
          <img
            src="https://www.bootdey.com/img/Content/avatar/avatar5.png"
            alt="Retail Admin"
          />
        </div>
      </div>
      <div className="card m-0">
        <div className="layout-main">
          <div className="layout-left">
            <div className="users-container">
              <div className="box">
                <div className="container-1">
                    <span className="icon"><i className="fa fa-search"></i></span>
                    <input type="search" id="search" placeholder="Search..." />
                </div>
              </div>
              <ul className="users">
                <li className="person active-user" data-chat="person1">
                  <div className="user">
                    <img
                      src="https://www.bootdey.com/img/Content/avatar/avatar3.png"
                      alt="Retail Admin"
                    />
                    <span className="status online"></span>
                  </div>
                  <div className="group-name-time">
                    <div className="name-time">
                      <p className="name">Emily Russell</p>
                      <p className="time">15/02/2019</p>
                    </div>
                    <p className="content">Hi, Russell</p>
                  </div>
                </li>
                <li className="person" data-chat="person1">
                  <div className="user">
                    <img
                      src="https://www.bootdey.com/img/Content/avatar/avatar1.png"
                      alt="Retail Admin"
                    />
                    <span className="status offline"></span>
                  </div>
                  <div className="group-name-time">
                    <div className="name-time">
                      <p className="name">Steve Bangalter</p>
                      <p className="time">15/02/2019</p>
                    </div>
                    <p className="content">Hi, Russell</p>
                  </div>
                </li>
                <li className="person" data-chat="person2">
                  <div className="user">
                    <img
                      src="https://www.bootdey.com/img/Content/avatar/avatar2.png"
                      alt="Retail Admin"
                    />
                    <span className="status away"></span>
                  </div>
                  <div className="group-name-time">
                    <div className="name-time">
                      <p className="name">Peter Gregor</p>
                      <p className="time">12/02/2019</p>
                    </div>
                    <p className="content">Hi, Russell</p>
                  </div>
                </li>
                <li className="person" data-chat="person3">
                  <div className="user">
                    <img
                      src="https://www.bootdey.com/img/Content/avatar/avatar3.png"
                      alt="Retail Admin"
                    />
                    <span className="status busy"></span>
                  </div>
                  <div className="group-name-time">
                    <div className="name-time">
                      <p className="name">Jessica Larson</p>
                      <p className="time">11/02/2019</p>
                    </div>
                    <p className="content">Hi, Russell</p>
                  </div>
                </li>
                <li className="person" data-chat="person4">
                  <div className="user">
                    <img
                      src="https://www.bootdey.com/img/Content/avatar/avatar4.png"
                      alt="Retail Admin"
                    />
                    <span className="status offline"></span>
                  </div>
                  <div className="group-name-time">
                    <div className="name-time">
                      <p className="name">Lisa Guerrero</p>
                      <p className="time">08/02/2019</p>
                    </div>
                    <p className="content">Hi, Russell</p>
                  </div>
                </li>
                <li className="person" data-chat="person5">
                  <div className="user">
                    <img
                      src="https://www.bootdey.com/img/Content/avatar/avatar5.png"
                      alt="Retail Admin"
                    />
                    <span className="status online"></span>
                  </div>
                  <div className="group-name-time">
                    <div className="name-time">
                      <p className="name">Michael Jordan</p>
                      <p className="time">05/02/2019</p>
                    </div>
                    <p className="content">Hi, Russell</p>
                  </div>
                </li>
                <li className="person" data-chat="person1">
                  <div className="user">
                    <img
                      src="https://www.bootdey.com/img/Content/avatar/avatar3.png"
                      alt="Retail Admin"
                    />
                    <span className="status busy"></span>
                  </div>
                  <div className="group-name-time">
                    <div className="name-time">
                      <p className="name">Emily Russell</p>
                      <p className="time">15/02/2019</p>
                    </div>
                    <p className="content">Hi, Russell</p>
                  </div>
                </li>
                <li className="person" data-chat="person1">
                  <div className="user">
                    <img
                      src="https://www.bootdey.com/img/Content/avatar/avatar1.png"
                      alt="Retail Admin"
                    />
                    <span className="status offline"></span>
                  </div>
                  <div className="group-name-time">
                    <div className="name-time">
                      <p className="name">Steve Bangalter</p>
                      <p className="time">15/02/2019</p>
                    </div>
                    <p className="content">Hi, Russell</p>
                  </div>
                </li>
                <li className="person" data-chat="person2">
                  <div className="user">
                    <img
                      src="https://www.bootdey.com/img/Content/avatar/avatar2.png"
                      alt="Retail Admin"
                    />
                    <span className="status away"></span>
                  </div>
                  <div className="group-name-time">
                    <div className="name-time">
                      <p className="name">Peter Gregor</p>
                      <p className="time">12/02/2019</p>
                    </div>
                    <p className="content">Hi, Russell</p>
                  </div>
                </li>
                <li className="person" data-chat="person3">
                  <div className="user">
                    <img
                      src="https://www.bootdey.com/img/Content/avatar/avatar3.png"
                      alt="Retail Admin"
                    />
                    <span className="status busy"></span>
                  </div>
                  <div className="group-name-time">
                    <div className="name-time">
                      <p className="name">Jessica Larson</p>
                      <p className="time">11/02/2019</p>
                    </div>
                    <p className="content">Hi, Russell</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
          <div className="layout-center">
            <div className="selected-user">
              <div className='name-chat'>
                <img
                  src="https://www.bootdey.com/img/Content/avatar/avatar3.png"
                  alt="Retail Admin"
                />
                <div>
                  <span className="name">Emily Russell</span>
                  <p className="name">online</p>
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
            <div className="chat-container">
              <ul className="chat-box chatContainerScroll">
                <li className="chat-left">
                  <div className="chat-avatar">
                    <img
                      src="https://www.bootdey.com/img/Content/avatar/avatar3.png"
                      alt="Retail Admin"
                    />
                    <div className="chat-name">Russell</div>
                  </div>
                  <div className="chat-text">
                    Hello, I'm Russell.
                    <p>I'm very excited to show this to our team.</p>
                  </div>
                  <div className="chat-hour">
                    08:55<span className="fa fa-check-circle"></span>
                  </div>
                </li>
                <li className="chat-right">
                  <div className="chat-hour">
                    08:56 <span className="fa fa-check-circle"></span>
                  </div>
                  <div className="chat-text">
                    Hi, Russell
                    <p>I'm very excited to show this to our team.</p>
                  </div>
                  <div className="chat-avatar">
                    <img
                      src="https://www.bootdey.com/img/Content/avatar/avatar5.png"
                      alt="Retail Admin"
                    />
                    <div className="chat-name">Sam</div>
                  </div>
                </li>
                <li className="chat-left">
                  <div className="chat-avatar">
                    <img
                      src="https://www.bootdey.com/img/Content/avatar/avatar3.png"
                      alt="Retail Admin"
                    />
                    <div className="chat-name">Russell</div>
                  </div>
                  <div className="chat-text">
                    Are we meeting today?
                    <p>I'm very excited to show this to our team.</p>
                  </div>
                  <div className="chat-hour">
                    08:57 <span className="fa fa-check-circle"></span>
                  </div>
                </li>
                <li className="chat-right">
                  <div className="chat-hour">
                    08:59 <span className="fa fa-check-circle"></span>
                  </div>
                  <div className="chat-text">
                    Well I am not sure.
                    <p>I'm very excited to show this to our team.</p>
                  </div>
                  <div className="chat-avatar">
                    <img
                      src="https://www.bootdey.com/img/Content/avatar/avatar5.png"
                      alt="Retail Admin"
                    />
                    <div className="chat-name">Joyse</div>
                  </div>
                </li>
                <li className="chat-left">
                  <div className="chat-avatar">
                    <img
                      src="https://www.bootdey.com/img/Content/avatar/avatar3.png"
                      alt="Retail Admin"
                    />
                    <div className="chat-name">Russell</div>
                  </div>
                  <div className="chat-text">
                    The rest of the team is not here yet.
                    <p>I'm very excited to show this to our team.</p>
                  </div>
                  <div className="chat-hour">
                    08:57 <span className="fa fa-check-circle"></span>
                  </div>
                </li>
                <li className="chat-right">
                  <div className="chat-hour">
                    08:59 <span className="fa fa-check-circle"></span>
                  </div>
                  <div className="chat-text">
                    Have you faced any problems at the last phase of the project?
                  </div>
                  <div className="chat-avatar">
                    <img
                      src="https://www.bootdey.com/img/Content/avatar/avatar5.png"
                      alt="Retail Admin"
                    />
                    <div className="chat-name">Jin</div>
                  </div>
                </li>
                <li className="chat-left">
                  <div className="chat-avatar">
                    <img
                      src="https://www.bootdey.com/img/Content/avatar/avatar3.png"
                      alt="Retail Admin"
                    />
                    <div className="chat-name">Russell</div>
                  </div>
                  <div className="chat-text">
                    Actually everything was fine.
                    <p>I'm very excited to show this to our team.</p>
                  </div>
                  <div className="chat-hour">
                    07:00 <span className="fa fa-check-circle"></span>
                  </div>
                </li>
              </ul>
            </div>
            <div className="form-group">
              <div className="input-group">
                <button type="button" className="btn ">
                  <i className="far fa-smile" style={{ color: '#b8b8b8' }}></i>
                </button>
                <textarea
                  className="form-control"
                  rows={2}
                  placeholder="Type your message here..."
                ></textarea>
                <button type="button" className="btn ">
                  <i className="fas fa-paperclip" style={{ color: '#b8b8b8' }}></i>
                </button>
              </div>
              <button type="button" className="btn ">
                <i className="fas fa-microphone" style={{ color: '#b8b8b8' }}></i>
              </button>
            </div>
          </div>
          {/* <div className="layout-right">
            <div className='group-call1'>
              <img
                  src="https://www.bootdey.com/img/Content/avatar/avatar3.png"
                  alt="Retail Admin"
                />
              <p className='name'>Emily Russell</p>
              <p>Online</p>
              <div className='group-call'>
                <button type="button" className="btn ">
                  <i className="fas fa-video" style={{ color: '#b8b8b8' }}></i>
                </button>
                <button type="button" className="btn ">
                  <i className="fas fa-phone-alt" style={{ color: '#b8b8b8' }}></i>
                </button>
              </div>
            </div>
            
            <div className='group-infor'>
              <p>About</p>
              <p>Hello My name is Emily Russell</p>
              <p>Media,links and doc</p>
              <p>Mute notifications</p>
              <p>Disappearing messages</p>
              <p>Off</p>
              <div>
                <button type="button" className="btn ">
                  <i className="fas fa-ban" style={{ color: '#e91a77' }}></i> Block
                </button>
              </div>
              <div>
                <button type="button" className="btn ">
                  <i className="far fa-thumbs-up fa-rotate-180" style={{ color: '#e91a77' }}></i> Report
                </button>
              </div>
              <div>
                <button type="button" className="btn ">
                  <i className="fas fa-trash-alt" style={{ color: '#e91a77' }}></i> Delete
                </button>
              </div>              
            </div>
          </div> */}
        </div>
      </div>
    </div>
  )
}
