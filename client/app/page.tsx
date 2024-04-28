"use client";

import { axiosFetch, axiosFetchUser } from "@/lib/axiosConfig";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Home() {
  const [Posts, setPosts] = useState([]);
  const [ReadLater, setReadLater] = useState([]);
  useEffect(() => {
    axiosFetch.get("/fetch-posts").then((data) => setPosts(data.data));
  }, []);
  useEffect(() => {
    const token = localStorage.getItem("token") || "";
    if (token != "") {
      axiosFetchUser(token)
        .get("/read-later-post")
        .then((data) => setReadLater(data.data));
    }
  }, []);
  const addToReadLate = async (id) => {
    const token = localStorage.getItem("token") || "";
    if (token != "") {
      axiosFetchUser(token)
        .post("/addToReadLater", { postId: id })
        .then((data) => setReadLater((prev) => [...prev, data.data.post]));
    }
  };
  return (
    <>
      <div className="container mx-auto py-8">
        <div className="flex flex-row gap-2 ">
          {ReadLater.map((each: any) => (
            <>
              <Link
                href={"/readpost/" + each._id}
                key={each._id}
                className="bg-white rounded-lg shadow-md overflow-hidden flex flex-row"
              >
                <img
                  src={process.env.backendUrl + "/static/" + each.thumbnail}
                  alt={each.title}
                  className="w-full h-40 object-cover"
                />
                <div className="p-4">
                  <h2 className="text-xl font-semibold mb-2">{each.title}</h2>
                  <p className="text-gray-600">{each.description}</p>
                </div>
              </Link>
            </>
          ))}
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {Posts.map((post: any) => (
            <Link
              href={"/readpost/" + post._id}
              key={post._id}
              className="bg-white rounded-lg shadow-md overflow-hidden"
            >
              <img
                src={process.env.backendUrl + "/static/" + post.thumbnail}
                alt={post.title}
                className="w-full h-40 object-cover"
              />
              <div className="p-4">
                <h2 className="text-xl font-semibold mb-2">{post.title}</h2>
                <p className="text-gray-600">{post.description}</p>
                <button
                  onClick={() => {
                    addToReadLate(post._id);
                  }}
                  className="text-gray-600"
                >
                  Read Later
                </button>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}
