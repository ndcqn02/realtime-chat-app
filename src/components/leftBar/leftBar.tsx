import React from "react";

const LeftBar = () => {
  return (
    <div className='layout-left-home'>
      <div className='nav-bar'>
        <ul className='nav'>
          <li>
            <i className='fas fa-newspaper'></i>
            <a
              href='home'
              title=''
            >
              Trang chủ
            </a>
          </li>
          <li>
            <i className='fas fa-users'></i>
            <a
              href=''
              title=''
            >
              Nhóm
            </a>
          </li>
          <li>
            <i className='fas fa-user'></i>
            <a
              href=''
              title=''
            >
              Bạn bè
            </a>
          </li>
          <li>
            <i className='fas fa-image'></i>
            <a
              href=''
              title=''
            >
              Hình ảnh
            </a>
          </li>
          <li>
            <i className='fas fa-video'></i>
            <a
              href=''
              title=''
            >
              Video
            </a>
          </li>

          <li>
            <i className='fas fa-gamepad'></i>
            <a
              href=''
              title=''
            >
              Chơi game
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default LeftBar;
