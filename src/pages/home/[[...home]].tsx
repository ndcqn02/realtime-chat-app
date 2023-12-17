import "@clerk/nextjs";
import "@/styles/Message.css";
import "@/styles/Home.css";
import "next/app";
import { UserButton, currentUser, useUser } from "@clerk/nextjs";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { IPostRes, getAllPost } from "@/api/post";
import CreatePostForm from "@/components/createPostForm";
import { CommentComponent } from "@/components/comment";
import { ToastContainer } from "react-toastify";
import { formatDateTime } from "@/utils/utils";

export default function Page() {
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [listPost, setListPost] = useState<IPostRes[]>();
  const { user, isLoaded } = useUser();
  const [reload, setReload] = useState(false);
  const [description, setDescription] = useState(
    "World's most beautiful car in Curabitur #test drive booking !",
  );
  const [imageUrl, setImageUrl] = useState(
    "https://cdn.sforum.vn/sforum/wp-content/uploads/2023/06/tai-hinh-nen-dep-nhat-the-gioi-57.jpg",
  );
  setEditModalOpen;
  const handleEditClick = () => {
    setEditModalOpen(true);
  };
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["POSTS"],
    queryFn: getAllPost,
  });

  useEffect(() => {
    console.log("reload lai ");

    refetch();
  }, [reload, refetch]);

  useEffect(() => {
    if (!isLoading && !isError) {
      setListPost(data);
    }
  }, [isLoading, isError, data]);

  const handleReload = () => {
    setReload(!reload);
  };

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

  if (!isLoaded) {
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
            <CreatePostForm
              imageUrl={user?.imageUrl}
              currentUserId={user?.id}
            />

            <div className='loadMore'>
              {listPost?.map((post) => {
                return (
                  <div
                    key={post._id}
                    className='central-meta item'
                  >
                    <div className='user-post'>
                      <div className='friend-info'>
                        <Image
                          style={{ marginLeft: "15px" }}
                          height={200}
                          width={200}
                          src={post.avatarPath || ""}
                          alt='Retail Admin'
                        />

                        <div className='friend-name'>
                          <ins>
                            <a
                              href='time-line.html'
                              title=''
                            >
                              {post.name}
                            </a>
                          </ins>
                          <span>{formatDateTime(post.createdAt || "")}</span>
                        </div>
                        <div className='dropdown'>
                          <a id='dropdownToggle'>
                            <i className='fas fa-ellipsis-h'></i>
                          </a>
                          <div
                            className='dropdown-content'
                            id='myDropdown'
                          >
                            <ul className='ul'>
                              <li>
                                <a onClick={handleEditClick}>
                                  <i className='fas fa-pencil-alt'> Chỉnh sửa</i>
                                </a>
                              </li>
                              <li>
                                <a onClick={openDeleteModal}>
                                  <i className='fas fa-trash-alt'> Xóa</i>
                                </a>
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
                              <Image
                                height={500}
                                width={500}
                                className='m-r-20'
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
                            <button
                              className='save-update'
                              onClick={handleDeletePost}
                            >
                              Xác nhận
                            </button>
                            <button
                              className='cancel-update'
                              onClick={closeDeleteModal}
                            >
                              Hủy
                            </button>
                          </div>
                        )}
                        <div
                          className='description'
                          style={{ marginLeft: "15px" }}
                        >
                          <p>{post.content}</p>
                        </div>
                        <div className='post-meta'>
                          <Image
                            height={200}
                            width={200}
                            src={post.images}
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
                                <ins>{post.numberLike}</ins>
                              </span>
                            </li>

                            <li>
                              <span
                                className='comment'
                                data-toggle='tooltip'
                                title='Comments'
                              >
                                <i className='far fa-comment'></i>
                                <ins>{post.numberComment}</ins>
                              </span>
                            </li>

                            <li>
                              <span
                                className='dislike'
                                data-toggle='tooltip'
                                title='dislike'
                              >
                                <i className='fas fa-share-alt'></i>
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
                    {/* comment */}
                    {post?.comments && (
                      <CommentComponent
                        listComment={post.comments}
                        userCurrentImg={user?.imageUrl}
                        userId={user?.id}
                        postId={post._id}
                        handleReload={handleReload}
                      />
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
      <ToastContainer
        position='top-right'
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme='light'
      />
    </div>
  );
}
