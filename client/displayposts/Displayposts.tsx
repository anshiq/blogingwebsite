"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";

function Displayposts() {
  const [displayposts, setdisplayposts] = useState([]);
  useEffect(() => {
    const fetchposts = async () => {
      await axios
        .get("http://localhost:8080/authedUser/displayposts")
        .then((data) => {
          setdisplayposts(data.data.posts);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    fetchposts();
  }, [displayposts]);
  return (
    <>
      {displayposts.map((item: any) => (
        <h2 className="text-black mt-[150rem] text-center"> {item.title}</h2>
      ))}
    </>
  );
}

export default Displayposts;
