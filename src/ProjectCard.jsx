function ProjectCard({ streakDay, topicName, projectUrl }) {
  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-4 sm:p-5 shadow-lg hover:border-emerald-500/60 hover:shadow-emerald-500/20 transition">
      <div className="mb-3 flex items-center justify-between gap-2">
        <span className="text-[11px] font-semibold uppercase tracking-[0.25em] text-emerald-300">
          Day {streakDay}
        </span>
        <a
          href={projectUrl}
          target="_blank"
          rel="noreferrer"
          className="text-xs font-medium text-emerald-400 underline-offset-4 hover:text-emerald-300 hover:underline"
        >
          View
        </a>
      </div>

      <h2 className="mb-1 text-lg font-semibold text-slate-50 line-clamp-2">
        {topicName}
      </h2>

      <p className="text-xs text-slate-400 break-all">{projectUrl}</p>
    </div>
  );
}

export default ProjectCard;
