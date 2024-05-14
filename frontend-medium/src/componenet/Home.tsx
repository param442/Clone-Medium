import Leftdiv from "./HomeComponent/Leftdiv";
import Rightdiv from "./HomeComponent/Rightdiv";

const Home = () => {
  return (
    <div className="flex w-[100vw] h-[100%] overflow-auto scrollbar-invisible ">
      <Leftdiv />
      <Rightdiv />
    </div>
  );
};

export default Home;
