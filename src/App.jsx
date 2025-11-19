import React from 'react';
import { motion } from 'framer-motion';
import { Github, Linkedin, Mail, Server, Terminal, Database, MessageCircle } from 'lucide-react';
import ExperienceCard from './components/ExperienceCard';
import EducationCard from './components/EducationCard';
import HomelabSection from './components/HomelabSection';
import { experience, homelab, education } from './data';
import shinyMetagross from './assets/shiny-metagross.gif';

function App() {
  return (
    <div className="app">
      <header className="header glass-card">
        <div className="container header-content flex justify-between items-center">
          <h1 className="logo">
            Shahir<span style={{ color: 'var(--accent-primary)' }}>.</span>
          </h1>

          {/* Navigation */}
          <nav className="nav-links flex">
            <a href="#about">About</a>
            <a href="#experience">Experience</a>
            <a href="#education">Education</a>
            <a href="#projects">Projects</a>
            <a href="#contact">Contact</a>
          </nav>
        </div>
      </header>

      <main>
        {/* Hero Section */}
        <section id="hero" className="hero min-h-screen flex flex-col justify-center relative">
          <div className="hero-bg"></div>
          <div className="container hero-content text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <motion.img
                src={shinyMetagross}
                alt="Shiny Metagross"
                className="w-32 h-32 mx-auto mb-6"
                animate={{ y: [0, -10, 0] }}
                transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
                style={{ width: '120px', height: 'auto', marginBottom: '1.5rem' }}
              />
              <span className="hero-subtitle">Product Manager & Tech Enthusiast</span>
              <h1 className="hero-title">
                Building Products <br />
                <span className="gradient-text">& Data Pipelines</span>
              </h1>
              <p className="hero-description">
                Bridging the gap between business strategy and technical execution.
                Specializing in AI, Data Analytics, and Product Growth.
              </p>
              <div className="btn-group justify-center">
                <a href="#contact" className="btn btn-primary">
                  Get in Touch
                </a>
                <a href="https://github.com/shahirshamim" target="_blank" rel="noopener noreferrer" className="btn btn-glass">
                  <Github size={20} /> GitHub
                </a>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Experience Section */}
        <section id="experience" className="section">
          <div className="container">
            <h2 className="section-title" style={{ fontSize: '2rem', marginBottom: '3rem', textAlign: 'center', fontWeight: 'bold' }}>Experience</h2>
            <div>
              {experience.map((job, index) => (
                <ExperienceCard key={job.id} job={job} index={index} />
              ))}
            </div>
          </div>
        </section>

        {/* Education Section */}
        <section id="education" className="section">
          <div className="container">
            <h2 className="section-title" style={{ fontSize: '2rem', marginBottom: '3rem', textAlign: 'center', fontWeight: 'bold' }}>Education</h2>
            <div className="space-y-6">
              {education.map((edu, index) => (
                <EducationCard key={edu.id} edu={edu} index={index} />
              ))}
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects" className="section">
          <div className="container">
            <h2 className="section-title" style={{ fontSize: '2rem', marginBottom: '3rem', textAlign: 'center', fontWeight: 'bold' }}>Projects</h2>
            <HomelabSection data={homelab} />
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="section" style={{ textAlign: 'center' }}>
          <div className="container">
            <h2 className="section-title" style={{ fontSize: '2rem', marginBottom: '2rem', fontWeight: 'bold' }}>Get In Touch</h2>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>
              Open to discussing Product Management roles, AI projects, or just geeking out over homelabs.
            </p>
            <div className="btn-group">
              <a href="mailto:shahirshamim@gmail.com" className="btn btn-primary">
                <Mail size={20} /> Email Me
              </a>
              <a href="https://wa.me/447340926493" target="_blank" rel="noopener noreferrer" className="btn btn-glass" style={{ backgroundColor: '#25D366', borderColor: '#25D366' }}>
                <MessageCircle size={20} /> WhatsApp
              </a>
              <a href="https://linkedin.com/in/shahirshamim" target="_blank" rel="noopener noreferrer" className="btn btn-glass" style={{ backgroundColor: '#0077b5', borderColor: '#0077b5' }}>
                <Linkedin size={20} /> LinkedIn
              </a>
            </div>
          </div>
        </section>

      </main>

      <footer className="footer">
        <div className="container">
          <p>&copy; {new Date().getFullYear()} Shahir Shamim. Built with React & Docker.</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
