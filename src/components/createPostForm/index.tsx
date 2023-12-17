import { api } from "@/api/axios";
import Image from "next/image";
import React, { FormEvent, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export interface ICreatePostProps {
  imageUrl: string | undefined;
  currentUserId: string | undefined;
  handleReload: () => void;
}

interface IPostForm {
  content: string;
  images: string;
  file?: File | null;
  creatorId: string;
  numberLike: number;
  numberComment: number;
}

const CreatePostForm: React.FC<ICreatePostProps> = ({ imageUrl, currentUserId, handleReload }) => {
  const initPost = {
    content: "",
    images: "",
    creatorId: currentUserId || "",
    numberLike: 10,
    numberComment: 4,
  };
  const [post, setPost] = useState<IPostForm>(initPost);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    if (!post.content || !post.images) {
      console.error("Ban chua nhap gi het de dang bai");
      return;
    }
    const formData = new FormData();
    formData.append("content", post.content);
    formData.append("images", post.images);
    formData.append("creatorId", post.creatorId);
    formData.append("numberLike", post.numberLike + "");
    formData.append("numberComment", post.numberComment + "");
    // formData.append("file", post.file);

    try {
      const response = await api.post("/api/posts", formData);
      if (response.status === 201) {
        toast.success("Create post successfully!");
        setPost(initPost);
        handleReload();
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className='central-meta'>
      <div
        className='new-postbox'
        style={{ paddingTop: "10px" }}
      >
        <Image
          style={{ marginLeft: "15px" }}
          height={500}
          width={200}
          src={imageUrl || ""}
          alt=''
          quality={100}
          priority
        />
        <div className='newpst-input'>
          <form
            onSubmit={handleSubmit}
            method='post'
          >
            <textarea
              placeholder='Bạn đang nghĩ gì?'
              value={post.content}
              onChange={(e) => setPost({ ...post, content: e.target.value })}
            ></textarea>
            <input
              type='text'
              placeholder='Enter link image'
              value={post.images}
              onChange={(e) => setPost({ ...post, images: e.target.value })}
            ></input>
            <div className='attachments'>
              <ul>
                <li>
                  <i className='fa fa-music'></i>
                </li>
                <li>
                  <i className='fa fa-image'></i>
                  <label className='fileContainer'>
                    <input
                      type='file'
                      // onChange={(e) =>
                      //   setPost({ ...post, file: (e.target.files?.[0] as File) || null })
                      // }
                    ></input>
                  </label>
                </li>
                <li>
                  <i className='fa fa-video-camera'></i>
                </li>
                <li>
                  <i className='fa fa-camera'></i>
                </li>
                <li>
                  <button type='submit'>Đăng</button>
                </li>
              </ul>
            </div>
          </form>
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
};

export default CreatePostForm;
