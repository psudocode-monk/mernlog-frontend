import { useState } from "react";
import { Loader, Eye } from "lucide-react";
import axios from "axios";
import { useNavigate } from "react-router";

function App() {
  const [streakDay, setStreakDay] = useState("");
  const [topicName, setTopicName] = useState("");
  const [projectUrl, setProjectUrl] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!streakDay || !topicName || !projectUrl) {
      setLoading(false);
      return;
    }

    try {
      await axios.post(
        "https://mernlog-backend.vercel.app/api/form",
        {
          streakDay,
          topicName,
          projectUrl,
        },
        { withCredentials: true }
      );

      setStreakDay("");
      setTopicName("");
      setProjectUrl("");
      setLoading(false);

      navigate("/projects");
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen bg-slate-950 text-slate-100 flex items-center justify-center px-4">
      {/* Floating Eye Button */}
      <button
        onClick={() => navigate("/projects")}
        className="absolute bottom-6 right-6 h-14 w-14 rounded-full bg-emerald-500 flex items-center justify-center shadow-lg shadow-emerald-500/30 hover:bg-emerald-400 active:bg-emerald-500 transition cursor-pointer"
      >
        <Eye className="h-7 w-7 text-slate-950" />
      </button>

      <div className="w-full max-w-md bg-slate-900/80 border border-emerald-500/30 rounded-2xl shadow-xl p-6 sm:p-8 backdrop-blur">
        <header className="mb-6 text-center">
          <p className="inline-flex items-center gap-1 rounded-full border border-emerald-500/40 bg-emerald-500/10 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.2em] text-emerald-300">
            Daily MERN Log
          </p>
          <h1 className="mt-3 text-2xl sm:text-3xl font-semibold">
            React & MERN Features
          </h1>
          <p className="mt-2 text-sm text-slate-400">
            Track your streak, topic, and project URL in one place.
          </p>
        </header>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-slate-200">
              Streak Day
            </label>
            <input
              type="text"
              placeholder="eg. 06, 07"
              onChange={(e) => setStreakDay(e.target.value)}
              value={streakDay}
              className="w-full rounded-xl bg-slate-950/70 border border-slate-700 px-4 py-2.5 text-sm sm:text-base placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-sm font-medium text-slate-200">
              Topic Name
            </label>
            <input
              type="text"
              placeholder="eg. Context API"
              onChange={(e) => setTopicName(e.target.value)}
              value={topicName}
              className="w-full rounded-xl bg-slate-950/70 border border-slate-700 px-4 py-2.5 text-sm sm:text-base placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-sm font-medium text-slate-200">
              Project URL
            </label>
            <input
              type="text"
              placeholder="eg. https://vercel.com/contextAPI"
              onChange={(e) => setProjectUrl(e.target.value)}
              value={projectUrl}
              className="w-full rounded-xl bg-slate-950/70 border border-slate-700 px-4 py-2.5 text-sm sm:text-base placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition"
            />
          </div>

          <button
            type="submit"
            className="mt-2 w-full inline-flex items-center justify-center rounded-xl bg-emerald-500 px-4 py-2.5 text-sm sm:text-base font-semibold text-slate-950 shadow-lg shadow-emerald-500/30 hover:bg-emerald-400 active:bg-emerald-500 transition cursor-pointer"
          >
            {loading ? <Loader className="animate-spin" /> : "Save"}
          </button>
        </form>

        <footer className="mt-8 border-t border-slate-800 pt-4 text-center text-xs text-slate-500">
          &copy; 2025 |{" "}
          <span className="font-medium text-slate-300">Avishek Sadhukhan</span>{" "}
          | All rights reserved.
        </footer>
      </div>
    </div>
  );
}

export default App;
