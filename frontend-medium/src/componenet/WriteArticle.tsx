import axios from "axios";
import React, { useState } from "react";

const WriteArticle = () => {
  // State variables to hold the title and content values
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  // Function to handle changes in the title input
  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  // Function to handle changes in the content input
  const handleContentChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setContent(event.target.value);
  };

  // Function to handle submission of the form
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    console.log("Title:", title);
    console.log("Content:", content);

    const res: any = await axios({
      url: "https://backend.param1vir4.workers.dev/api/v2/blog",
      method: "post",
      data: {
        Content: content,
        Title: title,
      },
      headers: {
        Authorization: localStorage.getItem("JWT Key"),
      },
    });
    console.log(res);
    setTitle("");
    setContent("");
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-4">Write a Blog Post</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="title" className="block text-gray-700">
            Title:
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={handleTitleChange}
            className="mt-1 p-2 border border-gray-300 rounded-md w-full"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="content" className="block text-gray-700">
            Content:
          </label>
          <textarea
            id="content"
            value={content}
            onChange={handleContentChange}
            className="mt-1 p-2 border border-gray-300 rounded-md w-full"
            rows={6}
            required
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
          Publish
        </button>
      </form>
    </div>
  );
};

export default WriteArticle;
