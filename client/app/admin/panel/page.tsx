"use client";

import { axiosFetchAdmin } from "@/lib/axiosConfig";
import React, { useEffect, useState } from "react";
import { FaTrashAlt } from "react-icons/fa";

type Props = {};

export default function page({}: Props) {
  return (
    <div>
      <Posts />
    </div>
  );
}

const Posts = () => {
  const [posts, setPosts] = useState([]);
  const [refetch, setRefetch] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token") || "";
    axiosFetchAdmin(token)
      .get("/get-admin-posts")
      .then((data) => setPosts(data.data));
  }, [refetch]);

  const handleDelete = (id: string) => {
    const token = localStorage.getItem("token") || "";
    axiosFetchAdmin(token)
      .post("/deletePost", { id: id })
      .then((data) => {
        // alert(data.status);
        setRefetch(!refetch);
      });
  };
  return (
    <div className="grid grid-cols-1 gap-4 p-4 md:grid-cols-2 lg:grid-cols-3">
      {posts.map((each) => (
        <div
          key={each._id}
          className="rounded-lg bg-white p-4 shadow-md hover:shadow-lg"
        >
          <h2 className="mb-2 text-lg font-bold">{each.title}</h2>
          <p className="mb-4 text-gray-700">{each.description}</p>
          <div className="flex justify-end">
            <button
              onClick={() => handleDelete(each._id)}
              className="text-red-500 hover:text-red-700"
            >
              <FaTrashAlt />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};
