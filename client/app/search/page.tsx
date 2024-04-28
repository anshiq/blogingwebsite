"use client";
import { axiosFetch } from "@/lib/axiosConfig";
import React, { useEffect, useState } from "react";

export default function Page(props: any) {
  const searchText = props.searchParams.text;
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    if (searchText.length < 1) return;
    axiosFetch
      .post("/search-posts", { text: searchText })
      .then((data) => setPosts(data.data));
  }, [searchText]);

  return (
    <div className="container mx-auto py-8">
      <div className="grid grid-cols-1">
        {posts.map((each, index) => (
          <div
            key={index}
            className="flex flex-col md:flex-row bg-white rounded-lg shadow-md mb-6"
          >
            <img
              src={process.env.backendUrl + "/static/" + each.thumbnail}
              alt={each.title}
              className="w-full md:w-1/3 h-auto"
            />
            <div className="p-6 md:w-2/3">
              <h2 className="text-xl font-semibold mb-2">{each.title}</h2>
              <p className="text-gray-600 mb-4">{each.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
