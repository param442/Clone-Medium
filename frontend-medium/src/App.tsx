import { useEffect, useState } from "react";

import Navbar from "./componenet/Navbar";
import axios from "axios";
import { BACKEND_URL } from "./Backend_url";
import { Outlet, useNavigate } from "react-router-dom";
import { ThemeProvider } from "./coontext/Blogs";

function App() {
  const Navigate = useNavigate();
  const [data, setData] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("JWT Key");
        console.log(token);
        const res = await axios.get(`${BACKEND_URL}/api/v2/blogs/all`, {
          headers: {
            Authorization: `${token}`,
          },
        });
        if (res.status == 200) {
          console.log("Login status:", res);

          // Set the fetched data in state
          setData(res.data.blogs);
        } else {
          Navigate("/signin");
        }
      } catch (error) {
        console.error("Error fetching login status:", error);
        Navigate("/signin");
      }
    };
    fetchData();
    return () => {
      console.log("hello");
    };
  }, []);
  console.log(data);
  return (
    <>
      <div id="pages" className="h-[100%] w-[100%] overflow-x-hidden">
        <Navbar />
        <ThemeProvider value={data}>
          <Outlet />
        </ThemeProvider>
      </div>
    </>
  );
}

export default App;
