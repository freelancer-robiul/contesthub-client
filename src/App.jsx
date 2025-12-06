// src/App.jsx
import { Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";
import Home from "./Pages/Home/Home";
import AllContests from "./Pages/Contests/AllContests";
import NotFound from "./Pages/Error/NotFound";

function App() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
      <Navbar />

      <main className="flex-1 max-w-6xl mx-auto px-4 pb-10">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/all-contests" element={<AllContests />} />
          {/* future: /contests/:id, /login, /dashboard etc. */}

          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}

export default App;
