import "@clerk/nextjs";
import "@/styles/Message.css";
import "@/styles/Home.css";
import "next/app";
import { UserButton } from "@clerk/nextjs";
import Image from "next/image";
import React, { useState } from "react";

export default function Page() {
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [description, setDescription] = useState(
    "World's most beautiful car in Curabitur #test drive booking !",
  );
  const [imageUrl, setImageUrl] = useState(
    "https://cdn.sforum.vn/sforum/wp-content/uploads/2023/06/tai-hinh-nen-dep-nhat-the-gioi-57.jpg",
  );

  const handleEditClick = () => {
    setEditModalOpen(true);
  };
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const handleSaveClick = () => {
    // Xử lý lưu thay đổi ở đây
    // Sau khi lưu, đóng modal
    setEditModalOpen(false);
  };

  const handleCancelClick = () => {
    // Đóng modal mà không lưu thay đổi
    setEditModalOpen(false);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;

    if (files && files.length > 0) {
      const newImageUrl = URL.createObjectURL(files[0]);
      setImageUrl(newImageUrl);
    }
  };
  const openDeleteModal = () => {
    setDeleteModalOpen(true);
  };
  
  const closeDeleteModal = () => {
    setDeleteModalOpen(false);
  };
  const handleDeletePost = () => {
    // Thực hiện xóa bài viết ở đây
    // Sau khi xóa, đóng modal
    closeDeleteModal();
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
            <h4>Chat Web App</h4>
            <UserButton afterSignOutUrl='/' />
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
      <div style={{ height: "16vh" }}></div>

      <div className='layout-main-home'>
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
        <div className='layout-center-home'>
          <div className='col-lg-6'>
            <div className='central-meta'>
              <div className='new-postbox'>
                <Image
                  height={200}
                  width={200}
                  src='https://www.bootdey.com/img/Content/avatar/avatar5.png'
                  alt='Retail Admin'
                />
                <div className='newpst-input'>
                  <form method='post'>
                    <textarea placeholder='Bạn đang nghĩ gì?'></textarea>
                    <div className='attachments'>
                      <ul>
                        <li>
                          <i className='fa fa-music'></i>
                          <label className='fileContainer'>
                            <input type='file'></input>
                          </label>
                        </li>
                        <li>
                          <i className='fa fa-image'></i>
                          <label className='fileContainer'>
                            <input type='file'></input>
                          </label>
                        </li>
                        <li>
                          <i className='fa fa-video-camera'></i>
                          <label className='fileContainer'>
                            <input type='file'></input>
                          </label>
                        </li>
                        <li>
                          <i className='fa fa-camera'></i>
                          <label className='fileContainer'>
                            <input type='file'></input>
                          </label>
                        </li>
                        <li>
                          <button type='submit'>Đăng</button>
                        </li>
                      </ul>
                    </div>
                  </form>
                </div>
              </div>
            </div>
            <div className='loadMore'>
              <div className='central-meta item'>
                <div className='user-post'>
                  <div className='friend-info'>
                    <Image
                      height={200}
                      width={200}
                      src='https://www.bootdey.com/img/Content/avatar/avatar5.png'
                      alt='Retail Admin'
                    />

                    <div className='friend-name'>
                      <ins>
                        <a
                          href='time-line.html'
                          title=''
                        >
                          Janice Griffith
                        </a>
                      </ins>
                      <span>published: june,2 2018 19:PM</span>
                    </div>
                    <div className='dropdown'>
                      <a id='dropdownToggle'>
                        <i className='fas fa-ellipsis-h'></i>
                      </a>
                      <div
                        className='dropdown-content'
                        id='myDropdown'
                      >
                        <ul>
                          <li>
                            <a onClick={handleEditClick}>Chỉnh sửa bài viết</a>
                          </li>
                          <li>
                            <a onClick={openDeleteModal}>Xóa bài viết</a>
                          </li>
                        </ul>
                      </div>
                    </div>
                    {/* Modal chỉnh sửa */}
                    {isEditModalOpen && (
                      <div className='edit-modal'>
                        <h2>Chỉnh sửa bài viết</h2>
                        <textarea
                          value={description}
                          onChange={(e) => setDescription(e.target.value)}
                          placeholder='Nhập mô tả bài viết...'
                        ></textarea>
                        <div className='post-meta'>
                          <img
                            src={imageUrl}
                            alt='Bài viết'
                          />
                          <i
                            className=' delete_img far fa-times-circle'
                            onClick={() => setImageUrl("")}
                          ></i>
                          <div className='image-controls'>
                            <label htmlFor='imageInput'>Chọn ảnh mới</label>
                            <br />
                            <input
                              id='imageInput'
                              type='file'
                              onChange={handleImageChange}
                            />
                          </div>
                        </div>
                        <button
                          className='save-update'
                          onClick={handleSaveClick}
                        >
                          Lưu
                        </button>
                        <button
                          className='cancel-update'
                          onClick={handleCancelClick}
                        >
                          Hủy
                        </button>
                      </div>
                    )}
                    {/* Modal xóa bài viết */}
                    {isDeleteModalOpen && (
                      <div className='delete-modal'>
                        <p>Bạn có chắc chắn muốn xóa bài viết này?</p>
                        <button className='save-update' onClick={handleDeletePost}>Xác nhận</button>
                        <button className='cancel-update' onClick={closeDeleteModal}>Hủy</button>
                      </div>
                    )}
                    <div className='description'>
                      <p>
                        World s most beautiful car in Curabitur{" "}
                        <a
                          href='#'
                          title=''
                        >
                          #test drive booking !
                        </a>{" "}
                        the most beatuiful car available in america and the saudia arabia, you can
                        book your test drive by our official website
                      </p>
                    </div>
                    <div className='post-meta'>
                      <Image
                        height={200}
                        width={200}
                        src='https://cdn.sforum.vn/sforum/wp-content/uploads/2023/06/tai-hinh-nen-dep-nhat-the-gioi-57.jpg'
                        alt=''
                      ></Image>
                    </div>
                    <div className='we-video-info'>
                      <ul>
                        <li>
                          <span
                            data-toggle='tooltip'
                            title='like'
                          >
                            <i className='fas fa-heart'></i>
                            <ins>200</ins>
                          </span>
                        </li>

                        <li>
                          <span
                            className='comment'
                            data-toggle='tooltip'
                            title='Comments'
                          >
                            <i className='far fa-comment'></i>
                            <ins>52</ins>
                          </span>
                        </li>

                        <li>
                          <span
                            className='dislike'
                            data-toggle='tooltip'
                            title='dislike'
                          >
                            <i className='fas fa-share-alt'></i>
                            <ins>200</ins>
                          </span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div className='like-comment-share'>
                  <ul>
                    <li>
                      <span
                        className='like'
                        title='dislike'
                      >
                        <i className='fas fa-heart'></i>
                        Like
                      </span>
                    </li>
                    <li>
                      <span
                        className='like'
                        title='dislike'
                      >
                        <i className='far fa-comment'></i>
                        Comments
                      </span>
                    </li>
                    <li>
                      <span
                        className='like'
                        title='dislike'
                      >
                        <i className='fas fa-share-alt'></i>
                        Share
                      </span>
                    </li>
                  </ul>
                </div>
                <div className='coment-area'>
                  <ul className='we-comet'>
                    <li>
                      <div className='comet-avatar'>
                        <Image
                          height={200}
                          width={200}
                          src='https://www.bootdey.com/img/Content/avatar/avatar2.png'
                          alt='Retail Admin'
                        />
                      </div>
                      <div className='we-comment'>
                        <div className='coment-head'>
                          <h5>
                            <a
                              href='time-line.html'
                              title=''
                            >
                              Jason borne
                            </a>
                          </h5>
                          <span>1 year ago</span>
                          <a
                            className='we-reply'
                            href='#'
                            title='Reply'
                          >
                            <i className='fa fa-reply'></i>
                          </a>
                        </div>
                        <p>
                          we are working for the dance and sing songs. this car is very awesome for
                          the youngster. please vote this car and like our post
                        </p>
                      </div>
                      <ul>
                        <li>
                          <div className='comet-avatar'>
                            <Image
                              height={200}
                              width={200}
                              src='https://www.bootdey.com/img/Content/avatar/avatar4.png'
                              alt='Retail Admin'
                            />
                          </div>
                          <div className='we-comment'>
                            <div className='coment-head'>
                              <h5>
                                <a
                                  href='time-line.html'
                                  title=''
                                >
                                  alexendra dadrio
                                </a>
                              </h5>
                              <span>1 month ago</span>
                              <a
                                className='we-reply'
                                href='#'
                                title='Reply'
                              >
                                <i className='fa fa-reply'></i>
                              </a>
                            </div>
                            <p>
                              yes, really very awesome car i see the features of this car in the
                              official website of{" "}
                              <a
                                href='#'
                                title=''
                              >
                                #Mercedes-Benz
                              </a>{" "}
                              and really impressed
                            </p>
                          </div>
                        </li>
                        <li>
                          <div className='comet-avatar'>
                            <Image
                              height={200}
                              width={200}
                              src='https://www.bootdey.com/img/Content/avatar/avatar3.png'
                              alt='Retail Admin'
                            />
                          </div>
                          <div className='we-comment'>
                            <div className='coment-head'>
                              <h5>
                                <a
                                  href='time-line.html'
                                  title=''
                                >
                                  Olivia
                                </a>
                              </h5>
                              <span>16 days ago</span>
                              <a
                                className='we-reply'
                                href='#'
                                title='Reply'
                              >
                                <i className='fa fa-reply'></i>
                              </a>
                            </div>
                            <p>
                              i like lexus cars, lexus cars are most beautiful with the awesome
                              features, but this car is really outstanding than lexus
                            </p>
                          </div>
                        </li>
                      </ul>
                    </li>
                    <li>
                      <a
                        href='#'
                        title=''
                        className='showmore underline'
                      >
                        more comments
                      </a>
                    </li>
                    <li className='post-comment'>
                      <div className='comet-avatar'>
                        <Image
                          height={200}
                          width={200}
                          src='https://www.bootdey.com/img/Content/avatar/avatar3.png'
                          alt='Retail Admin'
                        />
                      </div>
                      <div className='post-comt-box'>
                        <form
                          method='post'
                          className='comment'
                        >
                          <textarea
                            className='import'
                            placeholder='Viết bình luận...'
                          ></textarea>
                          <button type='submit'>
                            <i
                              className='fas fa-paper-plane'
                              style={{ color: "#9ec94a" }}
                            ></i>
                          </button>
                        </form>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
