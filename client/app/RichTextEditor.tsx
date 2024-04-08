"use client";
import MonacoEditor from "@monaco-editor/react";
import React, { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

import styled from "styled-components";

const RichTextEditor = () => {
  const [value, setValue] = useState("");
  const [selected, setSelected] = useState("");

  useEffect(() => {
    const browser = document.getElementById("browser");
    if (browser) {
      browser.innerHTML = value;
    }
  }, [value]);

  return (
    <div className="flex h-screen">
      <div className="w-1/2 p-4 bg-gray-100 rounded-lg shadow-md">
        <div className="mb-4 flex flex-row justify-between">
          <div>
            <button
              type="button"
              onClick={() => setSelected("code")}
              className="px-4 py-2 mr-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Code
            </button>
            <button
              type="button"
              onClick={() => setSelected("markdown")}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Markdown
            </button>
          </div>
          <button className="px-4 py-2 mr-2 bg-green-500 text-white rounded hover:bg-green-600">
            Refresh
          </button>
        </div>
        {selected === "code" ? (
          <CodeSelection setValue={setValue} value={value} />
        ) : (
          <QuilSection setValue={setValue} value={value} />
        )}
      </div>
      <div
        id="browser"
        className="w-1/2 p-4 bg-white rounded-lg shadow-md overflow-auto"
      ></div>
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
        height="100%"
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
