export interface IPostRes {
  _id?: string;
  content: string;
  images: string;
  numberLike: number;
  numberComment: number;
  creatorId: string;
  createdAt?: string;
  avatarPath?: string;
  name: string;
  comments?: IComment[];
}

export interface IComment {
  _id: string;
  comment: string;
  creatorId: string;
  postId: string;
  createdAt: string;
  avatarPath?: string;
  name: string;
  __v: number;
}

export interface IResPost {
  message: string;
  result: IPostRes[];
}

export const getAllPost = async (): Promise<IPostRes[]> => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/posts/getAllPost`);
    const data: IResPost = await response.json();
    return data.result;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

export const createPost = async (postData: IPostRes) => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/posts`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(postData),
  });
  return response.json();
};
