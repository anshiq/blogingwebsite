"use client";
import { axiosFetchAdmin } from "@/lib/axiosConfig";
import MonacoEditor from "@monaco-editor/react";
import React, { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import styled from "styled-components";
import { showNotification } from "@/lib/Notification";

const RichTextEditor = () => {
  const [value, setValue] = useState("");
  const [selected, setSelected] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState();

  useEffect(() => {
    const browser = document.getElementById("browser");
    if (browser) {
      browser.innerHTML = value;
    }
  }, [value]);
  const handleSubmit = async () => {
    const token = localStorage.getItem("token") || "";
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("content", value);
    formData.append("image", image);
    const k = await axiosFetchAdmin(token).post("/createPost", formData);
    console.log(k.data);
    if (k.status === 201) {
      showNotification({ text: k.data.message, color: "green" });
      // alert(k.data.message);
    } else {
      showNotification({ text: "errr while posting", color: "red" });
    }
  };

  return (
    <div className="flex flex-col md:flex-row gap-4 p-4 bg-white">
      <div className="flex-1">
        <div className="mb-4">
          <label className="block font-bold mb-2">Title</label>
          <input
            type="text"
            className="w-full border border-gray-300 rounded-md p-2"
            onChange={(e) => setTitle(e.target.value)}
          />
          <label className="block font-bold mb-2 mt-4">Meta description</label>
          <textarea
            className="w-full border border-gray-300 rounded-md p-2 h-20"
            onChange={(e) => setDescription(e.target.value)}
          />
          <label className="block font-bold mb-2 mt-4">Thumbnail</label>
          <input
            type="file"
            accept="image/*"
            required
            onChange={(e) => setImage(e.target.files[0])}
          />
        </div>
        <div className="mb-4 flex justify-between">
          <div>
            <button
              type="button"
              onClick={() => setSelected("code")}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
            >
              Code
            </button>
            <button
              type="button"
              onClick={() => setSelected("markdown")}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
            >
              Markdown
            </button>
            <button
              type="button"
              onClick={() => handleSubmit()}
              className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded mr-2"
            >
              Post Blog
            </button>
          </div>
          <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
            Refresh
          </button>
        </div>
        {selected === "code" ? (
          <CodeSelection setValue={setValue} value={value} />
        ) : (
          <QuilSection setValue={setValue} value={value} />
        )}
      </div>

      <div className="flex-1  overflow-y-scroll shadow-black h-[90vh] shadow border-gray-300 rounded-md p-4 ml-2">
        <label className="w-full">Preview Tab (No tailwind applied)</label>
        <div
          id="browser"
          style={{ width: "100%" }}
          className="no-tailwindcss"
        ></div>
      </div>
    </div>
  );
};

const CodeSelection = ({ setValue, value }: any) => {
  const [editorValue, setEditorValue] = useState(value);

  useEffect(() => {
    setEditorValue(value);
  }, [value]);

  const handleEditorChange = (newValue: string) => {
    setEditorValue(newValue);
    setValue(newValue);
  };

  return (
    <EditorStyled>
      <MonacoEditor
        height="60vh"
        width="100%"
        language={"html"}
        theme="vs-dark"
        value={editorValue}
        options={{
          fontSize: 16,
          fontFamily: "Fira Code",
          minimap: {
            enabled: false,
          },
          scrollbar: {
            vertical: "hidden",
            horizontal: "hidden",
          },
        }}
        onChange={handleEditorChange}
      />
    </EditorStyled>
  );
  // return (
  //   <MonacoEditor
  //     height="500"
  //     language="html"
  //     value={editorValue}
  //     onChange={handleEditorChange}
  //   />
  // );
};

const QuilSection = ({ setValue, value }: any) => {
  const [quilValue, setQuilValue] = useState(value);

  useEffect(() => {
    setQuilValue(value);
  }, [value]);

  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      [{ font: [] }],
      [{ size: [] }],
      ["bold", "italic", "underline", "strike"],
      [{ color: [] }, { background: [] }],
      [{ script: "sub" }, { script: "super" }],
      ["blockquote", "code-block"],
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" },
      ],
      [{ direction: "rtl" }],
      [{ align: [] }],
      ["link", "image", "video"],
      ["clean"],
    ],
  };

  const formats = [
    "header",
    "font",
    "size",
    "bold",
    "italic",
    "underline",
    "strike",
    "color",
    "background",
    "script",
    "blockquote",
    "code-block",
    "list",
    "indent",
    "direction",
    "align",
    "link",
    "image",
    // "video",
  ];

  return (
    <div
      onMouseLeave={() => {
        setValue(quilValue);
      }}
    >
      <ReactQuill
        theme="snow"
        value={quilValue}
        onChange={(e) => {
          setQuilValue(`${e}`);
        }}
        modules={modules}
        formats={formats}
        className="h-96"
      />
    </div>
  );
};
const EditorStyled = styled.div`
  min-height: 0px;
  height: 100%;
  flex-grow: 1;
  /* background-color: black; */
`;
export default RichTextEditor;
