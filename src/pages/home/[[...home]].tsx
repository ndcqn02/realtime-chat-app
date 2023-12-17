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
import { ToastContainer, toast } from "react-toastify";
import { formatDateTime } from "@/utils/utils";
import LeftBar from "@/components/leftBar/leftBar";
import { api } from "@/api/axios";
import "react-toastify/dist/ReactToastify.css";

export default function Page() {
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [listPost, setListPost] = useState<IPostRes[]>();
  const { user, isLoaded } = useUser();
  const [reload, setReload] = useState(false);
  const [postSelected, setPostSelected] = useState<IPostRes | null>(null);
  const [description, setDescription] = useState("");
  const [linkPost, setLinkPost] = useState("");

  const initPostBody = {
    content: "",
    images: "",
    creatorId: user?.id || "",
    numberLike: 10,
    numberComment: 4,
  };
  const [postBody, setPostBody] = useState(initPostBody);

  const [imageUrl, setImageUrl] = useState(
    "https://cdn.sforum.vn/sforum/wp-content/uploads/2023/06/tai-hinh-nen-dep-nhat-the-gioi-57.jpg",
  );
  setEditModalOpen;
  const handleEditClick = (post: IPostRes) => {
    setPostSelected(post);
    setPostBody({
      ...postBody,
      content: post.content,
      images: post.images,
      creatorId: post.creatorId,
      numberLike: post.numberLike,
      numberComment: post.numberComment,
    });
    setDescription(post.content);
    setLinkPost(post.images);
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

  const handleDeleteClick = (post: IPostRes) => {
    setPostSelected(post);
    setDeleteModalOpen(true);
  };

  const handleEditPost = async () => {
    event?.preventDefault();
    const res = await api.put(`/api/posts/${postSelected?._id}`, postBody);

    if (res.status === 200) {
      toast.success("Update post successfully");
      setPostBody(initPostBody);
    }
    setEditModalOpen(false);
    setPostSelected(null);
    handleReload();
  };

  const handleSaveClick = async () => {
    await handleEditPost();
    setReload(!reload);
    setEditModalOpen(false);
  };

  const handleCancelClick = () => {
    setPostBody(initPostBody);
    setEditModalOpen(false);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;

    if (files && files.length > 0) {
      const newImageUrl = URL.createObjectURL(files[0]);
      setImageUrl(newImageUrl);
    }
  };

  const closeDeleteModal = () => {
    setPostSelected(null);
    setDeleteModalOpen(false);
  };

  const handleDeletePost = async () => {
    const res = await api.delete(`/api/posts/${postSelected?._id}`);

    if (res.status === 200) {
      toast.success("Delete post successfully");
      setPostBody(initPostBody);
    }
    setEditModalOpen(false);
    handleReload();
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
            <UserButton afterSignOutUrl='/' />
          </div>
        </div>
        <div className='top-bar'>
          <div className='navbar'>
            <a
              href='home'
              style={{ color: "#00fe2a" }}
            >
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
        <LeftBar />
        <div className='layout-center-home'>
          <div className='col-lg-6'>
            <CreatePostForm
              imageUrl={user?.imageUrl}
              currentUserId={user?.id}
              handleReload={handleReload}
            />

            <div className='loadMore'>
              {listPost?.map((post) => {
                return (
                  <div
                    key={post._id}
                    className='central-meta item'
                  >
                    <div
                      className='user-post'
                      style={{ paddingTop: "10px" }}
                    >
                      <div className='friend-info'>
                        <Image
                          style={{ marginLeft: "15px" }}
                          height={700}
                          width={500}
                          src={post.avatarPath || ""}
                          alt='Retail Admin'
                          quality={100}
                          priority
                        />

                        <div className='friend-name'>
                          <ins>
                            <a
                              href='#'
                              title=''
                            >
                              {post.name}
                            </a>
                          </ins>
                          <span>{formatDateTime(post.createdAt || "")}</span>
                        </div>
                        {post.creatorId === user?.id && (
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
                                  <a onClick={() => handleEditClick(post)}>
                                    <i className='fas fa-pencil-alt'> Chỉnh sửa</i>
                                  </a>
                                </li>
                                <li>
                                  <a onClick={() => handleDeleteClick(post)}>
                                    <i className='fas fa-trash-alt'> Xóa</i>
                                  </a>
                                </li>
                              </ul>
                            </div>
                          </div>
                        )}

                        {/* Modal chỉnh sửa */}
                        {isEditModalOpen && postSelected?._id === post._id && (
                          <div className='edit-modal'>
                            <h2>Chỉnh sửa bài viết</h2>
                            <textarea
                              value={description}
                              onChange={(e) => {
                                setDescription(e.target.value);
                                setPostBody({ ...postBody, content: e.target.value });
                              }}
                              placeholder='Nhập mô tả bài viết...'
                            ></textarea>
                            <div className='post-meta'>
                              <Image
                                height={500}
                                width={500}
                                className='m-r-20'
                                src={post.images}
                                quality={100}
                                priority
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
                                  alt='Link update image post'
                                  type='text'
                                  value={linkPost}
                                  onChange={(e) => {
                                    setLinkPost(e.target.value);
                                    setPostBody({ ...postBody, images: e.target.value });
                                  }}
                                />
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
                            quality={100}
                            priority
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
                      <span
                        className='like'
                        title='dislike'
                      >
                        <i className='fas fa-heart'></i>
                        Like
                      </span>
                      <span
                        className='like'
                        title='dislike'
                      >
                        <i className='far fa-comment'></i>
                        Comments
                      </span>
                      <span
                        className='like'
                        title='dislike'
                      >
                        <i className='fas fa-share-alt'></i>
                        Share
                      </span>
                    </div>

                    {/* Modal xóa bài viết */}
                    {isDeleteModalOpen && (
                      <div
                        className='confirmation-overlay'
                        style={{
                          backgroundColor: "rgba(0, 0, 0, 0.3)",
                          display: "block !important",
                        }}
                      >
                        <div className='confirmation-modal'>
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
                      </div>
                    )}
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
