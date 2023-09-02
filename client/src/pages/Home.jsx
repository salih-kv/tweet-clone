import Header from "../components/Header";
import ProfileCard from "../components/ProfileCard";
import TweetInput from "../components/TweetInput";
import { Tweet } from "../components/Tweet";

const Home = () => {
  return (
    <div className="bg-[#06141D] text-white w-full min-h-screen transition-all px-2 md:px-8 pb-4">
      <div className="max-w-6xl m-auto">
        <Header />

        <main className="flex md:gap-4 w-full">
          <div>
            <ProfileCard />
          </div>
          <div className="w-full flex flex-col gap-4">
            <TweetInput />
            <Tweet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default Home;
