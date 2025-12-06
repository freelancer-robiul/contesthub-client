// src/App.jsx
import { Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";
import Home from "./Pages/Home/Home";
import AllContests from "./Pages/Contests/AllContests";
import ContestDetails from "./Pages/Contests/ContestDetails";
import NotFound from "./Pages/Error/NotFound";
import PrivateRoute from "./Routes/PrivateRoute";
import UserDashboardLayout from "./Layouts/UserDashboardLayout";
import MyParticipatedContests from "./Pages/Dashboard/User/MyParticipatedContests";
import MyWinningContests from "./Pages/Dashboard/User/MyWinningContests";
import MyProfile from "./Pages/Dashboard/User/MyProfile";

function App() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
      <Navbar />

      <main className="flex-1 max-w-6xl mx-auto px-4 pb-10">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/all-contests" element={<AllContests />} />

          {/* Contest details (private) */}
          <Route
            path="/contests/:id"
            element={
              <PrivateRoute>
                <ContestDetails />
              </PrivateRoute>
            }
          />

          {/* USER DASHBOARD (private) */}
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <UserDashboardLayout />
              </PrivateRoute>
            }
          >
            <Route index element={<MyParticipatedContests />} />
            <Route path="participated" element={<MyParticipatedContests />} />
            <Route path="winnings" element={<MyWinningContests />} />
            <Route path="profile" element={<MyProfile />} />
          </Route>

          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}

export default App;
