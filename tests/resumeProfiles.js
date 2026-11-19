/**
 * Canonical Test Profiles for Phase 7.1 Evaluation Testing
 */

const testProfiles = {
  // Profile 1: Fresher with academic projects
  fresherWithAcademicProjects: {
    candidateName: "Aarav Sharma",
    explicitTier: "Fresher",
    yearsOfExperience: 0,
    contactInfo: {
      email: "aarav.sharma@example.edu",
      phone: "+91 9876543210",
      location: "Pune, India",
    },
    summary: "Computer Science graduate with deep interest in web technologies and algorithm design. Built multiple full-stack academic applications using MERN stack.",
    skills: ["JavaScript", "React", "Node.js", "Express", "MongoDB", "Git", "HTML5", "CSS3", "Java", "Data Structures"],
    workExperience: [], // Fresh graduate has no corporate work history
    projects: [
      {
        name: "Campus Event Management Portal",
        technologies: ["React", "Node.js", "MongoDB"],
        bullets: [
          "Architected full-stack event registration portal handling 1,500 active student signups.",
          "Implemented JWT authentication and role-based access control for student organizers.",
          "Optimized MongoDB queries, reducing page load times from 2.4s to 850ms."
        ]
      },
      {
        name: "Real-Time Collaborative Code Editor",
        technologies: ["React", "Socket.io", "Express"],
        bullets: [
          "Developed peer-to-peer collaborative syntax highlighting editor supporting concurrent editing.",
          "Integrated WebSockets to broadcast keystrokes with under 50ms latency."
        ]
      }
    ],
    education: [
      {
        degree: "B.Tech in Computer Science and Engineering",
        school: "Pune University",
        year: "2026",
        gpa: "8.8/10"
      }
    ],
    certifications: ["Meta Frontend Developer Specialization"],
    achievements: ["1st Place, Annual Inter-College Hackathon (120 participating teams)"],
    layout: "single-column",
    detectedHeadings: ["Contact", "Summary", "Education", "Technical Skills", "Projects", "Certifications", "Achievements"]
  },

  // Profile 2: Frontend developer with two years of experience
  frontendDeveloper2Years: {
    candidateName: "Priya Nair",
    explicitTier: "Entry-level",
    yearsOfExperience: 2,
    contactInfo: {
      email: "priya.nair@example.com",
      phone: "+91 9812345678",
      location: "Bangalore, India"
    },
    summary: "Frontend Software Engineer with 2 years of experience specializing in React, Next.js, and TypeScript. Passionate about web accessibility and UI performance optimization.",
    skills: ["React", "Next.js", "TypeScript", "JavaScript", "Tailwind CSS", "Redux Toolkit", "Jest", "Git", "REST APIs", "Webpack"],
    workExperience: [
      {
        company: "PixelCraft Solutions",
        title: "Frontend Engineer",
        bullets: [
          "Developed customer-facing dashboard in Next.js, serving 45,000 monthly active users.",
          "Refactored legacy state management to Redux Toolkit, decreasing re-render frequency by 35%.",
          "Automated component unit testing with Jest and React Testing Library, achieving 82% coverage."
        ]
      }
    ],
    projects: [
      {
        name: "E-Commerce Design System",
        technologies: ["React", "Storybook", "Tailwind CSS"],
        bullets: [
          "Created accessible component library adopted by 3 cross-functional teams."
        ]
      }
    ],
    education: [
      {
        degree: "B.E. in Information Technology",
        school: "Visvesvaraya Technological University",
        year: "2024"
      }
    ],
    certifications: [],
    achievements: [],
    layout: "single-column",
    detectedHeadings: ["Contact", "Summary", "Experience", "Skills", "Projects", "Education"]
  },

  // Profile 3: Full-stack developer with several projects
  fullStackDeveloperWithProjects: {
    candidateName: "Rohan Verma",
    explicitTier: "Experienced professional",
    yearsOfExperience: 3,
    contactInfo: {
      email: "rohan.verma@example.com",
      phone: "+91 9988776655",
      location: "Hyderabad, India"
    },
    summary: "Full Stack Engineer with 3 years building microservices and responsive web platforms. Proficient across React, Node.js, PostgreSQL, Docker, and AWS.",
    skills: ["JavaScript", "TypeScript", "React", "Node.js", "Express", "PostgreSQL", "MongoDB", "Docker", "AWS", "Redis", "Git", "GraphQL"],
    workExperience: [
      {
        company: "Apex Cloud Systems",
        title: "Software Engineer",
        bullets: [
          "Engineered distributed notification microservice in Node.js processing 2M daily webhook dispatches.",
          "Migrated monolithic MySQL tables to indexed PostgreSQL schemas, cutting query latency by 45%."
        ]
      }
    ],
    projects: [
      {
        name: "Distributed Task Queue",
        technologies: ["Node.js", "Redis", "Docker"],
        bullets: [
          "Engineered asynchronous task scheduler executing 5,000 background jobs per minute."
        ]
      },
      {
        name: "SaaS Analytics Engine",
        technologies: ["React", "PostgreSQL", "Express"],
        bullets: [
          "Built real-time telemetry dashboard visualizing server metrics with 1-second refresh intervals."
        ]
      },
      {
        name: "API Gateway Proxy",
        technologies: ["Node.js", "Express", "Docker"],
        bullets: [
          "Constructed reverse proxy implementing rate limiting and token validation."
        ]
      }
    ],
    education: [
      {
        degree: "B.Tech in Computer Science",
        school: "JNTU Hyderabad",
        year: "2023"
      }
    ],
    certifications: ["AWS Certified Developer Associate"],
    achievements: [],
    layout: "single-column",
    detectedHeadings: ["Contact", "Summary", "Skills", "Experience", "Projects", "Education", "Certifications"]
  },

  // Profile 4: Experienced professional with measurable achievements
  experiencedProfessionalMeasurable: {
    candidateName: "Vikram Malhotra",
    explicitTier: "Experienced professional",
    yearsOfExperience: 6,
    contactInfo: {
      email: "vikram.m@example.com",
      phone: "+91 9711223344",
      location: "Mumbai, India"
    },
    summary: "Senior Engineering Lead with 6+ years designing mission-critical distributed platforms. Proven record of reducing operational expenses by 30% and leading high-velocity engineering squads.",
    skills: ["Go", "Node.js", "React", "Kubernetes", "AWS", "Kafka", "PostgreSQL", "Docker", "Microservices", "System Design", "CI/CD", "Redis", "Terraform"],
    workExperience: [
      {
        company: "FinScale Technologies",
        title: "Lead Platform Engineer",
        bullets: [
          "Architected payment reconciliation pipeline processing $12M daily volume with 99.99% availability.",
          "Spearheaded Kubernetes migration across 40 containerized services, saving $120K in annual AWS infrastructure spend.",
          "Mentored 8 junior and mid-level engineers, instituting code review standards that halved defect escape rate."
        ]
      },
      {
        company: "CloudCore Corp",
        title: "Senior Backend Developer",
        bullets: [
          "Refactored order ingestion service to use Apache Kafka, scaling event throughput by 400% during Black Friday peaks.",
          "Eliminated database thread starvation bottlenecks, reducing p99 API response times from 1.8s to 180ms."
        ]
      }
    ],
    projects: [
      {
        name: "Open Source Kubernetes Operator",
        technologies: ["Go", "Kubernetes"],
        bullets: [
          "Created CRD-based operator with 1,200 GitHub stars adopted by multiple production clusters."
        ]
      }
    ],
    education: [
      {
        degree: "B.Tech in Computer Science",
        school: "IIT Bombay",
        year: "2020"
      }
    ],
    certifications: ["Certified Kubernetes Administrator (CKA)", "AWS Solutions Architect Professional"],
    achievements: [
      "Accomplished zero-downtime database cutover, measured by 100% SLA compliance during 10M record transfer, by orchestrating dual-write replication."
    ],
    layout: "single-column",
    detectedHeadings: ["Contact", "Summary", "Experience", "Skills", "Education", "Certifications", "Achievements"]
  },

  // Profile 5: Resume containing only responsibilities without results
  responsibilitiesOnlyNoResults: {
    candidateName: "Deepak Joshi",
    explicitTier: "Experienced professional",
    yearsOfExperience: 3,
    contactInfo: {
      email: "deepak.j@example.com",
      phone: "+91 9123456780",
      location: "Noida, India"
    },
    summary: "Software developer with 3 years of IT experience.",
    skills: ["Java", "Spring Boot", "MySQL", "JavaScript", "HTML"],
    workExperience: [
      {
        company: "InfoTech Services",
        title: "Associate Software Engineer",
        bullets: [
          "Responsible for writing Java and Spring Boot code.",
          "Worked on fixing bugs and attending daily standups.",
          "Duties included handling database maintenance and user tickets.",
          "Assisted in testing various APIs as needed by senior developers."
        ]
      }
    ],
    projects: [],
    education: [
      {
        degree: "B.Sc in Computer Science",
        school: "Delhi University",
        year: "2023"
      }
    ],
    certifications: [],
    achievements: [],
    layout: "single-column",
    detectedHeadings: ["Contact", "Summary", "Experience", "Skills", "Education"]
  },

  // Profile 6: Poorly formatted resume
  poorlyFormattedResume: {
    candidateName: "Anil Kumar",
    explicitTier: "Entry-level",
    yearsOfExperience: 1,
    contactInfo: {
      email: "anil123@gmail.com",
      phone: "9876543210"
    },
    summary: "Looking for a job in IT field.",
    skills: ["C", "C++"],
    workExperience: [
      {
        company: "Local Tech Shop",
        title: "Developer",
        bullets: [
          "did coding",
          "handled things"
        ]
      }
    ],
    projects: [],
    education: [
      {
        degree: "B.A.",
        school: "State College"
      }
    ],
    certifications: [],
    achievements: [],
    layout: "multi-column", // Multi-column layout warning
    hasTables: true, // Tables warning
    hasImagesOrIcons: true, // Graphics warning
    detectedHeadings: ["where i've been", "what i do", "my journey"], // Non-standard headings
    grammarIssues: ["Misspelled words detected", "Missing capitalizations", "Broken formatting"]
  },

  // Profile 7: Resume with missing education or contact details
  missingEducationOrContact: {
    candidateName: "Anonymous Candidate",
    explicitTier: "Experienced professional",
    yearsOfExperience: 2,
    contactInfo: {
      // Missing phone and email!
      location: "India"
    },
    summary: "Developer with backend experience.",
    skills: ["Node.js", "Express", "MongoDB"],
    workExperience: [
      {
        company: "Startup",
        title: "Junior Backend Developer",
        bullets: [
          "Built authentication endpoints in Node.js and Express."
        ]
      }
    ],
    projects: [],
    education: [], // Missing education!
    certifications: [],
    achievements: [],
    layout: "single-column",
    detectedHeadings: ["Skills", "Experience"]
  },

  // Profile 8: Resume with unsupported or unverifiable claims
  unsupportedOrUnverifiableClaims: {
    candidateName: "Sanjay Patel",
    explicitTier: "Experienced professional",
    yearsOfExperience: 2,
    contactInfo: {
      email: "sanjay@example.com",
      phone: "+91 9876501234"
    },
    summary: "World-class full-stack engineer and visionary.",
    skills: ["JavaScript", "Python"],
    workExperience: [
      {
        company: "Tech Org",
        title: "Developer",
        bullets: [
          "Developed revolutionary AI architecture that disrupted the entire market.",
          "Created best-in-class UI that outcompeted all global competitors."
        ]
      }
    ],
    projects: [],
    education: [
      {
        degree: "B.Tech",
        school: "University"
      }
    ],
    certifications: [],
    achievements: [],
    layout: "single-column",
    detectedHeadings: ["Contact", "Summary", "Experience", "Skills", "Education"]
  }
};

module.exports = testProfiles;
