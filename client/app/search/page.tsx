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
    <div>
      {posts.map((each) => (
        <>each.title</>
      ))}
    </div>
  );
}
