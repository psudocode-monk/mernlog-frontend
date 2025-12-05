import { useEffect, useState } from "react";
import axios from "axios";
import { Loader, Search, AlertCircle, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router";
import ProjectCard from "./ProjectCard";

function Projects() {
  const [projects, setProjects] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        setError("");
        const res = await axios.get(
          "https://mernlog-backend.vercel.app/api/projects",
          {
            withCredentials: true,
          }
        );
        console.log(res.data);
        setProjects(res.data || []);
      } catch (err) {
        console.error(err);
        setError("Failed to load projects");
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  const normalizedSearch = search.trim().toLowerCase();

  const filteredProjects = projects.filter((project) => {
    if (!normalizedSearch) return true;

    const topic = project.topicName?.toLowerCase() || "";
    const day = String(project.streakDay || "").toLowerCase();

    return topic.includes(normalizedSearch) || day.includes(normalizedSearch);
  });

  return (
    <div className="relative min-h-screen bg-slate-950 text-slate-100 px-4 py-8 pt-20">
      {/* Back Button */}
      <button
        onClick={() => navigate("/")}
        className="absolute top-6 left-6 h-12 w-12 rounded-full bg-slate-900/80 border border-slate-700 flex items-center justify-center shadow-lg hover:border-emerald-500 hover:shadow-emerald-500/20 transition cursor-pointer"
      >
        <ArrowLeft className="h-6 w-6 text-emerald-400" />
      </button>

      <div className="mx-auto flex w-full max-w-5xl flex-col gap-6">
        {/* Header */}
        <header className="space-y-2">
          <p className="inline-flex items-center gap-1 rounded-full border border-emerald-500/40 bg-emerald-500/10 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.25em] text-emerald-300">
            Projects
          </p>
          <h1 className="text-2xl sm:text-3xl font-semibold">
            Oh my <span className="text-emerald-400">projects</span>
          </h1>
          <p className="text-sm text-slate-400">
            Browse all saved days. Search by{" "}
            <span className="font-medium text-slate-200">topic name</span> or{" "}
            <span className="font-medium text-slate-200">streak day</span>.
          </p>
        </header>

        {/* Search */}
        <div className="w-full max-w-md">
          <div className="relative">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by topic or day (e.g. 'Context API', '06')"
              className="w-full rounded-xl bg-slate-900/80 border border-slate-700 pl-9 pr-10 py-2.5 text-sm placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition"
            />
            {search && (
              <button
                type="button"
                onClick={() => setSearch("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-200"
              >
                clear
              </button>
            )}
          </div>
        </div>

        {/* Content */}
        {loading ? (
          <div className="flex flex-1 items-center justify-center py-16">
            <Loader className="h-8 w-8 animate-spin text-emerald-400" />
          </div>
        ) : error ? (
          <div className="flex items-center gap-2 rounded-xl border border-red-500/40 bg-red-500/10 px-4 py-3 text-sm text-red-200">
            <AlertCircle className="h-4 w-4" />
            <span>{error}</span>
          </div>
        ) : filteredProjects.length === 0 ? (
          <div className="mt-6 rounded-2xl border border-slate-800 bg-slate-900/70 px-6 py-10 text-center text-sm text-slate-400">
            No projects found
            {projects.length > 0 && search && <span> for “{search}”</span>}. Try
            a different day or topic name.
          </div>
        ) : (
          <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {filteredProjects.map((project, index) => (
              <ProjectCard
                key={project._id || project.id || index}
                streakDay={project.streakDay}
                topicName={project.topicName}
                projectUrl={project.projectUrl}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Projects;
