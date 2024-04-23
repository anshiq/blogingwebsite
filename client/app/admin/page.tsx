import React from "react";
import RichTextEditor from "./RichTextEditor";

type Props = {};

function page({}: Props) {
  return (
    <div className="bg-white">
      <RichTextEditor />
    </div>
  );
}

export default page;
