"use client";
import React, { useState } from "react";
import axios from "axios";
function page() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [publisher, setispublisher] = useState(false);
  const handlesignup = async () => {
    try {
      const res = await axios.post("http://localhost:8080/user/signup", {
        name: name,
        email: email,
        passwod: pass,
        ispublisher: publisher,
      });
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-black">
      <div className="flex flex-col items-center justify-center h-[40rem] font-serif shadow-md shadow-black w-[50rem] gap-4 bg-white p-8 rounded-lg">
        <h1 className="text-4xl mb-[5rem] text-center">
          Welcome to our Blogging Website
        </h1>
        <div className="flex flex-col gap-6 w-full">
          <div className="flex flex-col">
            <label className="text-xl mb-1">Enter your name</label>
            <input
              className="text-black rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 border-black border"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
          </div>
          <div className="flex flex-col">
            <label className="text-xl mb-1">Enter Your email</label>
            <input
              className="text-black rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 border-black border"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
          </div>
          <div className="flex flex-col">
            <label className="text-xl mb-1">Enter Your Password</label>
            <input
              className="text-black border-black border rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={pass}
              onChange={(e) => {
                setPass(e.target.value);
              }}
            />
          </div>
          <div>
            {publisher ? (
              <>
                <input
                  type="checkbox"
                  checked={true}
                  onChange={() => {
                    setispublisher(!publisher);
                  }}
                />
                Publisher
              </>
            ) : (
              <>
                <input
                  type="checkbox"
                  checked={false}
                  onChange={() => {
                    setispublisher(!publisher);
                  }}
                />
                Publisher
              </>
            )}
          </div>
          <button
            onClick={() => {
              handlesignup;
            }}
          >
            Sign up
          </button>
        </div>
      </div>
    </div>
  );
}

export default page;
