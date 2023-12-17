import { api } from "@/api/axios";
import { IComment } from "@/api/post";
import Image from "next/image";
import React, { FormEvent, KeyboardEvent, useState } from "react";
import { ToastContainer, toast } from "react-toastify";

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
                <div className='coment-head'>
                  <h5>
                    <a
                      href='time-line.html'
                      title=''
                    >
                      {comment.name}
                    </a>
                  </h5>
                  <span>{comment.createdAt}</span>
                  <a
                    className='we-reply'
                    href='#'
                    title='Reply'
                  >
                    <i className='fa fa-reply'></i>
                  </a>
                </div>
                <p>{comment.comment}</p>
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
