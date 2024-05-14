import { Link } from "react-router-dom";
import useTheme from "../../coontext/Blogs";
import Cards from "./Cards";

type tags = {
  id: number | string;
  tag: string;
};

const tags: tags[] = [
  {
    id: 1,
    tag: "forYou",
  },
  {
    id: 2,
    tag: "following",
  },
];

type Post = {
  id: number;
  userImg?: string;
  username: string;
  title: string;
  content: string;
  contentImg?: string;
  date: string;
};

const Leftdiv = () => {
  const data: any = useTheme();

  // Check if data is an array and if it's empty

  // Assuming data contains posts
  const posts: any = data;
  if (!Array.isArray(data)) {
    return <div>Wait for few seconds</div>;
  }
  console.log(posts);
  return (
    <div className="laptop:w-[70%] w-[100%] h-full  overflow-auto scrollbar-invisible">
      <div className=" w-full h-[10%] pt-4 pl-4 pr-4">
        <div className=" border-b-black border-b-[1.5px] w-full h-[100%] flex items-end gap-1">
          {tags.map((tag) => (
            <span
              key={tag.id}
              className="text-xl capitalize mb-1 mr-5  hover:font-bold duration-100 cursor-pointer ">
              {tag.tag}
            </span>
          ))}
        </div>
      </div>
      <div className="h-[90%] pt-7 pl-7 flex flex-col gap-2">
        {posts.map((post: Post, index: number) => (
          <Link to={`/blog/${post.id}`} key={index}>
            <Cards {...post} />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Leftdiv;
