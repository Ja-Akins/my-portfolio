import { useState, useEffect, useRef } from "react";

// ─── DATA ────────────────────────────────────────────────────────────────────

const NAV_LINKS = ["About", "Projects", "Insight", "Skills", "Experience", "Contact"];

const PROJECTS = [
  {
    id: 1,
    title: "Supervised Weather Classification",
    subtitle: "ClimateWins — European Climate Prediction",
    context: "A European nonprofit needed a reliable ML system to predict dangerous weather conditions across 18 stations — false negatives carried real safety consequences.",
    overview: "End-to-end supervised binary classification pipeline built on 10 years of ECA&D weather data (3,653 daily records). The system predicts whether daily conditions at a given station will be favorable or unfavorable.",
    methodology: "Chronological train/test split (2000–2007 / 2008–2009) to prevent temporal leakage. Feature selection reduced 165 columns to 5 validated predictors via Pearson correlation and multicollinearity assessment. Decision Tree vs KNN model comparison focused on false positive reduction.",
    impact: "98.2% test accuracy — 21.8pp above majority-class baseline. False positives reduced by 82% (8 vs 45). Zero overfitting. Delivered stakeholder presentation + formal ethical analysis.",
    tools: ["Python", "scikit-learn", "pandas", "NumPy", "matplotlib", "seaborn", "Jupyter"],
    github: "https://github.com/Ja-Akins/ClimateWins-Machine-Learning",
    tag: "Machine Learning",
    highlight: "98.2% Accuracy",
  },
  {
    id: 2,
    title: "Movies Data Analysis",
    subtitle: "TMDB 5000 Dataset — Commercial Success Drivers",
    context: "What actually makes a film commercially successful and critically acclaimed? Budget alone does not explain the variance.",
    overview: "Advanced EDA on the TMDB 5000 Movie Dataset identifying the factors that drive both box office performance and critic scores: from budget and genre to casting, release timing, and production geography.",
    methodology: "EDA across multiple dimensions. Genre clustering, budget-to-revenue correlation, seasonal release analysis, and cast network mapping. Findings surfaced in an interactive Streamlit dashboard.",
    impact: "Identified key commercial success predictors including production budget tiers, genre combinations, and seasonal release windows. Dashboard enables interactive film performance storytelling.",
    tools: ["Python", "pandas", "matplotlib", "seaborn", "Streamlit", "Jupyter"],
    github: "https://github.com/Ja-Akins/Movies-Data-Analysis",
    tag: "EDA & Visualization",
    highlight: "Interactive Dashboard",
  },
  {
    id: 3,
    title: "World Layoffs SQL Analysis",
    subtitle: "Global Workforce Trends 2020–2023",
    context: "The post-pandemic period triggered unprecedented global layoffs. Understanding the scale, timing, and sectoral concentration required rigorous data transformation before any insight was possible.",
    overview: "End-to-end SQL project: raw data ingestion, structured cleaning and standardisation, followed by deep exploratory analysis of global layoff patterns across industries, geographies, and funding stages.",
    methodology: "Multi-stage SQL pipeline: deduplication, NULL handling, standardisation, and feature derivation. Analysis used CTEs, window functions, rolling aggregations, and GROUP BY hierarchies to surface macro and micro trends.",
    impact: "Mapped workforce contraction patterns across 2020–2023, identifying peak layoff months, most-affected industries, and company-stage vulnerability. Demonstrates production-grade SQL for business intelligence.",
    tools: ["SQL", "MySQL", "CTEs", "Window Functions", "Data Cleaning"],
    github: "https://github.com/Ja-Akins/World-Layoffs-SQL-Data-Analysis",
    tag: "SQL & BI",
    highlight: "End-to-End Pipeline",
  },
  {
    id: 4,
    title: "G7 vs Africa Economic Analysis",
    subtitle: "Comparative Economic Resilience via World Bank API",
    context: "How do Africa's leading emerging economies compare against G7 nations in resilience to economic shocks? A question requiring live data, not snapshots.",
    overview: "Comparative analysis of economic resilience using a live ETL pipeline integrated with the World Bank API. Covers GDP trajectories, debt utilisation efficiency, and shock recovery patterns across two geopolitical blocs.",
    methodology: "Live ETL pipeline using concurrent futures for parallel API requests. SQL/MySQL for debt utilisation analysis. Tableau and Seaborn for multi-dimensional visualisation of economic indicators.",
    impact: "Revealed asymmetric shock recovery patterns and debt efficiency divergences between G7 and African economies. Demonstrates full-stack data engineering from API ingestion to business insight.",
    tools: ["Python", "pandas", "SQL", "MySQL", "Tableau", "Seaborn", "World Bank API"],
    github: "https://github.com/Ja-Akins/G7-vs-Africa-Economic-Analysis",
    tag: "Data Engineering",
    highlight: "Live ETL Pipeline",
  },
  {
    id: 5,
    title: "Telco Customer Churn Analysis",
    subtitle: "Churn Drivers & Retention Strategy",
    context: "Telecom companies lose significant revenue to preventable churn. Identifying the behavioural and contractual drivers is the first step to retention.",
    overview: "Customer churn analysis identifying the key predictors of customer departure — from contract type and payment method to tenure and service bundle configuration.",
    methodology: "Python for EDA and feature analysis. Power BI dashboard for business-facing visualisation of churn segments, risk cohorts, and retention opportunity mapping.",
    impact: "Surfaced high-risk customer segments and retention levers. Delivered a Power BI dashboard enabling non-technical stakeholders to explore churn drivers interactively.",
    tools: ["Python", "pandas", "Power BI", "matplotlib", "seaborn"],
    github: "https://github.com/Ja-Akins/Telco-Customer-Churn-Analysis",
    tag: "Business Analytics",
    highlight: "Power BI Dashboard",
  },
];

const SKILLS_TECH = [
  { name: "Python", level: 93 },
  { name: "SQL / MySQL", level: 88 },
  { name: "Power BI", level: 89 },
  { name: "Tableau", level: 82 },
  { name: "Excel", level: 91 },
  { name: "scikit-learn", level: 89 },
  { name: "pandas / NumPy", level: 91 },
  { name: "Data Visualization", level: 92 },
];

const SKILLS_ANALYTICAL = [
  "Exploratory Data Analysis",
  "Machine Learning Pipelines",
  "Data Storytelling",
  "KPI Dashboard Design",
  "ETL / Data Engineering",
  "Business Analysis",
  "Statistical Modelling",
  "Stakeholder Communication",
  "Feature Engineering",
  "Trend & Pattern Analysis",
  "Data Cleaning & Validation",
  "Ethical AI Practice",
];

const EXPERIENCE = [
  {
    role: "Data Analyst / Business Analyst",
    company: "FegoBit Tech Solutions",
    period: "2024 – Present",
    type: "Intern → Full-Time",
    bullets: [
      "Analysed business and operational datasets (300+ records) to identify trends, inefficiencies, and improvement opportunities; communicated findings to stakeholders across 3 teams.",
      "Produced weekly and monthly management reports using Excel, SQL, and Power BI, supporting decision-making for operations and planning teams.",
      "Designed and maintained Power BI and Excel dashboards tracking 8–12 KPIs, improving visibility into performance and operational metrics.",
      "Reduced manual reporting effort by ~15–20% through data cleaning, standardisation, and Excel automation.",
      "Collaborated with stakeholders to translate business questions into clear analytical insights and actionable recommendations.",
    ],
  },
];

const CERTS = [
  {
    title: "Machine Learning with Python",
    org: "CareerFoundry",
    year: "2025",
    detail: "Supervised & Unsupervised Learning — Decision Trees, KNN, feature engineering, end-to-end ML pipelines",
  },
  {
    title: "Data Analytics & Business Intelligence",
    org: "Alex The Analyst",
    year: "2024–2025",
    detail: "SQL, Excel, Python for data analysis — portfolio-based analytics projects",
  },
];

// ─── HOOKS ───────────────────────────────────────────────────────────────────

function useInView(threshold = 0.15) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true); },
      { threshold }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);
  return [ref, inView];
}

function FadeIn({ children, delay = 0, className = "" }) {
  const [ref, inView] = useInView();
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(28px)",
        transition: `opacity 0.7s ease ${delay}s, transform 0.7s ease ${delay}s`,
      }}
    >
      {children}
    </div>
  );
}

function SkillBar({ name, level, delay }) {
  const [ref, inView] = useInView();
  return (
    <div ref={ref} className="mb-5">
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
        <span style={{ fontSize: "0.8rem", fontWeight: 500, color: "#d6d3d1", letterSpacing: "0.02em" }}>{name}</span>
<span style={{ fontSize: "0.7rem", color: "#fbbf24", fontWeight: 700, background: "rgba(251,191,36,0.1)", padding: "2px 8px", borderRadius: 6 }}>{level}%</span>
      </div>
      <div style={{ height: 5, background: "#292524", borderRadius: 999, overflow: "hidden" }}>
        <div
          style={{
            width: inView ? `${level}%` : "0%",
            height: "100%",
            borderRadius: 999,
            background: "linear-gradient(90deg, #d97706, #fbbf24)",
            transition: `width 1.1s cubic-bezier(0.4,0,0.2,1) ${delay}s`,
          }}
        />
      </div>
    </div>
  );
}

function ProjectCard({ project, index }) {
  const [expanded, setExpanded] = useState(false);
  const [ref, inView] = useInView(0.1);

  return (
    <div
      ref={ref}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(36px)",
        transition: `opacity 0.65s ease ${index * 0.1}s, transform 0.65s ease ${index * 0.1}s`,
        background: "#111110",
        border: "1px solid #292524",
        borderRadius: 20,
        overflow: "hidden",
      }}
      className="group hover:shadow-2xl transition-all duration-500"
      onMouseEnter={e => e.currentTarget.style.borderColor = "rgba(251,191,36,0.3)"}
      onMouseLeave={e => e.currentTarget.style.borderColor = "#292524"}
    >
      <div style={{ height: 1, background: "linear-gradient(90deg, transparent, rgba(251,191,36,0.5), transparent)" }} />

      <div style={{ padding: "1.75rem" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1rem" }}>
          <span style={{
            fontSize: "0.65rem", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase",
            color: "rgba(251,191,36,0.8)", background: "rgba(251,191,36,0.08)",
            padding: "4px 10px", borderRadius: 999, border: "1px solid rgba(251,191,36,0.18)"
          }}>
            {project.tag}
          </span>
          <span style={{
            fontSize: "0.7rem", fontWeight: 700, color: "#fbbf24",
            background: "#1c1917", padding: "4px 10px", borderRadius: 999
          }}>
            {project.highlight}
          </span>
        </div>

        <h3 style={{ fontSize: "1.15rem", fontWeight: 800, color: "#fff", marginBottom: 4, lineHeight: 1.3, fontFamily: "Georgia, serif" }}>
          {project.title}
        </h3>
        <p style={{ fontSize: "0.78rem", color: "rgba(251,191,36,0.65)", marginBottom: "1rem", fontWeight: 500 }}>
          {project.subtitle}
        </p>
        <p style={{ fontSize: "0.83rem", color: "#78716c", lineHeight: 1.7, marginBottom: "1rem" }}>
          {project.context}
        </p>

        {expanded && (
          <div style={{ borderTop: "1px solid #292524", paddingTop: "1rem", marginTop: "0.5rem" }}>
            {[
              { label: "Overview", text: project.overview, color: "#a8a29e" },
              { label: "Methodology", text: project.methodology, color: "#a8a29e" },
              { label: "Business Impact", text: project.impact, color: "#e7e5e4", weight: 500 },
            ].map(item => (
              <div key={item.label} style={{ marginBottom: "1rem" }}>
                <p style={{ fontSize: "0.62rem", textTransform: "uppercase", letterSpacing: "0.12em", color: "rgba(251,191,36,0.5)", fontWeight: 700, marginBottom: 6 }}>
                  {item.label}
                </p>
                <p style={{ fontSize: "0.8rem", color: item.color, lineHeight: 1.7, fontWeight: item.weight || 400 }}>
                  {item.text}
                </p>
              </div>
            ))}
          </div>
        )}

        <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginTop: "1.25rem" }}>
          {project.tools.map(t => (
            <span key={t} style={{
              fontSize: "0.7rem", color: "#78716c", background: "#1c1917",
              padding: "4px 10px", borderRadius: 8, border: "1px solid #292524"
            }}>
              {t}
            </span>
          ))}
        </div>

        <div style={{ display: "flex", gap: 10, marginTop: "1.5rem" }}>
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "inline-flex", alignItems: "center", gap: 6,
              fontSize: "0.78rem", fontWeight: 700,
              color: "#111110", background: "#fbbf24",
              padding: "8px 16px", borderRadius: 10,
              textDecoration: "none", transition: "background 0.2s"
            }}
            onMouseEnter={e => e.currentTarget.style.background = "#fcd34d"}
            onMouseLeave={e => e.currentTarget.style.background = "#fbbf24"}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/>
            </svg>
            GitHub
          </a>
          <button
            onClick={() => setExpanded(!expanded)}
            style={{
              fontSize: "0.78rem", fontWeight: 600, color: "#fbbf24",
              background: "transparent", border: "1px solid rgba(251,191,36,0.3)",
              padding: "8px 16px", borderRadius: 10, cursor: "pointer", transition: "all 0.2s"
            }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = "rgba(251,191,36,0.7)"; e.currentTarget.style.color = "#fcd34d"; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(251,191,36,0.3)"; e.currentTarget.style.color = "#fbbf24"; }}
          >
            {expanded ? "Show less" : "Case study ↓"}
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── NAV ─────────────────────────────────────────────────────────────────────

function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const go = (id) => {
    document.getElementById(id.toLowerCase())?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  return (
    <nav style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 50,
      background: scrolled ? "rgba(12,10,9,0.96)" : "transparent",
      backdropFilter: scrolled ? "blur(20px)" : "none",
      borderBottom: scrolled ? "1px solid rgba(251,191,36,0.1)" : "none",
      transition: "all 0.4s ease",
    }}>
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 1.5rem", height: 64, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <span style={{ fontWeight: 900, color: "#fff", fontSize: "1.1rem", letterSpacing: "-0.02em", fontFamily: "Georgia, serif" }}>
          BA<span style={{ color: "#fbbf24" }}>.</span>
        </span>

        <div style={{ display: "flex", alignItems: "center", gap: "1.75rem" }} className="desktop-nav">
          {NAV_LINKS.map(link => (
            <button key={link} onClick={() => go(link)} style={{
              fontSize: "0.8rem", fontWeight: 500, color: "#a8a29e",
              background: "none", border: "none", cursor: "pointer", transition: "color 0.2s", letterSpacing: "0.04em"
            }}
            onMouseEnter={e => e.currentTarget.style.color = "#fbbf24"}
            onMouseLeave={e => e.currentTarget.style.color = "#a8a29e"}
            >
              {link}
            </button>
          ))}
          <button onClick={() => go("Contact")} style={{
            fontSize: "0.78rem", fontWeight: 700, color: "#111110",
            background: "#fbbf24", border: "none", padding: "8px 18px", borderRadius: 10, cursor: "pointer"
          }}
          onMouseEnter={e => e.currentTarget.style.background = "#fcd34d"}
          onMouseLeave={e => e.currentTarget.style.background = "#fbbf24"}
          >
            Hire me
          </button>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) { .desktop-nav { display: none !important; } }
      `}</style>
    </nav>
  );
}

// ─── HERO ────────────────────────────────────────────────────────────────────

function Hero() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setTimeout(() => setMounted(true), 120); }, []);
  const go = (id) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <section id="hero" style={{
      minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center",
      position: "relative", overflow: "hidden",
      background: "linear-gradient(135deg, #0c0a09 0%, #1a0e04 50%, #0c0a09 100%)"
    }}>
      {/* Grid */}
      <div style={{
        position: "absolute", inset: 0, opacity: 0.18,
        backgroundImage: "linear-gradient(rgba(251,191,36,0.07) 1px, transparent 1px), linear-gradient(90deg, rgba(251,191,36,0.07) 1px, transparent 1px)",
        backgroundSize: "55px 55px"
      }} />
      {/* Glow */}
      <div style={{
        position: "absolute", top: "50%", left: "50%",
        transform: "translate(-50%, -50%)",
        width: 600, height: 600, borderRadius: "50%", pointerEvents: "none",
        background: "radial-gradient(circle, rgba(251,191,36,0.08) 0%, transparent 70%)"
      }} />

      {/* Floating stats */}
      {[
        { label: "98.2%", sub: "ML Accuracy", style: { top: "20%", left: "4%" } },
        { label: "82%", sub: "False Pos. Cut", style: { bottom: "22%", left: "4%" } },
        { label: "8–12", sub: "KPIs Tracked", style: { top: "20%", right: "4%" } },
        { label: "300+", sub: "Records Analysed", style: { bottom: "22%", right: "4%" } },
      ].map(item => (
        <div key={item.label} style={{
          position: "absolute", textAlign: "center", ...item.style,
          display: window.innerWidth > 1024 ? "block" : "none"
        }}>
          <div style={{
            background: "rgba(17,17,16,0.9)", border: "1px solid rgba(251,191,36,0.2)",
            borderRadius: 14, padding: "12px 16px", backdropFilter: "blur(8px)"
          }}>
            <div style={{ fontSize: "1.3rem", fontWeight: 800, color: "#fbbf24", fontFamily: "Georgia, serif" }}>{item.label}</div>
            <div style={{ fontSize: "0.65rem", color: "#78716c", marginTop: 2, whiteSpace: "nowrap" }}>{item.sub}</div>
          </div>
        </div>
      ))}

      {/* Main content */}
      <div style={{ position: "relative", zIndex: 10, textAlign: "center", padding: "0 1.5rem", maxWidth: 820, margin: "0 auto" }}>
        {/* Avatar */}
        <div style={{
          width: 88, height: 88, borderRadius: "50%", margin: "0 auto 2rem",
          border: "2px solid rgba(251,191,36,0.4)",
          background: "linear-gradient(135deg, #292524, #1c1917)",
          display: "flex", alignItems: "center", justifyContent: "center",
          opacity: mounted ? 1 : 0, transform: mounted ? "scale(1)" : "scale(0.8)",
          transition: "opacity 0.7s ease 0.1s, transform 0.7s ease 0.1s"
        }}>
          <img
  src="benjamin_headshot.jpg"
  style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: "50%" }}
  alt="Benjamin Akingbade"
/>
        </div>

        <div style={{
          opacity: mounted ? 1 : 0, transform: mounted ? "translateY(0)" : "translateY(24px)",
          transition: "opacity 0.8s ease 0.3s, transform 0.8s ease 0.3s"
        }}>
          <p style={{ fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.3em", textTransform: "uppercase", color: "#fbbf24", marginBottom: "1rem" }}>
            Data/ Business Analyst · Data Scientist
          </p>

          <h1 style={{
            fontFamily: "Georgia, serif", fontWeight: 900, lineHeight: 1.0, color: "#fff",
            fontSize: "clamp(3.2rem, 9vw, 6.5rem)", letterSpacing: "-0.025em", marginBottom: "1.5rem"
          }}>
            Benjamin<br />
            <span style={{ WebkitTextStroke: "1.5px rgba(251,191,36,0.55)", color: "transparent" }}>
              Akingbade
            </span>
          </h1>

          <p style={{ fontSize: "1.05rem", color: "#78716c", maxWidth: 500, margin: "0 auto 2.5rem", lineHeight: 1.75 }}>
            I turn complex data into clear decisions - from ML pipelines achieving{" "}
            <span style={{ color: "#fbbf24", fontWeight: 600 }}>98.2% accuracy</span> to dashboards
            that drive stakeholder action.
          </p>

          <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "0.75rem" }}>
            <button onClick={() => go("projects")} style={{
              padding: "12px 28px", background: "#fbbf24", color: "#111110",
              fontWeight: 700, borderRadius: 12, border: "none", cursor: "pointer",
              fontSize: "0.82rem", letterSpacing: "0.04em", transition: "all 0.2s"
            }}
            onMouseEnter={e => { e.currentTarget.style.background = "#fcd34d"; e.currentTarget.style.transform = "scale(1.04)"; }}
            onMouseLeave={e => { e.currentTarget.style.background = "#fbbf24"; e.currentTarget.style.transform = "scale(1)"; }}
            >
              View Projects
            </button>
            <a href="mailto:ja.akingbade@gmail.com" style={{
              padding: "12px 28px", border: "1px solid rgba(251,191,36,0.35)", color: "#fbbf24",
              fontWeight: 600, borderRadius: 12, cursor: "pointer", fontSize: "0.82rem",
              textDecoration: "none", transition: "all 0.2s"
            }}
            onMouseEnter={e => e.currentTarget.style.borderColor = "rgba(251,191,36,0.8)"}
            onMouseLeave={e => e.currentTarget.style.borderColor = "rgba(251,191,36,0.35)"}
            >
              Contact Me
            </a>
            <a href="Benjamin_Akingbade_CV.pdf" style={{
              padding: "12px 28px", border: "1px solid #292524", color: "#a8a29e",
              fontWeight: 600, borderRadius: 12, cursor: "pointer", fontSize: "0.82rem",
              display: "flex", alignItems: "center", gap: 8, textDecoration: "none", transition: "all 0.2s"
            }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = "#44403c"; e.currentTarget.style.color = "#d6d3d1"; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = "#292524"; e.currentTarget.style.color = "#a8a29e"; }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3"/>
              </svg>
              Download CV
            </a>
          </div>
        </div>
      </div>

      <div style={{ position: "absolute", bottom: 32, left: "50%", transform: "translateX(-50%)", textAlign: "center", opacity: 0.35 }}>
        <p style={{ fontSize: "0.6rem", letterSpacing: "0.25em", textTransform: "uppercase", color: "#78716c", marginBottom: 8 }}>Scroll</p>
        <div style={{ width: 1, height: 48, background: "linear-gradient(to bottom, rgba(251,191,36,0.5), transparent)", margin: "0 auto" }} />
      </div>
    </section>
  );
}

// ─── ABOUT ───────────────────────────────────────────────────────────────────

function About() {
  return (
    <section id="about" style={{ padding: "7rem 1.5rem", background: "#0e0c0b" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "4rem", alignItems: "center" }}>
        <FadeIn>
          <p style={{ fontSize: "0.62rem", fontWeight: 700, letterSpacing: "0.3em", textTransform: "uppercase", color: "#fbbf24", marginBottom: "1rem" }}>About</p>
          <h2 style={{ fontFamily: "Georgia, serif", fontSize: "clamp(2rem, 4vw, 2.75rem)", fontWeight: 900, color: "#fff", marginBottom: "1.5rem", lineHeight: 1.15 }}>
            Data that drives<br /><span style={{ color: "#fbbf24" }}>real decisions.</span>
          </h2>
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem", color: "#78716c", lineHeight: 1.8, fontSize: "0.88rem" }}>
            <p>I'm a Data Analyst and Machine Learning practitioner with applied and practical experience turning messy, complex datasets into clear, actionable intelligence. My work spans the full analytical stack: from SQL pipelines and Python EDA to supervised ML models and Power BI dashboards.</p>
            <p>At FegoBit Tech Solutions, I've built KPI dashboards, automated reporting workflows, and delivered analysis to stakeholders across multiple teams. Beyond the day job, I've independently shipped five portfolio projects covering economic resilience, customer churn, weather prediction, and film analytics.</p>
            <p>I care deeply about rigour and interpretability — my ML work prioritises explainability and ethical analysis alongside performance metrics. Good data science means stakeholders can understand and trust the outputs.</p>
          </div>
        </FadeIn>

        <FadeIn delay={0.15}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", marginBottom: "1rem" }}>
            {[
              { value: "5+", label: "Analytics Projects" },
              { value: "98.2%", label: "ML Accuracy" },
              { value: "8–12", label: "KPIs Per Dashboard" },
              { value: "3", label: "Stakeholder Teams" },
            ].map(s => (
              <div key={s.label} style={{
                background: "#111110", border: "1px solid #292524",
                borderRadius: 18, padding: "1.5rem",
                transition: "border-color 0.2s"
              }}
              onMouseEnter={e => e.currentTarget.style.borderColor = "rgba(251,191,36,0.3)"}
              onMouseLeave={e => e.currentTarget.style.borderColor = "#292524"}
              >
                <div style={{ fontSize: "2rem", fontWeight: 900, color: "#fbbf24", fontFamily: "Georgia, serif", marginBottom: 4 }}>{s.value}</div>
                <div style={{ fontSize: "0.75rem", color: "#57534e", fontWeight: 500 }}>{s.label}</div>
              </div>
            ))}
          </div>

          <div style={{
            background: "#111110", border: "1px solid #292524", borderRadius: 18, padding: "1.5rem"
          }}>
            <p style={{ fontSize: "0.62rem", textTransform: "uppercase", letterSpacing: "0.15em", color: "rgba(251,191,36,0.5)", fontWeight: 700, marginBottom: "0.75rem" }}>Education</p>
            <p style={{ fontSize: "0.9rem", fontWeight: 700, color: "#fff" }}>B.Tech, Industrial Chemistry</p>
            <p style={{ fontSize: "0.8rem", color: "#78716c", marginTop: 4 }}>Federal University of Technology, Akure</p>
            <p style={{ fontSize: "0.72rem", color: "#57534e", marginTop: 2 }}>2021 – 2026 · Ondo State, Nigeria</p>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

// ─── PROJECTS ────────────────────────────────────────────────────────────────

function Projects() {
  return (
    <section id="projects" style={{ padding: "7rem 1.5rem", background: "#0c0a09" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <FadeIn>
          <div style={{ textAlign: "center", marginBottom: "4rem" }}>
            <p style={{ fontSize: "0.62rem", fontWeight: 700, letterSpacing: "0.3em", textTransform: "uppercase", color: "#fbbf24", marginBottom: "1rem" }}>Portfolio</p>
            <h2 style={{ fontFamily: "Georgia, serif", fontSize: "clamp(2rem, 4vw, 2.75rem)", fontWeight: 900, color: "#fff", marginBottom: "1rem" }}>Featured Projects</h2>
            <p style={{ color: "#57534e", maxWidth: 480, margin: "0 auto", fontSize: "0.88rem", lineHeight: 1.7 }}>
              End-to-end analytics case studies — each one a real problem, a rigorous approach, and a measurable outcome.
            </p>
          </div>
        </FadeIn>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "1.25rem" }}>
          {PROJECTS.map((p, i) => <ProjectCard key={p.id} project={p} index={i} />)}
        </div>
      </div>
    </section>
  );
}

// ─── FEATURED INSIGHT ────────────────────────────────────────────────────────

function FeaturedInsight() {
  const [ref, inView] = useInView(0.1);
  return (
    <section id="insight" style={{ padding: "7rem 1.5rem", background: "#0e0c0b", overflow: "hidden" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <FadeIn>
          <div style={{ textAlign: "center", marginBottom: "4rem" }}>
            <p style={{ fontSize: "0.62rem", fontWeight: 700, letterSpacing: "0.3em", textTransform: "uppercase", color: "#fbbf24", marginBottom: "1rem" }}>Featured Insight</p>
            <h2 style={{ fontFamily: "Georgia, serif", fontSize: "clamp(2rem, 4vw, 2.75rem)", fontWeight: 900, color: "#fff" }}>
              A finding worth pausing for.
            </h2>
          </div>
        </FadeIn>

        <div ref={ref} style={{
          borderRadius: 28, border: "1px solid rgba(251,191,36,0.18)",
          background: "linear-gradient(135deg, #1a0e04 0%, #0e0a06 50%, #180d03 100%)",
          overflow: "hidden", position: "relative",
          opacity: inView ? 1 : 0, transform: inView ? "translateY(0)" : "translateY(36px)",
          transition: "opacity 0.8s ease, transform 0.8s ease"
        }}>
          <div style={{
            position: "absolute", top: -60, right: -60, width: 400, height: 400,
            borderRadius: "50%", background: "radial-gradient(circle, rgba(251,191,36,0.08) 0%, transparent 70%)", pointerEvents: "none"
          }} />

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))" }}>
            {/* Left */}
            <div style={{ padding: "3.5rem", borderRight: "1px solid rgba(251,191,36,0.08)" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: "1.5rem" }}>
                <div style={{
                  width: 36, height: 36, borderRadius: 10,
                  background: "rgba(251,191,36,0.12)", display: "flex", alignItems: "center", justifyContent: "center"
                }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#fbbf24" strokeWidth="2">
                    <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
                  </svg>
                </div>
                <span style={{ fontSize: "0.62rem", fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", color: "rgba(251,191,36,0.6)" }}>
                  ClimateWins · ML Project
                </span>
              </div>

              <h3 style={{ fontFamily: "Georgia, serif", fontSize: "clamp(1.4rem, 2.5vw, 1.85rem)", fontWeight: 900, color: "#fff", lineHeight: 1.3, marginBottom: "1.5rem" }}>
                Model choice is a <span style={{ color: "#fbbf24" }}>safety decision</span>, not just a performance metric.
              </h3>

              <p style={{ fontSize: "0.85rem", color: "#78716c", lineHeight: 1.8, marginBottom: "1.25rem" }}>
                When predicting dangerous weather conditions, false positives (labelling a dangerous day as safe) carry real human consequences. The KNN model produced{" "}
                <strong style={{ color: "#d6d3d1" }}>45 false positives</strong> vs the Decision Tree's{" "}
                <strong style={{ color: "#fbbf24" }}>8 false positives</strong>. That 82% reduction in dangerous misclassifications was the decisive factor; not overall accuracy.
              </p>

              <p style={{ fontSize: "0.78rem", color: "#57534e", lineHeight: 1.8 }}>
                This insight reframes model evaluation: in safety-critical contexts, the metric that matters is determined by the cost of each error type, not headline accuracy. The Decision Tree's interpretable decision path allowed stakeholders to audit every prediction.
              </p>
            </div>

            {/* Right */}
            <div style={{ padding: "3.5rem", display: "flex", flexDirection: "column", justifyContent: "center", gap: "2rem" }}>
              {[
                { label: "Decision Tree False Positives", value: "8", color: "#fbbf24" },
                { label: "KNN False Positives", value: "45", color: "#78716c" },
                { label: "Safety Risk Reduction", value: "82%", color: "#fbbf24" },
                { label: "Overall Test Accuracy", value: "98.2%", color: "#fff" },
              ].map(s => (
                <div key={s.label}>
                  <div style={{ fontSize: "2.8rem", fontWeight: 900, color: s.color, fontFamily: "Georgia, serif", lineHeight: 1 }}>{s.value}</div>
                  <div style={{ fontSize: "0.72rem", color: "#57534e", fontWeight: 500, marginTop: 4 }}>{s.label}</div>
                </div>
              ))}

              <div style={{ paddingTop: "1.5rem", borderTop: "1px solid #292524" }}>
                <a href="https://github.com/Ja-Akins/ClimateWins-Machine-Learning" target="_blank" rel="noopener noreferrer"
                  style={{ fontSize: "0.82rem", fontWeight: 600, color: "#fbbf24", textDecoration: "none" }}
                  onMouseEnter={e => e.currentTarget.style.color = "#fcd34d"}
                  onMouseLeave={e => e.currentTarget.style.color = "#fbbf24"}
                >
                  Read the full case study →
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── SKILLS ──────────────────────────────────────────────────────────────────

function Skills() {
  return (
    <section id="skills" style={{ padding: "7rem 1.5rem", background: "#0c0a09" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <FadeIn>
          <div style={{ textAlign: "center", marginBottom: "4rem" }}>
            <p style={{ fontSize: "0.62rem", fontWeight: 700, letterSpacing: "0.3em", textTransform: "uppercase", color: "#fbbf24", marginBottom: "1rem" }}>Capabilities</p>
            <h2 style={{ fontFamily: "Georgia, serif", fontSize: "clamp(2rem, 4vw, 2.75rem)", fontWeight: 900, color: "#fff" }}>Skills & Tools</h2>
          </div>
        </FadeIn>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "1.5rem" }}>
          <FadeIn delay={0.1}>
            <div style={{ background: "#111110", border: "1px solid #292524", borderRadius: 20, padding: "2rem" }}>
              <p style={{ fontSize: "0.62rem", textTransform: "uppercase", letterSpacing: "0.18em", color: "rgba(251,191,36,0.6)", fontWeight: 700, marginBottom: "1.75rem" }}>
                Technical Proficiency
              </p>
              {SKILLS_TECH.map((s, i) => <SkillBar key={s.name} name={s.name} level={s.level} delay={i * 0.07} />)}
            </div>
          </FadeIn>

          <FadeIn delay={0.2}>
            <div style={{ background: "#111110", border: "1px solid #292524", borderRadius: 20, padding: "2rem" }}>
              <p style={{ fontSize: "0.62rem", textTransform: "uppercase", letterSpacing: "0.18em", color: "rgba(251,191,36,0.6)", fontWeight: 700, marginBottom: "1.75rem" }}>
                Analytical Capabilities
              </p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: "2rem" }}>
                {SKILLS_ANALYTICAL.map(s => (
                  <span key={s} style={{
                    fontSize: "0.78rem", color: "#a8a29e", background: "#1c1917",
                    border: "1px solid #292524", padding: "7px 14px", borderRadius: 12,
                    transition: "border-color 0.2s", cursor: "default"
                  }}
                  onMouseEnter={e => e.currentTarget.style.borderColor = "rgba(251,191,36,0.4)"}
                  onMouseLeave={e => e.currentTarget.style.borderColor = "#292524"}
                  >
                    {s}
                  </span>
                ))}
              </div>

              <p style={{ fontSize: "0.62rem", textTransform: "uppercase", letterSpacing: "0.18em", color: "rgba(251,191,36,0.6)", fontWeight: 700, marginBottom: "1rem" }}>
                Certifications
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                {CERTS.map(c => (
                  <div key={c.title} style={{
                    border: "1px solid #292524", borderRadius: 14, padding: "1rem",
                    transition: "border-color 0.2s"
                  }}
                  onMouseEnter={e => e.currentTarget.style.borderColor = "rgba(251,191,36,0.25)"}
                  onMouseLeave={e => e.currentTarget.style.borderColor = "#292524"}
                  >
                    <div style={{ display: "flex", justifyContent: "space-between", gap: 8 }}>
                      <p style={{ fontSize: "0.82rem", fontWeight: 700, color: "#fff" }}>{c.title}</p>
                      <span style={{ fontSize: "0.72rem", color: "#fbbf24", fontWeight: 600, whiteSpace: "nowrap" }}>{c.year}</span>
                    </div>
                    <p style={{ fontSize: "0.7rem", color: "rgba(251,191,36,0.5)", marginTop: 2 }}>{c.org}</p>
                    <p style={{ fontSize: "0.72rem", color: "#57534e", marginTop: 6, lineHeight: 1.6 }}>{c.detail}</p>
                  </div>
                ))}
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}

// ─── EXPERIENCE ──────────────────────────────────────────────────────────────

function Experience() {
  return (
    <section id="experience" style={{ padding: "7rem 1.5rem", background: "#0e0c0b" }}>
      <div style={{ maxWidth: 800, margin: "0 auto" }}>
        <FadeIn>
          <div style={{ textAlign: "center", marginBottom: "4rem" }}>
            <p style={{ fontSize: "0.62rem", fontWeight: 700, letterSpacing: "0.3em", textTransform: "uppercase", color: "#fbbf24", marginBottom: "1rem" }}>Work History</p>
            <h2 style={{ fontFamily: "Georgia, serif", fontSize: "clamp(2rem, 4vw, 2.75rem)", fontWeight: 900, color: "#fff" }}>Experience</h2>
          </div>
        </FadeIn>

        {EXPERIENCE.map((job, i) => (
          <FadeIn key={job.role} delay={i * 0.1}>
            <div style={{
              background: "#111110", border: "1px solid #292524",
              borderRadius: 20, padding: "2.25rem", transition: "border-color 0.2s"
            }}
            onMouseEnter={e => e.currentTarget.style.borderColor = "rgba(251,191,36,0.2)"}
            onMouseLeave={e => e.currentTarget.style.borderColor = "#292524"}
            >
              <div style={{ display: "flex", flexWrap: "wrap", alignItems: "flex-start", justifyContent: "space-between", gap: "1rem", marginBottom: "1.5rem" }}>
                <div>
                  <h3 style={{ fontSize: "1.1rem", fontWeight: 800, color: "#fff" }}>{job.role}</h3>
                  <p style={{ fontSize: "0.85rem", color: "#fbbf24", fontWeight: 600, marginTop: 4 }}>{job.company}</p>
                  <p style={{ fontSize: "0.75rem", color: "#57534e", marginTop: 2 }}>{job.type}</p>
                </div>
                <span style={{
                  fontSize: "0.75rem", color: "#a8a29e", background: "#1c1917",
                  border: "1px solid #292524", padding: "6px 14px", borderRadius: 10, fontWeight: 500
                }}>
                  {job.period}
                </span>
              </div>

              <ul style={{ display: "flex", flexDirection: "column", gap: "0.875rem", listStyle: "none", padding: 0, margin: 0 }}>
                {job.bullets.map((b, bi) => (
                  <li key={bi} style={{ display: "flex", gap: "0.75rem", fontSize: "0.82rem", color: "#78716c", lineHeight: 1.75 }}>
                    <span style={{ color: "#fbbf24", marginTop: 6, flexShrink: 0 }}>▸</span>
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            </div>
          </FadeIn>
        ))}
      </div>
    </section>
  );
}

// ─── CV ──────────────────────────────────────────────────────────────────────

function CVSection() {
  return (
    <section style={{ padding: "5rem 1.5rem", background: "#0c0a09" }}>
      <div style={{ maxWidth: 700, margin: "0 auto", textAlign: "center" }}>
        <FadeIn>
          <p style={{ fontSize: "0.62rem", fontWeight: 700, letterSpacing: "0.3em", textTransform: "uppercase", color: "#fbbf24", marginBottom: "1rem" }}>Resume</p>
          <h2 style={{ fontFamily: "Georgia, serif", fontSize: "2.25rem", fontWeight: 900, color: "#fff", marginBottom: "1rem" }}>Want the full picture?</h2>
          <p style={{ color: "#57534e", marginBottom: "2.25rem", fontSize: "0.88rem" }}>
            Download my CV for a complete overview of experience, skills, and project work.
          </p>
          <a href="Benjamin_Akingbade_CV.pdf" style={{
            display: "inline-flex", alignItems: "center", gap: 10,
            background: "#fbbf24", color: "#111110", fontWeight: 700,
            padding: "14px 32px", borderRadius: 14, fontSize: "0.85rem",
            textDecoration: "none", transition: "all 0.2s"
          }}
          onMouseEnter={e => { e.currentTarget.style.background = "#fcd34d"; e.currentTarget.style.transform = "scale(1.04)"; }}
          onMouseLeave={e => { e.currentTarget.style.background = "#fbbf24"; e.currentTarget.style.transform = "scale(1)"; }}
          >
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3"/>
            </svg>
            Download CV — Benjamin Akingbade
          </a>
        </FadeIn>
      </div>
    </section>
  );
}

// ─── CONTACT ─────────────────────────────────────────────────────────────────

function Contact() {
  return (
    <section id="contact" style={{ padding: "7rem 1.5rem", background: "#0e0c0b" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "4rem", alignItems: "center" }}>
        <FadeIn>
          <p style={{ fontSize: "0.62rem", fontWeight: 700, letterSpacing: "0.3em", textTransform: "uppercase", color: "#fbbf24", marginBottom: "1rem" }}>Get in Touch</p>
          <h2 style={{ fontFamily: "Georgia, serif", fontSize: "clamp(2rem, 4vw, 2.75rem)", fontWeight: 900, color: "#fff", marginBottom: "1.25rem", lineHeight: 1.2 }}>
            Let's work<br /><span style={{ color: "#fbbf24" }}>together.</span>
          </h2>
          <p style={{ color: "#78716c", lineHeight: 1.8, marginBottom: "2rem", fontSize: "0.88rem" }}>
            Open to data analyst roles, data science opportunities, and internships. If you're building a data team or have a problem worth solving, I'd love to hear from you.
          </p>

          <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
            {[
              {
                label: "Email", value: "ja.akingbade@gmail.com", href: "mailto:ja.akingbade@gmail.com",
                icon: <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
              },
              {
                label: "LinkedIn", value: "linkedin.com/in/benjamin-akingbade", href: "https://linkedin.com/in/benjamin-akingbade-306022251",
                icon: <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z"/><circle cx="4" cy="4" r="2"/></svg>
              },
              {
                label: "GitHub", value: "github.com/Ja-Akins", href: "https://github.com/Ja-Akins",
                icon: <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/></svg>
              },
            ].map(item => (
              <a key={item.label} href={item.href} target="_blank" rel="noopener noreferrer" style={{
                display: "flex", alignItems: "center", gap: "1rem",
                padding: "1rem 1.25rem", background: "#111110",
                border: "1px solid #292524", borderRadius: 14,
                textDecoration: "none", transition: "border-color 0.2s"
              }}
              onMouseEnter={e => e.currentTarget.style.borderColor = "rgba(251,191,36,0.35)"}
              onMouseLeave={e => e.currentTarget.style.borderColor = "#292524"}
              >
                <div style={{
                  width: 40, height: 40, borderRadius: 10,
                  background: "rgba(251,191,36,0.1)", display: "flex", alignItems: "center", justifyContent: "center",
                  color: "#fbbf24"
                }}>
                  {item.icon}
                </div>
                <div>
                  <p style={{ fontSize: "0.65rem", color: "#57534e", fontWeight: 600, marginBottom: 2 }}>{item.label}</p>
                  <p style={{ fontSize: "0.82rem", color: "#a8a29e", fontWeight: 500 }}>{item.value}</p>
                </div>
              </a>
            ))}
          </div>
        </FadeIn>

        <FadeIn delay={0.2}>
          <div style={{
            borderRadius: 24, padding: "3rem 2.5rem", textAlign: "center",
            border: "1px solid rgba(251,191,36,0.15)",
            background: "linear-gradient(135deg, #1a0e04, #100c05)"
          }}>
            <div style={{
              width: 76, height: 76, borderRadius: "50%", margin: "0 auto 1.5rem",
              border: "1.5px solid rgba(251,191,36,0.3)",
              background: "linear-gradient(135deg, #292524, #1c1917)",
              display: "flex", alignItems: "center", justifyContent: "center"
            }}>
              <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="rgba(251,191,36,0.55)" strokeWidth="1.5">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z"/>
              </svg>
            </div>
            <h3 style={{ fontSize: "1.15rem", fontWeight: 800, color: "#fff", marginBottom: 4, fontFamily: "Georgia, serif" }}>Benjamin Akingbade</h3>
            <p style={{ fontSize: "0.78rem", color: "#fbbf24", fontWeight: 500, marginBottom: "1.75rem" }}>Data/ Business Analyst · Data Scientist</p>
            <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 8, marginBottom: "2rem" }}>
              {["Python", "SQL", "Power BI", "ML", "Tableau"].map(t => (
                <span key={t} style={{ fontSize: "0.7rem", background: "#1c1917", color: "#78716c", border: "1px solid #292524", padding: "5px 12px", borderRadius: 999 }}>{t}</span>
              ))}
            </div>
            <a href="mailto:ja.akingbade@gmail.com" style={{
              display: "block", textAlign: "center",
              background: "#fbbf24", color: "#111110",
              fontWeight: 700, padding: "12px", borderRadius: 12,
              fontSize: "0.82rem", textDecoration: "none", transition: "background 0.2s"
            }}
            onMouseEnter={e => e.currentTarget.style.background = "#fcd34d"}
            onMouseLeave={e => e.currentTarget.style.background = "#fbbf24"}
            >
              Send me a message
            </a>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

// ─── FOOTER ──────────────────────────────────────────────────────────────────

function Footer() {
  return (
    <footer style={{ borderTop: "1px solid #1c1917", background: "#0c0a09", padding: "2rem 1.5rem" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto", display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: "0.75rem" }}>
        <span style={{ fontSize: "0.78rem", color: "#44403c" }}>© 2026 Benjamin Akingbade</span>
        <span style={{ fontSize: "0.7rem", color: "#292524" }}>Data/Business Analyst · Data Scientist · Built for impact.</span>
      </div>
    </footer>
  );
}

// ─── APP ─────────────────────────────────────────────────────────────────────

export default function App() {
  return (
    <div style={{ background: "#0c0a09", fontFamily: "'DM Sans', 'Helvetica Neue', Arial, sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700;0,9..40,800;0,9..40,900&display=swap');
        html { scroll-behavior: smooth; }
        *, *::before, *::after { box-sizing: border-box; margin: 0; }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: #0c0a09; }
        ::-webkit-scrollbar-thumb { background: rgba(251,191,36,0.25); border-radius: 2px; }
        a { color: inherit; }
      `}</style>
      <Nav />
      <Hero />
      <About />
      <Projects />
      <FeaturedInsight />
      <Skills />
      <Experience />
      <CVSection />
      <Contact />
      <Footer />
    </div>
  );
}