import { api } from "@/api/axios";
import Image from "next/image";
import React, { FormEvent, useState } from "react";
import { ToastContainer, toast } from "react-toastify";

export interface ICreatePostProps {
  imageUrl: string | undefined;
  currentUserId: string | undefined;
}

interface IPostForm {
  content: string;
  images: string;
  file?: File | null;
  creatorId: string;
  numberLike: number;
  numberComment: number;
}

const CreatePostForm: React.FC<ICreatePostProps> = ({ imageUrl, currentUserId }) => {
  const [post, setPost] = useState<IPostForm>({
    content: "",
    images: "",
    creatorId: currentUserId || "",
    numberLike: 10,
    numberComment: 4,
  });

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("content", post.content);
    formData.append("images", post.images);
    formData.append("creatorId", post.creatorId);
    formData.append("numberLike", post.numberLike + "");
    formData.append("numberComment", post.numberComment + "");
    // formData.append("file", post.file);

    try {
      const response = await api.post("/api/posts", formData);
      if (response.status === 200) {
        toast.success("Create post successfully!");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className='central-meta'>
      <div className='new-postbox' style={{paddingTop:"10px"}}>
        <Image        
          style={{marginLeft:"15px"}}
          height={200}
          width={200}
          src={imageUrl || ""}
          alt=''
        />
        <div className='newpst-input'>
          <form
            onSubmit={handleSubmit}
            method='post'
          >
            <textarea
              placeholder='Bạn đang nghĩ gì?'
              onChange={(e) => setPost({ ...post, content: e.target.value })}
            ></textarea>
            <input
              type='text'
              placeholder='Enter link image'
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
