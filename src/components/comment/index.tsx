import { api } from "@/api/axios";
import { IComment } from "@/api/post";
import Image from "next/image";
import React, { FormEvent, KeyboardEvent, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { formatDateTime } from "@/utils/utils";

interface ICommentProps {
  listComment: IComment[];
  userCurrentImg: string | undefined;
  userId: string | undefined;
  postId: string | undefined;
  handleReload: () => void;
}

export const CommentComponent: React.FC<ICommentProps> = ({
  listComment,
  userCurrentImg,
  userId,
  postId,
  handleReload,
}) => {
  const [contentComment, setContentComment] = useState("");
  const [selectedComment, setSelectedComment] = useState<IComment | null>(null);
  const [isCommentEditModalOpen, setCommentEditModalOpen] = useState(false);
  const [isCommentDeleteModalOpen, setCommentDeleteModalOpen] = useState(false);
  const [commentText, setCommentText] = useState("");
  const [commentBody, setCommentBody] = useState({
    comment: "",
    creatorId: userId,
    postId: postId,
  });

  const handleCreateComment = async () => {
    event?.preventDefault();
    const res = await api.post(`/api/comments`, commentBody);
    setContentComment("");
    if (res.status === 201) {
      toast.success("Comment created successfully");
      setCommentBody({
        comment: "",
        creatorId: userId,
        postId: postId,
      });
    }
    handleReload();
  };

  const handleKeyDownCreate = async (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault(); // Ngăn chặn xuống dòng trong textarea
      handleCreateComment();
    }
  };

  const handleCommentEditClick = (comment: IComment) => {
    setCommentEditModalOpen(true);
    setSelectedComment(comment);
    setCommentText(comment.comment);
  };

  const handleKeyDownEdit = async (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleCommentUpdateClick();
    }
  };

  const handleCommentUpdateClick = async () => {
    event?.preventDefault();
    commentBody.comment = commentText;
    const res = await api.put(`/api/comments/${selectedComment?._id}`, commentBody);
    setContentComment("");
    if (res.status === 200) {
      toast.success("Update comment successfully");
      setCommentBody({
        comment: "",
        creatorId: userId,
        postId: postId,
      });
    }
    setCommentEditModalOpen(false);
    handleReload();
  };

  const handleDeleteComment = async () => {
    event?.preventDefault();
    commentBody.comment = commentText;
    const res = await api.delete(`/api/comments/${selectedComment?._id}`);
    if (res.status === 200) {
      toast.success("Delete comment successfully");
    }
    setCommentDeleteModalOpen(false);
    handleReload();
  };

  const handleCommentDeleteClick = async (comment: IComment) => {
    setCommentDeleteModalOpen(true);
    setSelectedComment(comment);
    setCommentText(comment.comment);
  };

  const handleConfirmDeleteComment = async () => {
    await handleDeleteComment();
    setSelectedComment(null);
  };

  const handleCancelDeleteComment = () => {
    setCommentDeleteModalOpen(false);
    setSelectedComment(null);
  };
  return (
    <div className='coment-area'>
      <ul className='we-comet'>
        {listComment.map((comment) => {
          return (
            <li key={comment._id}>
              <div className='comet-avatar'>
                <Image
                  height={200}
                  width={200}
                  src={comment.avatarPath || ""}
                  alt='Retail Admin'
                  quality={100}
                  priority
                />
              </div>
              <div className='we-comment'>
                <div className='coment-head'>
                  <h5>
                    <a
                      href='#'
                      title=''
                    >
                      {comment.name}
                    </a>
                  </h5>
                  <span>{formatDateTime(comment.createdAt || "")}</span>
                  <a
                    className='we-reply'
                    href='#'
                    title='Reply'
                  >
                    <i className='fa fa-reply'></i>
                  </a>
                  {comment.creatorId === userId && (
                    <div
                      className='dropdown'
                      style={{ float: "right", marginRight: "30px" }}
                    >
                      <a id='dropdownToggle'>
                        <i className='fas fa-ellipsis-h'></i>
                      </a>

                      <div
                        className='dropdown-content'
                        id='myDropdown'
                      >
                        <ul className='ul'>
                          <li>
                            <a onClick={() => handleCommentEditClick(comment)}>
                              <i className='fas fa-pencil-alt'> Chỉnh sửa</i>
                            </a>
                          </li>
                          <li>
                            <a onClick={() => handleCommentDeleteClick(comment)}>
                              <i className='fas fa-trash-alt'> Xóa</i>
                            </a>
                          </li>
                        </ul>
                      </div>
                    </div>
                  )}
                </div>
                {!isCommentEditModalOpen && <p>{comment.comment}</p>}

                {/* Modal chỉnh sửa bình luận */}
                {isCommentEditModalOpen && selectedComment?._id === comment._id && (
                  <div className='edit-comment-modal'>
                    <p>Chỉnh sửa bình luận</p>
                    <textarea
                      value={commentText}
                      onChange={(e) => setCommentText(e.target.value)}
                      onKeyDown={handleKeyDownEdit}
                      placeholder='Nhập nội dung bình luận...'
                    ></textarea>
                    <button
                      className='save-update'
                      onClick={handleCommentUpdateClick}
                    >
                      Lưu
                    </button>
                    <button
                      className='cancel-update'
                      onClick={() => setCommentEditModalOpen(false)}
                    >
                      Hủy
                    </button>
                  </div>
                )}
              </div>
            </li>
          );
        })}

        <li>
          <a
            href='#'
            title=''
            className='showmore underline'
          >
            more comments
          </a>
        </li>

        {/* Viết bình luận */}
        <li className='post-comment'>
          <div className='comet-avatar'>
            <Image
              height={200}
              width={200}
              src={userCurrentImg || ""}
              alt='Retail Admin'
            />
          </div>
          <div className='post-comt-box'>
            <form
              onSubmit={handleCreateComment}
              method='post'
              className='comment'
            >
              <textarea
                className='import'
                placeholder='Viết bình luận...'
                onKeyDown={handleKeyDownCreate}
                value={contentComment}
                onChange={(e) => {
                  setContentComment(e.target.value);
                  setCommentBody({ ...commentBody, comment: e.target.value });
                }}
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

        {/* Modal xác nhận xóa bình luận */}
        {isCommentDeleteModalOpen && (
          <div className='confirmation-overlay'>
            <div className='delete-comment-modal confirmation-modal'>
              <p>Bạn có chắc chắn muốn xóa bình luận này?</p>
              <button
                className='save-update'
                onClick={handleConfirmDeleteComment}
              >
                Xác nhận
              </button>
              <button
                className='cancel-update'
                onClick={handleCancelDeleteComment}
              >
                Hủy
              </button>
            </div>
          </div>
        )}
      </ul>
    </div>
  );
};
