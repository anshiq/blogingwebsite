"use client";
import { useState, useEffect } from "react";
import { axiosFetch } from "@/lib/axiosConfig";

function Page({ params }: any) {
  const [post, setPost] = useState<any>(null);

  useEffect(() => {
    if(post !=null) return;
    const fetchPost = async () => {
      try {
        const response = await axiosFetch.post("/get-one-post", {
          postId: params.postId,
        });
        setPost(response.data);
      } catch (error) {
        console.error("Error fetching post:", error);
      }
    };
    fetchPost();
  }, [params.postId]);

  return (
    <div className="container mx-auto px-4 py-8 border border-black my-2 h-full">
      {post ? (
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
          <p className="text-gray-600 mb-4">{post.description}</p>
          <img
            src={process.env.backendUrl + "/static/" + post.thumbnail}
            alt={post.title}
            className="mb-4 rounded-lg shadow-lg"
          />
          <div
            className="prose max-w-none no-tailwindcss "
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default Page;
