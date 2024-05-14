const Cards = (props: any) => {
  const { ...post } = props;
  const val = post;
  return (
    <div className="flex border-b-[1px] border-b-black mb-4 gap-3 ">
      <div className="h-[100%] laptop:w-[65%]  w-[100%] text-wrap">
        <nav className=" gap-2 h-[20%] flex items-center">
          {" "}
          <span className=" p-3 ml-2 cursor-pointer rounded-[50%] relative">
            <img
              src={
                val.userImg
                  ? val.userImg
                  : "https://imgs.search.brave.com/NNDzju6v-Wyn4jcVbOHom6Cea3R6UwnbfsmzU-P6HnU/rs:fit:500:0:0/g:ce/aHR0cHM6Ly93d3cu/aW1nbG9iYWwuY29t/L2ltYWdlcy9saWJy/YXJ5L3N1cHBvcnRp/bmctaW1hZ2VzL3Ry/aXAtY3RhLWltZy5w/bmc"
              }
              className="object-cover h-full w-full absolute rounded-[50%] top-[0%] left-[0%] "
              alt="Profile"
            />
          </span>
          <h6>{val.date}</h6>
        </nav>
        <div id="content" className="mt-2">
          <h1 className="text-xl font-bold capitalize">
            {val.Title.length > 50
              ? val.Title.substring(0, 10) + "..."
              : val.title}
          </h1>
          <p className=" text-base mb-10">
            {" "}
            {val.content.length > 250
              ? val.content.substring(0, 200) + "..."
              : val.content}
          </p>

          <footer className="mb-3">
            <h1 className="  font-bold">{val.username}</h1>
          </footer>
        </div>
      </div>
      <div className=" laptop:flex hidden w-[35%]  h-[100%]  items-center justify-center mt-6 ">
        <div className="bg-blue-900 h-[8vw] w-[10vw] ">
          <img
            src={
              val.contentImg
                ? val.contentImg
                : "https://imgs.search.brave.com/NNDzju6v-Wyn4jcVbOHom6Cea3R6UwnbfsmzU-P6HnU/rs:fit:500:0:0/g:ce/aHR0cHM6Ly93d3cu/aW1nbG9iYWwuY29t/L2ltYWdlcy9saWJy/YXJ5L3N1cHBvcnRp/bmctaW1hZ2VzL3Ry/aXAtY3RhLWltZy5w/bmc"
            }
            alt=""
            className=" object-cover w-full h-full"
          />
        </div>
      </div>
    </div>
  );
};

export default Cards;
