"use client";

import { useState } from "react";

type College = {
  name: string;
  icon: string;
  branch: string;
  averagePackage: string;
  fees: string;
  closingRank: number;
  instituteType: "NIT" | "IIIT" | "GFTI";
  categories: Array<"General" | "OBC" | "EWS" | "SC" | "ST">;
  genders: Array<"Male" | "Female">;
};

const colleges: College[] = [
  {
    name: "NIT Surathkal",
    icon: "🏛️",
    branch: "Computer Science and Engineering",
    averagePackage: "INR 26 LPA",
    fees: "INR 7.8 Lakhs",
    closingRank: 6850,
    instituteType: "NIT",
    categories: ["General", "OBC", "EWS", "SC", "ST"],
    genders: ["Male", "Female"],
  },
  {
    name: "IIIT Hyderabad",
    icon: "⚙️",
    branch: "Electronics and Communication Engineering",
    averagePackage: "INR 29 LPA",
    fees: "INR 12 Lakhs",
    closingRank: 9500,
    instituteType: "IIIT",
    categories: ["General", "OBC", "EWS"],
    genders: ["Male", "Female"],
  },
  {
    name: "NIT Trichy",
    icon: "🔬",
    branch: "Electrical and Electronics Engineering",
    averagePackage: "INR 18 LPA",
    fees: "INR 8.1 Lakhs",
    closingRank: 14200,
    instituteType: "NIT",
    categories: ["General", "OBC", "EWS", "SC", "ST"],
    genders: ["Male", "Female"],
  },
  {
    name: "IIIT Allahabad",
    icon: "💻",
    branch: "Information Technology",
    averagePackage: "INR 24 LPA",
    fees: "INR 9.6 Lakhs",
    closingRank: 11800,
    instituteType: "IIIT",
    categories: ["General", "OBC", "EWS", "SC"],
    genders: ["Male", "Female"],
  },
  {
    name: "NIT Warangal",
    icon: "⚡",
    branch: "Mechanical Engineering",
    averagePackage: "INR 14 LPA",
    fees: "INR 8.4 Lakhs",
    closingRank: 19500,
    instituteType: "NIT",
    categories: ["General", "OBC", "EWS", "SC", "ST"],
    genders: ["Male", "Female"],
  },
  {
    name: "NIT Calicut",
    icon: "🧪",
    branch: "Civil Engineering",
    averagePackage: "INR 12 LPA",
    fees: "INR 7.4 Lakhs",
    closingRank: 24500,
    instituteType: "NIT",
    categories: ["General", "OBC", "EWS", "SC", "ST"],
    genders: ["Male", "Female"],
  },
  {
    name: "Assam University Silchar",
    icon: "📘",
    branch: "Agricultural Engineering",
    averagePackage: "INR 8 LPA",
    fees: "INR 4.8 Lakhs",
    closingRank: 33200,
    instituteType: "GFTI",
    categories: ["General", "OBC", "EWS", "SC", "ST"],
    genders: ["Male", "Female"],
  },
];

const quickStats = [
  { label: "Predictions Generated", value: "120K+" },
  { label: "Counseling Data Points", value: "2.8M+" },
  { label: "Student Satisfaction", value: "98%" },
  { label: "Institutes Covered", value: "200+" },
];

const trustedBy = [
  "Top Rankers",
  "Droppers",
  "12th Graders",
  "Mentors",
  "Counseling Communities",
];

function getBranchPriority(branch: string): number {
  const b = branch.toLowerCase();
  if (
    b.includes("computer science") ||
    b.includes("information technology") ||
    /\bit\b/.test(b) ||
    b.includes("artificial intelligence") ||
    /\bai\b/.test(b) ||
    b.includes("machine learning") ||
    /\bml\b/.test(b) ||
    b.includes("data science")
  ) {
    return 1;
  }
  if (
    b.includes("electronics") ||
    b.includes("electrical") ||
    b.includes("instrumentation")
  ) {
    return 2;
  }
  if (
    b.includes("mechanical") ||
    b.includes("civil") ||
    b.includes("chemical")
  ) {
    return 3;
  }
  return 4;
}

export default function Home() {
  const [activeTab, setActiveTab] = useState<"percentile" | "rank">(
    "percentile"
  );
  const [percentile, setPercentile] = useState("");
  const [rank, setRank] = useState("");
  const [category, setCategory] = useState<
    "General" | "OBC" | "EWS" | "SC" | "ST"
  >("General");
  const [gender, setGender] = useState<"Male" | "Female">("Male");
  const [instituteType, setInstituteType] = useState<"NIT" | "IIIT" | "GFTI">(
    "NIT"
  );

  const parsedPercentile = Number(percentile.trim());
  const parsedRank = Number(rank.replace(/\D/g, ""));
  const isPercentileValid =
    Number.isFinite(parsedPercentile) &&
    parsedPercentile >= 0 &&
    parsedPercentile <= 100;
  const estimatedRankFromPercentile = isPercentileValid
    ? Math.round(((100 - parsedPercentile) * 1550000) / 100)
    : null;
  const isRankValid = Number.isFinite(parsedRank) && parsedRank > 0;
  const effectiveRank =
    activeTab === "percentile"
      ? estimatedRankFromPercentile
      : isRankValid
        ? parsedRank
        : null;
  const rankLowerBound =
    effectiveRank !== null ? Math.max(1, effectiveRank - 1500) : null;
  const rankUpperBound = effectiveRank !== null ? effectiveRank + 1500 : null;
  const filteredColleges = effectiveRank !== null
    ? colleges
        .filter(
          (college) =>
            effectiveRank <= college.closingRank &&
            college.instituteType === instituteType &&
            college.categories.includes(category) &&
            college.genders.includes(gender)
        )
        .sort((a, b) => getBranchPriority(a.branch) - getBranchPriority(b.branch))
    : [];

  const percentileError =
    percentile.trim().length > 0 && !isPercentileValid
      ? "Enter a valid percentile between 0 and 100."
      : "";
  const rankError =
    rank.trim().length > 0 && !isRankValid
      ? "Enter a valid AIR/CRL rank greater than 0."
      : "";
  const shouldShowResults =
    activeTab === "percentile"
      ? percentile.trim().length > 0 && isPercentileValid
      : rank.trim().length > 0 && isRankValid;

  return (
    <main className="relative min-h-screen overflow-hidden bg-slate-950 text-slate-100">
      <div className="animated-gradient pointer-events-none absolute inset-0 -z-20 opacity-70" />
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_20%_20%,rgba(34,211,238,0.25),transparent_30%),radial-gradient(circle_at_80%_20%,rgba(168,85,247,0.22),transparent_35%),radial-gradient(circle_at_50%_80%,rgba(14,165,233,0.2),transparent_35%)]" />

      <div className="mx-auto flex w-full max-w-6xl flex-col px-4 pb-16 pt-5 sm:px-6 lg:px-10">
        <nav className="sticky top-4 z-30 mb-8 rounded-2xl border border-white/15 bg-white/10 px-4 py-3 backdrop-blur-2xl sm:px-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-r from-cyan-400 to-violet-500 text-sm font-bold text-slate-950">
                JP
              </span>
              <span className="text-sm font-semibold tracking-wide sm:text-base">
                JEE Predictor
              </span>
            </div>
            <div className="hidden items-center gap-6 text-sm text-slate-200 md:flex">
              <a href="#predictor" className="transition hover:text-cyan-200">
                Predictor
              </a>
              <a href="#stats" className="transition hover:text-cyan-200">
                Stats
              </a>
              <a href="#trusted" className="transition hover:text-cyan-200">
                Trusted By
              </a>
            </div>
            <button
              type="button"
              className="rounded-xl border border-cyan-300/40 bg-cyan-300/10 px-3 py-2 text-xs font-semibold text-cyan-100 transition hover:bg-cyan-300/20 sm:text-sm"
            >
              Join Beta
            </button>
          </div>
        </nav>

        <section
          id="predictor"
          className="rounded-3xl border border-white/20 bg-white/8 p-5 shadow-[0_18px_60px_rgba(7,12,30,0.45)] backdrop-blur-2xl sm:p-10"
        >
          <div className="grid items-center gap-8 lg:grid-cols-[1.2fr_0.8fr]">
            <div>
              <p className="mb-4 inline-flex rounded-full border border-cyan-300/30 bg-cyan-300/10 px-4 py-1 text-xs font-medium tracking-wide text-cyan-200">
                SMART COUNSELING FOR JEE 2026
              </p>
              <h1 className="mb-4 text-3xl font-semibold leading-tight sm:text-5xl">
                Choose your best-fit college with a startup-grade prediction
                experience
              </h1>
              <p className="max-w-2xl text-sm text-slate-300 sm:text-base">
                Predict likely colleges using either percentile-to-rank
                estimation or direct AIR/CRL rank input, then refine by
                category, gender, and institute type.
              </p>

              <div className="mt-8 flex w-full rounded-2xl border border-white/20 bg-white/10 p-1">
                <button
                  type="button"
                  onClick={() => setActiveTab("percentile")}
                  className={`h-11 flex-1 rounded-xl text-sm font-semibold transition-all duration-300 ${
                    activeTab === "percentile"
                      ? "bg-gradient-to-r from-cyan-400 via-sky-400 to-violet-500 text-slate-950 shadow-lg"
                      : "text-slate-200 hover:bg-white/10"
                  }`}
                >
                  Predict by Percentile
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab("rank")}
                  className={`h-11 flex-1 rounded-xl text-sm font-semibold transition-all duration-300 ${
                    activeTab === "rank"
                      ? "bg-gradient-to-r from-cyan-400 via-sky-400 to-violet-500 text-slate-950 shadow-lg"
                      : "text-slate-200 hover:bg-white/10"
                  }`}
                >
                  Predict by Rank
                </button>
              </div>

              <div className="mt-4">
                <div
                  className={`tab-panel rounded-2xl border border-white/20 bg-white/10 p-4 backdrop-blur-xl ${
                    activeTab === "percentile" ? "opacity-100" : "opacity-95"
                  }`}
                >
                  {activeTab === "percentile" ? (
                    <label className="flex flex-col gap-2">
                      <span className="text-sm font-semibold text-slate-100">
                        JEE Main Percentile
                      </span>
                      <input
                        type="text"
                        inputMode="decimal"
                        placeholder="Enter percentile (e.g. 97.8)"
                        value={percentile}
                        onChange={(event) => setPercentile(event.target.value)}
                        className="h-12 w-full rounded-xl border border-white/20 bg-white/10 px-4 text-sm text-white outline-none transition placeholder:text-slate-300/80 hover:border-cyan-300/40 focus:border-cyan-300/70 focus:ring-2 focus:ring-cyan-300/30"
                      />
                      <p className="text-xs text-slate-300">
                        We estimate your AIR using current year assumptions (15.5
                        lakh candidates).
                      </p>
                      {percentileError ? (
                        <p className="text-sm text-rose-300">{percentileError}</p>
                      ) : null}
                    </label>
                  ) : (
                    <label className="flex flex-col gap-2">
                      <span className="text-sm font-semibold text-slate-100">
                        AIR / CRL Rank
                      </span>
                      <input
                        type="text"
                        inputMode="numeric"
                        placeholder="Enter rank directly (e.g. 12500)"
                        value={rank}
                        onChange={(event) => setRank(event.target.value)}
                        className="h-12 w-full rounded-xl border border-white/20 bg-white/10 px-4 text-sm text-white outline-none transition placeholder:text-slate-300/80 hover:border-cyan-300/40 focus:border-cyan-300/70 focus:ring-2 focus:ring-cyan-300/30"
                      />
                      <p className="text-xs text-slate-300">
                        We use your entered rank directly to show eligible
                        colleges.
                      </p>
                      {rankError ? (
                        <p className="text-sm text-rose-300">{rankError}</p>
                      ) : null}
                    </label>
                  )}
                </div>
              </div>

              <div className="mt-4 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
                <label className="group flex flex-col gap-1">
                  <span className="text-xs font-medium uppercase tracking-wide text-slate-300">
                    Category
                  </span>
                  <select
                    value={category}
                    onChange={(event) =>
                      setCategory(
                        event.target.value as "General" | "OBC" | "EWS" | "SC" | "ST"
                      )
                    }
                    className="h-11 rounded-xl border border-white/20 bg-white/10 px-3 text-sm text-white outline-none transition duration-300 hover:border-cyan-300/45 focus:border-cyan-300/70 focus:ring-2 focus:ring-cyan-300/30"
                  >
                    <option value="General">General</option>
                    <option value="OBC">OBC</option>
                    <option value="EWS">EWS</option>
                    <option value="SC">SC</option>
                    <option value="ST">ST</option>
                  </select>
                </label>

                <label className="group flex flex-col gap-1">
                  <span className="text-xs font-medium uppercase tracking-wide text-slate-300">
                    Gender
                  </span>
                  <select
                    value={gender}
                    onChange={(event) =>
                      setGender(event.target.value as "Male" | "Female")
                    }
                    className="h-11 rounded-xl border border-white/20 bg-white/10 px-3 text-sm text-white outline-none transition duration-300 hover:border-cyan-300/45 focus:border-cyan-300/70 focus:ring-2 focus:ring-cyan-300/30"
                  >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                  </select>
                </label>

                <label className="group flex flex-col gap-1 sm:col-span-2 xl:col-span-1">
                  <span className="text-xs font-medium uppercase tracking-wide text-slate-300">
                    Institute Type
                  </span>
                  <select
                    value={instituteType}
                    onChange={(event) =>
                      setInstituteType(event.target.value as "NIT" | "IIIT" | "GFTI")
                    }
                    className="h-11 rounded-xl border border-white/20 bg-white/10 px-3 text-sm text-white outline-none transition duration-300 hover:border-cyan-300/45 focus:border-cyan-300/70 focus:ring-2 focus:ring-cyan-300/30"
                  >
                    <option value="NIT">NIT</option>
                    <option value="IIIT">IIIT</option>
                    <option value="GFTI">GFTI</option>
                  </select>
                </label>
              </div>
            </div>

            <div className="rounded-2xl border border-white/15 bg-white/10 p-4 backdrop-blur-xl sm:p-6">
              <p className="text-sm text-slate-300">Prediction preview</p>
              <h2 className="mt-2 text-3xl font-semibold text-white">
                {effectiveRank !== null
                  ? `AIR ${effectiveRank.toLocaleString()}`
                  : "AIR --"}
              </h2>
              <p className="mt-2 text-xs text-amber-200/90">
                {activeTab === "percentile"
                  ? "This is an estimated rank based on 15.5 lakh students."
                  : "Direct rank mode uses your AIR/CRL input for predictions."}
              </p>
              <div className="mt-5 space-y-3 text-sm text-slate-200">
                <p className="flex items-center justify-between">
                  <span>Prediction Confidence</span>
                  <span className="font-semibold text-cyan-200">High</span>
                </p>
                <p className="flex items-center justify-between">
                  <span>Data Source</span>
                  <span className="font-semibold">JoSAA + CSAB</span>
                </p>
                <p className="flex items-center justify-between">
                  <span>Rank Range</span>
                  <span className="font-semibold">
                    {rankLowerBound !== null && rankUpperBound !== null
                      ? `${rankLowerBound.toLocaleString()} - ${rankUpperBound.toLocaleString()}`
                      : "--"}
                  </span>
                </p>
              </div>
            </div>
          </div>
        </section>

        <section id="stats" className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {quickStats.map((stat) => (
            <article
              key={stat.label}
              className="rounded-2xl border border-white/15 bg-white/10 p-5 backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:border-violet-300/45 hover:bg-white/15"
            >
              <p className="text-2xl font-semibold text-white">{stat.value}</p>
              <p className="mt-1 text-sm text-slate-300">{stat.label}</p>
            </article>
          ))}
        </section>

        {shouldShowResults && (
          <section className="mt-8 space-y-5">
            <div className="rounded-2xl border border-white/15 bg-white/10 p-4 backdrop-blur-xl sm:p-6">
              <p className="text-sm text-slate-300">Showing predictions for</p>
              <h2 className="text-2xl font-semibold text-white sm:text-3xl">
                {effectiveRank !== null
                  ? `AIR ${effectiveRank.toLocaleString()}`
                  : "AIR Not provided"}
              </h2>
              <div className="mt-3 rounded-xl border border-cyan-300/30 bg-cyan-300/10 p-3 text-sm text-cyan-100 animate-pulse">
                <p className="font-semibold">Approximate CRL Rank</p>
                <p>
                  {rankLowerBound !== null && rankUpperBound !== null
                    ? `${rankLowerBound.toLocaleString()} - ${rankUpperBound.toLocaleString()}`
                    : "--"}
                </p>
                <p className="mt-1 text-xs text-cyan-200/90">
                  {activeTab === "percentile"
                    ? "This is an estimated rank based on 15.5 lakh students."
                    : "Direct rank mode uses your entered AIR/CRL rank."}
                </p>
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                <span className="rounded-full border border-cyan-300/40 bg-cyan-300/10 px-3 py-1 text-xs font-semibold text-cyan-100">
                  Category: {category}
                </span>
                <span className="rounded-full border border-violet-300/40 bg-violet-300/10 px-3 py-1 text-xs font-semibold text-violet-100">
                  Gender: {gender}
                </span>
                <span className="rounded-full border border-fuchsia-300/40 bg-fuchsia-300/10 px-3 py-1 text-xs font-semibold text-fuchsia-100">
                  Type: {instituteType}
                </span>
              </div>
            </div>

            {filteredColleges.length === 0 ? (
              <div className="rounded-2xl border border-white/15 bg-white/10 p-8 text-center text-slate-200 backdrop-blur-xl">
                No colleges found for this rank
              </div>
            ) : (
              <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
                {filteredColleges.map((college) => (
                  <article
                    key={college.name}
                    className="group rounded-3xl border border-white/20 bg-white/10 p-6 shadow-[0_10px_30px_rgba(10,15,35,0.35)] backdrop-blur-2xl transition duration-300 hover:-translate-y-1.5 hover:border-cyan-300/45 hover:bg-white/15"
                  >
                    <div className="mb-4 flex items-center justify-between">
                      <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl border border-white/20 bg-white/10 text-2xl transition group-hover:scale-110">
                        {college.icon}
                      </span>
                      <span className="rounded-full border border-violet-300/35 bg-violet-300/10 px-3 py-1 text-xs font-semibold text-violet-100">
                        Predicted Fit
                      </span>
                    </div>
                    <h3 className="text-xl font-semibold text-white">
                      {college.name}
                    </h3>
                    <p className="mt-1 text-sm text-cyan-200">{college.branch}</p>

                    <div className="mt-5 space-y-2 text-sm text-slate-200">
                      <p>Average Package: {college.averagePackage}</p>
                      <p>Fees: {college.fees}</p>
                      <p>Institute Type: {college.instituteType}</p>
                      <p>Closing Rank: {college.closingRank.toLocaleString()}</p>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </section>
        )}

        <section
          id="trusted"
          className="mt-8 rounded-3xl border border-white/20 bg-white/8 p-5 backdrop-blur-2xl sm:p-8"
        >
          <p className="text-center text-xs font-semibold uppercase tracking-[0.2em] text-slate-300">
            Trusted by JEE Aspirants
          </p>
          <h2 className="mt-3 text-center text-2xl font-semibold text-white sm:text-3xl">
            Built for students who want clarity, not confusion
          </h2>
          <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
            {trustedBy.map((item) => (
              <div
                key={item}
                className="rounded-xl border border-white/15 bg-white/10 px-4 py-3 text-center text-sm text-slate-200 transition hover:border-cyan-300/40 hover:bg-white/15"
              >
                {item}
              </div>
            ))}
          </div>
        </section>
      </div>

      <style jsx>{`
        .animated-gradient {
          background: linear-gradient(
            130deg,
            #020617 0%,
            #0f172a 22%,
            #0e7490 45%,
            #4c1d95 68%,
            #020617 100%
          );
          background-size: 220% 220%;
          animation: flow 18s ease-in-out infinite;
        }

        .tab-panel {
          animation: tabFade 280ms ease;
        }

        @keyframes flow {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }

        @keyframes tabFade {
          0% {
            opacity: 0.4;
            transform: translateY(6px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </main>
  );
}