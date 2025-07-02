"use client"

import { useState, useEffect, useRef } from "react"
import {
  Github,
  Linkedin,
  Mail,
  Phone,
  MapPin,
  ExternalLink,
  Code,
  Server,
  Globe,
  Award,
  GraduationCap,
  Briefcase,
  User,
  Menu,
  X,
  ChevronDown,
  Star,
  Zap,
  Shield,
  Camera,
  PenTool,
  Plane,
  Eye,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default function Portfolio() {
  const [activeSection, setActiveSection] = useState("home")
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [scrollY, setScrollY] = useState(0)
  const heroRef = useRef<HTMLElement>(null)

  // Loading animation
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 2000)
    return () => clearTimeout(timer)
  }, [])

  // Mouse tracking for parallax effects
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }
    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  // Scroll tracking
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)

      const sections = ["home", "about", "education", "projects", "internships", "certifications", "skills", "contact"]
      const scrollPosition = window.scrollY + 100

      for (const section of sections) {
        const element = document.getElementById(section)
        if (element) {
          const offsetTop = element.offsetTop
          const offsetHeight = element.offsetHeight

          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section)
            break
          }
        }
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Intersection Observer for animations
  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px",
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("animate-in")
        }
      })
    }, observerOptions)

    const animatedElements = document.querySelectorAll(".animate-on-scroll")
    animatedElements.forEach((el) => observer.observe(el))

    return () => observer.disconnect()
  }, [isLoading])

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
    setIsMenuOpen(false)
  }

  const navItems = [
    { id: "home", label: "Home", icon: User },
    { id: "about", label: "About", icon: User },
    { id: "education", label: "Education", icon: GraduationCap },
    { id: "projects", label: "Projects", icon: Code },
    { id: "internships", label: "Experience", icon: Briefcase },
    { id: "certifications", label: "Certifications", icon: Award },
    { id: "skills", label: "Skills", icon: Code },
    { id: "contact", label: "Contact", icon: Mail },
  ]

  if (isLoading) {
    return (
      <div className="fixed inset-0 bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 flex items-center justify-center z-50">
        <div className="text-center">
          <div className="relative">
            <div className="w-32 h-32 border-4 border-blue-500/30 rounded-full animate-spin"></div>
            <div className="absolute inset-0 w-32 h-32 border-4 border-transparent border-t-blue-500 rounded-full animate-spin"></div>
            <div className="absolute inset-4 w-24 h-24 border-4 border-transparent border-t-white rounded-full animate-spin animation-delay-150"></div>
          </div>
          <div className="mt-8 text-white">
            <h2 className="text-2xl font-bold mb-2 animate-pulse">Loading Portfolio</h2>
            <div className="flex justify-center space-x-1">
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"></div>
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce animation-delay-100"></div>
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce animation-delay-200"></div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 overflow-x-hidden">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl animate-float"
          style={{
            transform: `translate(${mousePosition.x * 0.02}px, ${mousePosition.y * 0.02}px)`,
          }}
        ></div>
        <div
          className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl animate-float-delayed"
          style={{
            transform: `translate(${mousePosition.x * -0.02}px, ${mousePosition.y * -0.02}px)`,
          }}
        ></div>
        <div
          className="absolute top-1/2 left-1/2 w-60 h-60 bg-green-500/5 rounded-full blur-3xl animate-pulse-slow"
          style={{
            transform: `translate(-50%, -50%) translate(${mousePosition.x * 0.01}px, ${mousePosition.y * 0.01}px)`,
          }}
        ></div>
      </div>

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-slate-900/80 backdrop-blur-md border-b border-slate-700 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex-shrink-0">
              <h1 className="text-xl font-bold text-white hover:text-blue-400 transition-colors duration-300 cursor-pointer">
                Lokesh Konathala
              </h1>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-4">
              <div className="flex items-baseline space-x-4">
                {navItems.map((item, index) => (
                  <button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className={`px-3 py-2 rounded-md text-sm font-medium transition-all duration-300 transform hover:scale-105 ${
                      activeSection === item.id
                        ? "bg-blue-900 text-blue-300 shadow-lg"
                        : "text-slate-300 hover:text-white hover:bg-slate-800"
                    }`}
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
              <Button
                variant="outline"
                size="sm"
                className="border-green-600 text-green-400 hover:bg-green-600 hover:text-white transform hover:scale-105 transition-all duration-200 ml-4"
                asChild
              >
                <a
                  href="https://drive.google.com/file/d/1RBV7IeyDpYZPJEVw3BvFZXz_TfMWze4r/view?usp=drivesdk"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Eye className="w-4 h-4 mr-2" />
                  View Resume
                </a>
              </Button>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md text-slate-300 hover:text-white hover:bg-slate-800 transition-all duration-300 transform hover:scale-110"
              >
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div
          className={`md:hidden transition-all duration-500 ease-in-out ${isMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"} overflow-hidden`}
        >
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-slate-900 border-t border-slate-700">
            {navItems.map((item, index) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`block px-3 py-2 rounded-md text-base font-medium w-full text-left transition-all duration-300 transform hover:scale-105 ${
                  activeSection === item.id
                    ? "bg-blue-900 text-blue-300"
                    : "text-slate-300 hover:text-white hover:bg-slate-800"
                }`}
                style={{
                  animationDelay: `${index * 50}ms`,
                  transform: isMenuOpen ? "translateX(0)" : "translateX(-100%)",
                }}
              >
                <item.icon className="inline-block w-4 h-4 mr-2" />
                {item.label}
              </button>
            ))}
            <div className="px-3 py-2">
              <Button
                variant="outline"
                size="sm"
                className="border-green-600 text-green-400 hover:bg-green-600 hover:text-white w-full"
                asChild
              >
                <a
                  href="https://drive.google.com/file/d/1RBV7IeyDpYZPJEVw3BvFZXz_TfMWze4r/view?usp=drivesdk"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Eye className="w-4 h-4 mr-2" />
                  View Resume
                </a>
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section
        id="home"
        ref={heroRef}
        className="pt-16 min-h-screen flex items-center justify-center relative overflow-hidden"
      >
        <div
          className="absolute inset-0 bg-gradient-to-br from-blue-600/5 to-purple-600/5"
          style={{
            transform: `translateY(${scrollY * 0.5}px)`,
          }}
        ></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10">
          <div className="text-center">
            <div className="mb-8 animate-on-scroll opacity-0 translate-y-8">
              <div className="relative inline-block">
                <img
                  src="/profile-photo.jpg"
                  alt="Lokesh Konathala"
                  className="w-48 h-48 rounded-full mx-auto mb-8 border-4 border-slate-700 shadow-2xl hover:scale-110 transition-all duration-500 hover:rotate-3 hover:shadow-blue-500/25 object-cover"
                />
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-green-500 rounded-full border-4 border-slate-900 animate-pulse"></div>
                <div className="absolute -bottom-2 -left-2 w-6 h-6 bg-blue-500 rounded-full border-2 border-slate-900 animate-bounce"></div>
              </div>
            </div>

            <div className="animate-on-scroll opacity-0 translate-y-8 animation-delay-200">
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
                <span className="inline-block hover:text-blue-400 transition-colors duration-300 hover:scale-105 transform">
                  Lokesh
                </span>{" "}
                <span className="inline-block hover:text-purple-400 transition-colors duration-300 hover:scale-105 transform">
                  Konathala
                </span>
              </h1>
            </div>

            <div className="animate-on-scroll opacity-0 translate-y-8 animation-delay-400">
              <div className="text-xl md:text-2xl text-slate-300 mb-6 overflow-hidden">
                <div className="typing-animation">Aspiring Web Developer & B.Tech CSE Student</div>
              </div>
            </div>

            <div className="animate-on-scroll opacity-0 translate-y-8 animation-delay-600">
              <p className="text-lg text-slate-400 mb-8 max-w-3xl mx-auto leading-relaxed">
                Currently a 4th-year B.Tech Computer Science student, graduating at GMR Institute Of Technology, Rajam.
                Passionate about developing responsive, user-friendly websites using HTML, CSS, JavaScript, and PHP.
                Actively building real-world full-stack projects to sharpen development skills.
              </p>
            </div>

            <div className="animate-on-scroll opacity-0 translate-y-8 animation-delay-800">
              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
                <Button
                  onClick={() => scrollToSection("projects")}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3 text-lg transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl group"
                >
                  <Zap className="w-5 h-5 mr-2 group-hover:animate-pulse" />
                  View My Work
                </Button>
                <Button
                  variant="outline"
                  onClick={() => scrollToSection("contact")}
                  className="border-2 border-blue-600 text-blue-400 hover:bg-blue-600 hover:text-white px-8 py-3 text-lg transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  Get In Touch
                </Button>
                <Button
                  variant="outline"
                  className="border-2 border-green-600 text-green-400 hover:bg-green-600 hover:text-white px-8 py-3 text-lg transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
                  asChild
                >
                  <a
                    href="https://drive.google.com/file/d/1F_UkDyMMUy6bLXRgrnwpH06wZcC8mLkg/view?usp=drive_link"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Eye className="w-5 h-5 mr-2" />
                    View Resume
                  </a>
                </Button>
              </div>
            </div>

            <div className="animate-on-scroll opacity-0 translate-y-8 animation-delay-1000">
              <div className="flex justify-center space-x-6">
                <a
                  href="https://linkedin.com/in/lokeshkonathala"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate-400 hover:text-blue-400 transition-all duration-300 transform hover:scale-125 hover:-translate-y-1"
                >
                  <Linkedin className="w-8 h-8" />
                </a>
                <a
                  href="https://github.com/lokeshkonathala"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate-400 hover:text-white transition-all duration-300 transform hover:scale-125 hover:-translate-y-1"
                >
                  <Github className="w-8 h-8" />
                </a>
                <a
                  href="mailto:lokeshkonathala18@gmail.com"
                  className="text-slate-400 hover:text-red-400 transition-all duration-300 transform hover:scale-125 hover:-translate-y-1"
                >
                  <Mail className="w-8 h-8" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <ChevronDown className="w-6 h-6 text-slate-400" />
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-slate-800/50 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-on-scroll opacity-0 translate-y-8">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">About Me</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto animate-expand"></div>
          </div>
          <div className="max-w-4xl mx-auto">
            <Card className="border-0 shadow-2xl hover:shadow-3xl transition-all duration-500 transform hover:-translate-y-2 animate-on-scroll opacity-0 translate-y-8 animation-delay-200 bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700">
              <CardContent className="p-8">
                <div className="grid md:grid-cols-2 gap-8 items-center">
                  <div className="space-y-6">
                    <p className="text-lg text-slate-300 leading-relaxed">
                      I'm an aspiring web developer currently pursuing my B.Tech in Computer Science Engineering at GMR
                      Institute of Technology, Rajam. With a passion for creating responsive and user-friendly web
                      applications, I specialize in full-stack development using modern technologies.
                    </p>
                    <p className="text-lg text-slate-300 leading-relaxed">
                      I actively build real-world projects including MERN stack applications and eCommerce platforms to
                      continuously sharpen my development skills. I'm seeking opportunities to apply my technical
                      knowledge in a collaborative, growth-oriented environment.
                    </p>
                    <div className="flex flex-wrap gap-3">
                      {["Problem Solver", "Team Player", "Quick Learner", "Creative Thinker"].map((trait, index) => (
                        <Badge
                          key={trait}
                          variant="secondary"
                          className="px-3 py-1 bg-blue-900/50 text-blue-300 border border-blue-700 hover:scale-105 transition-transform duration-200"
                          style={{ animationDelay: `${index * 100}ms` }}
                        >
                          <Star className="w-3 h-3 mr-1" />
                          {trait}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div className="relative">
                    <div className="w-full h-64 rounded-lg overflow-hidden border border-slate-700 shadow-xl">
                      <img
                        src="/profile-photo2.jpg"
                        alt="Lokesh Konathala"
                        className="w-full h-full object-cover hover:scale-110 transition-all duration-500"
                      />
                    </div>
                    <div className="absolute -top-4 -right-4 w-8 h-8 bg-yellow-500 rounded-full animate-ping"></div>
                    <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-green-500 rounded-full animate-bounce"></div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Education Section */}
      <section id="education" className="py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-on-scroll opacity-0 translate-y-8">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Education</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto animate-expand"></div>
          </div>
          <div className="max-w-4xl mx-auto">
            <Card className="border-0 shadow-2xl hover:shadow-3xl transition-all duration-500 transform hover:-translate-y-2 animate-on-scroll opacity-0 translate-y-8 animation-delay-200 overflow-hidden group bg-slate-800 border border-slate-700">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 to-purple-600/5 transform -skew-y-1 group-hover:skew-y-1 transition-transform duration-500"></div>
              <CardHeader className="relative">
                <div className="flex items-center space-x-4">
                  <div className="p-3 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg transform group-hover:rotate-12 transition-transform duration-300">
                    <GraduationCap className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <CardTitle className="text-xl text-white group-hover:text-blue-400 transition-colors duration-300">
                      B.Tech Computer Science and Engineering
                    </CardTitle>
                    <CardDescription className="text-lg text-slate-300">GMR Institute Of Technology</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="relative">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <p className="text-slate-300 mb-2">
                      <strong className="text-blue-400">Duration:</strong> 2022 - 2026
                    </p>
                    <p className="text-slate-300">
                      <strong className="text-purple-400">CGPA:</strong> 6.75
                    </p>
                  </div>
                  <div>
                    <p className="text-slate-300 font-semibold mb-2 text-green-400">Current Status:</p>
                    <p className="text-slate-400">4th Year Student (Final Year)</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 bg-slate-800/50 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-on-scroll opacity-0 translate-y-8">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Featured Projects</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto animate-expand"></div>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            {/* Full Stack eCommerce Platform */}
            <Card className="border-0 shadow-2xl hover:shadow-3xl transition-all duration-500 transform hover:-translate-y-4 hover:rotate-1 animate-on-scroll opacity-0 translate-y-8 animation-delay-200 group overflow-hidden bg-slate-800 border border-slate-700">
              <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 to-blue-500/10 transform scale-0 group-hover:scale-100 transition-transform duration-500 origin-center"></div>
              <CardHeader className="relative">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg transform group-hover:rotate-12 group-hover:scale-110 transition-all duration-300">
                      <Globe className="w-6 h-6 text-white" />
                    </div>
                    <CardTitle className="text-xl text-white group-hover:text-green-400 transition-colors duration-300">
                      Full Stack eCommerce Platform
                    </CardTitle>
                  </div>
                  <Badge variant="secondary" className="bg-green-900/50 text-green-300 border border-green-700">
                    May 2025 – June 2025
                  </Badge>
                </div>
                <CardDescription className="text-slate-300 group-hover:text-slate-200 transition-colors duration-300">
                  Developed a full-featured eCommerce website using HTML, CSS, PHP, and MySQL, supporting user
                  authentication, product management, shopping cart, and order handling.
                </CardDescription>
              </CardHeader>
              <CardContent className="relative">
                <div className="mb-4">
                  <h4 className="font-semibold text-white mb-2">Technologies Used:</h4>
                  <div className="flex flex-wrap gap-2">
                    {["HTML", "CSS", "PHP", "MySQL"].map((tech, index) => (
                      <Badge
                        key={tech}
                        variant="secondary"
                        className="hover:scale-110 transition-transform duration-200 bg-slate-700 text-slate-300 border border-slate-600 hover:bg-green-900/50 hover:text-green-300"
                        style={{ animationDelay: `${index * 100}ms` }}
                      >
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div className="mb-6">
                  <h4 className="font-semibold text-white mb-2">Key Features:</h4>
                  <ul className="text-sm text-slate-300 space-y-1">
                    {[
                      "Designed a responsive frontend UI with HTML/CSS, ensuring seamless navigation across devices",
                      "Structured and maintained a MySQL database with proper relational integrity for users",
                    ].map((feature, index) => (
                      <li
                        key={index}
                        className="flex items-start opacity-0 animate-fade-in"
                        style={{ animationDelay: `${index * 200}ms` }}
                      >
                        <div className="w-2 h-2 bg-green-500 rounded-full mr-2 mt-2 animate-pulse flex-shrink-0"></div>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="flex space-x-3">
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-slate-600 text-slate-300 hover:bg-slate-700 transform hover:scale-105 transition-all duration-200"
                    asChild
                  >
                    <a href="https://github.com/lokeshkonathala" target="_blank" rel="noopener noreferrer">
                      <Github className="w-4 h-4 mr-2" />
                      View Code
                    </a>
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* MERN Stack Real Estate Platform */}
            <Card className="border-0 shadow-2xl hover:shadow-3xl transition-all duration-500 transform hover:-translate-y-4 hover:-rotate-1 animate-on-scroll opacity-0 translate-y-8 animation-delay-400 group overflow-hidden bg-slate-800 border border-slate-700">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-pink-500/10 transform scale-0 group-hover:scale-100 transition-transform duration-500 origin-center"></div>
              <CardHeader className="relative">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-gradient-to-br from-purple-500 to-pink-600 rounded-lg transform group-hover:rotate-12 group-hover:scale-110 transition-all duration-300">
                      <Server className="w-6 h-6 text-white" />
                    </div>
                    <CardTitle className="text-xl text-white group-hover:text-purple-400 transition-colors duration-300">
                      MERN Stack Real Estate Platform
                    </CardTitle>
                  </div>
                  <Badge variant="secondary" className="bg-purple-900/50 text-purple-300 border border-purple-700">
                    Feb 2025 – Apr 2025
                  </Badge>
                </div>
                <CardDescription className="text-slate-300 group-hover:text-slate-200 transition-colors duration-300">
                  Built a full-featured real estate web application using the MERN stack—MongoDB, Express.js, React.js,
                  Node.js.
                </CardDescription>
              </CardHeader>
              <CardContent className="relative">
                <div className="mb-4">
                  <h4 className="font-semibold text-white mb-2">Technologies Used:</h4>
                  <div className="flex flex-wrap gap-2">
                    {["MongoDB", "Express.js", "React.js", "Node.js"].map((tech, index) => (
                      <Badge
                        key={tech}
                        variant="secondary"
                        className="hover:scale-110 transition-transform duration-200 bg-slate-700 text-slate-300 border border-slate-600 hover:bg-purple-900/50 hover:text-purple-300"
                        style={{ animationDelay: `${index * 100}ms` }}
                      >
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div className="mb-6">
                  <h4 className="font-semibold text-white mb-2">Key Features:</h4>
                  <ul className="text-sm text-slate-300 space-y-1">
                    {[
                      "Implemented property listing features with image upload, location-based search, and filtering options",
                      "Designed a responsive UI using React and styled with Tailwind CSS and Bootstrap",
                      "Integrated Cloudinary/Firebase for image storage and used MongoDB Atlas for cloud database management",
                    ].map((feature, index) => (
                      <li
                        key={index}
                        className="flex items-start opacity-0 animate-fade-in"
                        style={{ animationDelay: `${index * 200}ms` }}
                      >
                        <div className="w-2 h-2 bg-purple-500 rounded-full mr-2 mt-2 animate-pulse flex-shrink-0"></div>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="flex space-x-3">
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-slate-600 text-slate-300 hover:bg-slate-700 transform hover:scale-105 transition-all duration-200"
                    asChild
                  >
                    <a href="https://github.com/lokeshkonathala" target="_blank" rel="noopener noreferrer">
                      <Github className="w-4 h-4 mr-2" />
                      View Code
                    </a>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Internships Section */}
      <section id="internships" className="py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-on-scroll opacity-0 translate-y-8">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Experience</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto animate-expand"></div>
          </div>
          <div className="max-w-4xl mx-auto">
            <Card className="border-0 shadow-2xl hover:shadow-3xl transition-all duration-500 transform hover:-translate-y-2 animate-on-scroll opacity-0 translate-y-8 group overflow-hidden bg-slate-800 border border-slate-700">
              <div className="absolute inset-0 bg-gradient-to-r from-orange-500/5 to-red-600/5 transform -skew-y-1 group-hover:skew-y-1 transition-transform duration-500"></div>
              <CardHeader className="relative">
                <div className="flex items-center space-x-4">
                  <div className="p-3 bg-gradient-to-br from-orange-500 to-red-600 rounded-lg transform group-hover:rotate-12 group-hover:scale-110 transition-all duration-300">
                    <Shield className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <CardTitle className="text-xl text-white group-hover:text-orange-400 transition-colors duration-300">
                      Cyber Security - Software Intern
                    </CardTitle>
                    <CardDescription className="text-lg text-slate-300">
                      Krify Software Technologies, Kakinada
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="relative">
                <p className="text-slate-300 mb-4">
                  <strong className="text-orange-400">Duration:</strong> June 2024 - July 2024
                </p>
                <ul className="text-slate-300 space-y-2">
                  {[
                    "Completed a one-month internship focused on Cybersecurity fundamentals and real-world applications",
                    "Gained hands-on experience in threat detection, prevention, and identifying system vulnerabilities",
                    "Applied machine-learning models for phishing detection with XAI methods such as SHAP and LIME",
                    "Performed security assessments and proposed improvements to strengthen overall system defence",
                  ].map((task, taskIndex) => (
                    <li
                      key={taskIndex}
                      className="flex items-start opacity-0 animate-fade-in"
                      style={{ animationDelay: `${taskIndex * 200}ms` }}
                    >
                      <div className="w-2 h-2 bg-orange-500 rounded-full mr-3 mt-2 animate-pulse flex-shrink-0"></div>
                      {task}
                    </li>
                  ))}
                </ul>
                <div className="mt-4">
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-orange-600 text-orange-400 hover:bg-orange-900/50 transform hover:scale-105 transition-all duration-200"
                    asChild
                  >
                    <a
                      href="https://drive.google.com/file/d/1OU6WiygjZou6mB19ogmFrJMnif0BuM4n/view"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Award className="w-4 h-4 mr-2" />
                      View Certificate
                    </a>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Certifications Section */}
      <section id="certifications" className="py-20 bg-slate-800/50 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-on-scroll opacity-0 translate-y-8">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Certifications</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto animate-expand"></div>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* SQL HackerRank */}
            <Card className="border-0 shadow-2xl hover:shadow-3xl transition-all duration-500 transform hover:-translate-y-4 hover:rotate-1 animate-on-scroll opacity-0 translate-y-8 group overflow-hidden bg-slate-800 border border-slate-700">
              <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 to-green-600/10 transform scale-0 group-hover:scale-100 transition-transform duration-500 origin-center"></div>
              <CardHeader className="relative">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-gradient-to-br from-green-500 to-green-600 rounded-lg transform group-hover:rotate-12 group-hover:scale-110 transition-all duration-300">
                    <Award className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <CardTitle className="text-lg text-white group-hover:text-green-400 transition-colors duration-300">
                      SQL
                    </CardTitle>
                    <CardDescription className="text-slate-300">HackerRank</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="relative">
                <Button
                  variant="outline"
                  size="sm"
                  className="border-green-600 text-green-400 hover:bg-green-900/50 transform hover:scale-105 transition-all duration-200 w-full"
                  asChild
                >
                  <a
                    href="https://www.hackerrank.com/certificates/429a6355a32e"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <ExternalLink className="w-4 h-4 mr-2" />
                    View Certificate
                  </a>
                </Button>
              </CardContent>
            </Card>

            {/* JavaScript HackerRank */}
            <Card className="border-0 shadow-2xl hover:shadow-3xl transition-all duration-500 transform hover:-translate-y-4 hover:rotate-1 animate-on-scroll opacity-0 translate-y-8 group overflow-hidden bg-slate-800 border border-slate-700 animation-delay-200">
              <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/10 to-yellow-600/10 transform scale-0 group-hover:scale-100 transition-transform duration-500 origin-center"></div>
              <CardHeader className="relative">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-lg transform group-hover:rotate-12 group-hover:scale-110 transition-all duration-300">
                    <Award className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <CardTitle className="text-lg text-white group-hover:text-yellow-400 transition-colors duration-300">
                      JavaScript
                    </CardTitle>
                    <CardDescription className="text-slate-300">HackerRank</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="relative">
                <Button
                  variant="outline"
                  size="sm"
                  className="border-yellow-600 text-yellow-400 hover:bg-yellow-900/50 transform hover:scale-105 transition-all duration-200 w-full"
                  asChild
                >
                  <a
                    href="https://www.hackerrank.com/certificates/42039fb80f3c"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <ExternalLink className="w-4 h-4 mr-2" />
                    View Certificate
                  </a>
                </Button>
              </CardContent>
            </Card>

            {/* Data Analytics edX */}
            <Card className="border-0 shadow-2xl hover:shadow-3xl transition-all duration-500 transform hover:-translate-y-4 hover:rotate-1 animate-on-scroll opacity-0 translate-y-8 group overflow-hidden bg-slate-800 border border-slate-700 animation-delay-400">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-blue-600/10 transform scale-0 group-hover:scale-100 transition-transform duration-500 origin-center"></div>
              <CardHeader className="relative">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg transform group-hover:rotate-12 group-hover:scale-110 transition-all duration-300">
                    <Award className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <CardTitle className="text-lg text-white group-hover:text-blue-400 transition-colors duration-300">
                      Data Analytics Basics
                    </CardTitle>
                    <CardDescription className="text-slate-300">edX</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="relative">
                <Button
                  variant="outline"
                  size="sm"
                  className="border-blue-600 text-blue-400 hover:bg-blue-900/50 transform hover:scale-105 transition-all duration-200 w-full"
                  asChild
                >
                  <a
                    href="https://drive.google.com/file/d/1PJ9BU-w5vcHvCdx31S2aDJj41PP8NfYw/view"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <ExternalLink className="w-4 h-4 mr-2" />
                    View Certificate
                  </a>
                </Button>
              </CardContent>
            </Card>

            {/*Full-Stack Web Dev Bootcamp (Udemy) */}
            <Card className="border-0 shadow-2xl hover:shadow-3xl transition-all duration-500 transform hover:-translate-y-4 hover:rotate-1 animate-on-scroll opacity-0 translate-y-8 group overflow-hidden bg-slate-800 border border-slate-700 animation-delay-200">
              <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/10 to-yellow-600/10 transform scale-0 group-hover:scale-100 transition-transform duration-500 origin-center"></div>
              <CardHeader className="relative">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-lg transform group-hover:rotate-12 group-hover:scale-110 transition-all duration-300">
                    <Award className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <CardTitle className="text-lg text-white group-hover:text-yellow-400 transition-colors duration-300">
                     Full-Stack Web Dev Bootcamp
                    </CardTitle>
                    <CardDescription className="text-slate-300">Udemy</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="relative">
                <Button
                  variant="outline"
                  size="sm"
                  className="border-yellow-600 text-yellow-400 hover:bg-yellow-900/50 transform hover:scale-105 transition-all duration-200 w-full"
                  asChild
                >
                  <a
                    href="https://drive.google.com/file/d/1RaoI9ij63RCVUAP4AQ3u2jzUCMnGjbql/view?usp=sharing"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <ExternalLink className="w-4 h-4 mr-2" />
                    View Certificate
                  </a>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-on-scroll opacity-0 translate-y-8">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Skills & Technologies</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto animate-expand"></div>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                title: "Technical Skills",
                icon: Code,
                color: "blue",
                skills: ["C", "C++", "Python", "Angular.js", "Node.js", "SQL"],
              },
              {
                title: "Stacks / Tools",
                icon: Server,
                color: "green",
                skills: ["MERN Stack", "PHP Stack", "Git", "GitHub", "VS Code"],
              },
              {
                title: "Soft Skills",
                icon: User,
                color: "purple",
                skills: ["Teamwork & Collaboration", "Effective Scheduling", "Workflow Optimisation", "Communication"],
              },
              {
                title: "Interests",
                icon: Star,
                color: "orange",
                skills: ["Photography", "Creative Writing", "Travelling"],
                skillIcons: [Camera, PenTool, Plane],
              },
            ].map((category, index) => (
              <Card
                key={index}
                className="border-0 shadow-2xl hover:shadow-3xl transition-all duration-500 transform hover:-translate-y-4 hover:rotate-1 animate-on-scroll opacity-0 translate-y-8 group overflow-hidden bg-slate-800 border border-slate-700"
                style={{ animationDelay: `${index * 200}ms` }}
              >
                <div
                  className={`absolute inset-0 bg-gradient-to-br from-${category.color}-500/10 to-${category.color}-600/10 transform scale-0 group-hover:scale-100 transition-transform duration-500 origin-center`}
                ></div>
                <CardHeader className="relative">
                  <div className="flex items-center space-x-3">
                    <div
                      className={`p-2 bg-gradient-to-br from-${category.color}-500 to-${category.color}-600 rounded-lg transform group-hover:rotate-12 group-hover:scale-110 transition-all duration-300`}
                    >
                      <category.icon className="w-6 h-6 text-white" />
                    </div>
                    <CardTitle
                      className={`text-lg text-white group-hover:text-${category.color}-400 transition-colors duration-300`}
                    >
                      {category.title}
                    </CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="relative">
                  <div className="space-y-2">
                    {category.skills.map((skill, skillIndex) => {
                      const SkillIcon = category.skillIcons?.[skillIndex]
                      return (
                        <div
                          key={skill}
                          className={`flex items-center text-slate-300 opacity-0 animate-fade-in hover:text-${category.color}-400 transition-colors duration-200`}
                          style={{ animationDelay: `${skillIndex * 100}ms` }}
                        >
                          {SkillIcon ? (
                            <SkillIcon className="w-4 h-4 mr-2" />
                          ) : (
                            <div className={`w-2 h-2 bg-${category.color}-500 rounded-full mr-2 animate-pulse`}></div>
                          )}
                          {skill}
                        </div>
                      )
                    })}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-slate-800/50 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-on-scroll opacity-0 translate-y-8">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Get In Touch</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto animate-expand"></div>
            <p className="text-lg text-slate-300 mt-6 max-w-2xl mx-auto">
              I'm always open to discussing new opportunities, interesting projects, or just having a chat about
              technology.
            </p>
          </div>
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  icon: Mail,
                  title: "Email",
                  value: "lokeshkonathala18@gmail.com",
                  href: "mailto:lokeshkonathala18@gmail.com",
                  color: "blue",
                },
                {
                  icon: Phone,
                  title: "Phone",
                  value: "+91 9110717947",
                  href: "tel:+919110717947",
                  color: "green",
                },
                {
                  icon: MapPin,
                  title: "Location",
                  value: "Rajam, Andhra Pradesh, India",
                  href: "#",
                  color: "purple",
                },
              ].map((contact, index) => (
                <Card
                  key={index}
                  className="border-0 shadow-2xl hover:shadow-3xl transition-all duration-500 transform hover:-translate-y-4 hover:rotate-1 animate-on-scroll opacity-0 translate-y-8 text-center group overflow-hidden bg-slate-800 border border-slate-700"
                  style={{ animationDelay: `${index * 200}ms` }}
                >
                  <div
                    className={`absolute inset-0 bg-gradient-to-br from-${contact.color}-500/10 to-${contact.color}-600/10 transform scale-0 group-hover:scale-100 transition-transform duration-500 origin-center`}
                  ></div>
                  <CardContent className="p-6 relative">
                    <div
                      className={`p-3 bg-gradient-to-br from-${contact.color}-500 to-${contact.color}-600 rounded-lg w-fit mx-auto mb-4 transform group-hover:rotate-12 group-hover:scale-110 transition-all duration-300`}
                    >
                      <contact.icon className="w-8 h-8 text-white" />
                    </div>
                    <h3
                      className={`text-lg font-semibold text-white mb-2 group-hover:text-${contact.color}-400 transition-colors duration-300`}
                    >
                      {contact.title}
                    </h3>
                    <a
                      href={contact.href}
                      className={`text-${contact.color}-400 hover:underline transition-all duration-200 hover:scale-105 inline-block`}
                    >
                      {contact.value}
                    </a>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="text-center mt-12 animate-on-scroll opacity-0 translate-y-8 animation-delay-600">
              <div className="flex justify-center space-x-6">
                {[
                  { href: "https://github.com/lokeshkonathala", icon: Github, color: "slate" },
                  { href: "https://linkedin.com/in/lokeshkonathala", icon: Linkedin, color: "blue" },
                  { href: "mailto:lokeshkonathala18@gmail.com", icon: Mail, color: "red" },
                ].map((social, index) => (
                  <a
                    key={index}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 bg-slate-700 border border-slate-600 rounded-lg text-slate-400 hover:text-white hover:bg-slate-600 transition-all duration-300 transform hover:scale-110 hover:-translate-y-2 hover:rotate-12"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <social.icon className="w-8 h-8" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-slate-900 via-blue-900 to-slate-900 text-white py-8 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10 animate-pulse-slow"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center">
            <p className="text-slate-400 animate-fade-in">© 2025 Lokesh Konathala. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
