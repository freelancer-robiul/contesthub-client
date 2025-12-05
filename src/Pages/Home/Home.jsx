// src/Pages/Home/Home.jsx
import Banner from "./Banner";
import PopularContests from "./PopularContests";

const Home = () => {
  return (
    <div className="pt-6 pb-10">
      <Banner />
      <PopularContests />
      {/* later: Winners section + Extra section */}
    </div>
  );
};

export default Home;
