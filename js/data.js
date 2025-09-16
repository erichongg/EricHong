// Portfolio Data
export const siteData = {
  // Resume URL
  resumeUrl: "/Erics_Resume.pdf",
  
  // Personal Information
  personal: {
    name: "Eric Hong",
    title: "Computer Science Student",
    email: "honggeric@gmail.com",
    phone: "949-876-2247",
    location: "Fountain Valley, CA"
  },
  
  // Experience Data
  experience: [
    {
      role: "Web Developer",
      company: "St. Joseph Mission Charity",
      location: "Westminster, CA",
      dates: "Jan 2025 - Mar 2025",
      bullets: [
        "Created a responsive website with HTML and CSS to strengthen the non-profit's digital presence and effectively communicate its mission to the community",
        "Enhanced the image gallery UI by implementing JavaScript arrow-button navigation, creating a smoother browsing experience",
        "Collaborated with the client to deliver a tailored solution within deadlines, incorporating iterative feedback to ensure usability and alignment with their goals"
      ]
    }
  ],
  
  // Education Data
  education: [
    {
      degree: "Bachelor of Science in Computer Science",
      institution: "California State University, Long Beach",
      location: "Long Beach, CA",
      dates: "Aug 2021 - Expected Dec 2025",
      highlights: [
        "Relevant Coursework: Data Structures, Algorithms, Object-Oriented Application Development, Database Fundamentals, Machine Learning, Operating Systems"
      ]
    }
  ],
  
  // Projects Data
  projects: [
    {
      name: "Table Tap",
      summary: "QR-based ordering system enabling customers to self-order, improving business's service speed and managing high customer traffic with limited staff.",
      stack: ["React", "TypeScript", "Supabase", "Bootstrap", "AWS"],
      links: {
        live: "#",
        github: "https://github.com/erichongg/table-tap"
      },
      description: "Developed a QR-based ordering system enabling customers to self-order, improving business's service speed and managing high customer traffic with limited staff. Built a secure dashboard with React components and Supabase Auth, protecting restaurant data and customer order information. Implemented a PostgreSQL relational schema with a maintainable structure to support scalable queries for menu items and item modifiers. Deployed application on AWS, achieving 24/7 uptime and ensuring reliable hosting for restaurant operations."
    },
    {
      name: "Bartending Exam Prep App",
      summary: "2D Unity game leveraging prefabs, ScriptableObjects, and state-driven UI to create interactive bartending drills for exam preparation.",
      stack: ["JavaScript", "C#", "Unity", "Node.js", "Express.js", "MongoDB", "Firebase"],
      links: {
        live: "#",
        github: "https://github.com/erichongg/bartending-exam-app"
      },
      description: "Developed a 2D Unity game leveraging prefabs, ScriptableObjects, and state-driven UI to create interactive bartending drills for exam preparation. Implemented Node.js RESTful APIs to retrieve player stats and integrate the Cocktail API for drink recipe data, enabling interactive and dynamic gameplay. Built a MongoDB schema connected with Firebase Auth for quick user data access, enhancing authentication and in-game responsiveness."
    },
    {
      name: "Essenger",
      summary: "Real-time messaging app with Socket.io and React Native components, enabling users to communicate instantly with a seamless experience across devices.",
      stack: ["JavaScript", "React Native", "Express.js", "Node.js", "Socket.io", "Tailwind CSS", "Render"],
      links: {
        live: "#",
        github: "https://github.com/erichongg/essenger"
      },
      description: "Built a real-time messaging app with Socket.io and React Native components, enabling users to communicate instantly with a seamless experience across devices. Developed a backend with Express.js and Node.js to power real-time server logic and APIs for text data retrieval and response handling. Deployed the application on Render for 24/7 hosting, delivering consistent uptime and stable performance."
    },
    {
      name: "IoT System Development",
      summary: "IoT system with 3 virtual sensors and custom calibration logic to capture accurate real-time environmental data.",
      stack: ["Python", "MongoDB", "GCP", "Socket"],
      links: {
        live: "#",
        github: "https://github.com/erichongg/iot-system"
      },
      description: "Developed an IoT system with 3 virtual sensors and custom calibration logic to capture accurate real-time environmental data. Engineered a TCP/IP socket architecture enabling dependable client-server communication and accurate data delivery. Utilized PyMongo to efficiently store and query 100+ timestamped entries, delivering real-time access to metadata for application insights. Deployed the system on GCP to provide secure remote data access and support scalable, real-time monitoring."
    },
    {
      name: "Portfolio Website",
      summary: "Responsive personal portfolio website showcasing projects, skills, and experience with modern design and smooth animations.",
      stack: ["HTML5", "CSS3", "JavaScript", "Responsive Design"],
      links: {
        live: "http://localhost:8000",
        github: "https://github.com/erichongg/portfolio"
      },
      description: "A fully responsive personal portfolio website built with vanilla HTML, CSS, and JavaScript. Features include smooth scrolling navigation, intersection observer for active section highlighting, responsive design with mobile-first approach, accessibility features with skip links and ARIA labels, and a clean, modern design with customizable color schemes. The site showcases professional experience, education, projects, and skills in an organized and visually appealing format."
    }
  ],
  
  // Skills Data
  skills: {
    languages: [
      "JavaScript", "TypeScript", "Python", "C#", "HTML", "CSS"
    ],
    frameworks: [
      "React", "Node.js", "Express.js", "Unity", "Supabase"
    ],
    databases: [
      "Supabase", "MongoDB"
    ],
    tools: [
      "Git", "Visual Studio Code", "Agile", "Figma", "Render", "GCP", "AWS"
    ]
  },
  
  // Social Links
  socials: {
    github: "https://github.com/erichongg",
    linkedin: "https://linkedin.com/in/erichongg",
    email: "mailto:honggeric@gmail.com"
  },
  
  // Contact Information
  contact: {
    email: "honggeric@gmail.com",
    phone: "949-876-2247",
    location: "Long Beach, CA",
    availability: "Available for internships and full-time opportunities"
  }
};
