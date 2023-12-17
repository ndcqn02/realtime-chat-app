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
}

export const CommentComponent: React.FC<ICommentProps> = ({
  listComment,
  userCurrentImg,
  userId,
  postId,
}) => {
  const [commentBody, setCommentBody] = useState({
    comment: "",
    creatorId: userId,
    postId: postId,
  });
  const [contentComment, setContentComment] = useState("");

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
  };

  const handleKeyDown = async (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault(); // Ngăn chặn xuống dòng trong textarea
      handleCreateComment();
    }
  };
  const [isCommentEditModalOpen, setCommentEditModalOpen] = useState(false);
  const [commentText, setCommentText] = useState("");

  const handleCommentEditClick = () => {
    setCommentEditModalOpen(true);
  };

  const handleCommentSaveClick = () => {
    // Xử lý lưu thay đổi bình luận ở đây
    // Sau khi lưu, đóng modal
    setCommentEditModalOpen(false);
  };
  const [selectedComment, setSelectedComment] = useState(null);

  const handleCommentDeleteClick = (comment: any) => {
    setSelectedComment(comment);
    // Hiển thị thông báo hoặc thực hiện các bước khác nếu cần thiết
  };

  // Thêm hàm xử lý xác nhận xóa bình luận
  const handleConfirmDeleteComment = () => {
    // Thực hiện xóa bình luận trong trạng thái ứng dụng của bạn
    // Sau đó, đặt lại selectedComment và ẩn thông báo hoặc thực hiện các bước khác nếu cần thiết
    setSelectedComment(null);
  };

  // Thêm hàm xử lý hủy xóa bình luận
  const handleCancelDeleteComment = () => {
    // Đặt lại selectedComment và ẩn thông báo hoặc thực hiện các bước khác nếu cần thiết
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
                />
              </div>
              <div className='we-comment'>
                {/* Modal chỉnh sửa bình luận */}
                {isCommentEditModalOpen && (
                  <div className="edit-comment-modal">
                    <h2>Chỉnh sửa bình luận</h2>
                    <textarea
                      value={commentText}
                      onChange={(e) => setCommentText(e.target.value)}
                      placeholder="Nhập nội dung bình luận..."
                    ></textarea>
                    <button
                      className="save-update"
                      onClick={handleCommentSaveClick}
                    >
                      Lưu
                    </button>
                    <button
                      className="cancel-update"
                      onClick={() => setCommentEditModalOpen(false)}
                    >
                      Hủy
                    </button>
                  </div>
                )}
                
                <div className='coment-head'>
                  <h5>
                    <a
                      href='time-line.html'
                      title=''
                    >
                      {comment.name}
                    </a>
                  </h5>
                  <span>{formatDateTime(comment.createdAt || '')}</span>
                  <a
                    className='we-reply'
                    href='#'
                    title='Reply'
                  >
                    <i className='fa fa-reply'></i>
                  </a>
                  <div className='dropdown' style={{ float: 'right', marginRight: '30px' }}>
                  <a id='dropdownToggle'>
                    <i className='fas fa-ellipsis-h'></i>
                  </a>
                  <div
                    className='dropdown-content'
                    id='myDropdown'
                  >
                    <ul className="ul">
                      <li>
                        <a onClick={handleCommentEditClick}><i className="fas fa-pencil-alt"> Chỉnh sửa</i></a>
                      </li>
                      <li>
                        <a onClick={() => handleCommentDeleteClick('Đây là một bình luận')}><i className="fas fa-trash-alt">  Xóa</i></a>
                      </li>
                    </ul>
                  </div>
                </div>
                </div>
                <p style={{maxWidth:'500px'}}>{comment.comment}</p>
                {/* Modal xác nhận xóa bình luận */}
                {selectedComment && (
                  <div className="delete-comment-modal">
                    <p>Bạn có chắc chắn muốn xóa bình luận này?</p>
                    <button className="save-update" onClick={handleConfirmDeleteComment}>
                      Xác nhận
                    </button>
                    <button className="cancel-update" onClick={handleCancelDeleteComment}>
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
                onKeyDown={handleKeyDown}
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
      </ul>
    </div>
  );
};
