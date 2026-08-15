import { useState, useEffect, useRef } from "react"

const NAV_LINKS = ["Home", "About", "Experience", "Projects", "Skills", "Contact"]

const PROJECTS = [
  {
    title: "Echoes of the Void",
    genre: "Action RPG",
    year: "2024",
    desc: "A dark fantasy action RPG set in a collapsing multiverse. Features real-time combat, procedurally generated dungeons, and a branching narrative with 40+ hours of gameplay.",
    tags: ["Unity", "C#", "Procedural Gen", "HLSL"],
    color: "#a855f7",
    img: "https://images.unsplash.com/photo-1538481199705-c710c4e965fc?w=600&h=400&fit=crop&auto=format",
    status: "Shipped",
  },
  {
    title: "NeonDrift",
    genre: "Racing / Arcade",
    year: "2023",
    desc: "A synthwave-fueled infinite racing game with dynamic obstacle generation, leaderboard integration, and a soundtrack that reacts to player speed and performance.",
    tags: ["Unreal Engine 5", "C++", "Blueprint", "Niagara VFX"],
    color: "#00d9f5",
    img: "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=600&h=400&fit=crop&auto=format",
    status: "Shipped",
  },
  {
    title: "Phantom Grid",
    genre: "Puzzle / Strategy",
    year: "2024",
    desc: "A grid-based puzzle game where players manipulate quantum states to solve increasingly complex challenges. Features 120 hand-crafted levels and an online level editor.",
    tags: ["Godot 4", "GDScript", "Shader Graph", "WebGL"],
    color: "#00f5a0",
    img: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=600&h=400&fit=crop&auto=format",
    status: "In Dev",
  },
]

const SKILLS = [
  { name: "Unity / C#", level: 92, color: "#00f5a0" },
  { name: "Unreal Engine 5 / C++", level: 85, color: "#00d9f5" },
  { name: "Godot 4 / GDScript", level: 78, color: "#a855f7" },
  { name: "HLSL / GLSL Shaders", level: 72, color: "#ff3b3b" },
  { name: "VR Development (Quest / SteamVR)", level: 80, color: "#00f5a0" },
  { name: "Game Design & Mechanics", level: 90, color: "#00d9f5" },
  { name: "Multiplayer / Netcode", level: 70, color: "#a855f7" },
  { name: "Video Production & Editing", level: 75, color: "#ff3b3b" },
  { name: "3D Modelling (Blender)", level: 65, color: "#00f5a0" },
  { name: "Web Development (React / JS)", level: 68, color: "#00d9f5" },
]

const EXPERIENCE = [
  {
    company: "Kora Interactive",
    role: "Game Developer/ VR Engineer",
    period: "Jan 2026 — Present",
    location: "Enugu, Nigeria",
    color: "#00f5a0",
    desc: "Turning creative ideas into functional, high-quality interactive experiences. Designing, building and maintaining technical systems for games and immersive products — gameplay mechanics, UI, performance optimisations, and backend systems. Contributing to technical decision-making and development pipeline improvements.",
  },  
  {
    company: "Landjax Real Estate Company",
    role: "VR Developer",
    period: "Nov 2024 — Dec 2025",
    location: "United States (Remote)",
    color: "#00d9f5",
    desc: "Directed a team of 8 VR engineers building the VR system for Real Estate development. Built a VR UI system handling Virtual tour of apartmets, lands and residential buildings. Trained new recruits and maintained the VR project long-term.",
  },
  {
    company: "Luvira LLC",
    role: "VR Developer",
    period: "Nov 2025 — May 2026",
    location: "United States (Remote)",
    color: "#00d9f5",
    desc: "Directed a team of 8 VR engineers building the VR system for an adventure game. Delivered a successful MVP release for a Blockchain game. Built a VR UI system handling UI animations and dynamic loading of game data. Trained new recruits and maintained the VR project long-term.",
  },
  {
    company: "ProVision Innovations",
    role: "Co-Founder/ Game Developer",
    period: "Apr 2023 — Jan 2026",
    location: "Munich",
    color: "#a855f7",
    desc: "Co-founded an interactive technology venture, driving product direction, technical architecture, and team growth over nearly three years.",
  },
  {
    company: "KC Game Studios",
    role: "Game Developer",
    period: "Feb 2023 — Jan 2024",
    location: "Munich",
    color: "#a855f7",
    desc: "Buit Gameplay Simulations for interactive physical games, driving product direction, technical architecture, and team growth over nearly 11 months.",
  },
  {
    company: "Quiva Games",
    role: "Game Developer",
    period: "Feb 2020 — Nov 2024",
    location: "Enugu, Nigeria",
    color: "#00f5a0",
    desc: "Nearly five years developing games across Unity, Unreal, and Godot. Shipped multiplayer titles, simulation-based games, and UI-heavy systems. Responsible for core gameplay logic, scalable system design, and cross-engine porting to test performance and flexibility.",
  },
  {
    company: "KEDI",
    role: "Technical Specialist",
    period: "Mar 2017 — Jan 2021",
    location: "FCT, Nigeria",
    color: "#00d9f5",
    desc: "Provided technical support and specialist services across software and hardware systems in a professional environment spanning nearly four years.",
  },
  {
    company: "Xend Finance",
    role: "Web Developer",
    period: "Aug 2019 — Mar 2020",
    location: "Nigeria",
    color: "#ff3b3b",
    desc: "Built and maintained web-facing products for a fintech/DeFi platform.",
  },
]

const EDUCATION = [
  {
    school: "Enugu State University of Science and Technology",
    degree: "B.Sc. Computer Engineering",
    period: "Nov 2017 — Apr 2022",
  },
]

const STATS = [
  { label: "Games Shipped", value: "8+" },
  { label: "Years XP", value: "9+" },
  { label: "Companies", value: "6+" },
  { label: "Engines Mastered", value: "3" },
]

function useInView(threshold = 0.2) {
  const ref = useRef<HTMLDivElement>(null)
  const [inView, setInView] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setInView(true) },
      { threshold }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])
  return { ref, inView }
}

function GlitchTitle({ text }: { text: string }) {
  return (
    <span className="glitch-text font-mono-display" data-text={text}>
      {text}
    </span>
  )
}

function TypeWriter({ texts, speed = 80 }: { texts: string[]; speed?: number }) {
  const [displayed, setDisplayed] = useState("")
  const [idx, setIdx] = useState(0)
  const [charIdx, setCharIdx] = useState(0)
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    const current = texts[idx]
    if (!deleting && charIdx < current.length) {
      const t = setTimeout(() => setCharIdx((c) => c + 1), speed)
      return () => clearTimeout(t)
    } else if (!deleting && charIdx === current.length) {
      const t = setTimeout(() => setDeleting(true), 2000)
      return () => clearTimeout(t)
    } else if (deleting && charIdx > 0) {
      const t = setTimeout(() => setCharIdx((c) => c - 1), speed / 2)
      return () => clearTimeout(t)
    } else if (deleting && charIdx === 0) {
      setDeleting(false)
      setIdx((i) => (i + 1) % texts.length)
    }
    setDisplayed(current.slice(0, charIdx))
  }, [charIdx, deleting, idx, texts, speed])

  useEffect(() => {
    setDisplayed(texts[idx].slice(0, charIdx))
  }, [charIdx, idx, texts])

  return (
    <span>
      <span style={{ color: "#00f5a0" }}>{displayed}</span>
      <span
        style={{ color: "#00f5a0", animation: "blink 1s step-end infinite" }}
        className="font-mono-display"
      >
        _
      </span>
    </span>
  )
}

function Navbar({ active, setActive }: { active: string; setActive: (s: string) => void }) {
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40)
    window.addEventListener("scroll", handler)
    return () => window.removeEventListener("scroll", handler)
  }, [])

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        background: scrolled ? "rgba(8,12,16,0.92)" : "transparent",
        backdropFilter: scrolled ? "blur(12px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(0,245,160,0.12)" : "none",
      }}
    >
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <div className="font-mono-display text-sm font-bold" style={{ color: "#00f5a0" }}>
          &gt; PN.exe
        </div>
        <div className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <a
              key={link}
              href={`#${link.toLowerCase()}`}
              onClick={() => setActive(link)}
              className="nav-link font-mono-display text-xs tracking-widest uppercase"
              style={{ color: active === link ? "#00f5a0" : "#64748b" }}
            >
              {link}
            </a>
          ))}
        </div>
        <div className="font-mono-display text-xs" style={{ color: "#1e2d3d" }}>
          v2.4.1
        </div>
      </div>
    </nav>
  )
}

function Hero() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      setMousePos({ x: e.clientX / window.innerWidth - 0.5, y: e.clientY / window.innerHeight - 0.5 })
    }
    window.addEventListener("mousemove", handler)
    return () => window.removeEventListener("mousemove", handler)
  }, [])

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden scanline-overlay"
      style={{ background: "#080c10" }}
    >
      {/* Animated grid */}
      <div className="absolute inset-0 grid-bg" />

      {/* Ambient glow orbs */}
      <div
        className="absolute rounded-full pointer-events-none"
        style={{
          width: 600,
          height: 600,
          background: "radial-gradient(circle, rgba(0,245,160,0.06) 0%, transparent 70%)",
          top: "20%",
          left: "60%",
          transform: `translate(${mousePos.x * -30}px, ${mousePos.y * -20}px)`,
          transition: "transform 0.3s ease",
        }}
      />
      <div
        className="absolute rounded-full pointer-events-none"
        style={{
          width: 400,
          height: 400,
          background: "radial-gradient(circle, rgba(168,85,247,0.06) 0%, transparent 70%)",
          bottom: "10%",
          left: "10%",
          transform: `translate(${mousePos.x * 20}px, ${mousePos.y * 15}px)`,
          transition: "transform 0.3s ease",
        }}
      />

      {/* Corner decorations */}
      <div
        className="absolute top-8 left-8 font-mono-display text-xs"
        style={{ color: "#1e2d3d" }}
      >
        COORDINATES: 6.4550°N, 3.3841°E
      </div>
      <div
        className="absolute bottom-8 right-8 font-mono-display text-xs"
        style={{ color: "#1e2d3d" }}
      >
        SYS::ONLINE — 2026
      </div>

      {/* Vertical side text */}
      <div
        className="absolute left-6 top-1/2 font-mono-display text-xs tracking-widest"
        style={{
          color: "#1e2d3d",
          writingMode: "vertical-rl",
          transform: "translateY(-50%) rotate(180deg)",
        }}
      >
        GAME DEVELOPER / CREATIVE TECHNOLOGIST
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        <div
          className="font-mono-display text-xs tracking-widest mb-6 fade-in-up"
          style={{ color: "#00f5a0", animationDelay: "0.1s", opacity: 0, animationFillMode: "forwards" }}
        >
          INITIALIZING PORTFOLIO...
        </div>

        <h1
          className="font-mono-display font-bold mb-4 leading-none fade-in-up"
          style={{
            fontSize: "clamp(3rem, 9vw, 7rem)",
            color: "#e2e8f0",
            letterSpacing: "-0.02em",
            animationDelay: "0.3s",
            opacity: 0,
            animationFillMode: "forwards",
          }}
        >
          <GlitchTitle text="PRECIOUS" />
          <br />
          <span style={{ color: "#00f5a0", display: "block" }}>NKWUA</span>
        </h1>

        <div
          className="text-xl md:text-2xl mb-10 fade-in-up"
          style={{
            animationDelay: "0.5s",
            opacity: 0,
            animationFillMode: "forwards",
            color: "#64748b",
          }}
        >
          <TypeWriter
            texts={[
              "Game Developer",
              "Creative Technologist",
              "Shader Artist",
              "World Builder",
              "Level Designer",
            ]}
          />
        </div>

        <div
          className="flex flex-wrap gap-4 justify-center fade-in-up"
          style={{ animationDelay: "0.7s", opacity: 0, animationFillMode: "forwards" }}
        >
          <a
            href="#projects"
            className="font-mono-display text-sm px-8 py-3 font-bold tracking-widest uppercase transition-all duration-200"
            style={{
              background: "#00f5a0",
              color: "#080c10",
              border: "2px solid #00f5a0",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "transparent"
              e.currentTarget.style.color = "#00f5a0"
              e.currentTarget.style.boxShadow = "0 0 20px rgba(0,245,160,0.3)"
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "#00f5a0"
              e.currentTarget.style.color = "#080c10"
              e.currentTarget.style.boxShadow = "none"
            }}
          >
            &gt; View Projects
          </a>
          <a
            href="#contact"
            className="font-mono-display text-sm px-8 py-3 font-bold tracking-widest uppercase transition-all duration-200"
            style={{
              background: "transparent",
              color: "#00f5a0",
              border: "2px solid rgba(0,245,160,0.3)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = "#00f5a0"
              e.currentTarget.style.boxShadow = "0 0 20px rgba(0,245,160,0.15)"
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "rgba(0,245,160,0.3)"
              e.currentTarget.style.boxShadow = "none"
            }}
          >
            &gt; Hire Me
          </a>
        </div>

        {/* Stats row */}
        <div
          className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-6 fade-in-up"
          style={{ animationDelay: "0.9s", opacity: 0, animationFillMode: "forwards" }}
        >
          {STATS.map((s) => (
            <div key={s.label} className="text-center" style={{ borderTop: "1px solid #1e2d3d", paddingTop: 16 }}>
              <div
                className="font-mono-display text-3xl font-bold"
                style={{ color: "#00f5a0" }}
              >
                {s.value}
              </div>
              <div className="font-mono-display text-xs mt-1 tracking-widest" style={{ color: "#64748b" }}>
                {s.label.toUpperCase()}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        style={{ animation: "float 2.5s ease-in-out infinite" }}
      >
        <span className="font-mono-display text-xs tracking-widest" style={{ color: "#1e2d3d" }}>
          SCROLL
        </span>
        <div style={{ width: 1, height: 40, background: "linear-gradient(to bottom, #00f5a0, transparent)" }} />
      </div>
    </section>
  )
}

function About() {
  const { ref, inView } = useInView()
  return (
    <section id="about" className="py-24 px-6 relative" style={{ background: "#0d1117" }}>
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 80% 50%, rgba(168,85,247,0.04) 0%, transparent 70%)",
        }}
      />
      <div ref={ref} className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          {/* Left: image + decorations */}
          <div
            className="relative"
            style={{
              opacity: inView ? 1 : 0,
              transform: inView ? "translateX(0)" : "translateX(-40px)",
              transition: "all 0.8s ease",
            }}
          >
            <div
              className="relative floating"
              style={{ maxWidth: 360 }}
            >
              <img
                src="https://images.unsplash.com/photo-1607799279861-4dd421887fb3?w=500&h=600&fit=crop&auto=format"
                alt="Developer at work"
                className="w-full"
                style={{
                  filter: "grayscale(30%) contrast(1.1)",
                  border: "1px solid #1e2d3d",
                }}
              />
              {/* Neon frame corners */}
              {[
                { top: -4, left: -4 },
                { top: -4, right: -4 },
                { bottom: -4, left: -4 },
                { bottom: -4, right: -4 },
              ].map((pos, i) => (
                <div
                  key={i}
                  className="absolute"
                  style={{
                    width: 20,
                    height: 20,
                    border: "2px solid #00f5a0",
                    borderRadius: 0,
                    ...pos,
                    ...(i === 0 ? { borderRight: "none", borderBottom: "none" } : {}),
                    ...(i === 1 ? { borderLeft: "none", borderBottom: "none" } : {}),
                    ...(i === 2 ? { borderRight: "none", borderTop: "none" } : {}),
                    ...(i === 3 ? { borderLeft: "none", borderTop: "none" } : {}),
                  }}
                />
              ))}
              {/* Status badge */}
              <div
                className="absolute -bottom-4 -right-4 font-mono-display text-xs px-4 py-2 tracking-widest"
                style={{
                  background: "#00f5a0",
                  color: "#080c10",
                  fontWeight: 700,
                }}
              >
                AVAILABLE FOR HIRE
              </div>
            </div>
          </div>

          {/* Right: text */}
          <div
            style={{
              opacity: inView ? 1 : 0,
              transform: inView ? "translateX(0)" : "translateX(40px)",
              transition: "all 0.8s ease 0.2s",
            }}
          >
            <div className="font-mono-display text-xs tracking-widest mb-3" style={{ color: "#00f5a0" }}>
              &gt; ABOUT_ME.txt
            </div>
            <h2
              className="font-mono-display font-bold mb-6 leading-tight"
              style={{ fontSize: "clamp(2rem, 4vw, 3rem)", color: "#e2e8f0" }}
            >
              I Build Worlds
              <br />
              <span style={{ color: "#a855f7" }}>From Code</span>
            </h2>
            <p className="mb-4 leading-relaxed" style={{ color: "#94a3b8", fontSize: 15 }}>
              I'm Precious Nkwua — a game developer focused on building interactive systems,
              gameplay mechanics, and immersive player experiences across Unity, Unreal, and Godot.
              I enjoy translating ideas into playable experiences: fast-paced gameplay loops,
              responsive UI, and clean, maintainable systems that scale.
            </p>
            <p className="mb-6 leading-relaxed" style={{ color: "#94a3b8", fontSize: 15 }}>
              With 9+ years in tech — including VR leadership, co-founding a venture, and shipping
              MVPs across multiple studios — I'm particularly interested in real-time AI logic,
              event-driven architectures, and player interaction systems. I'm a B.Sc. Computer
              Engineering graduate based in Enugu, Nigeria.
            </p>
            <div className="flex flex-wrap gap-3">
              {["Unity", "Unreal 5", "Godot 4", "HLSL", "Blender", "Game Design"].map((tag) => (
                <span
                  key={tag}
                  className="font-mono-display text-xs px-3 py-1 tracking-widest"
                  style={{
                    border: "1px solid #1e2d3d",
                    color: "#64748b",
                    background: "rgba(0,245,160,0.03)",
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function Experience() {
  const { ref, inView } = useInView(0.1)
  return (
    <section id="experience" className="py-24 px-6 relative" style={{ background: "#080c10" }}>
      <div className="absolute inset-0 grid-bg opacity-30" />
      <div ref={ref} className="max-w-6xl mx-auto relative z-10">
        <div
          className="mb-16"
          style={{
            opacity: inView ? 1 : 0,
            transform: inView ? "translateY(0)" : "translateY(30px)",
            transition: "all 0.6s ease",
          }}
        >
          <div className="font-mono-display text-xs tracking-widest mb-3" style={{ color: "#00f5a0" }}>
            &gt; EXPERIENCE.log
          </div>
          <h2
            className="font-mono-display font-bold"
            style={{ fontSize: "clamp(2rem, 4vw, 3rem)", color: "#e2e8f0" }}
          >
            CAREER TIMELINE
          </h2>
        </div>

        <div className="relative">
          {/* Timeline line */}
          <div
            className="absolute left-0 top-0 bottom-0 hidden md:block"
            style={{ width: 1, background: "linear-gradient(to bottom, #00f5a0, #1e2d3d)", left: 11 }}
          />

          <div className="flex flex-col gap-10">
            {EXPERIENCE.map((exp, i) => (
              <div
                key={exp.company + exp.role}
                className="md:pl-10 relative"
                style={{
                  opacity: inView ? 1 : 0,
                  transform: inView ? "translateX(0)" : "translateX(-30px)",
                  transition: `all 0.6s ease ${0.1 * i}s`,
                }}
              >
                {/* Timeline dot */}
                <div
                  className="absolute hidden md:block"
                  style={{
                    width: 8,
                    height: 8,
                    borderRadius: "50%",
                    background: exp.color,
                    left: 8,
                    top: 8,
                    boxShadow: `0 0 10px ${exp.color}`,
                  }}
                />

                <div
                  className="card-hover p-6"
                  style={{ border: "1px solid #1e2d3d", background: "#0d1117" }}
                >
                  <div className="flex flex-wrap items-start justify-between gap-2 mb-3">
                    <div>
                      <h3
                        className="font-mono-display font-bold text-lg leading-tight"
                        style={{ color: "#e2e8f0" }}
                      >
                        {exp.company}
                      </h3>
                      <div
                        className="font-mono-display text-sm mt-0.5"
                        style={{ color: exp.color }}
                      >
                        {exp.role}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-mono-display text-xs tracking-widest" style={{ color: "#64748b" }}>
                        {exp.period}
                      </div>
                      <div className="font-mono-display text-xs mt-0.5" style={{ color: "#1e2d3d" }}>
                        {exp.location}
                      </div>
                    </div>
                  </div>
                  <p className="text-sm leading-relaxed" style={{ color: "#64748b" }}>
                    {exp.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Education */}
        <div
          className="mt-16"
          style={{
            opacity: inView ? 1 : 0,
            transition: "all 0.6s ease 0.7s",
          }}
        >
          <div className="font-mono-display text-xs tracking-widest mb-6" style={{ color: "#a855f7" }}>
            &gt; EDUCATION.json
          </div>
          {EDUCATION.map((edu) => (
            <div
              key={edu.school}
              className="card-hover p-6 flex flex-wrap items-center justify-between gap-4"
              style={{ border: "1px solid #1e2d3d", background: "#0d1117" }}
            >
              <div>
                <div className="font-mono-display font-bold" style={{ color: "#e2e8f0" }}>
                  {edu.school}
                </div>
                <div className="font-mono-display text-sm mt-1" style={{ color: "#a855f7" }}>
                  {edu.degree}
                </div>
              </div>
              <div className="font-mono-display text-xs tracking-widest" style={{ color: "#64748b" }}>
                {edu.period}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function Projects() {
  const { ref, inView } = useInView(0.1)
  return (
    <section id="projects" className="py-24 px-6 relative" style={{ background: "#080c10" }}>
      <div className="absolute inset-0 grid-bg opacity-50" />
      <div ref={ref} className="max-w-6xl mx-auto relative z-10">
        <div
          className="mb-16"
          style={{
            opacity: inView ? 1 : 0,
            transform: inView ? "translateY(0)" : "translateY(30px)",
            transition: "all 0.6s ease",
          }}
        >
          <div className="font-mono-display text-xs tracking-widest mb-3" style={{ color: "#00f5a0" }}>
            &gt; PROJECTS.exe —— LOADING...
          </div>
          <h2
            className="font-mono-display font-bold"
            style={{ fontSize: "clamp(2rem, 4vw, 3rem)", color: "#e2e8f0" }}
          >
            SHIPPED TITLES
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {PROJECTS.map((p, i) => (
            <div
              key={p.title}
              className="card-hover group"
              style={{
                border: "1px solid #1e2d3d",
                background: "#0d1117",
                opacity: inView ? 1 : 0,
                transform: inView ? "translateY(0)" : "translateY(40px)",
                transition: `all 0.6s ease ${0.15 * i}s`,
              }}
            >
              <div className="relative overflow-hidden" style={{ height: 200 }}>
                <img
                  src={p.img}
                  alt={p.title}
                  className="w-full h-full object-cover"
                  style={{
                    filter: "grayscale(40%) contrast(1.1)",
                    transition: "filter 0.4s ease, transform 0.4s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.filter = "grayscale(0%) contrast(1.1)"
                    e.currentTarget.style.transform = "scale(1.05)"
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.filter = "grayscale(40%) contrast(1.1)"
                    e.currentTarget.style.transform = "scale(1)"
                  }}
                />
                <div
                  className="absolute inset-0"
                  style={{
                    background: `linear-gradient(to top, #0d1117 0%, transparent 60%)`,
                  }}
                />
                <div
                  className="absolute top-3 right-3 font-mono-display text-xs px-2 py-1 font-bold"
                  style={{
                    background: p.status === "Shipped" ? "#00f5a0" : "#a855f7",
                    color: "#080c10",
                  }}
                >
                  {p.status.toUpperCase()}
                </div>
              </div>

              <div className="p-5">
                <div className="flex items-start justify-between mb-2">
                  <h3
                    className="font-mono-display font-bold text-lg"
                    style={{ color: "#e2e8f0" }}
                  >
                    {p.title}
                  </h3>
                  <span className="font-mono-display text-xs" style={{ color: "#64748b" }}>
                    {p.year}
                  </span>
                </div>
                <div
                  className="font-mono-display text-xs tracking-widest mb-3"
                  style={{ color: p.color }}
                >
                  {p.genre.toUpperCase()}
                </div>
                <p className="text-sm leading-relaxed mb-4" style={{ color: "#64748b" }}>
                  {p.desc}
                </p>
                <div className="flex flex-wrap gap-2">
                  {p.tags.map((tag) => (
                    <span
                      key={tag}
                      className="font-mono-display text-xs px-2 py-0.5"
                      style={{
                        border: `1px solid ${p.color}33`,
                        color: p.color,
                        background: `${p.color}08`,
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function Skills() {
  const { ref, inView } = useInView(0.2)
  return (
    <section id="skills" className="py-24 px-6" style={{ background: "#0d1117" }}>
      <div ref={ref} className="max-w-6xl mx-auto">
        <div
          className="mb-16"
          style={{
            opacity: inView ? 1 : 0,
            transform: inView ? "translateY(0)" : "translateY(30px)",
            transition: "all 0.6s ease",
          }}
        >
          <div className="font-mono-display text-xs tracking-widest mb-3" style={{ color: "#00f5a0" }}>
            &gt; SKILL_TREE.json
          </div>
          <h2
            className="font-mono-display font-bold"
            style={{ fontSize: "clamp(2rem, 4vw, 3rem)", color: "#e2e8f0" }}
          >
            TECH STACK
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-x-16 gap-y-8">
          {SKILLS.map((skill, i) => (
            <div
              key={skill.name}
              style={{
                opacity: inView ? 1 : 0,
                transform: inView ? "translateX(0)" : "translateX(-20px)",
                transition: `all 0.6s ease ${0.07 * i}s`,
              }}
            >
              <div className="flex justify-between items-center mb-2">
                <span className="font-mono-display text-sm" style={{ color: "#e2e8f0" }}>
                  {skill.name}
                </span>
                <span className="font-mono-display text-xs" style={{ color: skill.color }}>
                  {inView ? `${skill.level}%` : "00%"}
                </span>
              </div>
              <div
                className="relative overflow-hidden"
                style={{ height: 4, background: "#1e2d3d" }}
              >
                <div
                  className="absolute top-0 left-0 h-full skill-bar-fill"
                  style={{
                    width: inView ? `${skill.level}%` : "0%",
                    background: skill.color,
                    boxShadow: `0 0 8px ${skill.color}`,
                    transitionDelay: `${0.07 * i}s`,
                  }}
                />
              </div>
            </div>
          ))}
        </div>

        {/* Engine badges */}
        <div
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4"
          style={{
            opacity: inView ? 1 : 0,
            transition: "all 0.6s ease 0.6s",
          }}
        >
          {[
            { name: "Unity", icon: "◈", color: "#00f5a0" },
            { name: "Unreal 5", icon: "◆", color: "#00d9f5" },
            { name: "Godot 4", icon: "◉", color: "#a855f7" },
            { name: "Blender", icon: "◎", color: "#ff3b3b" },
          ].map((eng) => (
            <div
              key={eng.name}
              className="card-hover text-center py-8"
              style={{ border: "1px solid #1e2d3d", background: "#080c10" }}
            >
              <div className="text-4xl mb-2" style={{ color: eng.color }}>
                {eng.icon}
              </div>
              <div className="font-mono-display text-xs tracking-widest" style={{ color: "#64748b" }}>
                {eng.name.toUpperCase()}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function Contact() {
  const { ref, inView } = useInView()
  const [copied, setCopied] = useState(false)

  const copyEmail = () => {
    navigator.clipboard.writeText("nkwuap@gmail.com")
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <section id="contact" className="py-24 px-6 relative overflow-hidden" style={{ background: "#080c10" }}>
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 50% 60% at 50% 50%, rgba(0,245,160,0.04) 0%, transparent 70%)",
        }}
      />
      <div className="absolute inset-0 grid-bg opacity-40" />

      <div ref={ref} className="max-w-3xl mx-auto text-center relative z-10">
        <div
          style={{
            opacity: inView ? 1 : 0,
            transform: inView ? "translateY(0)" : "translateY(40px)",
            transition: "all 0.8s ease",
          }}
        >
          <div className="font-mono-display text-xs tracking-widest mb-4" style={{ color: "#00f5a0" }}>
            &gt; CONTACT.init()
          </div>
          <h2
            className="font-mono-display font-bold mb-6 leading-tight"
            style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)", color: "#e2e8f0" }}
          >
            LET'S BUILD
            <br />
            <span style={{ color: "#00f5a0" }}>SOMETHING</span>
            <br />
            EPIC
          </h2>
          <p className="mb-10 max-w-lg mx-auto" style={{ color: "#64748b", lineHeight: 1.8 }}>
            Open to full-time roles, contract work, and game jam collabs.
            If you've got a vision, I've got the code to make it real.
          </p>

          <div className="flex flex-wrap gap-4 justify-center mb-10">
            <button
              onClick={copyEmail}
              className="font-mono-display text-sm px-8 py-4 font-bold tracking-widest uppercase transition-all duration-200 neon-border"
              style={{
                background: "#00f5a0",
                color: "#080c10",
                border: "2px solid #00f5a0",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "transparent"
                e.currentTarget.style.color = "#00f5a0"
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "#00f5a0"
                e.currentTarget.style.color = "#080c10"
              }}
            >
              {copied ? "✓ COPIED!" : "> Copy Email"}
            </button>
            <a
              href="https://www.linkedin.com/in/precious-nkwua-b22885202/"
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono-display text-sm px-8 py-4 font-bold tracking-widest uppercase transition-all duration-200"
              style={{
                border: "2px solid rgba(0,245,160,0.3)",
                color: "#00f5a0",
                background: "transparent",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "#00f5a0"
                e.currentTarget.style.boxShadow = "0 0 20px rgba(0,245,160,0.15)"
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "rgba(0,245,160,0.3)"
                e.currentTarget.style.boxShadow = "none"
              }}
            >
              &gt; LinkedIn
            </a>
            <a
              href="https://linktr.ee/nkpresh"
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono-display text-sm px-8 py-4 font-bold tracking-widest uppercase transition-all duration-200"
              style={{
                border: "2px solid rgba(168,85,247,0.3)",
                color: "#a855f7",
                background: "transparent",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "#a855f7"
                e.currentTarget.style.boxShadow = "0 0 20px rgba(168,85,247,0.15)"
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "rgba(168,85,247,0.3)"
                e.currentTarget.style.boxShadow = "none"
              }}
            >
              &gt; Linktree
            </a>
          </div>

          <div className="font-mono-display text-xs tracking-widest" style={{ color: "#1e2d3d" }}>
            nkwuap@gmail.com · Enugu State, Nigeria
          </div>
        </div>
      </div>

      {/* Footer */}
      <div
        className="mt-20 pt-8 text-center font-mono-display text-xs"
        style={{ borderTop: "1px solid #1e2d3d", color: "#1e2d3d" }}
      >
        PRECIOUS NKWUA © 2026 — ALL RIGHTS RESERVED — BUILT WITH REACT + VITE
      </div>
    </section>
  )
}

export default function App() {
  const [active, setActive] = useState("Home")

  useEffect(() => {
    const sectionIds = NAV_LINKS.map((l) => l.toLowerCase())
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const name = entry.target.id
            const match = NAV_LINKS.find((l) => l.toLowerCase() === name)
            if (match) setActive(match)
          }
        })
      },
      { threshold: 0.3 }
    )
    sectionIds.forEach((id) => {
      const el = document.getElementById(id)
      if (el) obs.observe(el)
    })
    return () => obs.disconnect()
  }, [])

  return (
    <div style={{ background: "#080c10", minHeight: "100vh" }}>
      <Navbar active={active} setActive={setActive} />
      <Hero />
      <About />
      <Experience />
      <Projects />
      <Skills />
      <Contact />
    </div>
  )
}
