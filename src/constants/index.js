// Your personal info – edit this file to update name, email, and links across the site
export const profile = {
  name: "Prince Kumar Maurya",
  firstName: "Prince",
  email: "princemaurya1201@gmail.com",
  location: "Bengaluru, India",
  tagline: "A Developer Dedicated to Crafting",
  taglineEnd: "Web & Data Solutions",
  flipWords: ["Smart", "Scalable", "Data-Driven"],
  bio: "Student at Polaris School of Technology. I build full stack applications and data-driven solutions with a focus on clean code and user experience.",
  timezone: "I'm based in Bengaluru, India (IST), and open to remote work worldwide.",
  techStack: "Full Stack Developer & Data Science enthusiast. I specialize in web development (React, JavaScript, Node.js), machine learning (Python, scikit-learn), data analysis (SQL, Power BI), and building intelligent applications.",
  // Formspree: messages go straight to your Gmail. Get your form ID at https://formspree.io/
  formspreeFormId: "",
  // Or use EmailJS (see EMAIL_SETUP.md): emailjsServiceId, emailjsTemplateId, emailjsPublicKey
  emailjsServiceId: "your_service_id",
  emailjsTemplateId: "your_template_id",
  emailjsPublicKey: "your_public_key",
};

export const myProjects = [
  {
    id: 1,
    title: "Rubik's Cube Solver",
    description:
      "An intelligent 3x3x3 Rubik's Cube solver that uses computer vision (OpenCV) to capture cube state via webcam and generates optimal solutions averaging 25 moves or less.",
    subDescription: [
      "Built with Java and OpenCV for real-time color detection and cube state recognition.",
      "Custom solving algorithm with multi-stage approach (2x2x2 block → 2x2x3 → bow-tie → complete).",
      "Dual-window interface for camera feed and cube visualization with interactive UI.",
      "Cross-platform support for Windows, macOS, and Linux.",
    ],
    href: "https://github.com/alwaysprince05/Rubik-s-Cube-Solver",
    logo: "",
    image: "/assets/projects/rubiks-cube-solver.png",
    tags: [
      { id: 1, name: "Java", path: "/assets/logos/csharp.svg" },
      { id: 2, name: "OpenCV", path: "/assets/logos/git.svg" },
      { id: 3, name: "Computer Vision", path: "/assets/logos/github.svg" },
    ],
  },
  {
    id: 2,
    title: "AI Article Summariser",
    description:
      "A Chrome extension that uses Google's Gemini AI to summarize web articles with multiple summary formats—brief, detailed, or bullet points—with one click.",
    subDescription: [
      "Built with vanilla JavaScript and Chrome Extension Manifest V3.",
      "Integrated Google Gemini AI API for smart content extraction and summarization.",
      "Secure API key storage in Chrome sync storage.",
      "Copy-to-clipboard and works on most article-based websites.",
    ],
    href: "https://github.com/alwaysprince05/AI-Article-Summariser",
    logo: "",
    image: "/assets/projects/ai-article-summariser.png",
    tags: [
      { id: 1, name: "JavaScript", path: "/assets/logos/javascript.svg" },
      { id: 2, name: "Chrome Extension", path: "/assets/logos/html5.svg" },
      { id: 3, name: "Gemini AI", path: "/assets/logos/github.svg" },
    ],
  },
  {
    id: 3,
    title: "SMS Spam Detection",
    description:
      "A Machine Learning project to classify SMS messages as Spam or Ham using TF-IDF vectorization and Multinomial Naive Bayes for text classification.",
    subDescription: [
      "Data preprocessing with NLTK for text cleaning and normalization.",
      "TF-IDF vectorization for feature extraction from SMS text.",
      "Multinomial Naive Bayes classifier with 94%+ accuracy.",
      "Web app interface built with Streamlit/Flask for real-time classification.",
    ],
    href: "https://github.com/alwaysprince05/SMS-Spam-Detection-",
    logo: "",
    image: "/assets/projects/sms-spam-detection.png",
    tags: [
      { id: 1, name: "Python", path: "/assets/logos/javascript.svg" },
      { id: 2, name: "scikit-learn", path: "/assets/logos/git.svg" },
      { id: 3, name: "NLTK", path: "/assets/logos/github.svg" },
    ],
  },
  {
    id: 4,
    title: "Sales Data Analysis (Power BI)",
    description:
      "Data analysis and visualization project using SQL and Microsoft Power BI to derive insights from sales transactions, customers, and market performance.",
    subDescription: [
      "SQL queries for data extraction, filtering, and aggregation.",
      "Power BI dashboards for revenue, profit, and sales performance visualization.",
      "Market-wise and time-based analysis with interactive reports.",
      "Database setup with MySQL/SQL Server for transactional data.",
    ],
    href: "https://github.com/alwaysprince05/Sale-Data-Analysis-PowerBI",
    logo: "",
    image: "/assets/projects/sales-data-analysis.png",
    tags: [
      { id: 1, name: "SQL", path: "/assets/logos/microsoftsqlserver.svg" },
      { id: 2, name: "Power BI", path: "/assets/logos/microsoft.svg" },
      { id: 3, name: "Data Analysis", path: "/assets/logos/github.svg" },
    ],
  },
  {
    id: 5,
    title: "Code Collaborator",
    description:
      "A real-time collaborative code editor that allows multiple users to edit code together in sync, with a live preview and shared session management.",
    subDescription: [
      "Real-time synchronization using WebSockets or Firebase.",
      "Multi-language code editor with syntax highlighting.",
      "Live deployed at code-collaborator-xi.vercel.app.",
      "User authentication and room-based collaboration.",
    ],
    href: "https://github.com/alwaysprince05/Code_Collaborator",
    logo: "",
    image: "/assets/projects/code-collaborator.png",
    tags: [
      { id: 1, name: "JavaScript", path: "/assets/logos/javascript.svg" },
      { id: 2, name: "HTML/CSS", path: "/assets/logos/html5.svg" },
      { id: 3, name: "Vercel", path: "/assets/logos/github.svg" },
    ],
  },
];

export const mySocials = [
  {
    name: "GitHub",
    href: "https://github.com/alwaysprince05",
    icon: "/assets/logos/github.svg",
  },
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/in/prince-kumar-maurya-67a41128b/",
    icon: "/assets/socials/linkedIn.svg",
  },
  {
    name: "WhatsApp",
    href: "#",
    icon: "/assets/socials/whatsApp.svg",
  },
];

export const experiences = [
  {
    title: "Student",
    job: "Polaris School of Technology",
    date: "Present",
    contents: [
      "Pursuing full stack development and data science with hands-on project experience.",
      "Building web applications, ML models, and data visualization projects.",
      "Contributing to open source and personal projects on GitHub.",
    ],
  },
];

export const reviews = [
  {
    name: "Add testimonial",
    username: "@colleague",
    body: "Add a short testimonial from a teammate, professor, or client. Edit in src/constants/index.js.",
    img: "https://robohash.org/testimonial1",
  },
  {
    name: "Another testimonial",
    username: "@client",
    body: "Another positive quote about working with you.",
    img: "https://robohash.org/testimonial2",
  },
];
