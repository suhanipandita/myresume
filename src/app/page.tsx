"use client";

import { useEffect, useMemo, useState } from "react";
import {
  motion,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";

const projects = [
  {
    id: "01",
    title: "MediCore",
    kicker: "industry project / healthcare",
    why: "A healthcare portal built around the reality that doctors, patients, nurses, and admins need different workflows — without making the system feel fragmented.",
    stack: ["React", "Node.js", "JWT", "Supabase", "Vercel"],
    repo: "https://github.com/suhanipandita/MediCore_.git",
    tone: "wine",
  },
  {
    id: "02",
    title: "Acadelo Pro",
    kicker: "machine learning / education",
    why: "It started with two questions: can behavioral data expose procrastination early, and can we make teams more balanced than simply putting similar students together?",
    stack: ["Python", "XGBoost", "Streamlit", "Supabase"],
    repo: "https://github.com/suhanipandita/AcadeloPro.git",
    tone: "ivory",
  },
  {
    id: "03",
    title: "Sahayak",
    kicker: "AI / accessibility / civic tech",
    why: "Government schemes do not help much when the people who qualify never hear about them. Sahayak turns discovery and eligibility into a conversational experience.",
    stack: ["React", "Node.js", "Supabase", "Botpress", "Google Speech APIs"],
    repo: "https://github.com/suhanipandita/Sahayak.git",
    tone: "plum",
  },
];

const skills = [
  "JavaScript",
  "TypeScript",
  "React",
  "Next.js",
  "Node.js",
  "Express.js",
  "Python",
  "C++",
  "MongoDB",
  "MySQL",
  "Supabase",
  "REST APIs",
  "XGBoost",
  "Docker",
  "Git",
  "AWS",
];

function Arrow() {
  return <span className="arrow" aria-hidden>↗</span>;
}

function FadeIn({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.16 }}
      transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

function ProjectVisual({ index }: { index: number }) {
  if (index === 0) {
    return (
      <div className="visual visual-care" aria-hidden>
        <div className="care-orbit orbit-a" />
        <div className="care-orbit orbit-b" />
        <div className="care-node node-a">PATIENT</div>
        <div className="care-node node-b">DOCTOR</div>
        <div className="care-node node-c">ADMIN</div>
        <div className="care-core" />
        <div className="care-label">one system / many roles</div>
      </div>
    );
  }

  if (index === 1) {
    return (
      <div className="visual visual-acadelo" aria-hidden>
        <div className="axis x" />
        <div className="axis y" />
        <div className="data-line line-one" />
        <div className="data-line line-two" />
        {[0, 1, 2, 3, 4, 5, 6].map((n) => (
          <span key={n} className={`data-dot dot-${n}`} />
        ))}
        <div className="score-badge"><strong>2.30</strong><span>RMSE · days</span></div>
        <div className="score-badge score-badge-two"><strong>0.935</strong><span>R²</span></div>
      </div>
    );
  }

  return (
    <div className="visual visual-sahayak" aria-hidden>
      <div className="sahayak-ring ring-one"><span>हिंदी</span></div>
      <div className="sahayak-ring ring-two"><span>मराठी</span></div>
      <div className="sahayak-ring ring-three"><span>தமிழ்</span></div>
      <div className="sahayak-ring ring-four"><span>తెలుగు</span></div>
      <div className="sahayak-core">8<br /><small>languages</small></div>
    </div>
  );
}

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeProject, setActiveProject] = useState(0);
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const springX = useSpring(cursorX, { stiffness: 500, damping: 35, mass: 0.4 });
  const springY = useSpring(cursorY, { stiffness: 500, damping: 35, mass: 0.4 });
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 130, damping: 30 });
  const heroScale = useTransform(scrollYProgress, [0, 0.18], [1, 0.96]);
  const heroY = useTransform(scrollYProgress, [0, 0.22], [0, -80]);

  useEffect(() => {
    const move = (event: MouseEvent) => {
      cursorX.set(event.clientX);
      cursorY.set(event.clientY);
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, [cursorX, cursorY]);

  const year = useMemo(() => new Date().getFullYear(), []);

  const jump = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
    setMenuOpen(false);
  };

  return (
    <main>
      <motion.div className="scroll-progress" style={{ scaleX: progress }} />
      <motion.div className="cursor" style={{ x: springX, y: springY }} aria-hidden />

      <header className="topbar shell">
        <button className="logo" onClick={() => jump("top")} aria-label="Back to top">
          SP<span>/</span>
        </button>
        <div className={`topnav ${menuOpen ? "open" : ""}`}>
          <button onClick={() => jump("work")}>work</button>
          <button onClick={() => jump("about")}>about</button>
          <button onClick={() => jump("now")}>now</button>
        </div>
        <button className="menu" onClick={() => setMenuOpen((v) => !v)} aria-label="Toggle menu">
          <span />
          <span />
        </button>
      </header>

      <section id="top" className="hero shell">
        <motion.div className="hero-inner" style={{ scale: heroScale, y: heroY }}>
          <div className="hero-meta">
            <span>01 / 04</span>
            <span className="live"><i /> currently building</span>
          </div>

          <div className="hero-name">
            <div className="hero-word hero-word-first">SUHANI</div>
            <div className="hero-word hero-word-last">PANDITA</div>
            <motion.div
              className="hero-stamp"
              initial={{ opacity: 0, rotate: -8, scale: 0.86 }}
              animate={{ opacity: 1, rotate: 2, scale: 1 }}
              transition={{ delay: 0.7, duration: 0.7 }}
            >
              developer<br />
              / builder<br />
              / curious
            </motion.div>
          </div>

          <div className="hero-bottom">
            <p className="hero-line">
              I notice friction.<br />
              Then I build around it.
            </p>
            <div className="hero-side">
              <span>IT · 2027</span>
              <span>Pune, India</span>
              <span>scroll to inspect ↓</span>
            </div>
          </div>
        </motion.div>
      </section>

      <section className="manifesto shell">
        <FadeIn>
          <p className="manifesto-index">[ a small manifesto ]</p>
        </FadeIn>
        <FadeIn delay={0.08}>
          <p className="manifesto-copy">
            I like problems that are a little messy — the ones where the user, the data,
            and the product are all telling a different story.
          </p>
        </FadeIn>
        <FadeIn delay={0.15}>
          <p className="manifesto-aside">
            The goal is rarely “more features”.<br />
            Usually it is <em>better decisions.</em>
          </p>
        </FadeIn>
      </section>

      <section id="work" className="work shell">
        <div className="section-intro-row">
          <div>
            <span className="section-label">02 / selected work</span>
            <h2>Things I built<br /><em>because something felt off.</em></h2>
          </div>
          <p>
            Three projects, three very different starting points. I kept the write-ups tight —
            the interesting part is the reason each one exists.
          </p>
        </div>

        <div className="project-stage">
          <div className="project-index-rail" aria-hidden>
            {projects.map((project, index) => (
              <button
                key={project.id}
                className={index === activeProject ? "active" : ""}
                onClick={() => setActiveProject(index)}
                aria-label={`Show ${project.title}`}
              >
                <span>{project.id}</span>
                <i />
              </button>
            ))}
          </div>

          <div className="projects">
            {projects.map((project, index) => (
              <motion.article
                key={project.id}
                className={`project project-${project.tone}`}
                initial={{ opacity: 0, y: 42 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.18 }}
                transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
                onViewportEnter={() => setActiveProject(index)}
              >
                <div className="project-head">
                  <span>{project.id}</span>
                  <span>{project.kicker}</span>
                </div>
                <div className="project-grid">
                  <div className="project-copy">
                    <h3>{project.title}</h3>
                    <p>{project.why}</p>
                    <div className="project-tags">
                      {project.stack.map((tech) => <span key={tech}>{tech}</span>)}
                    </div>
                    <a href={project.repo} target="_blank" rel="noreferrer" className="text-link">
                      view repository <Arrow />
                    </a>
                  </div>
                  <ProjectVisual index={index} />
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <section className="patent shell">
        <div className="patent-top">
          <span className="section-label">03 / field note</span>
          <span>patent / real-time systems</span>
        </div>
        <div className="patent-grid">
          <div>
            <span className="patent-mark">SOS</span>
            <h2>Help should move<br /><em>towards you.</em></h2>
          </div>
          <div className="patent-copy">
            <p>
              The idea was simple: when an SOS is generated, alert nearby users within a
              100–500 m range. The first five who choose to help get directions to the spot;
              extra responders can still join, while officials are alerted simultaneously.
            </p>
            <p className="patent-caption">“fast enough to matter”</p>
          </div>
        </div>
        <div className="radius-map" aria-label="Illustration of a 100 to 500 metre SOS response radius">
          <div className="radius radius-1"><span>100 m</span></div>
          <div className="radius radius-2"><span>250 m</span></div>
          <div className="radius radius-3"><span>500 m</span></div>
          <div className="sos-point">SOS</div>
          <div className="responder responder-1">01</div>
          <div className="responder responder-2">02</div>
          <div className="responder responder-3">03</div>
          <div className="responder responder-4">04</div>
          <div className="responder responder-5">05</div>
        </div>
      </section>

      <section id="about" className="about shell">
        <div className="about-left">
          <span className="section-label">04 / the person behind the code</span>
          <h2>Lowkey.<br />But not <em>small.</em></h2>
          <p>
            Information Technology undergraduate. Full-stack developer. Curious about ML,
            product systems, and the tiny decisions that make software feel effortless.
          </p>
          <p>
            I’m currently learning by building — with a five-month industry project in progress,
            and a growing habit of asking “why does it work this way?” before “how do I code it?”
          </p>
        </div>

        <div className="about-right">
          <div className="skill-wrap">
            <span className="small-title">tools I reach for</span>
            <div className="skill-list">
              {skills.map((skill) => <span key={skill}>{skill}</span>)}
            </div>
          </div>
          <div className="personal-strip">
            <span>discipline / curiosity / strength</span>
            <span>gym after work ≠ work after gym</span>
          </div>
        </div>
      </section>

      <section id="now" className="now shell">
        <div className="now-card">
          <div className="now-top">
            <span className="section-label">05 / now</span>
            <span>september 2026</span>
          </div>
          <div className="now-content">
            <div>
              <span className="now-label">currently</span>
              <h2>building, learning,<br /><em>making it cleaner.</em></h2>
            </div>
            <div className="now-notes">
              <p><b>01</b> five-month internship project · CodexLabs</p>
              <p><b>02</b> deeper into system design + backend architecture</p>
              <p><b>03</b> shipping projects instead of waiting for the “perfect” idea</p>
            </div>
          </div>
        </div>
      </section>

      <footer className="footer shell">
        <div>
          <span className="footer-kicker">come say hi</span>
          <a className="footer-mail" href="mailto:suhanipandita10@gmail.com">suhanipandita10@gmail.com <Arrow /></a>
        </div>
        <div className="footer-links">
          <a href="https://github.com/suhanipandita" target="_blank" rel="noreferrer">GitHub ↗</a>
          <a href="https://www.linkedin.com/in/suhanipandita/" target="_blank" rel="noreferrer">LinkedIn ↗</a>
          <a href="https://www.instagram.com/moose_please/" target="_blank" rel="noreferrer">Instagram ↗</a>
        </div>
        <div className="footer-bottom">© {year} Suhani Pandita · built with Next.js + Motion</div>
      </footer>
    </main>
  );
}
