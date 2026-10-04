import { useState, useEffect } from 'react'
import './App.css'
import photo from './photo.jpg'

// ─── DATA ─────────────────────────────────────────────────────────────────────

const EXPERIENCE = [
  {
    role: 'Sr. Staff Android Engineer',
    company: 'Blueground',
    period: 'Jan 2025 – Present',
    bullets: [
      'Architect and lead the development of complex mobile platform features',
      'Designed a multi-provider payment abstraction layer enabling seamless provider switching',
      'Built an offline-first chat experience using WebSockets and silent push notifications',
      'Established AI-assisted development workflows and documentation across the engineering org',
      'Led a cross-functional team of mobile and backend engineers',
      'Mentored engineers across Android, iOS, and Backend teams',
    ],
  },
  {
    role: 'Staff Android Engineer',
    company: 'Blueground',
    period: 'Jan 2022 – Jan 2025',
    bullets: [
      'Led and completed a full-app migration to Jetpack Compose',
      'Developed KSP-based code generation tools, reducing boilerplate by ~40%',
      'Built Slack-integrated internal developer tooling in Go and Kotlin',
      'Maintained an Android knowledge base covering architecture, testing, and offline patterns',
      'Designed the Android interview process and created live coding templates',
      'Mentored junior developers and interns across Android and iOS',
    ],
  },
  {
    role: 'Sr. Android Engineer',
    company: 'Blueground',
    period: 'Feb 2019 – Dec 2021',
    bullets: [
      'Bootstrapped the Android app from scratch: Kotlin, Clean Architecture, multi-module',
      'Integrated Jetpack libraries, Dagger, Retrofit, Coroutines, ExoPlayer, and Firebase',
      'Set up CI/CD pipelines (Bitrise, Fastlane) and later migrated to GitHub Actions',
      'Started and maintained the company\'s internal engineering blog',
    ],
  },
  {
    role: 'Co-Founder & Android Engineer',
    company: 'Quadible',
    period: 'Jan 2015 – Jun 2023',
    bullets: [
      'Built an Android SDK for biometric user authentication',
      'Ported the SDK to React Native and Xamarin for cross-platform reach',
      'Developed backend features and CLI tooling in Node.js',
    ],
  },
  {
    role: 'Sr. Android Engineer',
    company: 'Entersoft',
    period: 'Apr 2018 – Feb 2019',
    bullets: [
      'Developed a new SFA Android app in Kotlin with modern Jetpack libraries',
      'Enhanced existing Xamarin Forms cross-platform apps',
    ],
  },
  {
    role: 'Android Engineer',
    company: 'Sieben',
    period: 'Jun 2013 – Apr 2018',
    bullets: [
      'Delivered core features across several Android business apps',
      'Stack: Retrofit, Firebase, RxJava, Room',
    ],
  },
]

const SKILLS = {
  Mobile: ['Android', 'Kotlin', 'Java', 'Jetpack Compose', 'Coroutines', 'Kotlin Multiplatform', 'Hilt', 'Retrofit', 'Firebase', 'Room', 'ExoPlayer', 'Xamarin'],
  'Backend & More': ['Spring Boot', 'Node.js', 'Go', 'React', 'PostgreSQL', 'MongoDB', 'Redis', 'Kafka', 'AWS'],
  'Tooling & Infra': ['Git', 'CI/CD', 'GitHub Actions', 'Bitrise', 'Fastlane', 'KSP', 'Jenkins', 'Docker', 'FFmpeg'],
}

const OPEN_SOURCE = [
  {
    name: 'smart-tabs',
    description: 'Jetpack Compose library that auto-syncs a TabRow with a LazyColumn',
    stars: 12,
    url: 'https://github.com/St4B/smart-tabs',
  },
  {
    name: 'Feather',
    description: 'A draggable floating bubble built with Jetpack Compose',
    stars: 7,
    url: 'https://github.com/St4B/Feather',
  },
  {
    name: 'Sherlock',
    description: 'Screenshot testing library for Android',
    stars: 3,
    url: 'https://github.com/St4B/Sherlock',
  },
  {
    name: 'Librarian',
    description: 'Unit-test Jetpack Paging emissions',
    stars: 1,
    url: 'https://github.com/St4B/Librarian',
  },
  {
    name: 'Scoco',
    description: 'Coroutine scope utility for cleaner unit tests',
    stars: 1,
    url: 'https://github.com/St4B/Scoco',
  },
]

const WRITING = [
  {
    title: 'Mastering UI Testing for Android Web Forms',
    date: 'Jan 2024',
    url: 'https://engineering.theblueground.com/mastering-ui-testing-for-android-web-forms/',
  },
  {
    title: 'Crafting a Floating Bubble in Android with Jetpack Compose',
    date: 'Jun 2023',
    url: 'https://engineering.theblueground.com/crafting-a-floating-bubble-in-android-with-jetpack-compose/',
  },
  {
    title: 'Fixtures Made Easy with KSP',
    date: 'Nov 2022',
    url: 'https://engineering.theblueground.com/fixtures-made-easy-with-the-help-of-ksp/',
  },
  {
    title: 'Adding KSP to Your Toolbelt',
    date: 'Aug 2022',
    url: 'https://engineering.theblueground.com/adding-ksp-to-your-toolbelt/',
  },
  {
    title: 'Keep Your Tabs and List in Sync Using Jetpack Compose',
    date: 'Jun 2022',
    url: 'https://engineering.theblueground.com/auto-sync-tabs-and-a-list-with-jetpack-compose/',
  },
  {
    title: 'PagingData Assertions made possible!',
    date: 'Oct 2021',
    url: 'https://engineering.theblueground.com/paging-assertions-made-possible/',
  },
  {
    title: 'Jetpack Navigation in multi-module projects · GDG Athens (talk)',
    date: 'Jan 2020',
    url: null,
  },
]

const CAREER_START_YEAR = 2012

// ─── NAV ──────────────────────────────────────────────────────────────────────

const NAV_ITEMS = ['about', 'experience', 'skills', 'open-source', 'writing', 'contact']

function Nav({ active, onNav }) {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handler)
    return () => window.removeEventListener('scroll', handler)
  }, [])

  return (
    <nav className={`nav ${scrolled ? 'nav--scrolled' : ''}`}>
      <div className="nav__inner">
        <button
          className="nav__logo"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          VT
        </button>

        <button
          className="nav__hamburger"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
          aria-expanded={open}
        >
          <span />
          <span />
          <span />
        </button>

        <ul className={`nav__links ${open ? 'nav__links--open' : ''}`}>
          {NAV_ITEMS.map(id => (
            <li key={id}>
              <button
                className={`nav__link ${active === id ? 'nav__link--active' : ''}`}
                onClick={() => { onNav(id); setOpen(false) }}
              >
                {id.replace('-', ' ')}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  )
}

// ─── HERO ─────────────────────────────────────────────────────────────────────

function Hero() {
  return (
    <section className="hero" id="hero">
      <div className="hero__content">
        <img
          src={photo}
          alt="Vaios Tsitsonis"
          className="hero__avatar"
        />
        <p className="hero__greeting">Hey, I'm</p>
        <h1 className="hero__name">Vaios Tsitsonis</h1>
        <p className="hero__role">Sr. Staff Android Engineer</p>
        <p className="hero__tagline">
          {new Date().getFullYear() - CAREER_START_YEAR} years building Android apps people enjoy.
          I care about UX as much as architecture, have a soft spot for offline-first design,
          and never say no to a new tool worth trying.
        </p>
        <div className="hero__actions">
          <a
            href="https://github.com/St4B"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn--primary"
          >
            GitHub
          </a>
          <a href="mailto:vaios.tsitsonis@gmail.com" className="btn btn--outline">
            Get in touch
          </a>
        </div>
      </div>
      <div className="hero__scroll-hint" aria-hidden>↓</div>
    </section>
  )
}

// ─── ABOUT ────────────────────────────────────────────────────────────────────

function About() {
  return (
    <section className="section" id="about">
      <div className="container">
        <h2 className="section__title">About</h2>
        <div className="about__content">
          <p>
            I'm a Staff Android Engineer based in Athens, Greece, with {new Date().getFullYear() - CAREER_START_YEAR} years
            of experience building Android apps. Good UX matters to me as much as clean code, offline-first
            is one of the most underrated decisions a mobile team can make, and I get genuinely excited
            when there's something new worth experimenting with.
          </p>
          <p>
            Some things I've gone particularly deep on over the years: payment integrations and
            building abstraction layers that let you swap or add providers like Stripe or Adyen
            without the rest of the codebase noticing. Chat systems, both on the mobile side and
            the backend. And reactive architectures. I genuinely think there's a better way to
            build software when your system responds to state instead of polling for it.
          </p>
          <p>
            My path went from delivering features in business apps, to bootstrapping a product from
            scratch, co-founding a startup in biometric authentication, and eventually shaping
            platform architecture and engineering culture at staff level. More ownership at each step,
            more collaboration, more skin in the game.
          </p>
          <p>
            Along the way I've contributed to open source, written about the things I figured out,
            and mentored engineers across Android, iOS, and backend. The technical work is great.
            The people part is better.
          </p>
          <div className="about__meta">
            <span>📍 Athens, Greece</span>
            <a
              href="https://www.ds.unipi.gr/en/home-en/"
              target="_blank"
              rel="noopener noreferrer"
              className="about__meta-link"
            >
              🎓 Digital Systems, University of Piraeus
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

// ─── EXPERIENCE ───────────────────────────────────────────────────────────────

function Experience() {
  return (
    <section className="section section--alt" id="experience">
      <div className="container">
        <h2 className="section__title">Experience</h2>
        <div className="tl">
          {EXPERIENCE.map((job, i) => {
            const isLeft = i % 2 === 0
            return (
              <div className={`tl__row ${isLeft ? 'tl__row--left' : 'tl__row--right'}`} key={i}>
                <div className="tl__side tl__side--left">
                  {isLeft && (
                    <div className="tl__card">
                      <span className="tl__period">{job.period}</span>
                      <h3 className="tl__role">{job.role}</h3>
                      <p className="tl__company">{job.company}</p>
                    </div>
                  )}
                </div>
                <div className="tl__center">
                  <div className="tl__dot" />
                </div>
                <div className="tl__side tl__side--right">
                  {!isLeft && (
                    <div className="tl__card">
                      <span className="tl__period">{job.period}</span>
                      <h3 className="tl__role">{job.role}</h3>
                      <p className="tl__company">{job.company}</p>
                    </div>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

// ─── SKILLS ───────────────────────────────────────────────────────────────────

function Skills() {
  return (
    <section className="section" id="skills">
      <div className="container">
        <h2 className="section__title">Skills</h2>
        <div className="skills__groups">
          {Object.entries(SKILLS).map(([group, tags]) => (
            <div className="skills__group" key={group}>
              <h3 className="skills__group-name">{group}</h3>
              <div className="skills__tags">
                {tags.map(tag => (
                  <span className="skill-tag" key={tag}>{tag}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── OPEN SOURCE ──────────────────────────────────────────────────────────────

function OpenSource() {
  return (
    <section className="section section--alt" id="open-source">
      <div className="container">
        <h2 className="section__title">Open Source</h2>
        <p className="section__subtitle">A few things I've built and put out there.</p>
        <div className="oss__grid">
          {OPEN_SOURCE.map(repo => (
            <a
              key={repo.name}
              href={repo.url}
              target="_blank"
              rel="noopener noreferrer"
              className="oss__card"
            >
              <div className="oss__card-top">
                <span className="oss__name">{repo.name}</span>
                <span className="oss__stars">⭐ {repo.stars}</span>
              </div>
              <p className="oss__desc">{repo.description}</p>
              <span className="oss__lang">Kotlin</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── WRITING ──────────────────────────────────────────────────────────────────

function Writing() {
  return (
    <section className="section" id="writing">
      <div className="container">
        <h2 className="section__title">Writing & Speaking</h2>
        <p className="section__subtitle">Blog posts and conference talks — mostly about Android.</p>
        <ul className="writing__list">
          {WRITING.map((item, i) => (
            <li key={i} className="writing__item">
              <span className="writing__date">{item.date}</span>
              {item.url ? (
                <a
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="writing__title writing__title--link"
                >
                  {item.title}
                </a>
              ) : (
                <span className="writing__title">{item.title}</span>
              )}
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

// ─── CONTACT ──────────────────────────────────────────────────────────────────

function Contact() {
  return (
    <section className="section section--alt" id="contact">
      <div className="container">
        <h2 className="section__title">Get in Touch</h2>
        <p className="contact__text">
          Whether you're a recruiter, a fellow developer, or just curious, my inbox is open.
        </p>
        <div className="contact__links">
          <a href="mailto:vaios.tsitsonis@gmail.com" className="btn btn--primary">
            Email me
          </a>
          <a
            href="https://www.linkedin.com/in/vaios-tsitsonis/"
            target="_blank"
            rel="noopener noreferrer"
            className="contact__link"
          >
            LinkedIn
          </a>
          <a
            href="https://github.com/St4B"
            target="_blank"
            rel="noopener noreferrer"
            className="contact__link"
          >
            GitHub
          </a>
          <a
            href="https://x.com/VaiosTsitsonis"
            target="_blank"
            rel="noopener noreferrer"
            className="contact__link"
          >
            X
          </a>
        </div>
      </div>
    </section>
  )
}

// ─── APP ──────────────────────────────────────────────────────────────────────

export default function App() {
  const [activeSection, setActiveSection] = useState('hero')

  useEffect(() => {
    const sections = document.querySelectorAll('section[id]')
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) setActiveSection(entry.target.id)
        })
      },
      { threshold: 0.4 },
    )
    sections.forEach(s => observer.observe(s))
    return () => observer.disconnect()
  }, [])

  const scrollTo = id => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <>
      <Nav active={activeSection} onNav={scrollTo} />
      <main>
        <Hero />
        <About />
        <Experience />
        <Skills />
        <OpenSource />
        <Writing />
        <Contact />
      </main>
      <footer className="footer">
        <p>Vaios Tsitsonis · Athens, Greece · {new Date().getFullYear()}</p>
      </footer>
    </>
  )
}
