import React, { useState } from "react";
import Image from "next/image";

const ModalUpdate = () => {
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [description, setDescription] = useState(
    "World's most beautiful car in Curabitur #test drive booking !",
  );

  const [imageUrl, setImageUrl] = useState(
    "https://cdn.sforum.vn/sforum/wp-content/uploads/2023/06/tai-hinh-nen-dep-nhat-the-gioi-57.jpg",
  );
  setEditModalOpen;

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;

    if (files && files.length > 0) {
      const newImageUrl = URL.createObjectURL(files[0]);
      setImageUrl(newImageUrl);
    }
  };
  return (
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
        onClick={() => setEditModalOpen(false)}
      >
        Lưu
      </button>
      <button
        className='cancel-update'
        onClick={() => setEditModalOpen(false)}
      >
        Hủy
      </button>
    </div>
  );
};

export default ModalUpdate;
