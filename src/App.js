import React, { useEffect, useRef, useState } from "react";
import "./App.css";
import profile from "./img/pic.jpg"; // put your image at src/profile.jpg

const SECTIONS = [
  {
    id: "about",
    title: "About",
    body: (
      <>
        <h3>Kittapak Sakunwatcharayotin</h3>
        <div className="muted">Nickname: McKane</div>
        <p className="lead">Student interested in Web, UI/UX and IT systems — focused on modern design & development.</p>
      </>
    ),
  },
  {
    id: "education",
    title: "Education",
    body: (
      <div className="timeline">
        <div className="timeline-item">
          <div className="timeline-dot" />
          <div className="timeline-body">
            <strong>Bachelor's Degree</strong>
            <div className="muted">University of Technology North Bangkok — 2024 - Now</div>
            <div className="muted">College of Industrial Technology — Electronics / Computer Technology</div>
          </div>
        </div>

        <div className="timeline-item">
          <div className="timeline-dot" />
          <div className="timeline-body">
            <strong>High Vocational Certificate</strong>
            <div className="muted">Pongsawadi Technological College — 2022 - 2023</div>
            <div className="muted">Information Technology</div>
          </div>
        </div>

        <div className="timeline-item">
          <div className="timeline-dot" />
          <div className="timeline-body">
            <strong>Vocational Certificate</strong>
            <div className="muted">Pongsawadi Technological College — 2019 - 2021</div>
            <div className="muted">Information Technology</div>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: "experience",
    title: "Work Experience",
    body: (
      <div className="card">
        <strong>Prangnakdao / Prangnaklao Hospital — IT Support (2023)</strong>
        <ul>
          <li>Install and troubleshoot department hardware.</li>
          <li>Configure network devices within the hospital.</li>
          <li>Repair and troubleshoot computers, laptops, printers and peripherals.</li>
          <li>Resolve internet and software issues (Windows / Office).</li>
          <li>Maintain IT equipment and systems.</li>
        </ul>
      </div>
    ),
  },
  {
    id: "projects",
    title: "Projects",
    body: (
      <div className="card">
        <strong>Motion Sensor Activation</strong>
        <div className="muted">Prototype: microcontroller + relay + simple UI</div>
        <p>A prototype system that triggers devices via motion detection and relay control.</p>
      </div>
    ),
  },
  {
    id: "certs",
    title: "CERTIFICATION / AWARD",
    body: (
      <div className="card">
        <strong>Thailand Professional Qualification Institute</strong>
        <div className="muted">Professional Qualification awarded</div>
        <ul>
          <li><strong>Sector:</strong> Digital Industry</li>
          <li><strong>Sub-Sector:</strong> Digital Security and Privacy</li>
          <li><strong>Occupation:</strong> Technical Support Technician, Level 3</li>
          <li><strong>Completed on:</strong> 25 September 2023</li>
        </ul>
      </div>
    ),
  },
  {
    id: "aptitude",
    title: "Favorite Aptitude",
    body: (
      <ul className="info-list">
        <li>SketchUp</li>
        <li>Canva</li>
        <li>Microsoft PowerPoint</li>
        <li>Microsoft Word</li>
        <li>Microsoft Excel</li>
        <li>Cisco Packet Tracer</li>
        <li>Ekahau Site Survey</li>
        <li>Draw.io</li>
      </ul>
    ),
  },
  {
    id: "contact",
    title: "Contact",
    body: (
      <div className="card">
        <ul className="info-list">
          <li><strong>Phone:</strong> <a href="tel:0869871141">086-987-1141</a></li>
          <li><strong>Email:</strong> <a href="mailto:kittpak.skt@gmail.com">kittpak.skt@gmail.com</a></li>
          <li><strong>Address:</strong> 98/10 My Isara Village, Moo 5, Bang Sri Mueang, Mueang Nonthaburi</li>
          <li><strong>GitHub:</strong> <a href="https://github.com/Kane028632" target="_blank" rel="noreferrer">github.com/Kane028632</a></li>
        </ul>
      </div>
    ),
  },
];

const NAV_ORDER = [
  "about",
  "education",
  "experience",
  "projects",
  "certs",
  "aptitude",
  "contact",
];

export default function App() {
  const [active, setActive] = useState(SECTIONS[0].id);
  const [showTop, setShowTop] = useState(false);
  const progressRef = useRef(null);
  const refs = useRef({});
  const heroParallaxRef = useRef(null);

  useEffect(() => {
    // smooth
    document.documentElement.style.scrollBehavior = "smooth";

    // scroll effects
    const onScroll = () => {
      const total = document.documentElement.scrollHeight - window.innerHeight;
      const pct = total > 0 ? (window.scrollY / total) * 100 : 0;
      if (progressRef.current) progressRef.current.style.width = `${Math.min(100, Math.max(0, pct))}%`;
      setShowTop(window.scrollY > 600);

      // hero parallax
      if (heroParallaxRef.current) {
        const y = Math.min(Math.max(window.scrollY * 0.18, 0), 140);
        heroParallaxRef.current.style.transform = `translateY(${y}px)`;
      }
    };

    // reveal + active section
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          const id = e.target.id;
          if (e.isIntersecting) {
            setActive(id);
            e.target.classList.add("in-view");
          } else {
            e.target.classList.remove("in-view");
          }
        });
      },
      { threshold: 0.28 }
    );

    Object.values(refs.current).forEach((el) => el && io.observe(el));
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    return () => {
      window.removeEventListener("scroll", onScroll);
      io.disconnect();
    };
  }, []);

  // keyboard navigation between sections
  useEffect(() => {
    const ids = SECTIONS.map((s) => s.id);
    const onKey = (e) => {
      if (["ArrowDown", "PageDown", "ArrowUp", "PageUp"].includes(e.key)) {
        e.preventDefault();
        const current = refs.current[ids.find((id) => id === active) || ids[0]];
        const idx = Math.max(0, ids.indexOf(active));
        let targetIdx = idx;
        if (e.key === "ArrowDown" || e.key === "PageDown") targetIdx = Math.min(ids.length - 1, idx + 1);
        if (e.key === "ArrowUp" || e.key === "PageUp") targetIdx = Math.max(0, idx - 1);
        const target = refs.current[ids[targetIdx]];
        if (target) {
          // focus then scroll (scroll-margin-top in CSS ensures correct offset)
          target.focus({ preventScroll: true });
          target.scrollIntoView({ behavior: "smooth", block: "start" });
          setActive(ids[targetIdx]);
        }
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [active]);

  const scrollTo = (id) => {
    const el = refs.current[id];
    if (!el) return;
    // use scrollIntoView + let CSS scroll-margin-top handle header offset
    el.scrollIntoView({ behavior: "smooth", block: "start" });
    el.focus({ preventScroll: true });
    setActive(id);
  };

  const downloadCV = async () => {
    const url = "/resumekane.pdf";
    try {
      const res = await fetch(url, { method: "HEAD" });
      if (!res.ok) {
        alert("ไฟล์ resume.pdf ไม่พบใน public/ (วางไฟล์ใน public/)");
        return;
      }
      const a = document.createElement("a");
      a.href = url;
      a.setAttribute("download", "resume.pdf");
      document.body.appendChild(a);
      a.click();
      a.remove();
    } catch {
      window.open("/resume.pdf", "_blank");
    }
  };

  const toggleTheme = () => {
    const root = document.documentElement;
    root.classList.add("theme-transition");
    root.classList.toggle("light");
    window.setTimeout(() => root.classList.remove("theme-transition"), 400);
  };

  // add state + helpers for contact actions
  const [copied, setCopied] = useState(null);

  const copyToClipboard = async (text, label) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(label);
      setTimeout(() => setCopied(null), 2000);
    } catch (e) {
      console.warn("copy failed", e);
    }
  };

  const downloadVCard = () => {
    const vcard =
`BEGIN:VCARD
VERSION:3.0
FN:Kittapak Sakunwatcharayotin
N:Sakunwatcharayotin;Kittapak;;;
TEL;TYPE=CELL:0869871141
EMAIL:kittpak.skt@gmail.com
ADR:;;98/10 My Isara Village;Bang Sri Mueang;Mueang Nonthaburi;11000;Thailand
URL:https://github.com/yourname
END:VCARD`;
    const blob = new Blob([vcard], { type: "text/vcard;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "kittapak_sakunwatcharayotin.vcf";
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="app-root modern">
      <div className="progressWrap" aria-hidden="true">
        <div className="progress" ref={progressRef} />
      </div>

      <header className="topnav" role="banner">
        <div className="brand" onClick={() => scrollTo("about")} role="button" tabIndex={0}>
          <span className="logoDot" /> Resume 
        </div>

        <nav className="navlinks" aria-label="Main">
          {NAV_ORDER.map((id) => {
            const s = SECTIONS.find((x) => x.id === id);
            if (!s) return null;
            return (
              <button
                key={s.id}
                type="button"
                className={`navbtn ${active === s.id ? "active" : ""}`}
                onClick={() => scrollTo(s.id)}
                aria-current={active === s.id ? "true" : "false"}
              >
                {s.title}
              </button>
            );
          })}
        </nav>
      </header>

      <main className="layout">
        <aside className="sidebar" aria-label="Sidebar">
          <div className="profileRow framed">
            <div className="avatar-bg">
              <img src={profile} alt="profile" className="photo small" />
            </div>
            <div className="profileInfo center">
              <div className="name">Kittapak Sakunwatcharayotin</div>
              <div className="nickname">Nickname : McKane</div>
            </div>
          </div>

          <div className="side-cta top">
            <button type="button" className="download" onClick={downloadCV}>Download CV</button>
            <button type="button" className="theme" onClick={toggleTheme}>Theme</button>
          </div>

          <div className="skill-list" aria-label="Skills">
            <h4 className="contact-title">Skills</h4>
            <ul>
              <li>React (basic)</li>
              <li>HTML</li>
              <li>CSS</li>
              <li>JavaScript (basic)</li>
              <li>GitHub</li>
              <li>GitHub Desktop</li>
              <li>MySQL</li>
              <li>Canva</li>
              <li>AI-assisted coding</li>
              <li>UX / UI Design</li>
            </ul>
          </div>
        </aside>

        <section className="content" role="main">
          <header className="hero">
            <div className="hero-bg" aria-hidden="true" />
            <div className="hero-inner" ref={heroParallaxRef}>
              <h1 className="hero-title">Resume — Kittapak Sakunwatcharayotin</h1>
              <p className="hero-sub">Electronics • Computer Engineering • Information Technology</p>
            </div>
          </header>

          {SECTIONS.map((s, i) => (
            <section
              key={s.id}
              id={s.id}
              ref={(el) => (refs.current[s.id] = el)}
              tabIndex={-1}
              className={`section panel panel-${i % 2 === 0 ? "a" : "b"}`}
            >
              <div className="section-inner">
                <h2 className="section-title">{s.title}</h2>
                <div className="section-body">{s.body}</div>
              </div>
            </section>
          ))}

          <footer className="page-footer">© {new Date().getFullYear()} Kittapak Sakunwatcharayotin</footer>
        </section>
      </main>

      <button
        className={`backTop ${showTop ? "show" : ""}`}
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        aria-label="Back to top"
        type="button"
      >
        ↑
      </button>
    </div>
  );
}