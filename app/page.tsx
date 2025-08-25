// app/page.tsx
"use client";



import React, { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  PlayCircle,
  ShieldCheck,
  Zap,
  Check,
  ChevronDown,
  Sparkles,
  Laptop,
  Mic,
  Camera,
  Cpu,
  Lock,
  Mail,
} from "lucide-react";
import { buildSignupUrl } from "./lib/url";
import Link from "next/link";

// --------- Content JSON (editable) ---------
const CONTENT = {
  brand: {
    name: "Distance Connect InterAI",
    logoSrc: "https://distanceconnect.in/logo.svg",
    signupUrl: "https://distanceconnect.in/auth/login",
    demoUrl: "https://youtu.be/BbUyV4Ba3MM",
    socialProofLogos: [] as { src: string; alt?: string }[],
  },
  roles: [
    {
      id: "software",
      label: "Software",
      skills: ["DSA", "System Design (entry)", "APIs", "Debugging"],
      sampleQuestions: [
        "Design a REST endpoint for…",
        "What’s the time complexity of…?",
        "How would you debug a flaky integration test?",
      ],
    },
    {
      id: "data-analyst",
      label: "Data Analyst",
      skills: ["SQL", "EDA", "Excel/Python", "Business Insight"],
      sampleQuestions: [
        "Write a SQL to find…",
        "How would you validate a spike…?",
        "Which chart best communicates…?",
      ],
    },
    {
      id: "marketing",
      label: "Marketing",
      skills: ["GTM", "Positioning", "Performance Metrics"],
      sampleQuestions: [
        "Outline a launch plan for…",
        "How do you measure CAC vs LTV?",
        "What’s your channel testing approach?",
      ],
    },
    {
      id: "product",
      label: "Product",
      skills: ["Discovery", "Prioritization", "PRD", "Metrics"],
      sampleQuestions: [
        "Draft a PRD outline for…",
        "What metric would you pick as North Star?",
        "Trade-off between X and Y?",
      ],
    },
    {
      id: "embedded",
      label: "Embedded",
      skills: ["C/C++", "MCUs", "Protocols", "Debugging"],
      sampleQuestions: [
        "How does I2C differ from SPI?",
        "Optimize ISR latency for…",
        "Memory-mapped IO considerations?",
      ],
    },
    {
      id: "custom",
      label: "Custom",
      skills: ["Upload JD", "Company-Specific"],
      sampleQuestions: [
        "Paste a JD and get tailored questions.",
        "Target interviews for specific companies.",
      ],
    },
  ],
  proof: {
    stats: [
      { k: "+18%", v: "higher pass-rate after 3 mocks" },
      { k: "97%", v: "say feedback felt real" },
      { k: "≈12 min", v: "to your first mock" },
    ],
    testimonials: [
      {
        quote:
          "Felt like a tough panel, but the report told me exactly what to fix. Landed an offer in 3 weeks.",
        name: "Aarav • B.Tech (CSE)",
      },
      {
        quote:
          "The SQL drills were on point. Loved the prep links tagged to my gaps.",
        name: "Aisha • Data Analyst",
      },
    ],
  },
  pricing: [
    {
      plan: "Free",
      price: "₹0",
      cadence: "/always",
      features: ["1 mock interview", "Basic report", "Email summary"],
    },
    {
      plan: "Pro",
      price: "₹399",
      cadence: "/mo",
      features: [
        "Unlimited mocks",
        "Advanced report",
        "Custom JD parsing",
        "Role/company targeting",
      ],
      badge: "Popular",
    },
    {
      plan: "Team",
      price: "₹999",
      cadence: "/mo",
      features: ["Cohorts", "Admin dashboard", "ATS-style scoring exports"],
    },
  ],
  faq: [
    {
      q: "How does the AI Interview Assistant work?",
      a: "Our AI Interview Assistant simulates a real interview experience by asking role-specific questions (technical + HR). You simply start the interview, respond as you would in a real setting, and the AI evaluates your answers in real-time. Once finished, you instantly receive a detailed report highlighting your strengths, improvement areas, and next steps.",
    },
    {
      q: "⁠What kind of roles and interview formats can I practice for?",
      a: "You can practice for multiple roles including Software Engineer, Data Analyst, Marketing, Consulting, and more. The AI covers technical rounds, HR rounds, and behavioral questions—so you’re fully prepared for both skills and soft-skill evaluations.",
    },
    {
      q: " ⁠Will I get a detailed feedback or just scores after the interview?",
      a: `You’ll get much more than just a score! 🎯 The AI generates a personalized feedback report with:

Your performance scorecard

Key strengths to highlight in real interviews

Weak points with actionable improvement tips

Suggested resources to prepare better`,
    },
    {
      q: " ⁠How is this different from traditional mock interviews with mentors?",
      a: " ⁠How is this different from traditional mock interviews with mentors?",
    },
  ],
};

// --------- Utility ---------
const cx = (...classes: (string | false | null | undefined)[]) =>
  classes.filter(Boolean).join(" ");

const palette = {
  bg: "#0B1020",
  bgAlt: "#121826",
  electric: "#2D7FFF",
  neon: "#00E887",
  text: "#C9D2E3",
};

const gridBg =
  "bg-[radial-gradient(ellipse_at_top,rgba(45,127,255,0.15),transparent_60%),radial-gradient(ellipse_at_bottom,rgba(0,232,135,0.12),transparent_60%)]";

const glass = "backdrop-blur-md bg-white/5 border border-white/10";


function Banner(){

return <>
  <section
    aria-label="Announcement banner"
    className="relative border-b border-white/10"
  >
    <div className="mx-auto max-w-7xl px-4 py-3 sm:px-6 lg:px-8">
      <a
        href="/ai/tutor-agents"
        data-cta="banner-tutor-agents"
        className={cx(
          "group inline-flex w-full items-center justify-between gap-3 rounded-xl px-4 py-2 text-sm",
          glass,
        )}
        style={{
          ["--el" as any]: palette.electric,
        }}
      >
        <span className="inline-flex w-full items-center justify-center gap-2">
          <Sparkles className="h-4 w-4 text-[var(--el)]" />
          <span className="font-medium text-white text-center">
            Introducing AI Tutor Agents
          </span>
        
        </span>

      </a>
    </div>
  </section>
</>

}

function Hero({
  activeRole,
  setActiveRole,
}: {
  activeRole: string;
  setActiveRole: (r: string) => void;
}) {
  return (
    <section
      className={cx("relative overflow-hidden", gridBg)}
      aria-label="Hero"
    >

      <div
        className="pointer-events-none absolute inset-0 bg-[url('/noise.png')] opacity-10 mix-blend-soft-light"
        aria-hidden
      />

      <div className="mx-auto max-w-7xl px-4 pb-12 pt-6 sm:px-6 md:pb-20 lg:px-8">
        <div className="flex flex-col justify-between gap-4 md:flex-row">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >

            <h1 className="mt-4 text-3xl font-semibold tracking-tight text-white md:text-5xl">
              Master any interview with<br/> AI that knows what<br/> hiring managers <br/>want
            </h1>
            <p className="mt-3 max-w-2xl text-slate-300">
              Role-aware mock interviews + instant, actionable report.
              <br /> Choose a role, get grilled, and leave with a prep plan{" "}
              <br />
              that tells you exactly what to fix.
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <a
                href={"/auth/login"}
                data-cta="hero-primary"
                className={cx(
                  "inline-flex items-center justify-center gap-2 rounded-2xl px-5 py-3 text-base font-semibold",
                  "bg-[var(--neon)] text-[#0B1020] hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-[var(--el)] focus:ring-offset-2",
                  "transition",
                )}
                style={{
                  ["--neon" as any]: palette.neon,
                  ["--el" as any]: palette.electric,
                }}
                aria-label="Start Free Mock Interview"
              >
                Start Free Mock Interview
                <ArrowRight className="h-5 w-5" aria-hidden />
              </a>
              {/* {CONTENT.brand.demoUrl && (
                <a
                  href={CONTENT.brand.demoUrl}
                  data-cta="hero-demo"
                  className={cx(
                    "inline-flex items-center justify-center gap-2 rounded-2xl px-5 py-3 text-base font-semibold",
                    "border border-white/15 text-white hover:bg-white/5 focus:outline-none focus:ring-2 focus:ring-[var(--el)] focus:ring-offset-2",
                    "transition",
                  )}
                  style={{ ["--el" as any]: palette.electric }}
                  aria-label="Watch 60-second demo video"
                  target="_blank"
                  rel="noreferrer"
                >
                  <PlayCircle className="h-5 w-5" aria-hidden />
                  Watch 60-sec Demo
                </a>
              )} */}
            </div>
            <p className="mt-2 text-xs text-slate-400">
              No card needed • Takes ~3 minutes to start
            </p>
          </motion.div>
          <img
            // src="/ai-dashboard.jpeg"
            src="/test.jpeg"
            alt="AI Dashboard"
            className="mt-8  w-[450px] rounded-2xl object-cover"
          />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <div className="mt-10">
            <div
              className={cx(
                "relative mx-auto max-w-5xl rounded-3xl p-1",
                glass,
              )}
            >
              <div className="rounded-3xl border border-white/10 bg-[#0B1020] p-6">
                <div className="flex items-center gap-2 text-sm text-slate-300">
                  <Laptop className="h-4 w-4" />{" "}
                  <span>Live interview simulation</span>
                  <span
                    className="mx-2 h-1 w-1 rounded-full bg-slate-500"
                    aria-hidden
                  />
                  <Mic className="h-4 w-4" /> <span>STT</span>
                  <span
                    className="mx-2 h-1 w-1 rounded-full bg-slate-500"
                    aria-hidden
                  />
                  <Camera className="h-4 w-4" /> <span>Optional video</span>
                </div>
                <div className="mt-4 grid gap-4 md:grid-cols-2">
                  <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                    <p className="text-xs uppercase tracking-wider text-slate-400">
                      AI asks
                    </p>
                    <p className="mt-1 text-slate-200">
                      Design a REST endpoint for user onboarding with rate
                      limiting. Talk through choices.
                    </p>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                    <p className="text-xs uppercase tracking-wider text-slate-400">
                      You respond
                    </p>
                    <p className="mt-1 text-slate-200">
                      Voice or text. Get live nudges on clarity and structure.
                    </p>
                  </div>
                </div>
              </div>
              <div
                className="pointer-events-none absolute inset-0 rounded-3xl shadow-[0_0_120px_rgba(45,127,255,0.35)]"
                aria-hidden
              />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function RoleSelector({
  activeRole,
  setActiveRole,
}: {
  activeRole: string;
  setActiveRole: (r: string) => void;
}) {
  return (
    <section
      id="roles"
      className="relative py-14"
      aria-label="Select a role to try"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between gap-4">
          <h2 className="text-2xl font-semibold text-white md:text-3xl">
            Pick your role
          </h2>
          <a
            href={"/auth/login"}
            data-cta="roles-try"
            className="hidden items-center gap-2 rounded-xl bg-[var(--neon)] px-4 py-2 text-sm font-semibold text-[#0B1020] hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-[var(--el)] focus:ring-offset-2 sm:inline-flex"
            style={{
              ["--neon" as any]: palette.neon,
              ["--el" as any]: palette.electric,
            }}
          >
            Try this role
            <ArrowRight className="h-4 w-4" />
          </a>
        </div>

        <div
          role="tablist"
          aria-label="Role tabs"
          className="mt-6 grid grid-cols-2 gap-2 sm:grid-cols-3 md:flex md:flex-wrap"
        >
          {CONTENT.roles.map((r) => (
            <button
              key={r.id}
              role="tab"
              aria-selected={activeRole === r.id}
              aria-controls={`panel-${r.id}`}
              onClick={() => setActiveRole(r.id)}
              className={cx(
                "rounded-xl border px-4 py-2 text-sm font-medium",
                activeRole === r.id
                  ? "bg-[var(--el)]/10 border-[var(--el)] text-white"
                  : "border-white/10 bg-white/5 text-slate-300 hover:text-white",
                "focus:outline-none focus:ring-2 focus:ring-[var(--el)] focus:ring-offset-2",
              )}
              style={{ ["--el" as any]: palette.electric }}
              data-role-tab={r.id}
              data-analytics="role-tab-click"
            >
              {r.label}
            </button>
          ))}
        </div>

        <div className="mt-6">
          {CONTENT.roles.map((r) => (
            <div
              key={r.id}
              id={`panel-${r.id}`}
              role="tabpanel"
              hidden={activeRole !== r.id}
              className={cx("rounded-2xl border border-white/10 p-6", glass)}
            >
              <div className="grid gap-6 md:grid-cols-2">
                <div>
                  <p className="text-xs uppercase tracking-wider text-slate-400">
                    Sample questions
                  </p>
                  <ul className="mt-2 list-inside list-disc space-y-2 text-slate-200">
                    {r.sampleQuestions.map((q, i) => (
                      <li key={i}>{q}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-wider text-slate-400">
                    Skills scored
                  </p>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {r.skills.map((s, i) => (
                      <span
                        key={i}
                        className="inline-flex items-center gap-1 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-sm text-slate-200"
                      >
                        <Zap className="h-3.5 w-3.5" /> {s}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              <div className="mt-6">
                <a
                  href={"/auth/login"}
                  className="inline-flex items-center gap-2 rounded-xl bg-[var(--neon)] px-4 py-2 text-sm font-semibold text-[#0B1020] hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-[var(--el)] focus:ring-offset-2"
                  style={{
                    ["--neon" as any]: palette.neon,
                    ["--el" as any]: palette.electric,
                  }}
                  data-cta="roles-panel-cta"
                >
                  Try this role
                  <ArrowRight className="h-4 w-4" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function HowItWorks() {
  const chips = [
    { icon: <Mic className="h-3.5 w-3.5" />, label: "STT" },
    { icon: <Cpu className="h-3.5 w-3.5" />, label: "LLM" },
    {
      icon: <ShieldCheck className="h-3.5 w-3.5" />,
      label: "ATS-style scoring",
    },
    { icon: <Camera className="h-3.5 w-3.5" />, label: "Body-language (opt)" },
  ];
  return (
    <section id="how" className="relative py-14" aria-label="How it works">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-semibold text-white md:text-3xl">
          How it works
        </h2>
        <div className="mt-6 grid gap-6 md:grid-cols-3">
          {[
            {
              n: 1,
              title: "Choose role & company",
              desc: "Pick a role or paste a JD. Add target companies for tailored questions.",
            },
            {
              n: 2,
              title: "10–20 min AI interview",
              desc: "Voice/video or text. Realistic prompts with follow-ups and timeboxing.",
            },
            {
              n: 3,
              title: "Instant report",
              desc: "Scores, strengths, gaps, and next steps. Share or book a mentor.",
            },
          ].map((s) => (
            <div
              key={s.n}
              className={cx("rounded-2xl border border-white/10 p-6", glass)}
            >
              <div className="text-sm text-slate-300">Step {s.n}</div>
              <h3 className="mt-1 text-lg font-semibold text-white">
                {s.title}
              </h3>
              <p className="mt-2 text-slate-300">{s.desc}</p>
            </div>
          ))}
        </div>
        <div className="mt-6 flex flex-wrap gap-2">
          {chips.map((c, i) => (
            <span
              key={i}
              className="inline-flex items-center gap-1 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-sm text-slate-200"
            >
              {c.icon}
              {c.label}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

function ReportPreview() {
  return (
    <section
      id="report"
      className="relative py-14"
      aria-label="Results report preview"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between gap-4">
          <h2 className="text-2xl font-semibold text-white md:text-3xl">
            Your report, actually useful
          </h2>
          <span className="text-sm text-slate-400">
            Actionable feedback, not generic advice.
          </span>
        </div>

        <div className="mt-6 grid gap-6 md:grid-cols-3">
          <div className={cx("rounded-2xl border border-white/10 p-6", glass)}>
            <p className="text-sm text-slate-300">Overall Score</p>
            <div className="mt-2 text-4xl font-semibold text-white">83</div>
            <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
              {[
                ["Communication", 82],
                ["Problem-Solving", 88],
                ["Technical Accuracy", 79],
                ["Confidence", 84],
              ].map(([k, v]) => (
                <div key={k as string}>
                  <div className="justify_between flex items-center text-slate-300">
                    <span>{k as string}</span>
                    <span>{v as number}</span>
                  </div>
                  <div className="mt-1 h-1.5 w-full overflow-hidden rounded bg-white/10">
                    <div
                      className="h-full bg-[var(--el)]"
                      style={{
                        width: `${v}%`,
                        ["--el" as any]: palette.electric,
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className={cx("rounded-2xl border border-white/10 p-6", glass)}>
            <p className="text-sm text-slate-300">Strengths</p>
            <ul className="mt-2 list-inside list-disc space-y-2 text-slate-200">
              <li>Clear reasoning with trade-offs</li>
              <li>Strong SQL fundamentals</li>
            </ul>
            <p className="mt-5 text-sm text-slate-300">Gaps</p>
            <ul className="mt-2 list-inside list-disc space-y-2 text-slate-200">
              <li>Better structure for behavioral answers</li>
              <li>Practice complexity analysis on trees/graphs</li>
            </ul>
          </div>

          <div className={cx("rounded-2xl border border-white/10 p-6", glass)}>
            <p className="text-sm text-slate-300">Next steps</p>
            <ul className="mt-2 space-y-2 text-slate-200">
              <li className="inline-flex items-start gap-2">
                <Check className="mt-0.5 h-4 w-4" /> Rehearse STAR format for 3
                scenarios
              </li>
              <li className="inline-flex items-start gap-2">
                <Check className="mt-0.5 h-4 w-4" /> 2x 30-min DSA drills
                (trees, graphs)
              </li>
              <li className="inline-flex items-start gap-2">
                <Check className="mt-0.5 h-4 w-4" /> Re-run mock with targeted
                prompts
              </li>
            </ul>
            <a
              href={"/auth/login"}
              className="mt-5 inline-flex items-center gap-2 rounded-xl bg-[var(--neon)] px-4 py-2 text-sm font-semibold text-[#0B1020] hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-[var(--el)] focus:ring-offset-2"
              style={{
                ["--neon" as any]: palette.neon,
                ["--el" as any]: palette.electric,
              }}
            >
              Book a mentor
              <ArrowRight className="h-4 w-4" />
            </a>
            <p className="mt-2 text-xs text-slate-400">
              Or export as PDF and share.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

// function Pricing() {
//   const [yearly, setYearly] = useState(false);
//   return (
//     <section id="pricing" className="relative py-14" aria-label="Pricing plans">
//       <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
//         <div className="flex items-center justify-between">
//           <h2 className="text-2xl font-semibold text-white md:text-3xl">
//             Pricing
//           </h2>
//           <button
//             onClick={() => setYearly((v) => !v)}
//             className={cx(
//               "inline-flex items-center gap-2 rounded-full border border-white/15 px-3 py-1 text-sm",
//               yearly ? "bg-white/10" : "bg-white/5",
//             )}
//             aria-pressed={yearly}
//           >
//             <span className="text-slate-300">Monthly</span>
//             <span className="relative inline-block h-5 w-10 rounded-full bg-white/10">
//               <span
//                 className={cx(
//                   "absolute top-0.5 h-4 w-4 rounded-full bg-[var(--el)] transition-all",
//                   yearly ? "right-0.5" : "left-0.5",
//                 )}
//                 style={{ ["--el" as any]: palette.electric }}
//               />
//             </span>
//             <span className="text-slate-300">Yearly</span>
//           </button>
//         </div>

//         <div className="mt-6 grid gap-6 md:grid-cols-3">
//           {CONTENT.pricing.map((p) => (
//             <div
//               key={p.plan}
//               className={cx(
//                 "relative rounded-2xl border border-white/10 p-6",
//                 glass,
//               )}
//             >
//               {p.badge && (
//                 <span
//                   className="bg-[var(--el)]/20 absolute -top-3 right-4 inline-flex rounded-full px-3 py-1 text-xs font-semibold text-[var(--el)]"
//                   style={{ ["--el" as any]: palette.electric }}
//                 >
//                   {p.badge}
//                 </span>
//               )}
//               <h3 className="text-lg font-semibold text-white">{p.plan}</h3>
//               <div className="mt-2 text-3xl font-semibold text-white">
//                 {p.price}
//                 <span className="text-base font-normal text-slate-400">
//                   {p.cadence}
//                 </span>
//               </div>
//               <ul className="mt-4 space-y-2 text-slate-200">
//                 {p.features.map((f: string) => (
//                   <li key={f} className="inline-flex items-start gap-2">
//                     <Check className="mt-0.5 h-4 w-4" /> {f}
//                   </li>
//                 ))}
//               </ul>
//               <a
//                 href={"/auth/login"}
//                 data-cta={`pricing-${p.plan.toLowerCase()}`}
//                 className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[var(--neon)] px-4 py-2 text-sm font-semibold text-[#0B1020] hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-[var(--el)] focus:ring-offset-2"
//                 style={{
//                   ["--neon" as any]: palette.neon,
//                   ["--el" as any]: palette.electric,
//                 }}
//               >
//                 Get started
//                 <ArrowRight className="h-4 w-4" />
//               </a>
//               <p className="mt-2 text-xs text-slate-400">No card needed</p>
//             </div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// }

function FAQ() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section
      id="faq"
      className="relative py-14"
      aria-label="Frequently asked questions"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-semibold text-white md:text-3xl">FAQ</h2>
        <div className="mt-6 space-y-3">
          {CONTENT.faq.map((item, i) => (
            <div
              key={i}
              className={cx("rounded-2xl border border-white/10", glass)}
            >
              <button
                className="flex w-full items-center justify-between px-4 py-3 text-left"
                onClick={() => setOpen((v) => (v === i ? null : i))}
                aria-expanded={open === i}
              >
                <span className="font-medium text-white">{item.q}</span>
                <ChevronDown
                  className={cx(
                    "h-4 w-4 transition",
                    open === i && "rotate-180",
                  )}
                  aria-hidden
                />
              </button>
              {open === i && (
                <div className="px-4 pb-4 text-slate-300">{item.a}</div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Header({ activeRole }: { activeRole?: string }) {
  const signupHref = buildSignupUrl(CONTENT.brand.signupUrl, activeRole);
  return (
    <header
      className={cx(
        "sticky top-0 z-50 border-b border-white/10",
        "bg-[#0B1020]/80 backdrop-blur supports-[backdrop-filter]:bg-[#0B1020]/60"
      )}
      aria-label="Site header with navigation and primary call-to-action"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between">
        <Link href="https://distanceconnect.in"> 
                <div className="flex items-center gap-3">
          {CONTENT.brand.logoSrc ? (
            <img
              src={CONTENT.brand.logoSrc}
              alt={`${CONTENT.brand.name} logo`}
              className="h-7 w-auto"
            />
          ) : (
            <span
              className="inline-flex items-center gap-2 text-[color:var(--text)]"
              style={{ ["--text" as any]: palette.text }}
            >
              <Cpu className="h-5 w-5" aria-hidden />
              <span className="font-semibold tracking-tight">
                {CONTENT.brand.name}
              </span>
            </span>
          )}
        </div>
        </Link>

        <nav className="hidden md:flex items-center gap-6 text-sm text-slate-300">
          <a href="#how" className="hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[var(--el)] rounded" style={{ ["--el" as any]: palette.electric }}>How it works</a>
          <a href="#roles" className="hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[var(--el)] rounded" style={{ ["--el" as any]: palette.electric }}>Roles</a>
          <a href="#report" className="hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[var(--el)] rounded" style={{ ["--el" as any]: palette.electric }}>Report</a>

          <a href="#faq" className="hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[var(--el)] rounded" style={{ ["--el" as any]: palette.electric }}>FAQ</a>
        </nav>
        <div className="flex items-center gap-3">
          <a
            href={signupHref}
            data-cta="header-primary"
            className={cx(
              "inline-flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-semibold",
              "text-[#0B1020] bg-[var(--neon)] hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-[var(--el)] focus:ring-offset-2",
              "transition"
            )}
            style={{
              ["--neon" as any]: palette.neon,
              ["--el" as any]: palette.electric,
            }}
          >
            Start Free Mock
            <ArrowRight className="h-4 w-4" aria-hidden />
          </a>
        </div>
      </div>
    </header>
  );
}

function ConversionFooter({ activeRole }: { activeRole?: string }) {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  return (
    <section
      className="relative py-14"
      aria-label="Final call-to-action with email capture"
    >
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <div
          className={cx(
            "rounded-3xl border border-white/10 p-6 text-center",
            glass,
          )}
        >
          <h3 className="text-xl font-semibold text-white md:text-2xl">
            Join the Waitist!
          </h3>
          <p className="mt-2 text-slate-300">
            Get early access to new features and updates.
          </p>
          <form
            onSubmit={async (e) => {
              e.preventDefault();
              if (!email) return;
              setLoading(true);
              try {
                const res = await fetch("https://distanceconnect.in/api/waitlist", {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({ email, role: activeRole }),
                });
                const data = await res.json().catch(() => ({}));
                if (!res.ok) {
                  const msg = (data && data.error) || "Failed to subscribe";
                  alert(msg);
                  return;
                }
                console.log("email_capture", { email, role: activeRole });
               
                setEmail("");
              } catch (err) {
                console.error("waitlist_submit_error", err);
                alert("Something went wrong. Please try again.");
              } finally {
                setLoading(false);
              }
            }}
            className="mt-5 grid grid-cols-1 gap-2 sm:grid-cols-[1fr_auto]"
            aria-label="Email capture form"
          >
            <label htmlFor="email" className="sr-only">
              Email address
            </label>
            <input
              id="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="email@example.com"
              className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-slate-100 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[var(--el)]"
              aria-describedby="email-help"
              disabled={loading}
              style={{ ["--el" as any]: palette.electric }}
            />
            <button
              type="submit"
              data-cta="footer-email"
              disabled={loading}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-[var(--neon)] px-5 py-3 text-sm font-semibold text-[#0B1020] hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-[var(--el)] disabled:opacity-60"
              style={{
                ["--neon" as any]: palette.neon,
                ["--el" as any]: palette.electric,
              }}
            >
              {loading ? "Joining..." : "Join waitlist"}
              <Mail className="h-4 w-4" />
            </button>
            
          </form>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="relative border-t border-white/10 py-8">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 text-sm text-slate-400 sm:px-6 md:flex-row lg:px-8">
        <div className="flex items-center gap-2">
          <Lock className="h-4 w-4" />
          <span>
            Privacy-first • All rights reserved © {new Date().getFullYear()}{" "}
            {CONTENT.brand.name}
          </span>
        </div>
        <div className="flex items-center gap-4">
          <a href="/terms-conditions" className="hover:text-white">
            Terms
          </a>
          <a href="/privacy-policy" className="hover:text-white">
            Privacy
          </a>
        </div>
      </div>
    </footer>
  );
}

export default function Page() {
  const [activeRole, setActiveRole] = useState<string>(CONTENT?.roles[0]?.id || "software");

  useEffect(() => {
    if (typeof window === "undefined") return;
    const u = new URL(window.location.href);
    const r =
      u.searchParams.get("role") || window.location.hash.replace("#", "");
    if (r && CONTENT.roles.some((x) => x.id === r)) setActiveRole(r);
  }, []);

  const schema = useMemo(
    () => ({
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      name: CONTENT.brand.name,
      applicationCategory: "EducationalApplication",
      operatingSystem: "Web",
      offers: { "@type": "Offer", price: "0", priceCurrency: "INR" },
      description:
        "AI Interview Assistant for realistic mock interviews and instant, actionable reports.",
    }),
    [],
  );

  return (
    <div
      className="min-h-screen"
      style={{ backgroundColor: palette.bg, color: palette.text }}
    >
      <div
        className="absolute inset-0 -z-10 bg-[radial-gradient(40%_30%_at_50%_0%,rgba(45,127,255,0.25),transparent),radial-gradient(40%_30%_at_50%_100%,rgba(0,232,135,0.18),transparent)]"
        aria-hidden
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      <main>
        <Banner />
        <Header activeRole={activeRole} />
        
        <Hero activeRole={activeRole} setActiveRole={setActiveRole} />
        <RoleSelector activeRole={activeRole} setActiveRole={setActiveRole} />
        <HowItWorks />
        <ReportPreview />
        <ProofTestimonials />
        {/* <Pricing /> */}
        <FAQ />
        <ConversionFooter activeRole={activeRole} />
      </main>
      <Footer />
    </div>
  );
}

function ProofTestimonials() {
  return (
    <section className="relative py-14" aria-label="Proof and testimonials">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-6 md:grid-cols-3">
          {CONTENT.proof.stats.map((s, i) => (
            <div
              key={i}
              className={`${glass} rounded-2xl border border-white/10 p-6 text-center`}
            >
              <div className="text-3xl font-semibold text-white">{s.k}</div>
              <div className="mt-1 text-slate-300">{s.v}</div>
            </div>
          ))}
        </div>

        {CONTENT.brand.socialProofLogos.length > 0 && (
          <div className="mt-10 flex flex-wrap items-center justify-center gap-6 opacity-80">
            {CONTENT.brand.socialProofLogos.map((l, i) => (
              <img
                key={i}
                src={l.src}
                alt={l.alt || "Logo"}
                className="h-8 w-auto"
              />
            ))}
          </div>
        )}

        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {CONTENT.proof.testimonials.map((t, i) => (
            <blockquote
              key={i}
              className={`${glass} rounded-2xl border border-white/10 p-6`}
            >
              <p className="text-slate-200">“{t.quote}”</p>
              <footer className="mt-3 text-sm text-slate-400">
                — {t.name}
              </footer>
            </blockquote>
          ))}
        </div>
      </div>
    </section>
  );
}
