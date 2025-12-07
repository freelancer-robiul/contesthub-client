// src/App.jsx
import { Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";
import Home from "./Pages/Home/Home";
import AllContests from "./Pages/Contests/AllContests";
import ContestDetails from "./Pages/Contests/ContestDetails";
import NotFound from "./Pages/Error/NotFound";
import PrivateRoute from "./Routes/PrivateRoute";
import AdminRoute from "./Routes/AdminRoute";

import UserDashboardLayout from "./Layouts/UserDashboardLayout";
import MyParticipatedContests from "./Pages/Dashboard/User/MyParticipatedContests";
import MyWinningContests from "./Pages/Dashboard/User/MyWinningContests";
import MyProfile from "./Pages/Dashboard/User/MyProfile";

import CreatorDashboardLayout from "./Layouts/CreatorDashboardLayout";
import AddContest from "./Pages/Dashboard/Creator/AddContest";
import MyCreatedContests from "./Pages/Dashboard/Creator/MyCreatedContests";
import CreatorSubmissions from "./Pages/Dashboard/Creator/CreatorSubmissions";
import EditContest from "./Pages/Dashboard/Creator/EditContest";

import AdminDashboardLayout from "./Layouts/AdminDashboardLayout";
import ManageUsers from "./Pages/Dashboard/Admin/ManageUsers";
import ManageContests from "./Pages/Dashboard/Admin/ManageContests";

import Login from "./Pages/Auth/Login";
import Register from "./Pages/Auth/Register";

function App() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
      <Navbar />

      <main className="flex-1 max-w-6xl mx-auto px-4 pb-10">
        <Routes>
          {/* Public pages */}
          <Route path="/" element={<Home />} />
          <Route path="/all-contests" element={<AllContests />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

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

          {/* CREATOR DASHBOARD (private) */}
          <Route
            path="/creator-dashboard"
            element={
              <PrivateRoute>
                <CreatorDashboardLayout />
              </PrivateRoute>
            }
          >
            <Route index element={<AddContest />} />
            <Route path="add-contest" element={<AddContest />} />
            <Route path="my-contests" element={<MyCreatedContests />} />
            <Route path="submissions" element={<CreatorSubmissions />} />
            <Route
              path="submissions/:contestId"
              element={<CreatorSubmissions />}
            />
            <Route path="edit/:contestId" element={<EditContest />} />
          </Route>

          {/* ADMIN DASHBOARD (admin private) */}
          <Route
            path="/admin-dashboard"
            element={
              <PrivateRoute>
                <AdminRoute>
                  <AdminDashboardLayout />
                </AdminRoute>
              </PrivateRoute>
            }
          >
            <Route index element={<ManageUsers />} />
            <Route path="users" element={<ManageUsers />} />
            <Route path="contests" element={<ManageContests />} />
          </Route>

          {/* 404 */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}

export default App;
