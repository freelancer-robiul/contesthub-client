// src/App.jsx
import { Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Home from "./Pages/Home/Home";

function App() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <Navbar />

      <main className="max-w-6xl mx-auto px-4 pb-10">
        <Routes>
          <Route path="/" element={<Home />} />

          {/* Placeholder pages for now */}
          <Route
            path="/all-contests"
            element={
              <div className="py-10 text-center text-lg">
                All Contests page coming soon.
              </div>
            }
          />
          <Route
            path="/extras"
            element={
              <div className="py-10 text-center text-lg">
                Extra section content will live here.
              </div>
            }
          />
        </Routes>
      </main>
    </div>
  );
}

export default App;
