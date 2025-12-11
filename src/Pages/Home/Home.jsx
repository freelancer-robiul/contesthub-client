// src/Pages/Home/Home.jsx
import Banner from "./Banner";
import PopularContests from "./PopularContests";
import WinnerSection from "./WinnerSection";
import ExtraSection from "./ExtraSection";

const Home = () => {
  return (
    <div className="mt-2 space-y-6">
      <Banner />
      <PopularContests />
      <WinnerSection />
      <ExtraSection />
    </div>
  );
};

export default Home;
