// ArticlePage.js
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const ArticlePage = () => {
  const { id } = useParams(); // Get the id parameter from the URL
  const [article, setArticle] = useState(null);

  useEffect(() => {
    // Fetch the article data from your API based on the id
    const fetch = async () => {
      const res: any = await axios({
        method: "get",
        url: `https://backend.param1vir4.workers.dev/api/v2/blog/${id}`,
        headers: {
          Authorization: localStorage.getItem("JWT Key"),
        },
      });
      console.log(res);
      setArticle(res.data);
    };

    fetch();
  }, [id]);

  if (!article) {
    return <div>Loading...</div>;
  }
  const { Title, content } = article;
  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">{Title}</h1>
      <p className="text-lg leading-relaxed">{content}</p>
    </div>
  );
};

export default ArticlePage;
