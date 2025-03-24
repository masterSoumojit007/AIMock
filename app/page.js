// ...imports remain same
"use client";

import Header from "@/components/Header";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import {
  FaArrowRight,
  FaGithub,
  FaLinkedin,
  FaMicrophoneAlt,
  FaMinus,
  FaPlus,
  FaRobot,
  FaTwitter,
  FaUserTie,
} from "react-icons/fa";

// FAQ Data
const faqs = [
  {
    q: "Is this platform free to use?",
    a: "Yes! You can start using it for free. Premium plans offer advanced features like role-specific interviews and detailed analytics.",
  },
  {
    q: "Do I need to install anything?",
    a: "No downloads required. Everything runs smoothly in your browser.",
  },
  {
    q: "Can I practice for behavioral interviews?",
    a: "Absolutely. We provide both technical and behavioral mock sessions.",
  },
  {
    q: "Will the AI adapt to my experience level?",
    a: "Yes. Our AI customizes questions based on your experience, resume, and the role you're targeting.",
  },
  {
    q: "Can I track my interview progress over time?",
    a: "Definitely! You’ll get session history, performance metrics, and improvement suggestions after each mock interview.",
  },
];

export default function Home() {
  const [openIndex, setOpenIndex] = useState(null); // ✅

  return (
    <main className="bg-white text-gray-900 font-sans relative overflow-hidden scroll-smooth mt-12">
      <Header />
      {/* Hero Section */}
      <section className="relative min-h-screen flex flex-col justify-center items-center text-center px-6 py-20 overflow-hidden bg-gradient-to-br from-[#e6eeff] via-white to-[#f3e8ff]">
        {/* Enhanced blur spots with more visible colors */}
        <div className="absolute top-10 left-10 w-64 h-64 bg-cyan-200 rounded-full opacity-40 blur-2xl z-0 animate-pulse sm:w-48 sm:h-48 lg:w-64 lg:h-64" />
        <div className="absolute bottom-20 right-20 w-72 h-72 bg-blue-200 rounded-full opacity-40 blur-2xl z-0 animate-pulse sm:w-56 sm:h-56 lg:w-72 lg:h-72" />
        <div className="absolute top-1/2 left-1/2 w-96 h-96 -translate-x-1/2 -translate-y-1/2 bg-pink-300 rounded-full opacity-30 blur-2xl z-0 sm:w-80 sm:h-80 lg:w-96 lg:h-96" />

        {/* Hero Content */}
        <motion.h1
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 text-4xl sm:text-5xl md:text-6xl font-extrabold bg-gradient-to-r from-blue-800 via-indigo-700 to-purple-700 text-transparent bg-clip-text"
        >
          Master Interviews with AI
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="relative z-10 mt-6 max-w-3xl text-lg sm:text-xl md:text-xl text-gray-700 leading-relaxed"
        >
          Practice with intelligent AI, get real-time feedback, and boost your
          confidence — all in your browser.
        </motion.p>

        {/* CTA Button */}
        <motion.a
          href="/dashboard"
          whileHover={{ scale: 1.05 }}
          className="relative z-10 mt-8 inline-flex items-center gap-3 bg-gradient-to-r from-indigo-600 via-purple-500 to-pink-500 text-white px-8 py-4 text-lg font-semibold rounded-full shadow-lg transition"
        >
          Try for Free <FaArrowRight />
        </motion.a>

        {/* Hero Illustration */}
        {/* Hero Illustration */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 50 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          whileHover={{ scale: 1.03, rotate: 1 }}
          whileTap={{ scale: 0.98 }}
          className="relative z-10 mt-14"
        >
          <Image
            src="/hero1.jpg"
            alt="AI Mock Interview"
            width={800}
            height={500}
            className="rounded-xl shadow-2xl border border-white/40 transition duration-300 ease-in-out sm:w-72 sm:h-48 md:w-80 md:h-56 lg:w-96 lg:h-64 xl:w-[800px] xl:h-[500px]"
          />
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-gradient-to-br from-indigo-50 to-purple-100 px-6 text-center">
        {/* Top Divider */}
        <div className="w-24 h-1 mx-auto mb-6 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-full" />

        <h2 className="text-4xl pb-1 font-extrabold text-center mb-12 bg-gradient-to-r from-indigo-700 via-purple-700 to-pink-600 text-transparent bg-clip-text">
          Why Choose Us?
        </h2>

        <div className="grid md:grid-cols-3 gap-12 text-center">
          {/* Feature Cards */}
          {[
            {
              icon: <FaRobot className="text-4xl text-purple-600 mb-4" />,
              title: "AI Interviewer",
              desc: "Get realistic, smart interviews powered by our advanced AI engine.",
            },
            {
              icon: <FaMicrophoneAlt className="text-4xl text-blue-600 mb-4" />,
              title: "Speech Analysis",
              desc: "Analyze your voice tone, clarity, and pace with instant feedback.",
            },
            {
              icon: <FaUserTie className="text-4xl text-indigo-600 mb-4" />,
              title: "Tailored Questions",
              desc: "Personalized questions based on your resume, domain, and experience.",
            },
          ].map((item, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -5 }}
              className="bg-gradient-to-br from-white to-indigo-50 p-8 rounded-xl shadow-md"
            >
              {item.icon}
              <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
              <p className="text-gray-600">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-24 bg-white px-6 max-w-7xl mx-auto">
        {/* Top Divider */}
        <div className="w-24 h-1 mx-auto mb-6 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-full" />
        <h2 className="text-4xl font-extrabold text-center mb-12 bg-gradient-to-r from-indigo-700 via-purple-700 to-pink-600 text-transparent bg-clip-text">
          How It Works
        </h2>
        <div className="grid md:grid-cols-3 gap-12 text-center">
          {[
            {
              step: "1",
              title: "Create Your Profile",
              desc: "Sign up and let the platform understand your background, skills, and goals.",
            },
            {
              step: "2",
              title: "Start Interviewing",
              desc: "Choose your job role and start AI-powered mock interviews instantly.",
            },
            {
              step: "3",
              title: "Get Instant Feedback",
              desc: "Receive voice, body language & answer analysis right after the session.",
            },
          ].map((item, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -5 }}
              className="bg-gradient-to-br from-indigo-50 to-white p-8 rounded-xl shadow-md"
            >
              <div className="text-4xl font-bold text-indigo-600 mb-4">
                {item.step}
              </div>
              <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
              <p className="text-gray-600">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Roles We Cover Section */}
      <section className="py-24 bg-gradient-to-br from-indigo-50 to-purple-100 px-6 text-center">
        {/* Top Divider */}
        <div className="w-24 h-1 mx-auto mb-6 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-full" />
        <h2 className="text-4xl font-extrabold mb-6 bg-gradient-to-r from-indigo-700 via-purple-700 to-pink-600 text-transparent bg-clip-text">
          Interview Roles We Cover
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto mb-16 text-lg">
          Whether you're aiming for a tech role or a business position, our AI
          adapts to your needs with curated mock interviews.
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {[
            { role: "Frontend Developer", emoji: "🎨" },
            { role: "Backend Developer", emoji: "🛠️" },
            { role: "Data Scientist", emoji: "📊" },
            { role: "Product Manager", emoji: "🧭" },
            { role: "UX Designer", emoji: "🧠" },
            { role: "DevOps Engineer", emoji: "⚙️" },
            { role: "Machine Learning Engineer", emoji: "🤖" },
            { role: "Business Analyst", emoji: "📈" },
          ].map(({ role, emoji }, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -5, scale: 1.03 }}
              transition={{ duration: 0.3 }}
              className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl border border-gray-200 hover:border-indigo-300 transition-all"
            >
              <div className="text-3xl mb-3">{emoji}</div>
              <h3 className="text-indigo-800 font-semibold text-md">{role}</h3>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="py-24 bg-white px-6 max-w-4xl mx-auto">
        {/* Top Divider */}
        <div className="w-24 h-1 mx-auto mb-6 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-full" />
        <h2 className="text-4xl font-extrabold text-center mb-12 bg-gradient-to-r from-indigo-700 via-purple-700 to-pink-600 text-transparent bg-clip-text">
          Frequently Asked Questions
        </h2>

        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl shadow-md"
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="w-full flex justify-between items-center p-5 text-left"
                >
                  <span className="text-lg font-semibold text-indigo-800">
                    {faq.q}
                  </span>
                  <span className="text-indigo-600">
                    {isOpen ? <FaMinus /> : <FaPlus />}
                  </span>
                </button>
                {isOpen && (
                  <div className="px-5 pb-5 text-gray-700 transition-all duration-300 ease-in-out">
                    {faq.a}
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="relative py-24 bg-gradient-to-br from-purple-50 to-indigo-100 px-6 overflow-hidden">
        {/* Top Divider */}
        <div className="w-24 h-1 mx-auto mb-6 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-full" />
        <div className="relative z-10 max-w-6xl mx-auto text-center">
          <h2 className="text-4xl font-extrabold text-center mb-12 bg-gradient-to-r from-indigo-700 via-purple-700 to-pink-600 text-transparent bg-clip-text">
            What Our Users Say
          </h2>

          <div className="grid md:grid-cols-3 gap-10">
            {/* Testimonials */}
            {[
              {
                name: "Ananya Sharma",
                role: "Software Engineer",
                quote:
                  "This platform helped me crack my dream job. The AI interviews felt so real!",
              },
              {
                name: "Ravi Mehta",
                role: "CS Student",
                quote:
                  "It's like having a personal interview coach. I improved massively in just a week.",
              },
              {
                name: "Sneha Roy",
                role: "Data Analyst",
                quote:
                  "The feedback on my communication skills was spot on. Loved the experience!",
              },
            ].map((t, i) => (
              <motion.div
                key={i}
                whileHover={{ scale: 1.03 }}
                className="bg-white p-6 rounded-xl shadow-lg"
              >
                <p className="text-gray-700 mb-4">“{t.quote}”</p>
                <h4 className="text-lg font-semibold">{t.name}</h4>
                <p className="text-sm text-gray-500">{t.role}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="relative py-28 bg-indigo-700 text-white text-center px-6 overflow-hidden">
        {/* Deep Gradient Blobs for Atmosphere */}
        <div className="absolute -top-24 -left-20 w-96 h-96 bg-pink-500 opacity-30 rounded-full blur-[140px] z-0" />
        <div className="absolute -bottom-32 right-10 w-[30rem] h-[30rem] bg-blue-400 opacity-30 rounded-full blur-[140px] z-0" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-purple-500 opacity-20 rounded-full blur-[100px] z-0" />

        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="relative z-10 text-4xl md:text-5xl font-extrabold leading-tight bg-gradient-to-r from-white via-purple-100 to-white text-transparent bg-clip-text drop-shadow-lg"
        >
          Ready to Level Up Your Interview Skills?
        </motion.h2>

        {/* Subtext */}
        <p className="relative z-10 mt-4 mb-10 text-lg md:text-xl max-w-2xl mx-auto text-white/90">
          Start preparing today with AI-driven mock interviews and get ahead of
          the competition.
        </p>

        {/* Animated CTA Button */}
        <motion.a
          href="#"
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.95 }}
          className="relative z-10 inline-block bg-white text-indigo-700 font-semibold text-lg px-8 py-4 rounded-full shadow-2xl hover:bg-gray-100 transition-all duration-300 group overflow-hidden"
        >
          <span className="relative z-10">Get Started for Free 🚀</span>

          {/* Glowing Aura */}
          <span
            className="absolute inset-0 rounded-full bg-indigo-300 opacity-20 blur-xl group-hover:opacity-40 transition duration-500"
            aria-hidden="true"
          />
        </motion.a>
      </section>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-indigo-50 to-purple-100 text-gray-700 py-12 border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-10 text-center md:text-left">
          {/* Branding */}
          <div>
            <h3 className="text-3xl font-extrabold tracking-tight bg-gradient-to-r from-indigo-600 via-purple-500 to-pink-500 text-transparent bg-clip-text hover:opacity-90 transition duration-300">
              AI Mock
            </h3>
            <p className="mt-2 text-sm text-gray-600">
              Practice smarter with AI. Mock technical + behavioral interviews &
              boost your confidence.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-3 text-indigo-700">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="hover:underline">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:underline">
                  About
                </Link>
              </li>
              <li>
                <Link href="/features" className="hover:underline">
                  Features
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:underline">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="font-semibold mb-3 text-indigo-700">Resources</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/blog" className="hover:underline">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/help" className="hover:underline">
                  Help Center
                </Link>
              </li>
              <li>
                <Link href="/docs" className="hover:underline">
                  Documentation
                </Link>
              </li>
            </ul>
          </div>

          {/* Socials */}
          <div>
            <h4 className="font-semibold mb-3 text-indigo-700">
              Connect with Me
            </h4>
            <div className="flex justify-center md:justify-start gap-4 mt-2">
              <a
                href="https://github.com/soumojit"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-700 hover:text-indigo-600 transition"
                aria-label="GitHub"
              >
                <FaGithub size={22} />
              </a>
              <a
                href="https://linkedin.com/in/soumojit"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-700 hover:text-indigo-600 transition"
                aria-label="LinkedIn"
              >
                <FaLinkedin size={22} />
              </a>
              <a
                href="https://twitter.com/soumojit"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-700 hover:text-indigo-600 transition"
                aria-label="Twitter"
              >
                <FaTwitter size={22} />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-10 border-t pt-6 text-sm text-center text-gray-500">
          © {new Date().getFullYear()}{" "}
          <span className="font-medium">AI Mock Interview</span>. Built with 💙
          by{" "}
          <a
            href="https://github.com/soumojit"
            target="_blank"
            rel="noopener noreferrer"
            className="text-indigo-600 hover:underline font-medium"
          >
            Soumojit Banerjee
          </a>
        </div>
      </footer>
    </main>
  );
}
