"use client";

import { useState, useMemo } from "react";

type Track = "all" | "fullstack" | "design" | "creative";

interface Project {
  id: string;
  title: string;
  subtitle: string;
  client: string;
  period: string;
  tracks: ("fullstack" | "design" | "creative")[];
  badge: string;
  badgeColor: string;
  summary: string;
  highlights: string[];
  technologies: string[];
  confidentialityNote?: string;
}

const projects: Project[] = [
  {
    id: "rmm-dashboard",
    title: "Routine Maintenance Metrics (RMM) Executive Suite",
    subtitle: "Enterprise Operational Intelligence & Multi-Site Analytics Platform",
    client: "PBF Energy",
    period: "2026",
    tracks: ["design", "fullstack"],
    badge: "Enterprise BI & IA",
    badgeColor: "bg-blue-500/10 text-blue-400 border-blue-500/20",
    summary:
      "Architected and delivered an enterprise-scale Power BI operational intelligence suite across 21 interactive report pages and 450+ visual containers, synthesizing dense SAP maintenance data into intuitive executive scorecards.",
    highlights: [
      "Designed visual hierarchy and cohesive information architecture to dramatically reduce cognitive load for executive leadership.",
      "Engineered core operational KPIs: Schedule Attainment (80% target), PM Compliance (95% target), Production Rate (100% target), and Break-In %.",
      "Modeled dynamic 'Weeks of Backlog' normalized by craft FTE capacity and 40-hour work weeks.",
      "Engineered custom Field Parameter controls enforcing single/forced-selection states across dimension hierarchies (Plant, Craft, Order Type, Priority).",
      "Built a 7-page 'Data Review' validation suite enabling drill-through auditing down to individual SAP work orders."
    ],
    technologies: [
      "Power BI",
      "DAX",
      "Power Query (M)",
      "Microsoft Fabric",
      "SAP PM (IW37N/IW49N)",
      "Information Architecture",
      "Field Parameters",
      "Tabular Modeling"
    ],
    confidentialityNote: "Proprietary Enterprise System (NDA). Architectural walkthroughs available on request."
  },
  {
    id: "win-the-day",
    title: "\"Win The Day\" (WTD) Plant Maintenance Scheduling",
    subtitle: "Operational Field Workflow & Touch-Ergonomic Maintenance Engine",
    client: "Toledo Refining Company (PBF Energy)",
    period: "2026",
    tracks: ["design", "fullstack"],
    badge: "Field Ergonomics & Systems",
    badgeColor: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
    summary:
      "Architected an operational scheduling application connecting SAP PM exports across 8 craft shops and an Area Maintenance Coordinator meeting rollup, pairing touch-ergonomic field interaction with robust concurrency mitigation.",
    highlights: [
      "Human-Centered Field UX: Solved touchscreen friction for supervisors wearing work gloves on Surface tablets via a single-tap tri-state toggle (Blank ↔ Today ↔ Tomorrow) with active row-highlighting.",
      "Dynamic Information Architecture: Engineered automatic lookahead scaling (Sun–Tue 1-week focus vs. Wed–Fri 2-week lookahead) with self-updating section headers and week tags.",
      "Concurrency & File-Lock Mitigation: Eliminated multi-user network lock collisions between schedulers and supervisors via craft-isolated snapshotting and decoupled reference tables.",
      "Deterministic Shift Handover: Engineered carryover automation ('X' tag) that moves progress codes to SAP status while persisting active barriers (E1–E4, M1–M5) and shift notes.",
      "Idempotent Logging Engine: Built duplicate-proof move and logging routines with automated Power Query multi-file consolidation for plant-wide meetings."
    ],
    technologies: [
      "Power Query (M-code)",
      "Excel VBA",
      "SAP PM (IW49N)",
      "Tablet Touch Ergonomics",
      "Event-Driven UX",
      "State Machines",
      "Windows Automation"
    ],
    confidentialityNote: "Proprietary Enterprise System (NDA). Sanitized architectural walkthroughs available on request."
  },
  {
    id: "capital-projects",
    title: "Capital Projects Headcount & Labor Cost Modernization",
    subtitle: "Full-Stack Enterprise Upgrade, Design System & Cost Accounting Platform",
    client: "Toledo Refining Company (PBF Energy)",
    period: "2025 – 2026",
    tracks: ["fullstack", "design"],
    badge: "Full-Stack .NET & UI/UX",
    badgeColor: "bg-purple-500/10 text-purple-400 border-purple-500/20",
    summary:
      "Modernized production enterprise application from .NET Core 2.x to .NET 8 (LTS), migrating back-end architecture to EF Core 8 and establishing a component-driven TypeScript and Tailwind CSS design system.",
    highlights: [
      "Authored 15-workstream architectural modernization roadmap: .NET 10 minimal hosting refactor, jQuery deprecation, and Tailwind CSS design system adoption.",
      "Engineered complex schedule-based labor cost engine computing Plan/Projection/Actual headcount × craft rates across vendors and projects, freezing historical rates against retroactive changes.",
      "Redesigned contractor data entry with field-level locking, accessible form controls, and structured schedule impact justification dropdowns.",
      "Built multi-select project reporting suite generating styled, branded Excel output via EPPlus with EVENT-level rollups and approval subtotals.",
      "Hardened role-based access control (Admin, User, Vendor, Clearing) with CSRF protection and re-authentication bulk-purge workflows."
    ],
    technologies: [
      "C#",
      "ASP.NET Core (.NET 8)",
      "EF Core 8",
      "TypeScript",
      "Tailwind CSS",
      "Azure App Service",
      "EPPlus",
      "WCAG 2.1 AA",
      "Figma"
    ],
    confidentialityNote: "Proprietary Enterprise System (NDA)."
  },
  {
    id: "samsung-webgl",
    title: "Mobile WebGL Scene Graph & Canvas Physics Engine",
    subtitle: "Hardware-Accelerated Browser Graphics & 2D Physics R&D",
    client: "Samsung Information Systems of America (SISA)",
    period: "2010 – 2012",
    tracks: ["creative", "fullstack", "design"],
    badge: "Commercial Graphics R&D",
    badgeColor: "bg-cyan-500/10 text-cyan-400 border-cyan-500/20",
    summary:
      "Researched, architected, and built custom WebGL scene graphs and physics-driven browser game prototypes on early mobile hardware to benchmark the performance virtues of hardware-accelerated Chromium on Samsung Tizen OS.",
    highlights: [
      "Architected a custom WebGL scene graph engine from scratch, implementing hierarchical node/local to world matrix transformations rendered to HTML5 Canvas.",
      "Integrated Box2DWeb rigid-body physics simulation to drive real-time collision detection, velocity impulses, and contact listeners at 60 FPS.",
      "Benchmarked critical rendering path performance, GPU draw calls, and memory footprint across prototype Samsung mobile hardware.",
      "Pioneered early mobile web graphics pipelines bridging JavaScript execution performance with hardware-accelerated Canvas rendering."
    ],
    technologies: [
      "WebGL",
      "HTML5 Canvas API",
      "Box2DWeb Physics",
      "Scene Graph Matrix Math",
      "JavaScript",
      "EaselJS",
      "Custom Chromium",
      "Mobile Performance"
    ],
    confidentialityNote: "Commercial R&D Benchmark Showcase."
  },
  {
    id: "industrial-data-platform",
    title: "Unified Industrial Data Platform & 3D Digital Twin",
    subtitle: "Event Streaming, Lakehouse, AI Telemetry & Primavera P6 4D Model",
    client: "Internal R&D Showcase",
    period: "2026",
    tracks: ["fullstack", "creative"],
    badge: "Active R&D Prototype",
    badgeColor: "bg-amber-500/10 text-amber-400 border-amber-500/20",
    summary:
      "Architected an integrated 'one dataset across five platforms' industrial architecture demonstrating cross-stack consistency across Data Warehouse, Delta Lake, Kafka streaming, and 3D spatial digital twin telemetry.",
    highlights: [
      "Engineered distributed microservices and polyglot data producers using Node.js and Java (Spring Boot) alongside Python, Go, and Rust feeding Apache Kafka (KRaft mode).",
      "Designed an integration intersection between Primavera P6 Enterprise Project Portfolio Management (PPM) schedule data and Three.js 3D spatial models to flag schedule risk and construction collisions in real time.",
      "Built an Industrial IoT (IIoT) telemetry pipeline ingesting simulated acoustic vibration and audio frequency anomaly sensor streams into Elasticsearch.",
      "Built a Node.js microservice API integrating OpenAI endpoints for natural language query translation (text-to-SQL/DAX) and anomaly detection.",
      "Benchmarked cross-platform calculation parity and query performance across Power BI, Tableau, Grafana, and Looker Studio."
    ],
    technologies: [
      "Node.js",
      "Java (Spring Boot)",
      "Apache Kafka (KRaft)",
      "Three.js / WebGL",
      "Primavera P6 (PPM)",
      "Delta Lake",
      "DuckDB",
      "Tableau",
      "Power BI",
      "IIoT Acoustic Telemetry",
      "OpenAI API",
      "Docker"
    ],
    confidentialityNote: "Active Technical Prototype & Architecture Laboratory."
  },
  {
    id: "florida-blue",
    title: "Accessible Health Insurance Portals & Quoting Funnels",
    subtitle: "Enterprise Member Workflows, Quoting Engines & WCAG 2.1 Systems",
    client: "Florida Blue (GuideWell)",
    period: "2020 – 2024",
    tracks: ["design", "fullstack"],
    badge: "Insurance UX & Architecture",
    badgeColor: "bg-sky-500/10 text-sky-400 border-sky-500/20",
    summary:
      "Designed and developed high-traffic health insurance enrollment funnels, quoting engines, and member self-service portals with strict adherence to Section 508 and WCAG 2.1 AA accessibility standards.",
    highlights: [
      "Architected multi-step digital quoting and enrollment funnels reducing user cognitive load and checkout drop-off.",
      "Engineered accessible design system components adhering strictly to WCAG 2.1 AA (color contrast, keyboard focus rings, screen-reader semantics).",
      "Designed responsive forms with complex client-side validation state machines handling multi-tier insurance eligibility rules.",
      "Collaborated with product designers, actuaries, and enterprise engineering teams to deliver high-converting, compliant insurance workflows."
    ],
    technologies: [
      "UI/UX Design",
      "Quoting Funnels",
      "WCAG 2.1 AA",
      "Section 508",
      "Design Systems",
      "React",
      "TypeScript",
      "Java (Spring Boot)",
      "Figma"
    ],
    confidentialityNote: "Enterprise Health Insurance Platform."
  }
];

export default function Home() {
  const [activeTrack, setActiveTrack] = useState<Track>("all");

  const filteredProjects = useMemo(() => {
    if (activeTrack === "all") return projects;
    return projects.filter((p) => p.tracks.includes(activeTrack));
  }, [activeTrack]);

  return (
    <div className="flex flex-col min-h-screen">
      {/* Top Navigation */}
      <header className="sticky top-0 z-50 backdrop-blur-md bg-slate-950/80 border-b border-slate-800/80">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="h-8 w-8 rounded-lg bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center font-bold text-white shadow-lg shadow-cyan-500/20">
              CD
            </span>
            <span className="font-semibold text-slate-100 tracking-tight">
              Christopher Demeter
            </span>
          </div>

          <nav className="flex items-center gap-6 text-sm text-slate-400">
            <a
              href="#projects"
              className="hover:text-cyan-400 transition-colors"
            >
              Work
            </a>
            <a
              href="https://github.com/cdemeter"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-cyan-400 transition-colors"
            >
              GitHub
            </a>
            <a
              href="https://www.linkedin.com/in/christopherdemeter"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-cyan-400 transition-colors"
            >
              LinkedIn
            </a>
            <a
              href="mailto:cdemeter@mac.com"
              className="hidden sm:inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-medium bg-cyan-500/10 text-cyan-300 border border-cyan-500/20 hover:bg-cyan-500/20 transition-all"
            >
              Get in Touch
            </a>
          </nav>
        </div>
      </header>

      <main className="flex-1 max-w-6xl w-full mx-auto px-6 py-12 md:py-16 space-y-16">
        {/* Hero Section */}
        <section className="space-y-6 pt-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono bg-slate-900 border border-slate-800 text-slate-400">
            <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
            Full Stack Developer · UX Engineer · Creative Technologist
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white max-w-3xl leading-[1.1]">
            Bridging complex distributed systems, human-centered UI/UX design,
            and real-time graphics.
          </h1>

          <p className="text-lg text-slate-400 max-w-2xl leading-relaxed">
            20+ years delivering enterprise software, accessible design systems,
            and operational intelligence platforms across web, desktop, and cloud.
            Grounding advanced technical architecture in cognitive usability and
            operator empathy.
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <a
              href="mailto:cdemeter@mac.com"
              className="px-5 py-2.5 rounded-lg text-sm font-medium bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg shadow-cyan-500/20 hover:brightness-110 transition-all"
            >
              Contact Christopher
            </a>
            <a
              href="https://www.linkedin.com/in/christopherdemeter"
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2.5 rounded-lg text-sm font-medium bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-800 transition-colors"
            >
              LinkedIn Profile
            </a>
            <a
              href="https://github.com/cdemeter"
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2.5 rounded-lg text-sm font-medium bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-800 transition-colors"
            >
              GitHub Profile
            </a>
          </div>
        </section>

        {/* Phase 2 Teaser Banner */}
        <section className="rounded-2xl p-6 bg-gradient-to-r from-cyan-950/40 via-slate-900 to-blue-950/40 border border-cyan-500/20 relative overflow-hidden">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="inline-flex items-center gap-2 text-xs font-mono font-medium text-cyan-400">
                <span>Phase 2 Laboratory Teaser</span>
                <span className="text-slate-600">|</span>
                <span>Coming Soon</span>
              </div>
              <h2 className="text-base sm:text-lg font-semibold text-white">
                Interactive Three.js + Houdini VAT Paper Simulation & Classic Mesh Trash Can
              </h2>
              <p className="text-xs sm:text-sm text-slate-400 max-w-xl">
                A real-time WebGL experiment exploring offline cloth/paper deformation
                baked into Vertex Animation Textures (VAT), paired with low-latency Web Audio API
                crinkle synthesis and desktop throw physics.
              </p>
            </div>
            <span className="px-3 py-1.5 rounded-lg text-xs font-mono text-cyan-300 bg-cyan-500/10 border border-cyan-500/30 whitespace-nowrap">
              Active Prototyping
            </span>
          </div>
        </section>

        {/* 3-Track Filter Tabs */}
        <section id="projects" className="space-y-8 scroll-mt-24">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-5">
            <div>
              <h2 className="text-2xl font-bold tracking-tight text-white">
                Featured Case Studies &amp; Systems
              </h2>
              <p className="text-sm text-slate-400 mt-1">
                Filter by architectural discipline or browse the complete portfolio.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-1.5 p-1 rounded-xl bg-slate-900 border border-slate-800">
              <button
                onClick={() => setActiveTrack("all")}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  activeTrack === "all"
                    ? "bg-cyan-500 text-slate-950 shadow-md font-semibold"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                All Work ({projects.length})
              </button>
              <button
                onClick={() => setActiveTrack("fullstack")}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  activeTrack === "fullstack"
                    ? "bg-cyan-500 text-slate-950 shadow-md font-semibold"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                💻 Full-Stack &amp; Systems
              </button>
              <button
                onClick={() => setActiveTrack("design")}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  activeTrack === "design"
                    ? "bg-cyan-500 text-slate-950 shadow-md font-semibold"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                🎨 UI/UX &amp; Design Systems
              </button>
              <button
                onClick={() => setActiveTrack("creative")}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  activeTrack === "creative"
                    ? "bg-cyan-500 text-slate-950 shadow-md font-semibold"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                🕹️ 3D, WebGL &amp; Creative Media
              </button>
            </div>
          </div>

          {/* Project Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredProjects.map((project) => (
              <article
                key={project.id}
                className="rounded-2xl p-6 bg-slate-900/60 border border-slate-800/80 hover:border-slate-700/80 transition-all flex flex-col justify-between group space-y-5"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between gap-2">
                    <span
                      className={`px-2.5 py-0.5 rounded-full text-xs font-medium border ${project.badgeColor}`}
                    >
                      {project.badge}
                    </span>
                    <span className="text-xs font-mono text-slate-500">
                      {project.client} · {project.period}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-xl font-bold text-white group-hover:text-cyan-400 transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-xs font-medium text-slate-400 mt-0.5">
                      {project.subtitle}
                    </p>
                  </div>

                  <p className="text-sm text-slate-300 leading-relaxed">
                    {project.summary}
                  </p>

                  <div className="space-y-2 pt-1">
                    <span className="text-xs font-mono font-semibold text-slate-400 uppercase tracking-wider block">
                      Engineering &amp; UX Highlights:
                    </span>
                    <ul className="space-y-1.5">
                      {project.highlights.map((h, i) => (
                        <li
                          key={i}
                          className="text-xs text-slate-400 flex items-start gap-2 leading-normal"
                        >
                          <span className="text-cyan-400 mt-0.5">›</span>
                          <span>{h}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="space-y-3 pt-3 border-t border-slate-800/60">
                  <div className="flex flex-wrap gap-1.5">
                    {project.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-0.5 rounded text-[11px] font-mono bg-slate-800/80 text-slate-300 border border-slate-700/50"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {project.confidentialityNote && (
                    <p className="text-[10px] font-mono text-slate-500 italic">
                      {project.confidentialityNote}
                    </p>
                  )}
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* NDA & Confidentiality Statement */}
        <section className="rounded-xl p-5 bg-slate-900/40 border border-slate-800 text-xs text-slate-400 font-mono space-y-1.5">
          <span className="text-slate-300 font-semibold block uppercase tracking-wider text-[11px]">
            Enterprise Client Confidentiality &amp; Technical Labs Notice
          </span>
          <p>
            Enterprise client engagements (e.g. PBF Energy, Toledo Refining Company,
            Florida Blue) are subject to client confidentiality and non-disclosure
            agreements (NDA); proprietary internal operational datasets and production code
            cannot be distributed publicly. Independent R&amp;D showcases represent active
            technical prototypes and architecture laboratories. Additional sanitized case studies
            and technical walkthroughs are available upon request.
          </p>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-900 bg-slate-950 py-8 text-center text-xs text-slate-500 font-mono">
        <div className="max-w-6xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <span>
            © {new Date().getFullYear()} Christopher Demeter. All rights reserved.
          </span>
          <span>
            Built with Next.js 16, TypeScript &amp; Tailwind CSS · Static Export on DreamHost
          </span>
        </div>
      </footer>
    </div>
  );
}
