
import { useState, useEffect } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import "./index.css";

const projects = [
  {
    id: "needle",
    number: "01",
    name: "NEEDLE",
    type: "AI / AGENTIC COMMERCE",
    desc: "An AI-powered wardrobe platform rethinking how people choose outfits and shop by using what they already own.",
    tech: ["React", "Node.js", "Gemini", "Supabase"],
    skills: ["AI / ML", "React"],
    accent: "#D5FF72",
    link: "https://github.com/palak-singh3006/needle_ai",
    shape: "needle-art",
  },
  {
    id: "rag",
    number: "02",
    name: "AGENTIC RAG",
    type: "RETRIEVAL / AI SYSTEMS",
    desc: "A system that retrieves relevant document context and uses it to generate grounded answers with tools.",
    tech: ["Python", "ChromaDB", "Ollama"],
    skills: ["AI / ML", "Python", "RAG"],
    accent: "#C3A6FF",
    link: "",
    shape: "rag-art",
  },
  {
    id: "campus",
    number: "03",
    name: "CAMPUS KNOWLEDGE",
    type: "KNOWLEDGE / SEARCH",
    desc: "Exploring semantic search to make campus information easier to find through documents.",
    tech: ["Python", "Streamlit", "ChromaDB"],
    skills: ["Python", "RAG", "AI / ML"],
    accent: "#8EE4D5",
    link: "",
    shape: "campus-art",
  },
];

const skills = ["AI / ML", "Python", "RAG", "React", "SQL", "Data Science"];

const skillInfo = {
  "AI / ML":
    "Learning to make systems that can recognize patterns, reason and make useful predictions.",
  Python:
    "My playground for automation, data work and building AI systems.",
  RAG:
    "Retrieval, embeddings, context and making language models more grounded.",
  React:
    "Building interactive experiences that turn ideas into interfaces.",
  SQL:
    "Exploring data through queries, joins and patterns.",
  "Data Science":
    "Finding stories, patterns and insights hidden inside data.",
};

const easing = [0.22, 1, 0.36, 1];

function Reveal({ children, className = "", delay = 0 }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 35 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.75, delay, ease: easing }}
    >
      {children}
    </motion.div>
  );
}

function ProjectCard({ project, onClick }) {
  return (
    <motion.article
      layout
      className={`project-card ${project.shape}`}
      style={{ "--accent": project.accent }}
      initial={{ opacity: 0, y: 35 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ duration: 0.45 }}
      whileHover={{ y: -8, rotate: -0.5 }}
      onClick={onClick}
    >
      <div className="project-art">
        <div className="art-index">{project.number}</div>

        {project.id === "needle" && (
          <div className="needle-graphic">
            <span className="needle-orbit orbit-a" />
            <span className="needle-orbit orbit-b" />
            <span className="needle-star">✳</span>
            <span className="needle-label">DRESS WITH INTENTION</span>
            <span className="needle-word">
              OWN
              <br />
              MORE.
            </span>
          </div>
        )}

        {project.id === "rag" && (
          <div className="rag-graphic">
            <div className="rag-node node-a">DOCS</div>
            <div className="rag-node node-b">VECTOR</div>
            <div className="rag-node node-c">AI</div>
            <span className="rag-line line-a" />
            <span className="rag-line line-b" />
            <span className="rag-line line-c" />
            <span className="rag-big">RAG↗</span>
          </div>
        )}

        {project.id === "campus" && (
          <div className="campus-graphic">
            <div className="campus-paper paper-one">KNOWLEDGE</div>
            <div className="campus-paper paper-two">SEARCH</div>
            <div className="campus-paper paper-three">EXPLORE ↗</div>
            <span className="campus-symbol">⌘</span>
          </div>
        )}

        <span className="art-type">{project.type}</span>
      </div>

      <div className="project-info">
        <div className="project-title-row">
          <h3>{project.name}</h3>
          <span className="project-open">↗</span>
        </div>

        <p>{project.desc}</p>

        <div className="project-tech">
          {project.tech.map((t) => (
            <span key={t}>{t}</span>
          ))}
        </div>

        <div className="project-bottom">
          <span>CLICK TO EXPLORE</span>
          <span>✳</span>
        </div>
      </div>
    </motion.article>
  );
}

export default function App() {
  const [activeSkill, setActiveSkill] = useState("ALL");
  const [selected, setSelected] = useState(null);
  const [gaze, setGaze] = useState({ x: 0, y: 0 });

  // Scroll-reactive eye movement
  useEffect(() => {
    let idleTimer;

    const handleWheel = (event) => {
      const hero = document.getElementById("home");
      if (!hero) return;

      const rect = hero.getBoundingClientRect();

      // Only react while the hero section is visible
      if (rect.bottom <= 0 || rect.top >= window.innerHeight) return;

      clearTimeout(idleTimer);

      // Horizontal scrolling
      if (Math.abs(event.deltaX) > Math.abs(event.deltaY)) {
        setGaze({
          x: Math.sign(event.deltaX) * 2.5,
          y: 0,
        });
      } else {
        // Vertical scrolling
        setGaze({
          x: 0,
          y: Math.sign(event.deltaY) * 2.5,
        });
      }

      // Return gaze to center after scrolling stops
      idleTimer = setTimeout(() => {
        setGaze({ x: 0, y: 0 });
      }, 320);
    };

    window.addEventListener("wheel", handleWheel, { passive: true });

    return () => {
      window.removeEventListener("wheel", handleWheel);
      clearTimeout(idleTimer);
    };
  }, []);

  const { scrollYProgress } = useScroll();

  const avatarScale = useTransform(
    scrollYProgress,
    [0, 0.15, 0.4],
    [1.1, 1, 1.06]
  );

  const avatarY = useTransform(scrollYProgress, [0, 1], [0, -55]);

  const avatarRotate = useTransform(scrollYProgress, [0, 1], [0, 3]);

  const visibleProjects =
    activeSkill === "ALL"
      ? projects
      : projects.filter((p) => p.skills.includes(activeSkill));

  function selectSkill(skill) {
    setActiveSkill(skill);
    document.getElementById("projects")?.scrollIntoView({
      behavior: "smooth",
    });
  }

  return (
    <main className="creative-portfolio">
      <motion.div
        className="top-progress"
        style={{ scaleX: scrollYProgress }}
      />

      {/* NAVIGATION */}
      <nav className="nav">
        <a href="#home" className="nav-logo">
          PALAK<span>✳</span>
        </a>

        <span className="nav-status">
          <i /> CURRENTLY EXPLORING AI + DATA
        </span>

        <div className="nav-menu">
          <a href="#about">ABOUT</a>
          <a href="#skills">PLAYGROUND</a>
          <a href="#projects">WORK</a>
          <a href="#contact" className="contact-pill">
            SAY HELLO ↗
          </a>
        </div>
      </nav>

      {/* HERO */}
      <section className="hero" id="home">
        <div className="hero-bg-text" aria-hidden="true">
          CREATIVE
        </div>

        <div className="hero-left">
          <div className="hero-meta">
            <span>INDEPENDENT MIND</span>
            <span>01 — 2026</span>
          </div>

          <div className="avatar-scene">
            <div className="avatar-halo" />
            <div className="avatar-ring" />

            {/* Animated eyes */}
            <motion.div
              className="avatar-eye-layer"
              style={{
                scale: avatarScale,
                y: avatarY,
                rotate: avatarRotate,
              }}
              aria-hidden="true"
            >
              <div className="avatar-eye eye-left">
                <div
                  className="eye-pupil"
                  style={{
                    transform: `translate(${gaze.x}px, ${gaze.y}px)`,
                  }}
                />
              </div>

              <div className="avatar-eye eye-right">
                <div
                  className="eye-pupil"
                  style={{
                    transform: `translate(${gaze.x}px, ${gaze.y}px)`,
                  }}
                />
              </div>
            </motion.div>

            {/* Avatar image */}
            <motion.img
              src="/avatar.png"
              alt="Palak's avatar"
              className="avatar"
              style={{
                scale: avatarScale,
                y: avatarY,
                rotate: avatarRotate,
              }}
            />

            <motion.div
              className="sticker sticker-hello"
              animate={{ rotate: [8, 13, 8], y: [0, -8, 0] }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              HEY, THAT'S ME!
            </motion.div>

            <motion.div
              className="sticker sticker-build"
              animate={{ rotate: [-7, -3, -7], y: [0, 6, 0] }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <span>✳</span> BUILDING IN PUBLIC
            </motion.div>

            <span className="avatar-caption">
              A HUMAN WHO LOVES TO EXPERIMENT
            </span>
          </div>

          <div className="hero-left-bottom">
            <span>SCROLL TO UNRAVEL</span>
            <motion.span
              animate={{ y: [0, 7, 0] }}
              transition={{ duration: 1.4, repeat: Infinity }}
            >
              ↓
            </motion.span>
          </div>
        </div>

        <div className="hero-right">
          <motion.div
            className="hero-small"
            initial={{ opacity: 0, x: 25 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
          >
            I'M AN ENGINEERING STUDENT WHO LOVES
          </motion.div>

          <motion.h1
            initial="hidden"
            animate="visible"
            variants={{
              hidden: {},
              visible: {
                transition: {
                  staggerChildren: 0.15,
                },
              },
            }}
          >
            <motion.span
              variants={{
                hidden: { opacity: 0, y: 70 },
                visible: { opacity: 1, y: 0 },
              }}
            >
              MAKING
            </motion.span>

            <motion.span
              className="hero-line-two"
              variants={{
                hidden: { opacity: 0, y: 70 },
                visible: { opacity: 1, y: 0 },
              }}
            >
              IDEAS
            </motion.span>

            <motion.span
              className="hero-line-three"
              variants={{
                hidden: { opacity: 0, y: 70 },
                visible: { opacity: 1, y: 0 },
              }}
            >
              INTO <em>things.</em>
            </motion.span>
          </motion.h1>

          <motion.p
            className="hero-desc"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
          >
            Exploring artificial intelligence, data science and creative
            technology. I learn by building, experimenting, and occasionally
            breaking things.
          </motion.p>

          <motion.div
            className="hero-cta"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1 }}
          >
            <a href="#projects" className="cta-button">
              EXPLORE MY WORK <span>↗</span>
            </a>
            <a href="#about" className="cta-link">
              WHO AM I? ↓
            </a>
          </motion.div>

          <div className="hero-tags">
            <span>AI & ML</span>
            <span>DATA</span>
            <span>WEB</span>
            <span>EXPERIMENTS</span>
          </div>
        </div>
      </section>

      {/* MARQUEE */}
      <div className="marquee">
        <div className="marquee-track">
          {Array.from({ length: 4 }).map((_, i) => (
            <span key={i}>
              THINK <b>✳</b> BUILD <b>↗</b> BREAK <b>✳</b> LEARN <b>↗</b>{" "}
              REPEAT <b>✳</b>
            </span>
          ))}
        </div>
      </div>

      {/* ABOUT */}
      <section className="about section" id="about">
        <div className="section-label">
          <span>01</span> — A LITTLE ABOUT ME
        </div>

        <Reveal>
          <h2>
            I don't want to
            <br />
            just <span>learn it.</span>
          </h2>
        </Reveal>

        <div className="about-bottom">
          <Reveal>
            <p className="about-statement">
              I want to take it apart. Understand it. And build something with it.
            </p>
          </Reveal>

          <Reveal>
            <p className="about-detail">
              I'm an Information Science Engineering student exploring AI,
              machine learning, data science and intelligent systems. I'm curious
              about how things work behind the screen, and I learn best by
              turning ideas into actual projects.
            </p>

            <div className="about-mini-stats">
              <div>
                <span>STUDY</span>
                <strong>ISE</strong>
              </div>
              <div>
                <span>INTEREST</span>
                <strong>AI + DATA</strong>
              </div>
              <div>
                <span>METHOD</span>
                <strong>BUILD / TEST</strong>
              </div>
            </div>
          </Reveal>
        </div>

        <div className="about-doodle">✳</div>
      </section>

      {/* SKILLS */}
      <section className="playground section" id="skills">
        <div className="section-label">
          <span>02</span> — THE PLAYGROUND
        </div>

        <Reveal>
          <h2>
            Things I'm
            <br />
            <em>obsessed</em> with.
          </h2>
        </Reveal>

        <p className="playground-hint">
          PICK ONE. SEE WHAT I'VE BUILT WITH IT.
        </p>

        <div className="skills-layout">
          <div className="skill-list">
            {skills.map((skill, i) => (
              <motion.button
                key={skill}
                className={`skill-row ${
                  activeSkill === skill ? "skill-selected" : ""
                }`}
                onClick={() => selectSkill(skill)}
                whileHover={{ x: 10 }}
                whileTap={{ scale: 0.98 }}
              >
                <span className="skill-num">0{i + 1}</span>
                <span className="skill-name">{skill}</span>
                <span className="skill-arrow">↗</span>
              </motion.button>
            ))}
          </div>

          <div className="skill-side">
            <motion.div
              className="skill-orb"
              animate={{ rotate: 360 }}
              transition={{
                duration: 35,
                repeat: Infinity,
                ease: "linear",
              }}
            >
              <div className="orb-inner">✳</div>
            </motion.div>

            <AnimatePresence mode="wait">
              <motion.p
                key={activeSkill}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
              >
                {activeSkill === "ALL"
                  ? "Curiosity is my favourite tool. Click an interest to explore its experiments."
                  : skillInfo[activeSkill]}
              </motion.p>
            </AnimatePresence>

            <button
              className="all-projects"
              onClick={() => {
                setActiveSkill("ALL");
                document.getElementById("projects")?.scrollIntoView({
                  behavior: "smooth",
                });
              }}
            >
              VIEW ALL PROJECTS ↗
            </button>
          </div>
        </div>
      </section>

      {/* PROJECTS */}
      <section className="work section" id="projects">
        <div className="section-label">
          <span>03</span> — EXPERIMENTS & PROJECTS
        </div>

        <Reveal>
          <h2>
            Proof that
            <br />I <em>make things.</em>
          </h2>
        </Reveal>

        <div className="work-heading-bottom">
          <p>Curiosity, code and a lot of figuring things out.</p>
          <span>
            {activeSkill === "ALL" ? "ALL WORK" : `FILTER: ${activeSkill}`} /{" "}
            {visibleProjects.length}
          </span>
        </div>

        <motion.div className="work-grid" layout>
          <AnimatePresence mode="popLayout">
            {visibleProjects.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                onClick={() => setSelected(project)}
              />
            ))}
          </AnimatePresence>
        </motion.div>

        {activeSkill !== "ALL" && (
          <button
            className="reset-skills"
            onClick={() => setActiveSkill("ALL")}
          >
            ↶ RESET FILTER / SHOW EVERYTHING
          </button>
        )}
      </section>

      {/* PROJECT MODAL */}
      <AnimatePresence>
        {selected && (
          <motion.div
            className="modal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelected(null)}
          >
            <motion.div
              className="modal-content"
              initial={{ scale: 0.92, y: 30 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.96 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                className="modal-x"
                onClick={() => setSelected(null)}
              >
                CLOSE ×
              </button>

              <span className="section-label">
                {selected.number} — {selected.type}
              </span>

              <h2>{selected.name}</h2>
              <p>{selected.desc}</p>

              <div className="modal-tech">
                {selected.tech.map((t) => (
                  <span key={t}>{t}</span>
                ))}
              </div>

              {selected.link ? (
                <a
                  className="cta-button modal-button"
                  href={selected.link}
                  target="_blank"
                  rel="noreferrer"
                >
                  OPEN GITHUB ↗
                </a>
              ) : (
                <p className="repo-note">
                  PROJECT DETAILS / REPOSITORY COMING SOON
                </p>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* JOURNEY */}
      <section className="journey section" id="journey">
        <div className="section-label">
          <span>04</span> — CURRENT STORY
        </div>

        <Reveal>
          <h2>
            Work in
            <br />
            <span>progress.</span>
          </h2>
        </Reveal>

        <div className="journey-grid">
          <Reveal>
            <div className="journey-card">
              <span>01 / STUDY</span>
              <h3>Engineering</h3>
              <p>
                Information Science. Learning the fundamentals and finding my
                direction.
              </p>
              <b>↗</b>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="journey-card">
              <span>02 / EXPLORE</span>
              <h3>AI & Data</h3>
              <p>
                Building projects around AI, retrieval systems and analytics.
              </p>
              <b>↗</b>
            </div>
          </Reveal>

          <Reveal delay={0.2}>
            <div className="journey-card">
              <span>03 / COMMUNITY</span>
              <h3>Leadership</h3>
              <p>
                Learning with people, organizing activities and sharing technology.
              </p>
              <b>↗</b>
            </div>
          </Reveal>
        </div>
      </section>

      {/* CONTACT */}
      <section className="contact section" id="contact">
        <div className="contact-star">✳</div>

        <div className="section-label">
          <span>05</span> — END / OR BEGIN?
        </div>

        <Reveal>
          <h2>
            LET'S MAKE
            <br />
            SOME <em>noise.</em>
          </h2>
        </Reveal>

        <p className="contact-desc">
          Open to internships, collaborations, new ideas and interesting
          conversations.
        </p>

        <div className="contact-links">
          <a
            href="https://github.com/palak-singh3006/needle_ai"
            target="_blank"
            rel="noreferrer"
          >
            GITHUB <span>↗</span>
          </a>

          <a
            href="https://www.linkedin.com/in/palak-singh-a77243319/"
            target="_blank"
            rel="noreferrer"
          >
            LINKEDIN <span>↗</span>
          </a>

          <a href="mailto:">
            EMAIL <span>↗</span>
          </a>
        </div>

        <footer className="footer">
          <span>MADE OF CURIOSITY ✳</span>
          <a href="#home">BACK TO TOP ↑</a>
          <span>PALAK SINGH · 2026</span>
        </footer>
      </section>
    </main>
  );
}
