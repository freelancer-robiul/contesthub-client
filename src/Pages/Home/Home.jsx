// src/Pages/Home/Home.jsx
import Banner from "./Banner";
import PopularContests from "./PopularContests";
import WinnerSection from "./WinnerSection";

const Home = () => {
  return (
    <div className="pt-6 pb-10">
      <Banner />
      <PopularContests />
      <WinnerSection />
      {/* later: Winners section + Extra section */}
    </div>
  );
};

export default Home;
