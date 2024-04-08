import React, { useState } from "react";

function page() {
  const [name, setName] = useState();
  return (
    <div>
      <h1>Welcome to our Blogging Website</h1>
      <label>ENter your name</label>
      <input/>
    </div>
  );
}

export default page;
