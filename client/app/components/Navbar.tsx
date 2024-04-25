"use client";
import { axiosFetch, axiosFetchUser } from "@/lib/axiosConfig";
import Link from "next/link";
import React, { useEffect, useState } from "react";
function Navbar() {
  const [toggleNav, setToggleNav] = useState(false);
  const [user, setUser] = useState(null);
  const [isPublisher, setIsPublisher] = useState(false);
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token && user === null) {
      try {
        axiosFetchUser(token)
          .get("/displayname")
          .then((data) => {
            if (data.data.success) {
              setUser(data.data.data);
              setIsPublisher(data.data.data.isPublisher);
              // console.log(data.data.data.isPublisher);
            }
          });
      } catch (error) {
        console.log(error);
      }
    }
  }, []);

  const User = ({ data }: any) => {
    return (
      <button className="text-white p-2 rounded-md bg-gray-900">
        {data.name}
      </button>
    );
  };
  useEffect(() => {
    const handleResize = () => {
      if (
        window.innerWidth >
        40 * parseFloat(getComputedStyle(document.documentElement).fontSize)
      ) {
        setToggleNav(false);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  useEffect(() => {
    if (searchText.length < 1) return;
    axiosFetch
      .post("/search-posts", { text: searchText })
      .then((data) => console.log(data));
  }, [searchText]);

  return (
    <nav className="bg-gray-800 mob:p-4 p-0 w-full">
      <div className="container mx-auto flex justify-between items-center">
        <span className="text-white text-lg font-bold w-[11rem]">
          My Full Project
        </span>
        <div
          className={
            "flex gap-2 bg-gray-800 w-full absolute flex-col p-2 mob:p-0 mob:gap-0 mob:flex-row mob:justify-between mob:static mob:top-auto" +
            (toggleNav
              ? " top-10 transition-top"
              : " top-[-19rem] transition-top")
          }
        >
          <ul className="flex mob:space-x-4 mob:gap-0 gap-2 flex-col items-center justify-center mob:flex-row ">
            <li className="text-white">
              <input
                className="text-black p-2  "
                type="search"
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
              />
            </li>
          </ul>
          <ul className="flex mob:space-x-4 mob:gap-0 gap-2 items-center justify-center flex-col mob:flex-row ">
            {isPublisher && user ? (
              <>
                <li className="text-white">
                  <Link
                    className="p-2 bg-orange-600 rounded-md"
                    href="/admin/panel"
                  >
                    Manage Posts
                  </Link>
                </li>
                <li className="text-white">
                  <Link className="p-2 bg-orange-600 rounded-md" href="/admin">
                    Post Blog
                  </Link>
                </li>
              </>
            ) : (
              user && <></>
            )}
            <li onClick={() => setToggleNav(!toggleNav)} className="text-white">
              {!user ? <a href="/user?type=0">Login</a> : <User data={user} />}
            </li>
            <li onClick={() => setToggleNav(!toggleNav)} className="text-white">
              {!user ? (
                <a href="/user?type=1" className="hover:underline">
                  Signup{" "}
                </a>
              ) : (
                <button
                  onClick={() => {
                    localStorage.clear();
                    localStorage.removeItem("token");
                    window.location.replace("/user?type=0");
                  }}
                  className="p-2 bg-red-600 rounded-md hover:bg-red-400 focus:outline-none focus:ring focus:border-blue-300"
                >
                  Logout
                </button>
              )}
            </li>
          </ul>
        </div>
        <span
          onClick={() => {
            setToggleNav(!toggleNav);
          }}
          className="text-white flex mob:hidden items-center text-4xl justify-center cursor-pointer"
        >
          &#8801;
        </span>
      </div>
    </nav>
  );
}

export default Navbar;
