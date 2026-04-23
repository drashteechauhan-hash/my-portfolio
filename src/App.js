import { useEffect, useRef } from "react";

// ✏️ STEP 1: Put your photo file (drashtee.jpg) inside the src/ folder
// ✏️ STEP 2: Uncomment the line below:
// import myPhoto from './drashtee.jpg';

// ✏️ OR if you put it in public/ folder, just use src="/drashtee.jpg" directly in the <img> tag below

const style = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;0,700;1,400;1,600&family=Syne:wght@400;500;600;700&family=JetBrains+Mono:wght@300;400;500&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  :root {
    --bg: #f5f0e8; --surface: #ede8de; --dark: #1a1510; --border: #d4ccc0;
    --accent: #8b4513; --accent2: #2d5016; --gold: #c8972e; --text: #1a1510; --muted: #7a6f62;
  }
  html { scroll-behavior: smooth; }
  body { background: var(--bg); color: var(--text); font-family: 'Syne', sans-serif; overflow-x: hidden; }

  .noise { position: fixed; inset: 0; pointer-events: none; z-index: 999; opacity: 0.04;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E"); }

  nav { position: fixed; top: 0; left: 0; right: 0; z-index: 100; padding: 1rem 6vw;
    display: flex; justify-content: space-between; align-items: center;
    background: rgba(245,240,232,0.9); backdrop-filter: blur(16px); border-bottom: 1px solid var(--border); }
  .nav-logo { font-family: 'Cormorant Garamond', serif; font-size: 1.3rem; font-weight: 700; color: var(--accent); }
  .nav-links { display: flex; gap: 1.8rem; }
  .nav-links a { font-family: 'JetBrains Mono', monospace; font-size: 0.68rem; letter-spacing: 0.12em;
    text-transform: uppercase; color: var(--muted); text-decoration: none; transition: color 0.3s; }
  .nav-links a:hover { color: var(--accent); }

  .hero { min-height: 100vh; display: grid; grid-template-columns: 1fr 1fr;
    align-items: center; padding: 0 6vw; gap: 4rem; position: relative; overflow: hidden; }
  .hero-bg-text { position: absolute; right: -2vw; top: 50%; transform: translateY(-50%);
    font-family: 'Cormorant Garamond', serif; font-size: 22vw; font-weight: 700;
    color: transparent; -webkit-text-stroke: 1px rgba(139,69,19,0.07);
    pointer-events: none; user-select: none; white-space: nowrap; }
  .hero-left { position: relative; z-index: 1; }
  .hero-tag { display: inline-block; font-family: 'JetBrains Mono', monospace; font-size: 0.7rem;
    letter-spacing: 0.2em; text-transform: uppercase; color: var(--accent);
    border: 1px solid var(--accent); padding: 0.4rem 1rem; margin-bottom: 2rem;
    opacity: 0; animation: fadeUp 0.7s ease 0.2s forwards; }
  .hero-name { font-family: 'Cormorant Garamond', serif; font-size: clamp(3rem, 6vw, 5.5rem);
    font-weight: 700; line-height: 1; margin-bottom: 0.5rem;
    opacity: 0; animation: fadeUp 0.7s ease 0.35s forwards; }
  .hero-name em { color: var(--accent); font-style: italic; }
  .hero-role { font-family: 'Cormorant Garamond', serif; font-size: clamp(1.2rem, 2.5vw, 2rem);
    font-style: italic; color: var(--muted); margin-bottom: 1.5rem;
    opacity: 0; animation: fadeUp 0.7s ease 0.5s forwards; }
  .hero-desc { font-size: 0.95rem; color: var(--muted); line-height: 1.8; max-width: 420px;
    opacity: 0; animation: fadeUp 0.7s ease 0.65s forwards; }
  .hero-btns { display: flex; gap: 1rem; margin-top: 2.5rem; flex-wrap: wrap;
    opacity: 0; animation: fadeUp 0.7s ease 0.8s forwards; }
  .btn-fill { padding: 0.9rem 2.2rem; background: var(--accent); color: #f5f0e8;
    font-family: 'JetBrains Mono', monospace; font-size: 0.72rem; letter-spacing: 0.1em;
    text-transform: uppercase; border: none; cursor: pointer; text-decoration: none;
    display: inline-block; transition: all 0.3s; }
  .btn-fill:hover { background: #a0521a; transform: translateY(-3px); box-shadow: 0 12px 30px rgba(139,69,19,0.25); }
  .btn-line { padding: 0.9rem 2.2rem; background: transparent; color: var(--text);
    font-family: 'JetBrains Mono', monospace; font-size: 0.72rem; letter-spacing: 0.1em;
    text-transform: uppercase; border: 1px solid var(--border); cursor: pointer;
    text-decoration: none; display: inline-block; transition: all 0.3s; }
  .btn-line:hover { border-color: var(--accent); color: var(--accent); transform: translateY(-3px); }

  /* ===== HERO RIGHT: PHOTO + STATS ===== */
  .hero-right { position: relative; z-index: 1; opacity: 0; animation: fadeUp 0.7s ease 0.5s forwards;
    display: flex; flex-direction: column; gap: 1.5rem; align-items: center; }
  .hero-photo-wrap { position: relative; width: 260px; }
  .hero-photo-wrap::before {
    content: '';
    position: absolute;
    inset: -8px;
    border: 1px solid var(--accent);
    opacity: 0.35;
    pointer-events: none;
  }
  .hero-photo-wrap::after {
    content: '';
    position: absolute;
    inset: -16px;
    border: 1px solid var(--gold);
    opacity: 0.18;
    pointer-events: none;
  }
  .hero-photo {
    width: 260px;
    height: 320px;
    object-fit: cover;
    object-position: top center;
    display: block;
    filter: sepia(8%) contrast(1.05);
    transition: filter 0.4s;
  }
  .hero-photo:hover { filter: sepia(0%) contrast(1.08); }
  .hero-photo-label {
    font-family: 'JetBrains Mono', monospace;
    font-size: 0.6rem;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: var(--muted);
    text-align: center;
    margin-top: 0.75rem;
  }
  .hero-stats { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; width: 100%; }
  .stat-card { padding: 1.25rem 1rem; background: var(--surface); border: 1px solid var(--border); transition: all 0.3s; text-align: center; }
  .stat-card:hover { border-color: var(--accent); transform: translateY(-4px); }
  .stat-num { font-family: 'Cormorant Garamond', serif; font-size: 2.2rem; font-weight: 700; color: var(--accent); line-height: 1; }
  .stat-label { font-family: 'JetBrains Mono', monospace; font-size: 0.58rem; letter-spacing: 0.1em; text-transform: uppercase; color: var(--muted); margin-top: 0.4rem; }

  section { padding: 7rem 6vw; }
  .sec-label { font-family: 'JetBrains Mono', monospace; font-size: 0.68rem; letter-spacing: 0.22em; text-transform: uppercase; color: var(--accent); margin-bottom: 0.75rem; }
  .sec-title { font-family: 'Cormorant Garamond', serif; font-size: clamp(2rem, 4vw, 3.2rem); font-weight: 700; line-height: 1.1; margin-bottom: 3.5rem; }

  .about-wrap { display: grid; grid-template-columns: 1.2fr 1fr; gap: 6rem; align-items: start; }
  .about-text p { color: var(--muted); line-height: 1.9; font-size: 1rem; margin-bottom: 1.25rem; }
  .detail-row { display: flex; gap: 1rem; padding: 1rem 0; border-bottom: 1px solid var(--border); }
  .detail-key { font-family: 'JetBrains Mono', monospace; font-size: 0.65rem; letter-spacing: 0.1em; color: var(--gold); text-transform: uppercase; min-width: 85px; padding-top: 2px; }
  .detail-val { font-size: 0.9rem; color: var(--text); }
  .detail-val a { color: var(--accent); text-decoration: none; }
  .detail-val a:hover { text-decoration: underline; }

  .cv-banner { margin-top: 2rem; padding: 1.5rem; background: var(--dark); border: 1px solid #3a3530;
    display: flex; justify-content: space-between; align-items: center; gap: 1rem; flex-wrap: wrap; }
  .cv-text { font-family: 'JetBrains Mono', monospace; font-size: 0.72rem; letter-spacing: 0.1em; color: #ede8de; text-transform: uppercase; }
  .cv-btn { padding: 0.7rem 1.5rem; background: var(--gold); color: var(--dark);
    font-family: 'JetBrains Mono', monospace; font-size: 0.68rem; letter-spacing: 0.1em;
    text-transform: uppercase; text-decoration: none; transition: all 0.3s; white-space: nowrap; }
  .cv-btn:hover { background: #e0aa38; transform: translateY(-2px); }

  .skills-bg { background: var(--dark); }
  .skills-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(260px, 1fr)); gap: 1px; background: #2a2520; }
  .skill-tile { background: var(--dark); padding: 2rem; transition: all 0.3s; position: relative; overflow: hidden; }
  .skill-tile::after { content: ''; position: absolute; bottom: 0; left: 0; right: 0; height: 2px;
    background: linear-gradient(90deg, var(--accent), var(--gold)); transform: scaleX(0); transform-origin: left; transition: transform 0.4s; }
  .skill-tile:hover { background: #221f1a; }
  .skill-tile:hover::after { transform: scaleX(1); }
  .skill-icon { font-size: 1.8rem; margin-bottom: 1rem; }
  .skill-title { font-family: 'Cormorant Garamond', serif; font-size: 1.2rem; font-weight: 600; color: var(--bg); margin-bottom: 0.5rem; }
  .skill-sub { font-size: 0.8rem; color: #7a7268; line-height: 1.7; margin-bottom: 1rem; }
  .tags { display: flex; flex-wrap: wrap; gap: 0.4rem; }
  .tag { font-family: 'JetBrains Mono', monospace; font-size: 0.6rem; letter-spacing: 0.08em; padding: 0.25rem 0.6rem; border: 1px solid #3a3530; color: #7a7268; text-transform: uppercase; }

  .projects-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(340px, 1fr)); gap: 2rem; }
  .proj-card { border: 1px solid var(--border); background: var(--surface); overflow: hidden; transition: all 0.35s; }
  .proj-card:hover { border-color: var(--accent); transform: translateY(-6px); box-shadow: 0 24px 50px rgba(139,69,19,0.12); }
  .proj-banner { height: 160px; display: flex; align-items: center; justify-content: center; font-size: 3.5rem; }
  .proj-body { padding: 1.75rem; }
  .proj-num { font-family: 'JetBrains Mono', monospace; font-size: 0.65rem; color: var(--muted); letter-spacing: 0.1em; margin-bottom: 0.6rem; }
  .proj-title { font-family: 'Cormorant Garamond', serif; font-size: 1.4rem; font-weight: 700; margin-bottom: 0.6rem; }
  .proj-live { display: inline-flex; align-items: center; gap: 0.3rem; font-family: 'JetBrains Mono', monospace; font-size: 0.6rem; color: var(--accent2); text-transform: uppercase; margin-bottom: 0.75rem; }
  .live-dot { width: 6px; height: 6px; border-radius: 50%; background: var(--accent2); animation: pulse 2s infinite; }
  @keyframes pulse { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:0.5;transform:scale(1.3)} }
  .proj-desc { font-size: 0.85rem; color: var(--muted); line-height: 1.7; margin-bottom: 1.25rem; }
  .proj-link { font-family: 'JetBrains Mono', monospace; font-size: 0.68rem; letter-spacing: 0.1em; color: var(--accent); text-transform: uppercase; text-decoration: none; display: inline-flex; align-items: center; gap: 0.4rem; transition: gap 0.3s; }
  .proj-link:hover { gap: 0.8rem; }
  .proj-link-muted { font-family: 'JetBrains Mono', monospace; font-size: 0.68rem; letter-spacing: 0.1em; color: #bbb6ae; text-transform: uppercase; }

  .ach-bg { background: var(--surface); }
  .ach-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 1.5rem; }
  .ach-card { padding: 1.75rem; border: 1px solid var(--border); background: var(--bg); display: flex; gap: 1.25rem; transition: all 0.3s; }
  .ach-card:hover { border-color: var(--gold); transform: translateX(4px); }
  .ach-emoji { font-size: 1.8rem; flex-shrink: 0; }
  .ach-type { font-family: 'JetBrains Mono', monospace; font-size: 0.6rem; letter-spacing: 0.12em; text-transform: uppercase; color: var(--gold); margin-bottom: 0.3rem; }
  .ach-title { font-family: 'Cormorant Garamond', serif; font-size: 1.1rem; font-weight: 600; margin-bottom: 0.3rem; }
  .ach-org { font-size: 0.8rem; color: var(--muted); }

  .certs-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 1.5rem; }
  .cert-card { padding: 1.5rem; border: 1px solid var(--border); background: var(--surface);
    transition: all 0.3s; position: relative; overflow: hidden;
    cursor: pointer; text-decoration: none; display: block; color: inherit; }
  .cert-card::before { content: ''; position: absolute; left: 0; top: 0; bottom: 0; width: 3px;
    background: var(--gold); transform: scaleY(0); transform-origin: bottom; transition: transform 0.4s; }
  .cert-card:hover { border-color: var(--gold); transform: translateY(-4px); box-shadow: 0 16px 40px rgba(200,151,46,0.15); }
  .cert-card:hover::before { transform: scaleY(1); }
  .cert-issuer { font-family: 'JetBrains Mono', monospace; font-size: 0.6rem; letter-spacing: 0.12em; text-transform: uppercase; color: var(--gold); margin-bottom: 0.5rem; }
  .cert-name { font-family: 'Cormorant Garamond', serif; font-size: 1.05rem; font-weight: 600; line-height: 1.3; margin-bottom: 0.4rem; }
  .cert-date { font-size: 0.75rem; color: var(--muted); margin-bottom: 0.75rem; }
  .cert-open { font-family: 'JetBrains Mono', monospace; font-size: 0.62rem; letter-spacing: 0.1em; color: var(--accent); text-transform: uppercase; }

  .contact-inner { max-width: 580px; }
  .contact-inner p { color: var(--muted); line-height: 1.9; margin-bottom: 2.5rem; }
  .contact-list { display: flex; flex-direction: column; gap: 1rem; }
  .contact-row { display: flex; align-items: center; gap: 1.25rem; padding: 1.25rem 1.5rem;
    border: 1px solid var(--border); background: var(--surface); text-decoration: none; color: var(--text); transition: all 0.3s; }
  .contact-row:hover { border-color: var(--accent); color: var(--accent); transform: translateX(6px); }
  .contact-icon { font-size: 1.1rem; }
  .contact-txt { font-family: 'JetBrains Mono', monospace; font-size: 0.75rem; letter-spacing: 0.05em; }

  footer { padding: 2rem 6vw; border-top: 1px solid var(--border); display: flex; justify-content: space-between; align-items: center; font-family: 'JetBrains Mono', monospace; font-size: 0.65rem; color: var(--muted); }

  @keyframes fadeUp { from{opacity:0;transform:translateY(28px)} to{opacity:1;transform:translateY(0)} }
  .reveal { opacity: 0; transform: translateY(35px); transition: all 0.75s cubic-bezier(0.16,1,0.3,1); }
  .reveal.visible { opacity: 1; transform: translateY(0); }

  @media (max-width: 900px) {
    .hero { grid-template-columns: 1fr; padding-top: 6rem; }
    .hero-right { display: none; }
    .about-wrap { grid-template-columns: 1fr; gap: 3rem; }
  }
  @media (max-width: 600px) {
    section { padding: 5rem 5vw; }
    nav { padding: 1rem 5vw; }
    .nav-links { gap: 1rem; }
    footer { flex-direction: column; gap: 0.5rem; text-align: center; }
  }
`;

const skills = [
  { icon: "⚛️", title: "Frontend Dev", sub: "Responsive, interactive UIs with modern frameworks.", tags: ["HTML", "CSS", "JavaScript", "React"] },
  { icon: "🤖", title: "AI / ML", sub: "Trained in AI/ML — classification, regression, clustering.", tags: ["Python", "ML", "RapidMiner", "AIML"] },
  { icon: "🛢️", title: "Backend Basics", sub: "Server-side logic and database fundamentals.", tags: ["Node.js", "Express", "SQL"] },
  { icon: "🧠", title: "CS Fundamentals", sub: "Strong B.Tech CSE foundation.", tags: ["DSA", "OOP", "OS", "DBMS"] },
  { icon: "☁️", title: "Cloud & Tools", sub: "Hands-on with Google Cloud and dev tools.", tags: ["Google Cloud", "Git", "GitHub", "VS Code"] },
  { icon: "📊", title: "Data & Research", sub: "Data analysis, CSR research and project work.", tags: ["Data Analysis", "Research", "Pregrad"] },
];

const projects = [
  {
    num: "01", emoji: "🌾", bg: "linear-gradient(135deg, #1a2e1a, #2d5016)",
    title: "Krishi Sakhi", isLive: true,
    liveUrl: "https://krishi-sakhi-frontend.vercel.app/",
    githubUrl: "https://github.com/drashteechauhan-hash/krishi-sakhi-frontend",
    desc: "Full-stack agricultural assistant platform to help farmers with smart crop guidance. Built with React + Node.js, deployed on Vercel.",
    tags: ["React", "Node.js", "Full Stack", "Vercel"],
  },
  {
    num: "02", emoji: "🌐", bg: "linear-gradient(135deg, #2e1a0a, #5a3010)",
    title: "Portfolio Website", isLive: true,
    liveUrl: "https://drashtee-portfolio.netlify.app",
    githubUrl: "https://github.com/drashteechauhan-hash/my-portfolio",
    desc: "This personal portfolio built with React showcasing my projects, certifications, achievements and skills.",
    tags: ["React", "CSS", "Netlify"],
  },
  {
    num: "03", emoji: "🎓", bg: "linear-gradient(135deg, #1a1a2e, #16213e)",
    title: "Student AI System", isLive: false,
    liveUrl: null,
    githubUrl: null,
    desc: "ML-powered web app predicting student academic performance and risk levels. Features analytics dashboard, study plan recommendations and what-if analysis.",
    tags: ["Python", "FastAPI", "React", "ML"],
  },
  {
    num: "04", emoji: "🛡️", bg: "linear-gradient(135deg, #2e0a0a, #5a1010)",
    title: "PhiShield", isLive: false,
    liveUrl: null,
    githubUrl: "https://github.com/bhoomi2060-dot/scam-detector",
    desc: "Flutter mobile app detecting phishing SMS, emails and URLs in real time. Trained Random Forest & Naive Bayes on 240,000+ samples achieving 99.9% accuracy.",
    tags: ["Python", "Flutter", "Flask", "MySQL", "ML"],
  },
];

const achievements = [
  { emoji: "🏆", type: "Hackathon", title: "SIH Avishkar Hackathon", org: "IIC MRU · September 2025" },
  { emoji: "💡", type: "Competition", title: "Idea Hack 2025", org: "IETE Students Forum, MRU · October 2025" },
  { emoji: "☁️", type: "Hackathon", title: "Google Cloud HackSprint", org: "Digital Campus 2.0 · August 2025" },
  { emoji: "🛠️", type: "Tech Fest", title: "INNOSKILL 2026 — Code Debugging", org: "Manav Rachna · April 2026" },
  { emoji: "💼", type: "Internship", title: "Social Internship — SHEOWS", org: "Old Age Home NGO, New Delhi · July 2025" },
  { emoji: "🤝", type: "Volunteer", title: "Hackmore Volunteer", org: "2025" },
];

const certs = [
  { issuer: "RapidMiner (Altair)", name: "Machine Learning Professional Certification", date: "2025", link: "https://drive.google.com/file/d/1f59pfXautjRbaISOhc3YRlZrGEe2jXyW/view?usp=drive_link" },
  { issuer: "Pregrad", name: "AI/ML Course Completion — 3 Month Mentorship", date: "Oct 2024 – Jan 2025", link: "https://drive.google.com/file/d/1EV36F9pNtLQmEvPaJg_rcUEoO7GNmm8f/view?usp=drive_link" },
  { issuer: "Pregrad", name: "Loan Classification Project Completion", date: "2025", link: "https://drive.google.com/file/d/1o-shM6Cv1vyiqy99T5g5KHr3qNq3JGjU/view?usp=drive_link" },
  { issuer: "XDev Club, MRU", name: "Python Boot Camp — Certificate of Appreciation", date: "Oct 2025", link: "https://drive.google.com/file/d/1fk4MVyFJSTiih6nCwC8_gkL6BNJbJI7s/view?usp=drive_link" },
  { issuer: "Google Cloud × MRU", name: "Digital Campus 2.0 — HackSprint Participation", date: "Aug 2025", link: "https://drive.google.com/file/d/18q5FqF9DxaK1cd9OFjBh7LCyNCE2rKM9/view?usp=drive_link" },
  { issuer: "IIC MRU", name: "SIH Avishkar Hackathon — Participation Certificate", date: "Sep 2025", link: "https://drive.google.com/file/d/1-eIzH_WGma1-dwbi_lKQHDGt4hqiB6c5/view?usp=drive_link" },
  { issuer: "IETE Students Forum, MRU", name: "Idea Hack 2025 — Certificate of Appreciation", date: "Oct 2025", link: "https://drive.google.com/file/d/1hiDhYWob4BGYGFEQ2pYPOVCvWdIECoi2/view?usp=drive_link" },
  { issuer: "INNOSKILL 2026, MRU", name: "Code Debugging — Certificate of Appreciation", date: "Apr 2026", link: "https://drive.google.com/file/d/1Lbz_4JxFuvP8tESMNaC7URCSaQc91hXw/view?usp=drive_link" },
  { issuer: "SHEOWS NGO", name: "Social Internship Certificate", date: "Jul 2025", link: "https://drive.google.com/file/d/1iiu4nX7e3VOANH_OfBybaVD_NamMuwwg/view?usp=drive_link" },
  { issuer: "Hackmore", name: "Volunteer Certificate", date: "2025", link: "https://drive.google.com/file/d/1imLvDaw8eKxxbVmgGdIT4tvqjEjWAxep/view?usp=drive_link" },
  { issuer: "Altair / RapidMiner", name: "Altair Contest Certificate", date: "2025", link: "https://drive.google.com/file/d/1SC4DXDTWc2ahoP8FY5LBp7O_X1pQHz24/view?usp=drive_link" },
];

export default function Portfolio() {
  const revealRefs = useRef([]);
  useEffect(() => {
    const obs = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add("visible"); }),
      { threshold: 0.08 }
    );
    revealRefs.current.forEach(el => el && obs.observe(el));
    return () => obs.disconnect();
  }, []);
  const addRef = el => { if (el && !revealRefs.current.includes(el)) revealRefs.current.push(el); };

  return (
    <>
      <style>{style}</style>
      <div className="noise" />

      <nav>
        <div className="nav-logo">Drashtee S.C.</div>
        <div className="nav-links">
          <a href="#about">About</a>
          <a href="#skills">Skills</a>
          <a href="#projects">Projects</a>
          <a href="#achievements">Wins</a>
          <a href="#certifications">Certs</a>
          <a href="#contact">Contact</a>
        </div>
      </nav>

      {/* HERO */}
      <section className="hero">
        <div className="hero-bg-text">DSC</div>
        <div className="hero-left">
          <div className="hero-tag">B.Tech CSE · Manav Rachna University</div>
          <h1 className="hero-name">Drashtee<br /><em>Singh</em><br />Chauhan</h1>
          <p className="hero-role">Web Developer & ML Enthusiast</p>
          <p className="hero-desc">Building smart, beautiful digital experiences. From full-stack web apps to machine learning — I bring ideas to life through code.</p>
          <div className="hero-btns">
            <a href="https://krishi-sakhi-frontend.vercel.app/" target="_blank" className="btn-fill">View Live Project ↗</a>
            <a href="https://www.linkedin.com/in/drashtee-singh-chauhan-11829b323" target="_blank" className="btn-line">LinkedIn</a>
          </div>
        </div>

        {/* ===== HERO RIGHT: PHOTO + STATS ===== */}
        <div className="hero-right">
          <div className="hero-photo-wrap">
            {/*
              ✏️ HOW TO ADD YOUR PHOTO — choose ONE method:

              METHOD A (Recommended — put photo in src/ folder):
                1. Copy your photo into: src/drashtee.jpg
                2. Add this import at the TOP of the file (line 6):
                   import myPhoto from './drashtee.jpg';
                3. Change src below to: src={myPhoto}

              METHOD B (put photo in public/ folder):
                1. Copy your photo into: public/drashtee.jpg
                2. Change src below to: src="/drashtee.jpg"
                   (no import needed)
            */}
            <img
              className="hero-photo"
              src="/drashtee.jpg"
              alt="Drashtee Singh Chauhan"
            />
            <div className="hero-photo-label">Drashtee Singh Chauhan</div>
          </div>

          <div className="hero-stats">
            <div className="stat-card"><div className="stat-num">11</div><div className="stat-label">Certificates</div></div>
            <div className="stat-card"><div className="stat-num">3</div><div className="stat-label">Hackathons</div></div>
            <div className="stat-card"><div className="stat-num">1</div><div className="stat-label">Internship</div></div>
            <div className="stat-card"><div className="stat-num">2+</div><div className="stat-label">Live Projects</div></div>
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about">
        <div ref={addRef} className="reveal about-wrap">
          <div className="about-text">
            <div className="sec-label">About Me</div>
            <h2 className="sec-title">Passionate coder,<br />lifelong learner</h2>
            <p>Hi! I'm Drashtee, a B.Tech Computer Science student at Manav Rachna University, Faridabad. I love building things that matter — from full-stack web apps to AI/ML projects.</p>
            <p>I've participated in hackathons like SIH and Google Cloud HackSprint, completed an AI/ML mentorship, and did a social internship at an NGO. I believe tech should solve real problems.</p>
            <div className="cv-banner">
              <span className="cv-text">📄 My CV / Resume</span>
              <a
                href="https://drive.google.com/file/d/1lG_BAyTucO-n4UmDnvNz1Z09PEAzdQD8/view?usp=sharing"
                target="_blank"
                className="cv-btn"
              >
                Download CV ↓
              </a>
            </div>
          </div>
          <div>
            <div className="detail-row"><span className="detail-key">Name</span><span className="detail-val">Drashtee Singh Chauhan</span></div>
            <div className="detail-row"><span className="detail-key">University</span><span className="detail-val">Manav Rachna University</span></div>
            <div className="detail-row"><span className="detail-key">Degree</span><span className="detail-val">B.Tech — CSE Core</span></div>
            <div className="detail-row"><span className="detail-key">Roll No.</span><span className="detail-val">2K24CSUN01019</span></div>
            <div className="detail-row"><span className="detail-key">Focus</span><span className="detail-val">Web Dev + AI/ML</span></div>
            <div className="detail-row"><span className="detail-key">LinkedIn</span><span className="detail-val"><a href="https://www.linkedin.com/in/drashtee-singh-chauhan-11829b323" target="_blank">drashtee-singh-chauhan ↗</a></span></div>
          </div>
        </div>
      </section>

      {/* SKILLS */}
      <section id="skills" className="skills-bg">
        <div ref={addRef} className="reveal">
          <div className="sec-label" style={{color:"var(--gold)"}}>What I Know</div>
          <h2 className="sec-title" style={{color:"var(--bg)"}}>Skills &<br />Technologies</h2>
          <div className="skills-grid">
            {skills.map((s, i) => (
              <div className="skill-tile" key={i}>
                <div className="skill-icon">{s.icon}</div>
                <div className="skill-title">{s.title}</div>
                <div className="skill-sub">{s.sub}</div>
                <div className="tags">{s.tags.map(t => <span className="tag" key={t}>{t}</span>)}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROJECTS */}
      <section id="projects">
        <div ref={addRef} className="reveal">
          <div className="sec-label">My Work</div>
          <h2 className="sec-title">Featured<br />Projects</h2>
          <div className="projects-grid">
            {projects.map((p, i) => (
              <div className="proj-card" key={i}>
                <div className="proj-banner" style={{background: p.bg}}>{p.emoji}</div>
                <div className="proj-body">
                  <div className="proj-num">Project {p.num}</div>
                  <div className="proj-title">{p.title}</div>
                  {p.isLive && <div className="proj-live"><div className="live-dot"/><span>Live</span></div>}
                  <div className="proj-desc">{p.desc}</div>
                  <div className="tags" style={{marginBottom:"1.25rem"}}>{p.tags.map(t=><span className="tag" key={t}>{t}</span>)}</div>
                  <div style={{display:"flex", gap:"1.5rem", flexWrap:"wrap", alignItems:"center"}}>
                    {p.liveUrl && <a href={p.liveUrl} target="_blank" className="proj-link">View Live →</a>}
                    {p.githubUrl
                      ? <a href={p.githubUrl} target="_blank" className="proj-link" style={{color:"var(--muted)"}}>GitHub →</a>
                      : <span className="proj-link-muted">GitHub </span>
                    }
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ACHIEVEMENTS */}
      <section id="achievements" className="ach-bg">
        <div ref={addRef} className="reveal">
          <div className="sec-label">What I've Done</div>
          <h2 className="sec-title">Achievements &<br />Experience</h2>
          <div className="ach-grid">
            {achievements.map((a, i) => (
              <div className="ach-card" key={i}>
                <div className="ach-emoji">{a.emoji}</div>
                <div>
                  <div className="ach-type">{a.type}</div>
                  <div className="ach-title">{a.title}</div>
                  <div className="ach-org">{a.org}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CERTIFICATIONS */}
      <section id="certifications">
        <div ref={addRef} className="reveal">
          <div className="sec-label">Credentials</div>
          <h2 className="sec-title">
            Certifications
            <br />
            <span style={{fontFamily:"'JetBrains Mono',monospace", fontStyle:"normal", fontSize:"0.28em", color:"var(--muted)", letterSpacing:"0.1em", textTransform:"uppercase"}}>
              ↗ Click any card to open certificate
            </span>
          </h2>
          <div className="certs-grid">
            {certs.map((c, i) => (
              <a key={i} className="cert-card" href={c.link} target="_blank" rel="noopener noreferrer">
                <div className="cert-issuer">{c.issuer}</div>
                <div className="cert-name">{c.name}</div>
                <div className="cert-date">{c.date}</div>
                <div className="cert-open">View Certificate →</div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" style={{background:"var(--surface)"}}>
        <div ref={addRef} className="reveal contact-inner">
          <div className="sec-label">Get In Touch</div>
          <h2 className="sec-title">Let's<br />Connect</h2>
          <p>Open to internships, collaborations and new opportunities. Feel free to reach out!</p>
          <div className="contact-list">
            <a href="https://www.linkedin.com/in/drashtee-singh-chauhan-11829b323" target="_blank" className="contact-row">
              <span className="contact-icon">💼</span>
              <span className="contact-txt">linkedin.com/in/drashtee-singh-chauhan</span>
            </a>
            <a href="mailto:drashteechauhan@gmail.com" className="contact-row">
              <span className="contact-icon">✉️</span>
              <span className="contact-txt">drashteechauhan@gmail.com</span>
            </a>
            <a href="https://github.com/drashteechauhan-hash" target="_blank" className="contact-row">
              <span className="contact-icon">🐙</span>
              <span className="contact-txt">github.com/drashteechauhan-hash</span>
            </a>
          </div>
        </div>
      </section>

      <footer>
        <span>© 2026 Drashtee Singh Chauhan</span>
        <span>B.Tech CSE · Manav Rachna University, Faridabad</span>
      </footer>
    </>
  );
}