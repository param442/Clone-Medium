import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { RxCross2 } from "react-icons/rx";
const Navbar = () => {
  const Navigate = useNavigate();
  const [content, setContent] = useState("");
  const [IsFill, setIsFill] = useState(false);

  const handleChange = (e: any) => {
    setContent(e.target.value);
    setIsFill(true);
  };

  const clearContent = () => {
    setContent("");
    setIsFill(false);
  };
  const handleSubmit = (e: any) => {
    if (e.key === "Enter" && !e.shiftKey) {
      console.log(content);
      e.preventDefault();
    }
  };

  return (
    <div className="flex justify-between mx-3 my-2 h-[5%]">
      <section className="h-[5vmin] flex justify-center">
        <Link to="/">
          <svg
            className="h-full cursor-pointer mr-2"
            viewBox="0 0 1043.63 592.71">
            <g data-name="Layer 2">
              <g data-name="Layer 1">
                <path d="M588.67 296.36c0 163.67-131.78 296.35-294.33 296.35S0 460 0 296.36 131.78 0 294.34 0s294.33 132.69 294.33 296.36M911.56 296.36c0 154.06-65.89 279-147.17 279s-147.17-124.94-147.17-279 65.88-279 147.16-279 147.17 124.9 147.17 279M1043.63 296.36c0 138-23.17 249.94-51.76 249.94s-51.75-111.91-51.75-249.94 23.17-249.94 51.75-249.94 51.76 111.9 51.76 249.94"></path>
              </g>
            </g>
          </svg>
        </Link>

        <div id="search" className="w-[20vw] h-full flex items-center relative">
          <input
            type="text"
            value={content}
            onChange={handleChange}
            onKeyDown={handleSubmit}
            className="border-black rounded-3xl border-[1px] outline-none bg-slate-100 p-2 w-[100%] h-full flex"
            placeholder="Type here..."
          />

          {IsFill && (
            <button
              className="absolute right-2 top-1/2 transform -translate-y-1/2"
              onClick={clearContent}>
              <RxCross2 />
            </button>
          )}
        </div>
      </section>
      <div>
        <section className="flex gap-10 items-center ">
          <div
            className="flex cursor-pointer gap-1 hover:text-black text-slate-600"
            onClick={() => {
              Navigate("post");
            }}>
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              aria-label="Write">
              <path
                d="M14 4a.5.5 0 0 0 0-1v1zm7 6a.5.5 0 0 0-1 0h1zm-7-7H4v1h10V3zM3 4v16h1V4H3zm1 17h16v-1H4v1zm17-1V10h-1v10h1zm-1 1a1 1 0 0 0 1-1h-1v1zM3 20a1 1 0 0 0 1 1v-1H3zM4 3a1 1 0 0 0-1 1h1V3z"
                fill="currentColor"></path>
              <path
                d="M17.5 4.5l-8.46 8.46a.25.25 0 0 0-.06.1l-.82 2.47c-.07.2.12.38.31.31l2.47-.82a.25.25 0 0 0 .1-.06L19.5 6.5m-2-2l2.32-2.32c.1-.1.26-.1.36 0l1.64 1.64c.1.1.1.26 0 .36L19.5 6.5m-2-2l2 2"
                stroke="currentColor"></path>
            </svg>
            <div>Write</div>
          </div>
          <div
            id="Notifications"
            className="hover:text-black text-slate-600 cursor-pointer">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              aria-label="Notifications">
              <path d="M15 18.5a3 3 0 1 1-6 0" stroke="currentColor"></path>
              <path
                d="M5.5 10.53V9a6.5 6.5 0 0 1 13 0v1.53c0 1.42.56 2.78 1.57 3.79l.03.03c.26.26.4.6.4.97v2.93c0 .14-.11.25-.25.25H3.75a.25.25 0 0 1-.25-.25v-2.93c0-.37.14-.71.4-.97l.03-.03c1-1 1.57-2.37 1.57-3.79z"
                stroke="currentColor"></path>
            </svg>
          </div>
          <div id="users">
            <span className="bg-red-500 p-4 flex rounded-[50%]"></span>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Navbar;
