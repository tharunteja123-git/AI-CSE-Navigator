import { useState, useEffect, useRef, useCallback } from "react";
import { api } from "../services/api";
import DashboardLayout from "../layouts/DashboardLayout";
import ReactMarkdown from "react-markdown";
import toast from "react-hot-toast";
import {
  FiChevronRight, FiChevronDown, FiZap, FiArrowRight,
  FiSearch, FiBookOpen, FiTrendingUp, FiDollarSign,
  FiBriefcase, FiGlobe, FiAward, FiUsers, FiCpu,
  FiStar, FiTarget, FiCode, FiLayers, FiCheck,
  FiMessageCircle, FiMapPin, FiClock, FiPercent,
  FiExternalLink, FiYoutube, FiGithub, FiLinkedin,
  FiTerminal, FiDatabase, FiCloud, FiShield, FiSmartphone,
  FiBarChart2, FiX, FiMenu, FiHome, FiInfo, FiAlertCircle,
  FiCheckCircle, FiLock, FiUnlock, FiPlayCircle, FiBook,
} from "react-icons/fi";

// ─────────────────────────────────────────────────────────────────
// NAVIGATION DATA
// ─────────────────────────────────────────────────────────────────
const NAV_SECTIONS = [
  { id:"overview",        label:"Career Overview",          emoji:"🗺️",  group:"Start Here"     },
  { id:"domains",         label:"Career Domains",           emoji:"🎯",  group:"Start Here"     },
  { id:"growth-ladder",   label:"Growth Ladder",            emoji:"📈",  group:"Start Here"     },
  { id:"sde-path",        label:"SDE / Full Stack",         emoji:"💻",  group:"Career Tracks"  },
  { id:"ai-ml-path",      label:"AI / ML Engineer",         emoji:"🤖",  group:"Career Tracks"  },
  { id:"devops-path",     label:"DevOps / Cloud",           emoji:"☁️",  group:"Career Tracks"  },
  { id:"data-path",       label:"Data Science",             emoji:"📊",  group:"Career Tracks"  },
  { id:"security-path",   label:"Cybersecurity",            emoji:"🛡️",  group:"Career Tracks"  },
  { id:"mobile-path",     label:"Mobile Dev",               emoji:"📱",  group:"Career Tracks"  },
  { id:"salary",          label:"Salary Explorer",          emoji:"💰",  group:"Compensation"   },
  { id:"companies",       label:"Company Tiers",            emoji:"🏢",  group:"Compensation"   },
  { id:"interview-prep",  label:"Interview Preparation",    emoji:"🎯",  group:"Getting Hired"  },
  { id:"resume-guide",    label:"Resume & Portfolio",       emoji:"📄",  group:"Getting Hired"  },
  { id:"networking",      label:"Networking Guide",         emoji:"🤝",  group:"Getting Hired"  },
  { id:"skills-matrix",   label:"Skills Matrix",            emoji:"🗺️",  group:"Skills"         },
  { id:"resources",       label:"Top Resources",            emoji:"📚",  group:"Skills"         },
  { id:"certifications",  label:"Certifications",           emoji:"📜",  group:"Skills"         },
  { id:"higher-studies",  label:"Higher Studies",           emoji:"🎓",  group:"Advanced"       },
  { id:"study-abroad",    label:"Study Abroad",             emoji:"✈️",  group:"Advanced"       },
  { id:"freelancing",     label:"Freelancing",              emoji:"🏠",  group:"Alternative"    },
  { id:"startups",        label:"Entrepreneurship",         emoji:"🚀",  group:"Alternative"    },
  { id:"career-switch",   label:"Career Switching",         emoji:"🔄",  group:"Alternative"    },
  { id:"faqs",            label:"Common Questions",         emoji:"❓",  group:"Insights"       },
  { id:"success-stories", label:"Success Stories",          emoji:"🌟",  group:"Insights"       },
  { id:"trends-2025",     label:"Trends 2025–2030",         emoji:"🔭",  group:"Insights"       },
  { id:"ai-advisor",      label:"AI Career Advisor",        emoji:"🤖",  group:"AI Tools"       },
  { id:"roadmap-gen",     label:"Generate My Roadmap",      emoji:"⚡",  group:"AI Tools"       },
];

const GROUPS = ["Start Here","Career Tracks","Compensation","Getting Hired","Skills","Advanced","Alternative","Insights","AI Tools"];

// ─────────────────────────────────────────────────────────────────
// CONTENT DATA — Rich, deep, real
// ─────────────────────────────────────────────────────────────────

const CAREER_TRACKS = [
  {
    id:"sde-path",
    title:"Software Development Engineer",
    short:"SDE / Full Stack",
    emoji:"💻",
    color:"indigo",
    demand:"Very High",
    avgSalary:"₹8–60L",
    icon:<FiCode/>,
    description:"The most common and versatile track in tech. SDEs build the applications, APIs, systems, and platforms that power everything. You can specialize in frontend, backend, or go full-stack.",
    whyChoose:[
      "Highest number of job openings globally",
      "Clear progression path from junior to principal",
      "Remote-friendly — work from anywhere",
      "Foundation for moving into AI, DevOps, or management",
      "Every company in every industry needs software developers",
    ],
    roadmap:[
      { phase:"Phase 1 (0–6 months)", title:"Foundations", tasks:["Python or JavaScript deeply","Data Structures & Algorithms basics","Build 2 CLI projects","Git & GitHub fundamentals","HTML/CSS if frontend-focused"], tools:["VS Code","GitHub","MDN Docs"] },
      { phase:"Phase 2 (6–12 months)", title:"Core Skills", tasks:["Pick a framework: React or Node.js / FastAPI","Build a full CRUD app with database","REST API design & HTTP fundamentals","SQL + one NoSQL database","Basic system design concepts"], tools:["React","FastAPI","PostgreSQL","Postman"] },
      { phase:"Phase 3 (12–18 months)", title:"Professional Level", tasks:["Docker & deployment (Railway, Vercel, AWS)","Authentication (JWT, OAuth2)","Testing (unit + integration)","Code review & open source contributions","System design deep dive"], tools:["Docker","AWS/GCP","Jest","Redis"] },
      { phase:"Phase 4 (18–24 months)", title:"Interview Ready", tasks:["150 LeetCode problems (medium focus)","5 portfolio projects with live demos","System design mock interviews","Behavioral interview prep (STAR method)","Networking on LinkedIn & GitHub"], tools:["LeetCode","System Design Primer","Pramp"] },
    ],
    companies:["Google","Amazon","Microsoft","Flipkart","Razorpay","CRED","Zepto","Swiggy","TCS","Infosys"],
    salaryByLevel:[
      { level:"Fresher (0–1yr)",  range:"₹3–8L",   cos:"TCS, Infosys, Wipro, startups" },
      { level:"Junior (1–3yr)",   range:"₹8–18L",  cos:"Product startups, mid-size" },
      { level:"Mid (3–6yr)",      range:"₹18–40L", cos:"Unicorns, growth startups" },
      { level:"Senior (6–10yr)",  range:"₹40–80L", cos:"FAANG, Series B+ startups" },
      { level:"Staff+ (10yr+)",   range:"₹60L–2Cr",cos:"FAANG, top product companies" },
    ],
    resources:[
      { name:"The Odin Project",       url:"https://theodinproject.com",             type:"Free Course"  },
      { name:"CS50 (Harvard)",         url:"https://cs50.harvard.edu",               type:"Free Course"  },
      { name:"LeetCode",               url:"https://leetcode.com",                   type:"Practice"     },
      { name:"System Design Primer",   url:"https://github.com/donnemartin/system-design-primer", type:"GitHub" },
      { name:"Roadmap.sh",             url:"https://roadmap.sh",                     type:"Guide"        },
    ],
    skills:["Python/JavaScript","React/Vue","FastAPI/Node","SQL/PostgreSQL","Docker","Git","REST APIs","System Design","Testing","CI/CD"],
  },
  {
    id:"ai-ml-path",
    title:"AI / ML Engineer",
    short:"AI / ML",
    emoji:"🤖",
    color:"violet",
    demand:"Extremely High",
    avgSalary:"₹12–80L",
    icon:<FiCpu/>,
    description:"The hottest engineering track of 2024–2030. ML Engineers build and deploy machine learning models, LLM applications, RAG systems, and AI-powered products. Strong math + Python + domain knowledge required.",
    whyChoose:[
      "Highest salary growth of any engineering track",
      "LLM revolution created massive demand overnight",
      "India hiring doubled in AI roles 2023–2024",
      "Work at the cutting edge — every problem is new",
      "Direct path to research at top labs (DeepMind, OpenAI)",
    ],
    roadmap:[
      { phase:"Phase 1 (0–3 months)", title:"Math & Python", tasks:["Linear algebra (matrices, eigenvalues)","Statistics & probability","Python: NumPy, Pandas, Matplotlib","Calculus intuition (gradients, derivatives)"], tools:["Jupyter","3Blue1Brown","StatQuest"] },
      { phase:"Phase 2 (3–9 months)", title:"ML Fundamentals", tasks:["scikit-learn: regression, classification, clustering","Train/test splits, overfitting, cross-validation","Feature engineering & selection","Your first Kaggle competition","Neural networks from scratch (no framework)"], tools:["scikit-learn","Kaggle","fast.ai"] },
      { phase:"Phase 3 (9–15 months)", title:"Deep Learning", tasks:["PyTorch fundamentals","CNNs, RNNs, Transformers","Build image classifier & NLP project","Read 5 key papers (ResNet, BERT, GPT)","HuggingFace models & fine-tuning"], tools:["PyTorch","HuggingFace","Weights & Biases"] },
      { phase:"Phase 4 (15–24 months)", title:"LLMs & Production", tasks:["LangChain, LlamaIndex, RAG systems","Vector databases (ChromaDB, Pinecone)","MLflow, model serving (FastAPI + Uvicorn)","Deploy a public AI application","Contribute to open source AI projects"], tools:["LangChain","ChromaDB","MLflow","FastAPI"] },
    ],
    companies:["Google DeepMind","Meta AI","OpenAI","Anthropic","Sarvam AI","Krutrim","TCS AI","Fractal","Mu Sigma","Walmart Labs"],
    salaryByLevel:[
      { level:"Fresher ML (0–1yr)",  range:"₹6–15L",  cos:"Analytics firms, startups" },
      { level:"ML Engineer (1–3yr)", range:"₹15–35L", cos:"Product AI companies" },
      { level:"Senior ML (3–6yr)",   range:"₹35–70L", cos:"FAANG, AI labs" },
      { level:"Staff ML (6yr+)",     range:"₹60L–2Cr",cos:"Top AI labs globally" },
    ],
    resources:[
      { name:"fast.ai Practical DL",     url:"https://fast.ai",                        type:"Free Course" },
      { name:"Andrej Karpathy YouTube",  url:"https://youtube.com/@AndrejKarpathy",    type:"YouTube"     },
      { name:"Kaggle Learn",             url:"https://kaggle.com/learn",               type:"Free Course" },
      { name:"HuggingFace Course",       url:"https://huggingface.co/learn",           type:"Free Course" },
      { name:"Papers With Code",         url:"https://paperswithcode.com",             type:"Research"    },
    ],
    skills:["Python","PyTorch/TensorFlow","scikit-learn","LangChain","SQL","Statistics","Linear Algebra","MLflow","Docker","LLM APIs"],
  },
  {
    id:"devops-path",
    title:"DevOps / Cloud Engineer",
    short:"DevOps / Cloud",
    emoji:"☁️",
    color:"sky",
    demand:"High",
    avgSalary:"₹8–50L",
    icon:<FiCloud/>,
    description:"DevOps engineers build and maintain the infrastructure that runs software at scale. Cloud expertise (AWS/GCP/Azure) + automation + monitoring = extremely valuable skill set. High salary, lower competition than SDE.",
    whyChoose:[
      "Less crowded than SDE/ML — fewer candidates, more jobs",
      "Cloud market growing 25%+ annually",
      "High certifications value (AWS cert = instant salary bump)",
      "Remote-friendly, global opportunities",
      "Clear specialization paths: SRE, Platform Eng, Security",
    ],
    roadmap:[
      { phase:"Phase 1 (0–3 months)", title:"Linux & Networking", tasks:["Linux command line mastery","Shell scripting (bash)","Networking: TCP/IP, DNS, HTTP, HTTPS","SSH, firewalls, load balancers basics","Git & version control"], tools:["Ubuntu","Bash","Wireshark"] },
      { phase:"Phase 2 (3–9 months)", title:"Containers & Cloud", tasks:["Docker: build, run, compose","Kubernetes: pods, services, deployments","AWS or GCP fundamentals (free tier)","Terraform basics (Infrastructure as Code)","Get AWS Cloud Practitioner cert"], tools:["Docker","Kubernetes","Terraform","AWS"] },
      { phase:"Phase 3 (9–15 months)", title:"CI/CD & Monitoring", tasks:["GitHub Actions / Jenkins pipelines","Prometheus + Grafana setup","ELK stack for logging","Ansible for configuration management","AWS Solutions Architect certification"], tools:["GitHub Actions","Prometheus","Grafana","Ansible"] },
      { phase:"Phase 4 (15–24 months)", title:"SRE & Scale", tasks:["SRE principles (SLO, SLA, error budget)","Chaos engineering (Chaos Monkey)","Multi-cloud architecture","Cost optimization strategies","Incident management & postmortems"], tools:["Datadog","PagerDuty","AWS CDK","Helm"] },
    ],
    companies:["AWS","Google Cloud","Microsoft Azure","Infosys","TCS","Accenture","Juspay","Razorpay","Swiggy","Zomato"],
    salaryByLevel:[
      { level:"Fresher (0–1yr)",    range:"₹4–8L",   cos:"IT services, startups" },
      { level:"DevOps Eng (1–3yr)", range:"₹8–20L",  cos:"Product companies" },
      { level:"Senior (3–6yr)",     range:"₹20–45L", cos:"Large tech, cloud providers" },
      { level:"Staff SRE (6yr+)",   range:"₹40–80L", cos:"FAANG, top unicorns" },
    ],
    resources:[
      { name:"KodeKloud",           url:"https://kodekloud.com",                   type:"Paid Course" },
      { name:"AWS Free Tier",       url:"https://aws.amazon.com/free",             type:"Platform"    },
      { name:"DevOps Exercises",    url:"https://github.com/bregman-arie/devops-exercises", type:"GitHub" },
      { name:"TechWorld with Nana", url:"https://youtube.com/@TechWorldwithNana",  type:"YouTube"     },
    ],
    skills:["Linux","Docker","Kubernetes","AWS/GCP","Terraform","Ansible","CI/CD","Python/Bash","Monitoring","Git"],
  },
  {
    id:"data-path",
    title:"Data Scientist / Analyst",
    short:"Data Science",
    emoji:"📊",
    color:"emerald",
    demand:"High",
    avgSalary:"₹6–40L",
    icon:<FiBarChart2/>,
    description:"Data Scientists extract insights from data to drive business decisions. Combines statistics, programming, and domain knowledge. Data Analysts focus on reporting and dashboards; Scientists build predictive models.",
    whyChoose:[
      "Every company generating data needs people to analyze it",
      "Natural bridge between business and technology",
      "Multiple paths: analyst, scientist, engineer, BI dev",
      "High demand in banking, e-commerce, healthcare, logistics",
      "Python + SQL + stats = very hireable combination",
    ],
    roadmap:[
      { phase:"Phase 1 (0–3 months)", title:"Stats & Python", tasks:["Statistics: mean, median, std dev, distributions","Python: Pandas, NumPy, Matplotlib, Seaborn","SQL: SELECT, GROUP BY, JOINs, window functions","Excel & Google Sheets proficiency","Data cleaning & EDA"], tools:["Jupyter","PostgreSQL","Tableau Public"] },
      { phase:"Phase 2 (3–9 months)", title:"ML & BI Tools", tasks:["scikit-learn: regression, classification","Tableau or Power BI dashboard creation","A/B testing & hypothesis testing","Feature engineering","Build 3 end-to-end analysis projects"], tools:["scikit-learn","Tableau","Power BI","Seaborn"] },
      { phase:"Phase 3 (9–18 months)", title:"Advanced Analytics", tasks:["Time series analysis","NLP for text data","Apache Spark basics for big data","MLflow for experiment tracking","Kaggle silver medal or above"], tools:["PySpark","XGBoost","LightGBM","MLflow"] },
    ],
    companies:["Walmart Labs","Amazon","Flipkart","Ola","Paytm","Fractal","Mu Sigma","Accenture Analytics","Nielsen","Razorpay"],
    salaryByLevel:[
      { level:"Data Analyst (0–2yr)",   range:"₹4–10L",  cos:"IT services, banks, e-commerce" },
      { level:"Data Scientist (2–5yr)", range:"₹10–30L", cos:"Product companies, analytics firms" },
      { level:"Senior DS (5–8yr)",      range:"₹25–50L", cos:"FAANG, analytics leaders" },
    ],
    resources:[
      { name:"Kaggle Courses",       url:"https://kaggle.com/learn",            type:"Free"    },
      { name:"StatQuest YouTube",    url:"https://youtube.com/@statquest",      type:"YouTube" },
      { name:"Mode SQL Tutorial",    url:"https://mode.com/sql-tutorial",       type:"Free"    },
      { name:"Storytelling with Data",url:"https://www.storytellingwithdata.com",type:"Book"  },
    ],
    skills:["Python","SQL","Pandas","NumPy","Matplotlib","scikit-learn","Tableau","Statistics","Excel","Spark"],
  },
  {
    id:"security-path",
    title:"Cybersecurity Engineer",
    short:"Cybersecurity",
    emoji:"🛡️",
    color:"red",
    demand:"High",
    avgSalary:"₹6–45L",
    icon:<FiShield/>,
    description:"Cybersecurity professionals protect systems, networks, and data from attacks. Paths include: offensive (ethical hacking/pen testing), defensive (SOC, incident response), and governance (compliance, risk). Global shortage of 3M+ professionals.",
    whyChoose:[
      "Global shortage of cybersecurity professionals",
      "Every company and government needs security",
      "Can start with certifications — no CS degree required",
      "Dual tracks: offensive (hacking) or defensive (protection)",
      "High job security — threats only increase over time",
    ],
    roadmap:[
      { phase:"Phase 1 (0–3 months)", title:"Fundamentals", tasks:["Networking deep dive (OSI, TCP/IP, DNS)","Linux administration","Python scripting for security","Basic cryptography concepts","CompTIA Security+ certification prep"], tools:["Kali Linux","Wireshark","TryHackMe"] },
      { phase:"Phase 2 (3–9 months)", title:"Hands-On Hacking", tasks:["Web app pentesting (OWASP Top 10)","Network scanning & exploitation","Burp Suite mastery","CTF competitions (HackTheBox, PicoCTF)","eJPT or CEH certification"], tools:["Burp Suite","Metasploit","Nmap","HackTheBox"] },
      { phase:"Phase 3 (9–18 months)", title:"Specialization", tasks:["Choose: Red team / Blue team / Cloud security","OSCP (gold standard cert) preparation","Malware analysis basics","Build a home lab","Bug bounty hunting (HackerOne, Bugcrowd)"], tools:["Splunk","ELK Stack","SIEM tools","AWS Security"] },
    ],
    companies:["CERT-In","Deloitte Cyber","KPMG","PwC Cybersecurity","Wipro Cybersecurity","IBM Security","Palo Alto","Crowdstrike","HCL Security"],
    salaryByLevel:[
      { level:"Security Analyst (0–2yr)", range:"₹4–10L",  cos:"IT services, banks" },
      { level:"Pen Tester (2–5yr)",       range:"₹10–25L", cos:"Consulting firms" },
      { level:"Security Eng (5yr+)",      range:"₹25–50L", cos:"Product companies, BFSI" },
    ],
    resources:[
      { name:"TryHackMe",      url:"https://tryhackme.com",          type:"Platform" },
      { name:"HackTheBox",     url:"https://hackthebox.com",         type:"Platform" },
      { name:"OWASP Top 10",   url:"https://owasp.org/Top10",        type:"Guide"    },
      { name:"Professor Messer",url:"https://professormesser.com",   type:"Free"     },
    ],
    skills:["Networking","Linux","Python","Burp Suite","Metasploit","SIEM","Cloud Security","Cryptography","OWASP","Forensics"],
  },
  {
    id:"mobile-path",
    title:"Mobile App Developer",
    short:"Mobile Dev",
    emoji:"📱",
    color:"orange",
    demand:"Medium-High",
    avgSalary:"₹6–35L",
    icon:<FiSmartphone/>,
    description:"Mobile developers build iOS and Android applications used by billions. You can specialize in native (Swift/Kotlin) or cross-platform (React Native/Flutter). Consumer apps, fintech, health, edtech — every sector needs mobile.",
    whyChoose:[
      "5+ billion smartphone users — massive market",
      "Flutter & React Native let you target both platforms",
      "Great freelancing opportunity (app store revenue)",
      "Fast feedback — users review and rate your work",
      "Indie dev success stories are common",
    ],
    roadmap:[
      { phase:"Phase 1 (0–4 months)", title:"Choose Your Path", tasks:["Flutter (Dart) OR React Native (JS) — pick one","UI basics: layouts, navigation, state","Connect to a REST API","Build a clone (Twitter, Instagram basic)","Publish your first app to Play Store (free)"], tools:["Flutter","VS Code","Dart/JavaScript"] },
      { phase:"Phase 2 (4–10 months)", title:"Real Features", tasks:["Firebase (auth, Firestore, push notifications)","State management (Riverpod/Redux)","Local storage & offline support","Maps & location services","In-app purchases"], tools:["Firebase","Riverpod","SQLite","Google Maps API"] },
      { phase:"Phase 3 (10–18 months)", title:"Professional Apps", tasks:["Native performance optimization","App Store & Play Store publishing","Analytics & crash reporting","CI/CD for mobile (Fastlane)","Cross-platform testing strategies"], tools:["Fastlane","Sentry","Firebase Analytics","TestFlight"] },
    ],
    companies:["Zomato","Swiggy","PhonePe","Paytm","Nykaa","Ola","Uber","Amazon","Flipkart","CRED"],
    salaryByLevel:[
      { level:"Junior Mobile (0–2yr)", range:"₹4–10L",  cos:"App startups, agencies" },
      { level:"Mobile Dev (2–5yr)",    range:"₹10–25L", cos:"Product companies" },
      { level:"Senior Mobile (5yr+)",  range:"₹20–40L", cos:"Top consumer apps" },
    ],
    resources:[
      { name:"Flutter.dev Docs",       url:"https://flutter.dev/docs",          type:"Official" },
      { name:"Vandad Nahavandipoor",   url:"https://youtube.com/@vandadnp",     type:"YouTube"  },
      { name:"React Native Docs",      url:"https://reactnative.dev",           type:"Official" },
      { name:"App Brewery (Udemy)",    url:"https://udemy.com",                  type:"Paid"     },
    ],
    skills:["Flutter/React Native","Dart/JavaScript","Firebase","REST APIs","State Management","SQLite","Git","UI/UX","Testing","CI/CD"],
  },
];

const SALARY_DATA = [
  { role:"Fresher SDE",         range:"₹3–8L",    yoe:"0–1 yr",  note:"Service companies (TCS, Infosys) on the lower end; product startups higher", trend:"stable" },
  { role:"Junior Developer",    range:"₹8–18L",   yoe:"1–3 yr",  note:"Product startups and mid-size companies with skills", trend:"up" },
  { role:"Mid-Level Engineer",  range:"₹18–40L",  yoe:"3–6 yr",  note:"Unicorns, growth startups, FAANG India offices", trend:"up" },
  { role:"Senior Engineer",     range:"₹30–70L",  yoe:"6–10 yr", note:"FAANG, top unicorns, senior IC roles", trend:"up" },
  { role:"Staff / Principal",   range:"₹60L–1.5Cr",yoe:"10+ yr", note:"FAANG, top-tier product companies", trend:"up" },
  { role:"AI / ML Engineer",    range:"₹12–80L",  yoe:"1–8 yr",  note:"One of the hottest markets; huge variance by company", trend:"hot" },
  { role:"Data Scientist",      range:"₹6–40L",   yoe:"1–6 yr",  note:"Analytics companies, banks, e-commerce", trend:"stable" },
  { role:"DevOps Engineer",     range:"₹8–50L",   yoe:"1–8 yr",  note:"Cloud certifications significantly boost salary", trend:"up" },
  { role:"Security Engineer",   range:"₹6–45L",   yoe:"1–8 yr",  note:"High demand, lower supply of skilled candidates", trend:"up" },
  { role:"Engineering Manager", range:"₹35–90L",  yoe:"7–12 yr", note:"Management track from senior IC", trend:"stable" },
  { role:"Product Manager",     range:"₹12–60L",  yoe:"3–10 yr", note:"MBA from IIM or ex-engineer background preferred", trend:"up" },
];

const COMPANY_TIERS = [
  {
    tier:"🏆 FAANG+",
    desc:"The gold standard. Highest packages, hardest interviews, best brand name.",
    companies:["Google","Meta","Amazon","Apple","Microsoft","Netflix","Stripe","Uber","Airbnb"],
    pkg:"₹40–200L+",
    diff:"Very Hard",
    interview:"6–8 rounds: DSA (Hard LeetCode), System Design, Behavioral, Leadership Principles",
    prep:"6–12 months dedicated. LeetCode 300+ problems, mock interviews, system design mastery.",
    color:"from-yellow-500 to-amber-500",
  },
  {
    tier:"🦄 Indian Unicorns",
    desc:"High growth, startup culture, competitive packages, fast career growth.",
    companies:["Razorpay","CRED","Zepto","Swiggy","Zomato","PhonePe","Groww","Meesho","Ola","Nykaa"],
    pkg:"₹15–70L",
    diff:"Hard",
    interview:"4–5 rounds: DSA (Medium), System Design, Culture Fit, Technical Deep Dive",
    prep:"3–6 months. Medium LeetCode, system design, strong projects portfolio.",
    color:"from-violet-500 to-purple-600",
  },
  {
    tier:"🏗️ Indian Product Companies",
    desc:"Solid companies, good WLB, established products, learning environment.",
    companies:["Freshworks","Zoho","InMobi","MakeMyTrip","Info Edge","PolicyBazaar","Paytm","Cleartax"],
    pkg:"₹8–35L",
    diff:"Medium-Hard",
    interview:"3–4 rounds: DSA (Easy-Medium), Domain questions, Projects discussion",
    prep:"2–4 months. Focus on your domain, basic DSA, strong projects.",
    color:"from-blue-500 to-indigo-600",
  },
  {
    tier:"🏢 IT Services (MNCs)",
    desc:"Large stable companies. Good for freshers. Lower salary but good training.",
    companies:["TCS","Infosys","Wipro","HCL","Cognizant","Tech Mahindra","Capgemini","Accenture"],
    pkg:"₹3–12L",
    diff:"Easy-Medium",
    interview:"2–3 rounds: Aptitude test, Basic coding, HR interview",
    prep:"1–2 months. Basic coding, aptitude, communication skills.",
    color:"from-slate-500 to-slate-600",
  },
  {
    tier:"🌍 Global MNCs (India offices)",
    desc:"Best of both worlds — global brand, India-based role.",
    companies:["Samsung R&D","Qualcomm","Intel","Oracle","SAP","Adobe","Cisco","VMware","Dell"],
    pkg:"₹10–45L",
    diff:"Medium-Hard",
    interview:"3–5 rounds: Domain-specific + DSA + System Design",
    prep:"3–5 months. Domain expertise + medium DSA.",
    color:"from-emerald-500 to-teal-600",
  },
];

const GROWTH_STAGES = [
  { years:"Year 0–1",  role:"Fresher / Intern",       salary:"₹3–8L",    focus:"Get hired. Learn the codebase. Deliver small features. Ask questions.", key:["First job","Basic DSA","1 project shipped","Code reviews"], color:"bg-slate-500", milestone:"First offer" },
  { years:"Year 1–3",  role:"Junior Developer",        salary:"₹8–18L",   focus:"Deepen your stack. Ship independently. Start owning small modules.", key:["1 specialization","Side projects","Open source","Mentorship from seniors"], color:"bg-blue-500", milestone:"First raise" },
  { years:"Year 3–5",  role:"Mid-Level Engineer",      salary:"₹15–35L",  focus:"Design features end-to-end. Review code. Influence decisions. Start system design.", key:["System design basics","Team collaboration","Performance optimization","Tech blog/talks"], color:"bg-indigo-500", milestone:"First job switch" },
  { years:"Year 5–8",  role:"Senior Engineer",         salary:"₹25–60L",  focus:"Architecture. Mentoring juniors. Setting technical direction for your team.", key:["Architecture decisions","Cross-team projects","Hiring interviews","Domain expertise"], color:"bg-violet-500", milestone:"Senior title" },
  { years:"Year 8–12", role:"Staff / Tech Lead",       salary:"₹40–90L",  focus:"Cross-team influence. Setting standards. Long-term technical strategy.", key:["Engineering strategy","OKRs","External talks","Management option opens"], color:"bg-purple-600", milestone:"Leadership" },
  { years:"Year 12+",  role:"Principal / Director",    salary:"₹60L–2Cr", focus:"Company-level technical vision. You decide what gets built and how.", key:["VP Engineering path","CTO path","Advisory roles","Own equity"], color:"bg-pink-600", milestone:"Executive" },
];

const INTERVIEW_SECTIONS = [
  {
    title:"Data Structures & Algorithms",
    emoji:"🧠",
    desc:"The core of every technical interview at product companies. Focus on patterns, not memorization.",
    topics:[
      { name:"Arrays & Strings",     difficulty:"Easy",   leetcodeCount:"~60 problems",  tip:"Master sliding window, two pointers, prefix sum" },
      { name:"Hash Maps & Sets",     difficulty:"Easy",   leetcodeCount:"~40 problems",  tip:"O(1) lookup is the key insight in 30% of problems" },
      { name:"Linked Lists",         difficulty:"Medium", leetcodeCount:"~30 problems",  tip:"Always draw it. Fast/slow pointers solve many" },
      { name:"Trees & Binary Trees", difficulty:"Medium", leetcodeCount:"~50 problems",  tip:"Master recursion first. 3 traversals are key" },
      { name:"Dynamic Programming",  difficulty:"Hard",   leetcodeCount:"~70 problems",  tip:"Start with 1D DP, then 2D. Patterns matter most" },
      { name:"Graphs",               difficulty:"Hard",   leetcodeCount:"~40 problems",  tip:"BFS for shortest path, DFS for connected components" },
      { name:"Heap / Priority Queue",difficulty:"Medium", leetcodeCount:"~25 problems",  tip:"When you need 'K largest/smallest' — think heap" },
      { name:"Backtracking",         difficulty:"Hard",   leetcodeCount:"~30 problems",  tip:"Permutations, combinations, subsets — same template" },
    ],
    resources:[
      { name:"NeetCode 150",        url:"https://neetcode.io",          note:"Best structured list for interviews" },
      { name:"LeetCode",            url:"https://leetcode.com",         note:"Primary practice platform" },
      { name:"CP-Algorithms",       url:"https://cp-algorithms.com",    note:"Deep algorithmic theory" },
      { name:"Abdul Bari YouTube",  url:"https://youtube.com",          note:"Best DSA explanations in Hindi/English" },
    ],
  },
  {
    title:"System Design",
    emoji:"🏗️",
    desc:"Asked at mid-senior level. Design real systems: URL shortener, Twitter, Netflix, Uber. Focus on tradeoffs, not perfect answers.",
    topics:[
      { name:"Scalability & Load Balancing", difficulty:"Medium", note:"Horizontal vs vertical scaling, L4 vs L7 LB" },
      { name:"Databases (SQL vs NoSQL)",     difficulty:"Medium", note:"When to use which. CAP theorem basics" },
      { name:"Caching (Redis, CDN)",         difficulty:"Medium", note:"Cache-aside, write-through, eviction policies" },
      { name:"Message Queues (Kafka)",       difficulty:"Hard",   note:"Async communication, event-driven architectures" },
      { name:"Microservices",                difficulty:"Hard",   note:"When to split. Service mesh, API gateway" },
      { name:"Rate Limiting",                difficulty:"Medium", note:"Token bucket, sliding window algorithms" },
      { name:"Distributed Systems",          difficulty:"Hard",   note:"Consistency, availability, partition tolerance" },
    ],
    resources:[
      { name:"System Design Primer",   url:"https://github.com/donnemartin/system-design-primer", note:"Most comprehensive free resource" },
      { name:"ByteByteGo",             url:"https://bytebytego.com",        note:"Best visual explanations" },
      { name:"Designing Data-Intensive Applications", url:"https://dataintensive.net", note:"The bible of system design" },
    ],
  },
  {
    title:"Behavioral (HR)",
    emoji:"🤝",
    desc:"Non-negotiable for senior roles and FAANG. Use the STAR method for every answer. Prepare 8–10 stories that cover multiple situations.",
    topics:[
      { name:"Tell me about yourself",        note:"2-minute structured pitch: education → skills → projects → goal" },
      { name:"Greatest achievement",          note:"Quantify impact: 'Reduced load time by 40%, serving 1M users'" },
      { name:"Conflict with teammate",        note:"Show empathy, communication, resolution — not blame" },
      { name:"Failure & what you learned",    note:"Be honest. Show self-awareness and growth mindset" },
      { name:"Why this company?",             note:"Research 3 specific things: product, culture, recent news" },
      { name:"Where do you see yourself?",    note:"Align with the role. Show ambition but be realistic" },
      { name:"Leadership example",            note:"Even if no formal title — show you influenced outcomes" },
    ],
  },
];

const RESUME_GUIDE = {
  dos:[
    "Start every bullet with a strong action verb (Built, Designed, Optimized, Led, Reduced)",
    "Quantify everything: 'Improved performance by 40%' not 'Improved performance'",
    "1 page for <3 years experience. 2 pages max for senior roles",
    "Use industry keywords from the job description (ATS matters)",
    "List projects with live URLs or GitHub links",
    "Include tech stack for every project: FastAPI + React + PostgreSQL",
    "Tailor your resume for each application (yes, it takes time — worth it)",
    "Put education at bottom after 1 year of experience",
    "LinkedIn URL, GitHub URL, and email are non-negotiable",
  ],
  donts:[
    "Never use 'Responsible for' — show impact, not duty",
    "No photos, no date of birth, no home address (privacy + bias risk)",
    "No 'References available on request' — it's assumed and wastes space",
    "Don't list soft skills like 'Team player' or 'Hard working' — show don't tell",
    "Never use Objective Statement — use a Summary instead",
    "Don't use fancy templates with tables/columns (ATS can't parse them)",
    "No spelling or grammar errors — use Grammarly",
    "Don't pad with irrelevant school projects from Year 1",
  ],
  bullets:[
    { bad:"Worked on the authentication module", good:"Built JWT-based auth system serving 50K+ daily users, reducing unauthorized access by 99%" },
    { bad:"Helped improve website speed", good:"Optimized React bundle size by 35% using code splitting and lazy loading, improving LCP score from 4.2s to 1.8s" },
    { bad:"Responsible for database management", good:"Designed PostgreSQL schema for 10M+ records with indexing strategy that reduced query time from 2s to 80ms" },
    { bad:"Made a chatbot project", good:"Built RAG-based PDF chatbot using LangChain + Gemini 2.0 + ChromaDB, answering queries with 94% accuracy on custom documents" },
  ],
};

const RESOURCES_DATA = [
  { category:"DSA & Coding",     color:"indigo", items:[
    { name:"LeetCode",                url:"https://leetcode.com",           type:"Practice", free:true,  note:"Primary interview prep platform" },
    { name:"NeetCode",                url:"https://neetcode.io",            type:"Course",   free:true,  note:"Best structured 150 problem list" },
    { name:"Codeforces",              url:"https://codeforces.com",         type:"Practice", free:true,  note:"For competitive programming" },
    { name:"GeeksForGeeks",           url:"https://geeksforgeeks.org",      type:"Reference",free:true,  note:"Concept explanations + practice" },
    { name:"CP-Algorithms",           url:"https://cp-algorithms.com",      type:"Reference",free:true,  note:"Deep algo theory" },
  ]},
  { category:"System Design",   color:"violet", items:[
    { name:"System Design Primer",    url:"https://github.com/donnemartin/system-design-primer", type:"GitHub", free:true, note:"Most complete free resource" },
    { name:"ByteByteGo",              url:"https://bytebytego.com",         type:"Course",   free:false, note:"Visual system design explanations" },
    { name:"Designing Data-Intensive Apps", url:"https://dataintensive.net",type:"Book",     free:false, note:"The definitive book on distributed systems" },
    { name:"High Scalability Blog",   url:"https://highscalability.com",    type:"Blog",     free:true,  note:"Real architecture case studies" },
  ]},
  { category:"AI / ML",         color:"sky", items:[
    { name:"fast.ai",                 url:"https://fast.ai",               type:"Course",   free:true,  note:"Best practical DL course" },
    { name:"Kaggle Learn",            url:"https://kaggle.com/learn",      type:"Course",   free:true,  note:"Structured ML courses with notebooks" },
    { name:"HuggingFace",             url:"https://huggingface.co/learn",  type:"Course",   free:true,  note:"LLMs and transformers" },
    { name:"Andrej Karpathy YouTube", url:"https://youtube.com/@AndrejKarpathy", type:"YouTube",free:true, note:"Best neural network intuition" },
    { name:"Papers With Code",        url:"https://paperswithcode.com",    type:"Research", free:true,  note:"Track SOTA benchmarks" },
  ]},
  { category:"Web Dev",         color:"emerald", items:[
    { name:"The Odin Project",        url:"https://theodinproject.com",    type:"Course",   free:true,  note:"Full-stack web dev curriculum" },
    { name:"CS50",                    url:"https://cs50.harvard.edu",      type:"Course",   free:true,  note:"Harvard's intro to CS" },
    { name:"Full Stack Open",         url:"https://fullstackopen.com",     type:"Course",   free:true,  note:"Modern web dev by U of Helsinki" },
    { name:"Roadmap.sh",              url:"https://roadmap.sh",            type:"Guide",    free:true,  note:"Visual developer roadmaps" },
    { name:"MDN Web Docs",            url:"https://developer.mozilla.org", type:"Reference",free:true,  note:"Web standards reference" },
  ]},
  { category:"Cloud & DevOps",  color:"orange", items:[
    { name:"KodeKloud",               url:"https://kodekloud.com",         type:"Course",   free:false, note:"Best Kubernetes and DevOps courses" },
    { name:"AWS Free Tier",           url:"https://aws.amazon.com/free",   type:"Platform", free:true,  note:"Practice real cloud for free" },
    { name:"Linux Journey",           url:"https://linuxjourney.com",      type:"Course",   free:true,  note:"Interactive Linux learning" },
    { name:"TechWorld with Nana",     url:"https://youtube.com/@TechWorldwithNana", type:"YouTube",free:true, note:"Best DevOps YouTube channel" },
  ]},
  { category:"Interview Prep",  color:"rose", items:[
    { name:"Pramp",                   url:"https://pramp.com",             type:"Practice", free:true,  note:"Free peer mock interviews" },
    { name:"Interviewing.io",         url:"https://interviewing.io",       type:"Practice", free:false, note:"Anonymous mock with real engineers" },
    { name:"Glassdoor",               url:"https://glassdoor.com",         type:"Research", free:true,  note:"Real interview questions by company" },
    { name:"Levels.fyi",              url:"https://levels.fyi",            type:"Research", free:true,  note:"Real salary data" },
  ]},
];

const CERTIFICATIONS = [
  { name:"AWS Solutions Architect Associate", org:"Amazon Web Services", level:"Intermediate", time:"2–3 months", value:"⭐⭐⭐⭐⭐", emoji:"☁️", cost:"~$300", why:"Most recognized cloud cert. Instant salary bump of ₹3–8L", url:"https://aws.amazon.com/certification" },
  { name:"Google Professional ML Engineer",  org:"Google Cloud",        level:"Advanced",      time:"3–4 months", value:"⭐⭐⭐⭐⭐", emoji:"🤖", cost:"~$200", why:"Rare cert, very high demand in AI companies", url:"https://cloud.google.com/certification" },
  { name:"Kubernetes CKA",                   org:"CNCF",                level:"Advanced",      time:"3 months",   value:"⭐⭐⭐⭐⭐", emoji:"🐳", cost:"~$395", why:"Required for senior DevOps/SRE roles", url:"https://training.linuxfoundation.org" },
  { name:"TensorFlow Developer Certificate", org:"Google",              level:"Intermediate",  time:"1–2 months", value:"⭐⭐⭐⭐", emoji:"🔥", cost:"$100",  why:"Good for AI/ML portfolios, accepted at many companies", url:"https://www.tensorflow.org/certificate" },
  { name:"Meta React Native Developer",      org:"Meta",                level:"Beginner",      time:"1 month",    value:"⭐⭐⭐",  emoji:"⚛️", cost:"Free",  why:"Good for mobile developers, validates React Native skills", url:"https://developers.facebook.com" },
  { name:"OSCP (Offensive Security)",        org:"Offensive Security",  level:"Expert",        time:"6 months",   value:"⭐⭐⭐⭐⭐", emoji:"🛡️", cost:"~$1500",why:"Gold standard for penetration testers. Extremely respected", url:"https://www.offsec.com/courses/pen-200" },
  { name:"AWS Cloud Practitioner",           org:"Amazon Web Services", level:"Beginner",      time:"3–4 weeks",  value:"⭐⭐⭐",  emoji:"☁️", cost:"~$100", why:"Entry-level cloud cert. Good first certification", url:"https://aws.amazon.com/certification" },
  { name:"Google Data Analytics",            org:"Google / Coursera",   level:"Beginner",      time:"6 months",   value:"⭐⭐⭐⭐", emoji:"📊", cost:"Free*", why:"Highly respected, accessible, covers full analyst workflow", url:"https://grow.google/certificates" },
  { name:"GitHub Actions Certification",     org:"GitHub",              level:"Intermediate",  time:"1 month",    value:"⭐⭐⭐⭐", emoji:"⚙️", cost:"~$99",  why:"CI/CD is required knowledge; this certifies it formally", url:"https://resources.github.com/learn/certifications" },
];

const HIGHER_STUDIES = [
  {
    degree:"M.Tech",
    emoji:"🎓",
    where:"IITs, NITs, IIITs (via GATE)",
    duration:"2 years",
    cost:"₹50K–3L total",
    afterSalary:"₹20–50L",
    pros:["Deep research exposure", "IIT brand name", "GATE fellowship (₹12K/month)", "Strong alumni network", "PhD option after"],
    cons:["GATE is competitive", "2 years out of industry", "Lower industry salary vs experience"],
    when:"Want research, academia, or R&D roles at top labs. Or need to switch specialization.",
    path:"B.Tech → GATE exam → M.Tech → Research or Senior Industry Role",
  },
  {
    degree:"MS Abroad",
    emoji:"✈️",
    where:"USA, Germany, Canada, UK, Singapore",
    duration:"1.5–2 years",
    cost:"₹30–60L total",
    afterSalary:"₹60–150L (USD salary)",
    pros:["Global network", "International work permit (OPT/STEM)", "USD salary", "Top research labs", "Immigration pathway"],
    cons:["Very expensive without scholarship", "GRE + TOEFL + SOP effort", "Competitive admissions", "Miss Indian market growth"],
    when:"Want to work globally. Aiming for FAANG US offices. Want immigration pathway.",
    path:"B.Tech → GRE + TOEFL → Application (SOP+LOR+Transcripts) → MS → OPT → H1B or GC",
  },
  {
    degree:"MBA",
    emoji:"💼",
    where:"IIMs, ISB, IIT MBA, XLRI, SP Jain",
    duration:"2 years",
    cost:"₹20–40L",
    afterSalary:"₹18–60L (varies wildly by college)",
    pros:["Management track opening", "Product Manager path", "VC/startup ecosystem", "Salary jump at top IIMs", "Network is the degree"],
    cons:["CAT is brutally competitive", "Not necessary for tech IC path", "High cost at top schools", "ROI only at top 5 colleges"],
    when:"Want to move into Product Management, Consulting, or General Management. Tech + MBA = PM path.",
    path:"Work experience (2–5yr) → CAT/GMAT → IIM/ISB → Product Manager or Consulting",
  },
  {
    degree:"PhD",
    emoji:"🔬",
    where:"IISc, IITs, US/European universities",
    duration:"4–6 years",
    cost:"Funded (stipend paid to you)",
    afterSalary:"₹25–80L (Research positions are underpaid unless FAANG Research)",
    pros:["Cutting edge research", "Professor career", "AI research labs (DeepMind, OpenAI)", "Publish papers that impact the world", "Fully funded in most countries"],
    cons:["Very long timeline", "Low stipend years", "Academic job market is tough", "Industry may not value it unless AI/ML"],
    when:"Genuinely passionate about advancing science. Want to become Professor or AI Researcher at top lab.",
    path:"B.Tech/M.Tech → Research publications → PhD → PostDoc → Professor or Research Scientist",
  },
];

const FREELANCING_GUIDE = {
  platforms:[
    { name:"Upwork",    desc:"Best for long-term contracts. Build reputation slowly.", best:"Web dev, AI consulting, backend APIs", earning:"₹3–30K/hr" },
    { name:"Toptal",    desc:"Top 3% developers. Very hard to get in, very high rates.", best:"Senior engineers, architects", earning:"₹15–80K/hr" },
    { name:"Fiverr",    desc:"Project-based gigs. Good for beginners. Volume game.", best:"Web design, small scripts, chatbots", earning:"₹1–10K/project" },
    { name:"Freelancer",desc:"Competitive bidding. Harder to stand out.", best:"General dev work", earning:"₹500–5K/hr" },
    { name:"LinkedIn",  desc:"Direct client outreach. Best ROI for senior devs.", best:"Consulting, architecture, audits", earning:"₹10–50K/hr" },
    { name:"Twitter/X", desc:"Build audience → inbound clients. Long term play.", best:"AI, SaaS, writing", earning:"Varies widely" },
  ],
  tips:[
    "Specialize in one niche (React dev, LangChain consultant, AWS architect) — generalists earn less",
    "Your portfolio matters more than your resume for freelancing",
    "Start on Fiverr to build reviews, then move to Upwork, then direct clients",
    "Rate in USD even for Indian clients — dollar rates normalize to fair value",
    "Communication speed is more important than technical skill in freelancing",
    "Productize your service (fixed price, fixed scope) — avoid hourly for beginners",
    "Always get 50% upfront payment before starting any project",
  ],
};

const SUCCESS_STORIES = [
  {
    name:"Priya Sharma",
    from:"Tier-3 College, Jaipur",
    to:"SDE-2 at Google Bangalore",
    time:"2.5 years of prep",
    salary:"₹60L+ package",
    quote:"I failed my campus placement at a service company. That failure made me focus. 600 LeetCode problems, 50 mock interviews, 3 rejection cycles later — Google called.",
    advice:"Consistency beats intensity. 3 hours every single day beats 10-hour weekends.",
    emoji:"🌟",
    tech:["LeetCode","System Design Primer","Pramp","NeetCode"],
  },
  {
    name:"Rahul Mehta",
    from:"4 years at TCS",
    to:"Backend Engineer at Razorpay",
    time:"8 months prep",
    salary:"3x salary jump",
    quote:"People told me service company background would hold me back. They were wrong. I built a fintech side project, learned DSA seriously for 8 months, and cracked 3 unicorns.",
    advice:"Your current company doesn't define your ceiling. Your preparation does.",
    emoji:"🚀",
    tech:["FastAPI","PostgreSQL","Redis","Docker","LeetCode"],
  },
  {
    name:"Ananya Krishnan",
    from:"Non-CS (Electronics Eng)",
    to:"ML Engineer at Meta AI",
    time:"3 years journey",
    salary:"₹80L+ (USD salary)",
    quote:"Computer Science degree is not the prerequisite — curiosity is. I self-taught ML, got an MS at Georgia Tech via OPT, built 4 Kaggle top-10 solutions, landed Meta.",
    advice:"Open source contributions and Kaggle > any certificate.",
    emoji:"🤖",
    tech:["PyTorch","LangChain","Kaggle","HuggingFace","Research Papers"],
  },
  {
    name:"Vikram Patel",
    from:"B.Com graduate, no CS background",
    to:"Full Stack Developer",
    time:"18 months self-learning",
    salary:"₹12L package",
    quote:"Everyone said you need a CS degree. I spent 18 months on The Odin Project, built 6 projects, freelanced on Fiverr, then got my first dev job. The barrier is lower than you think.",
    advice:"Build publicly. Document your learning journey on LinkedIn. Employers notice.",
    emoji:"💪",
    tech:["JavaScript","React","Node.js","MongoDB","The Odin Project"],
  },
  {
    name:"Kavya Reddy",
    from:"CSE Fresher, NIT Warangal",
    to:"Data Scientist at Walmart Labs",
    time:"1 year post-graduation",
    salary:"₹18L package",
    quote:"I focused only on Data Science from 2nd year. 5 Kaggle competitions, 2 internships, published a paper. When campus placement came, I had proof of what I could do.",
    advice:"Depth beats breadth. Be the best in one thing, not average in everything.",
    emoji:"📊",
    tech:["Python","Pandas","scikit-learn","Tableau","Kaggle"],
  },
];

const TRENDS_2025 = [
  { trend:"Generative AI / LLM Engineering",  growth:"🔥 Explosive",  desc:"Every company building AI features. LangChain, RAG, fine-tuning, prompt engineering — these skills are in extreme demand. 10x salary premium for experienced ML + LLM engineers.", action:"Learn: LangChain → RAG → Fine-tuning → LLM APIs" },
  { trend:"Cloud-Native & Platform Engineering", growth:"📈 Strong",   desc:"Kubernetes operators, service meshes, internal developer platforms. Companies want engineers who can build and maintain self-service infrastructure.", action:"Learn: K8s advanced → Platform Engineering → ArgoCD" },
  { trend:"AI Agents & Automation",             growth:"🔥 Explosive",  desc:"Agentic AI (AutoGPT-style) is moving from research to production. Engineers who can build autonomous agent pipelines are extremely rare and paid accordingly.", action:"Learn: LangGraph → CrewAI → Multi-agent systems" },
  { trend:"Edge Computing & IoT",               growth:"📈 Growing",   desc:"With 5G and edge ML models, computing is moving to the device. TensorFlow Lite, ONNX, edge deployment are becoming standard skills.", action:"Learn: TFLite → Edge deployment → IoT protocols" },
  { trend:"Cybersecurity (AI-powered)",         growth:"📈 Strong",   desc:"AI-powered attacks require AI-powered defenses. Security engineers who understand ML are extremely rare. Bug bounty programs paying millions.", action:"Learn: Security fundamentals + ML for anomaly detection" },
  { trend:"Web3 / Blockchain (Selective)",       growth:"⚠️ Volatile", desc:"Highly volatile market. However, DeFi, NFT infrastructure, smart contract auditing still have demand. Risky bet but high reward if cycle returns.", action:"Only if passionate. Learn Solidity + Audit skills" },
  { trend:"Quantum Computing (Long-term)",       growth:"🔭 Future",   desc:"5–10 year horizon. IBM, Google investing heavily. Python + linear algebra foundation transfers directly. Not immediately job-relevant but worth watching.", action:"Learn: Qiskit basics + Linear algebra + Keep watching" },
];

const FAQS = [
  { q:"Is B.Tech CSE better than B.Tech IT?", a:"CSE is slightly more respected in core tech companies, but practically they're almost equivalent in the industry. Your skills, projects, and DSA performance matter infinitely more than branch name. Many Googlers are IT graduates." },
  { q:"Can I get into FAANG from a Tier-3 college?", a:"Absolutely yes. 30%+ of FAANG India hires come from non-IIT/NIT colleges. The technical interview is completely blind to your college — it's 100% skill-based. Strong DSA + System Design + projects = equal chance as any IITian." },
  { q:"Should I do M.Tech or job after B.Tech?", a:"Job if you want industry experience and salary early — you can always do MS later with company sponsorship. M.Tech if you want research, academia, or specific deep specialization. MBA only if you want to move into product management or consulting." },
  { q:"How important is competitive programming (CP) for jobs?", a:"Only matters for Google, Meta, Codeforces-style roles. LeetCode medium problems cover 90%+ of interview questions at all other companies including Amazon, Flipkart, Razorpay. Don't spend 2 years on CP if your goal is a product company job." },
  { q:"When should I start interview preparation?", a:"Start DSA basics from 2nd year. Serious prep should begin 6 months before campus placements. For off-campus job hunting, dedicate 3–6 months of focused prep. Quality > Quantity — understanding patterns beats memorizing solutions." },
  { q:"Is AI/ML a good career in 2025–2030?", a:"Yes — one of the highest demand tracks for the foreseeable future. The LLM revolution created a 10x demand spike in 2023-24. Strong math + Python + ML fundamentals + LLM knowledge = very employable. However, pure AI without engineering skills is harder to hire for." },
  { q:"How do I switch from service companies (TCS/Infosys) to product companies?", a:"It takes time but is 100% achievable. Timeline: 6-8 months dedicated prep. Focus: LeetCode 150 mediums + 1 strong project + system design basics. Strategy: Start with mid-tier startups to build product experience, then aim for unicorns. Many TCS → Razorpay → Google stories exist." },
  { q:"Should I freelance or join a company first?", a:"Join a company for 2+ years first. You'll learn industry standards, team collaboration, code review culture, and build a network — none of which freelancing alone teaches. After 2 years of company experience, freelancing income and quality both dramatically increase." },
  { q:"What programming language should I learn first?", a:"Python for AI/ML/Data Science. JavaScript for web development. Both are excellent general first languages. Java/C++ if you're targeting competitive programming or traditional tech companies. Language is less important than CS fundamentals." },
  { q:"How do I build a portfolio with no experience?", a:"Build 3–5 real projects that solve actual problems. Deploy them publicly (Vercel, Railway, Play Store). Write a blog post about each project explaining why you built it and what you learned. Contribute to 1 open source project. This portfolio beats 90% of other freshers." },
];

const NETWORKING_GUIDE = {
  platforms:[
    { name:"LinkedIn",   strategy:"Post 1 technical insight per week. Comment thoughtfully on industry leaders. Connect with 3 people in your target company every week.", power:"🔥 High" },
    { name:"GitHub",     strategy:"Commit code daily. Star and fork relevant repos. Open issues or PRs on popular projects. Your GitHub IS your portfolio.", power:"🔥 High" },
    { name:"Twitter/X",  strategy:"Follow AI/ML thought leaders. Share your learning journey. Engage with #buildinpublic community.", power:"📈 Medium" },
    { name:"Discord",    strategy:"Join developer communities (Reactiflux, Python Discord, ML Collective). Help others — it builds reputation.", power:"📈 Medium" },
    { name:"Meetups",    strategy:"Attend local tech meetups (Bangalore, Hyderabad, Pune). Company offsites often happen here. 1 real connection > 100 LinkedIn requests.", power:"💎 Very High" },
  ],
  tips:[
    "The best time to network is when you DON'T need a job — build relationships before you need them",
    "'I'd love to learn about your career journey' gets more responses than 'Can you refer me?'",
    "Alumni from your college at target companies will almost always respond — use this",
    "One warm referral is worth 50 cold applications — always ask if someone can refer you",
    "Give before you take: help others first (answer questions, share resources, review resumes)",
    "Your GitHub activity shows up in Google searches — it's passive networking",
    "Write technical blog posts: they rank on Google and bring inbound opportunities to you",
  ],
};

// ─────────────────────────────────────────────────────────────────
// UTILITY COMPONENTS
// ─────────────────────────────────────────────────────────────────

function SectionHeader({ id, emoji, title, subtitle, tag }) {
  return (
    <div className="scroll-mt-20 mb-6" id={id}>
      <div className="flex items-start gap-4">
        <div className="w-12 h-12 bg-indigo-600/10 border border-indigo-500/20 rounded-2xl flex items-center justify-center text-2xl flex-shrink-0">
          {emoji}
        </div>
        <div className="flex-1 min-w-0">
          {tag && <span className="text-[10px] font-bold text-indigo-400 uppercase tracking-widest block mb-1">{tag}</span>}
          <h2 className="text-xl font-extrabold text-white tracking-tight">{title}</h2>
          {subtitle && <p className="text-sm text-white/45 mt-1 leading-5">{subtitle}</p>}
        </div>
      </div>
      <div className="h-px bg-white/[0.06] mt-5"/>
    </div>
  );
}

function Card({ children, className = "" }) {
  return (
    <div className={`rounded-2xl border border-white/[0.07] bg-[#0d1117] ${className}`}>
      {children}
    </div>
  );
}

function Badge({ children, color = "indigo" }) {
  const colors = {
    indigo: "bg-indigo-500/15 text-indigo-300 border-indigo-500/25",
    emerald:"bg-emerald-500/15 text-emerald-300 border-emerald-500/25",
    red:    "bg-red-500/15 text-red-300 border-red-500/25",
    amber:  "bg-amber-500/15 text-amber-300 border-amber-500/25",
    violet: "bg-violet-500/15 text-violet-300 border-violet-500/25",
    sky:    "bg-sky-500/15 text-sky-300 border-sky-500/25",
    rose:   "bg-rose-500/15 text-rose-300 border-rose-500/25",
    slate:  "bg-slate-500/15 text-slate-300 border-slate-500/25",
  };
  return (
    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${colors[color]||colors.indigo}`}>
      {children}
    </span>
  );
}

function DifficultyBadge({ diff }) {
  if (diff === "Easy")   return <Badge color="emerald">Easy</Badge>;
  if (diff === "Medium") return <Badge color="amber">Medium</Badge>;
  if (diff === "Hard")   return <Badge color="red">Hard</Badge>;
  return <Badge color="slate">{diff}</Badge>;
}

// ─────────────────────────────────────────────────────────────────
// SECTION: OVERVIEW
// ─────────────────────────────────────────────────────────────────
function OverviewSection() {
  const stats = [
    { label:"Career tracks covered",   value:"6+",   icon:"🎯" },
    { label:"Salary data points",       value:"11",   icon:"💰" },
    { label:"Top companies profiled",   value:"50+",  icon:"🏢" },
    { label:"Interview topics",         value:"30+",  icon:"🧠" },
    { label:"Free resources listed",    value:"40+",  icon:"📚" },
    { label:"Certifications covered",   value:"9",    icon:"📜" },
  ];

  const paths = [
    { emoji:"💻", title:"SDE / Full Stack",  salary:"₹8–60L",  demand:"Very High", color:"indigo" },
    { emoji:"🤖", title:"AI / ML Engineer",  salary:"₹12–80L", demand:"Explosive", color:"violet" },
    { emoji:"☁️", title:"DevOps / Cloud",    salary:"₹8–50L",  demand:"High",      color:"sky"    },
    { emoji:"📊", title:"Data Science",      salary:"₹6–40L",  demand:"High",      color:"emerald"},
    { emoji:"🛡️", title:"Cybersecurity",     salary:"₹6–45L",  demand:"High",      color:"red"    },
    { emoji:"📱", title:"Mobile Dev",        salary:"₹6–35L",  demand:"Medium+",   color:"orange" },
  ];

  return (
    <div className="space-y-6">
      <SectionHeader id="overview" emoji="🗺️" title="Career Overview" tag="Start Here"
        subtitle="A complete, honest guide to CSE careers — from fresher to staff engineer. No generic advice, only what actually works." />

      {/* Hero message */}
      <Card className="p-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-48 h-48 bg-indigo-500/5 rounded-full -translate-y-10 translate-x-10 blur-2xl"/>
        <div className="relative">
          <p className="text-sm text-white/30 font-bold uppercase tracking-widest mb-3">The Reality</p>
          <h3 className="text-xl font-extrabold text-white mb-4 leading-tight">
            You don't need an IIT degree. You need the right skills in the right order.
          </h3>
          <div className="grid sm:grid-cols-3 gap-4 text-sm text-white/55 leading-6">
            <p>💡 35% of FAANG India hires are from non-IIT colleges. The interview is blind to your college name — only your skills matter.</p>
            <p>📈 India's tech hiring is still growing 20%+ annually. AI revolution created hundreds of thousands of new high-paying roles overnight.</p>
            <p>⚡ A focused 12–18 month prep can take you from zero experience to ₹15–30L offer. This guide shows you exactly how.</p>
          </div>
        </div>
      </Card>

      {/* Stats grid */}
      <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
        {stats.map((s, i) => (
          <Card key={i} className="p-3 text-center">
            <div className="text-xl mb-1.5">{s.icon}</div>
            <p className="text-lg font-extrabold text-indigo-400 tabular-nums">{s.value}</p>
            <p className="text-[10px] text-white/30 mt-0.5 leading-3">{s.label}</p>
          </Card>
        ))}
      </div>

      {/* Career paths quick view */}
      <div>
        <p className="text-xs font-bold text-white/30 uppercase tracking-widest mb-3">6 Main Career Tracks</p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {paths.map((p, i) => (
            <Card key={i} className="p-4 flex items-center gap-3 hover:border-white/15 transition-colors">
              <div className="text-2xl">{p.emoji}</div>
              <div className="flex-1 min-w-0">
                <p className="font-bold text-white text-sm">{p.title}</p>
                <p className="text-xs text-white/35 mt-0.5">{p.salary}</p>
              </div>
              <Badge color={
                p.demand==="Explosive"?"violet":p.demand==="Very High"?"indigo":
                p.demand==="High"?"emerald":"sky"
              }>{p.demand}</Badge>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────
// SECTION: CAREER TRACKS (one track at a time)
// ─────────────────────────────────────────────────────────────────
function CareerTrackSection({ track }) {
  const [openPhase, setOpenPhase] = useState(0);
  const [tab, setTab] = useState("roadmap");

  return (
    <div className="space-y-5" id={track.id}>
      <SectionHeader emoji={track.emoji} title={track.title} id={track.id}
        subtitle={track.description} tag={`Career Track · Avg ${track.avgSalary}`} />

      {/* Why choose pills */}
      <Card className="p-5">
        <p className="text-[10px] font-bold text-white/30 uppercase tracking-widest mb-3">Why Choose This Track</p>
        <div className="grid sm:grid-cols-2 gap-2">
          {track.whyChoose.map((w, i) => (
            <div key={i} className="flex items-start gap-2.5">
              <FiCheckCircle className="text-emerald-400 text-xs flex-shrink-0 mt-0.5"/>
              <p className="text-sm text-white/65 leading-5">{w}</p>
            </div>
          ))}
        </div>
      </Card>

      {/* Tab bar */}
      <div className="flex items-center gap-1 p-1 bg-white/[0.04] rounded-xl border border-white/[0.06]">
        {["roadmap","salary","companies","skills","resources"].map(t => (
          <button key={t} onClick={() => setTab(t)}
            className={`flex-1 py-2 rounded-lg text-xs font-bold capitalize transition-all ${
              tab===t ? "bg-indigo-600 text-white" : "text-white/30 hover:text-white/60"
            }`}>{t}</button>
        ))}
      </div>

      {/* Roadmap tab */}
      {tab === "roadmap" && (
        <div className="space-y-3">
          {track.roadmap.map((phase, pi) => (
            <Card key={pi} className="overflow-hidden">
              <button onClick={() => setOpenPhase(openPhase===pi ? -1 : pi)}
                className={`w-full flex items-center justify-between px-5 py-4 text-left transition-colors ${
                  openPhase===pi ? "bg-indigo-600/10" : "hover:bg-white/[0.02]"
                }`}>
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 ${
                    openPhase===pi ? "bg-indigo-600 text-white" : "bg-white/5 text-white/30"
                  }`}>{pi+1}</div>
                  <div>
                    <p className={`text-[10px] font-bold uppercase tracking-wider ${openPhase===pi?"text-indigo-400":"text-white/25"}`}>{phase.phase}</p>
                    <p className={`font-bold text-sm ${openPhase===pi?"text-white":"text-white/70"}`}>{phase.title}</p>
                  </div>
                </div>
                <FiChevronDown className={`text-white/25 transition-transform ${openPhase===pi?"rotate-180":""}`}/>
              </button>
              {openPhase===pi && (
                <div className="px-5 pb-5 border-t border-white/[0.05]">
                  <div className="grid sm:grid-cols-2 gap-4 mt-4">
                    <div>
                      <p className="text-[10px] font-bold text-white/25 uppercase tracking-wider mb-2.5">Tasks</p>
                      <div className="space-y-2">
                        {phase.tasks.map((t, ti) => (
                          <div key={ti} className="flex items-start gap-2">
                            <div className="w-1.5 h-1.5 rounded-full bg-indigo-500 flex-shrink-0 mt-1.5"/>
                            <p className="text-sm text-white/65 leading-5">{t}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div>
                      <p className="text-[10px] font-bold text-white/25 uppercase tracking-wider mb-2.5">Tools / Tech</p>
                      <div className="flex flex-wrap gap-2">
                        {phase.tools.map((tool, ti) => (
                          <span key={ti} className="text-xs bg-white/5 border border-white/10 text-white/50 px-2.5 py-1 rounded-lg font-mono">{tool}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </Card>
          ))}
        </div>
      )}

      {/* Salary tab */}
      {tab === "salary" && (
        <Card className="overflow-hidden">
          <div className="divide-y divide-white/[0.05]">
            {track.salaryByLevel.map((s, i) => (
              <div key={i} className="flex items-center justify-between px-5 py-4">
                <div>
                  <p className="text-sm font-semibold text-white/80">{s.level}</p>
                  <p className="text-xs text-white/30 mt-0.5">{s.cos}</p>
                </div>
                <p className="text-sm font-extrabold text-emerald-400 tabular-nums">{s.range}</p>
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* Companies tab */}
      {tab === "companies" && (
        <div className="flex flex-wrap gap-2">
          {track.companies.map((c, i) => (
            <span key={i} className="text-xs font-semibold bg-white/5 border border-white/10 text-white/55 px-3 py-1.5 rounded-xl">{c}</span>
          ))}
        </div>
      )}

      {/* Skills tab */}
      {tab === "skills" && (
        <div className="flex flex-wrap gap-2">
          {track.skills.map((s, i) => (
            <span key={i} className="text-xs font-bold bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 px-3 py-1.5 rounded-xl">{s}</span>
          ))}
        </div>
      )}

      {/* Resources tab */}
      {tab === "resources" && (
        <div className="space-y-2">
          {track.resources.map((r, i) => (
            <a key={i} href={r.url} target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-3 p-4 rounded-xl bg-white/[0.02] border border-white/[0.06] hover:border-indigo-500/30 hover:bg-indigo-500/5 transition-all group">
              <div className="w-8 h-8 bg-white/5 rounded-xl flex items-center justify-center flex-shrink-0">
                <FiExternalLink className="text-white/30 text-xs group-hover:text-indigo-400 transition-colors"/>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-bold text-white/80 group-hover:text-white transition-colors">{r.name}</p>
              </div>
              <Badge color="indigo">{r.type}</Badge>
            </a>
          ))}
        </div>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────
// SECTION: SALARY EXPLORER
// ─────────────────────────────────────────────────────────────────
function SalarySection() {
  const trendIcon = (t) => t==="hot"?"🔥":t==="up"?"📈":"➡️";
  return (
    <div className="space-y-5">
      <SectionHeader id="salary" emoji="💰" title="Salary Explorer" tag="Compensation"
        subtitle="Real salary ranges from Glassdoor, Levels.fyi, and LinkedIn India data (2024–2025). All figures in INR per annum." />
      <Card className="overflow-hidden">
        <div className="px-5 py-3 bg-white/[0.02] border-b border-white/[0.06] flex items-center gap-3">
          <p className="text-[10px] font-bold text-white/30 uppercase tracking-wider flex-1">Role</p>
          <p className="text-[10px] font-bold text-white/30 uppercase tracking-wider w-28 text-center">Salary Range</p>
          <p className="text-[10px] font-bold text-white/30 uppercase tracking-wider w-20 text-center">Experience</p>
          <p className="text-[10px] font-bold text-white/30 uppercase tracking-wider w-8 text-center">Trend</p>
        </div>
        <div className="divide-y divide-white/[0.04]">
          {SALARY_DATA.map((s, i) => (
            <div key={i} className="flex items-center gap-3 px-5 py-4 hover:bg-white/[0.02] transition-colors">
              <div className="flex-1 min-w-0">
                <p className="text-sm font-bold text-white/80">{s.role}</p>
                <p className="text-xs text-white/25 mt-0.5 truncate">{s.note}</p>
              </div>
              <p className="text-sm font-extrabold text-emerald-400 tabular-nums w-28 text-center">{s.range}</p>
              <p className="text-xs text-white/35 w-20 text-center">{s.yoe}</p>
              <span className="text-base w-8 text-center">{trendIcon(s.trend)}</span>
            </div>
          ))}
        </div>
      </Card>
      <Card className="p-5">
        <p className="text-[10px] font-bold text-white/25 uppercase tracking-widest mb-3">⚡ What Actually Moves Your Salary</p>
        <div className="grid sm:grid-cols-2 gap-3">
          {[
            ["Company Tier",      "FAANG pays 3–5x what service companies pay for same experience"],
            ["Location",          "Bangalore/Hyderabad > Mumbai > Delhi > Pune for tech salaries"],
            ["Certifications",    "AWS cert alone can bump salary by ₹3–8L at same YOE"],
            ["Job Switching",     "Average switch gives 30–50% hike. Staying = 8–12% annual increment"],
            ["Specialization",    "AI/ML specialist earns 40% more than equivalent generalist SDE"],
            ["Domain Knowledge",  "Fintech, healthtech, AI companies pay 20-30% premium over average"],
          ].map(([k,v],i) => (
            <div key={i} className="p-3 rounded-xl bg-white/[0.025] border border-white/[0.05]">
              <p className="text-xs font-bold text-indigo-300 mb-1">{k}</p>
              <p className="text-xs text-white/50 leading-4">{v}</p>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────
// SECTION: COMPANY TIERS
// ─────────────────────────────────────────────────────────────────
function CompaniesSection() {
  const [open, setOpen] = useState(null);
  return (
    <div className="space-y-5">
      <SectionHeader id="companies" emoji="🏢" title="Company Tiers Guide" tag="Compensation"
        subtitle="Every company is different. Here's how to think about targeting companies at each tier — interview prep, packages, and strategy." />
      <div className="space-y-3">
        {COMPANY_TIERS.map((tier, i) => (
          <Card key={i} className="overflow-hidden">
            <button onClick={() => setOpen(open===i?null:i)}
              className="w-full flex items-center gap-4 px-5 py-4 text-left hover:bg-white/[0.02] transition-colors">
              <div className={`w-1 h-10 rounded-full bg-gradient-to-b ${tier.color} flex-shrink-0`}/>
              <div className="flex-1 min-w-0">
                <p className="font-extrabold text-white text-sm">{tier.tier}</p>
                <p className="text-xs text-white/35 mt-0.5 truncate">{tier.desc}</p>
              </div>
              <div className="flex items-center gap-3 flex-shrink-0">
                <div className="text-right hidden sm:block">
                  <p className="text-sm font-extrabold text-emerald-400">{tier.pkg}</p>
                  <p className="text-[10px] text-white/25">{tier.diff}</p>
                </div>
                <FiChevronDown className={`text-white/25 transition-transform ${open===i?"rotate-180":""}`}/>
              </div>
            </button>
            {open===i && (
              <div className="px-5 pb-5 border-t border-white/[0.06] pt-4 space-y-4">
                <div className="flex flex-wrap gap-2">
                  {tier.companies.map((c,ci) => (
                    <span key={ci} className="text-xs bg-white/5 border border-white/10 text-white/55 px-2.5 py-1 rounded-lg">{c}</span>
                  ))}
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="p-3 rounded-xl bg-white/[0.025] border border-white/[0.05]">
                    <p className="text-[10px] font-bold text-indigo-400 uppercase tracking-wider mb-2">Interview Format</p>
                    <p className="text-xs text-white/55 leading-5">{tier.interview}</p>
                  </div>
                  <div className="p-3 rounded-xl bg-white/[0.025] border border-white/[0.05]">
                    <p className="text-[10px] font-bold text-amber-400 uppercase tracking-wider mb-2">Preparation Strategy</p>
                    <p className="text-xs text-white/55 leading-5">{tier.prep}</p>
                  </div>
                </div>
              </div>
            )}
          </Card>
        ))}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────
// SECTION: INTERVIEW PREP
// ─────────────────────────────────────────────────────────────────
function InterviewPrepSection() {
  const [activeSection, setActiveSection] = useState(0);
  return (
    <div className="space-y-5">
      <SectionHeader id="interview-prep" emoji="🎯" title="Interview Preparation" tag="Getting Hired"
        subtitle="The complete guide to cracking technical interviews — DSA, System Design, and Behavioral. What to study, how to study, when to start." />

      {/* Section tabs */}
      <div className="flex gap-2">
        {INTERVIEW_SECTIONS.map((s,i) => (
          <button key={i} onClick={() => setActiveSection(i)}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold border transition-all ${
              activeSection===i
                ? "bg-indigo-600 border-indigo-500 text-white"
                : "bg-white/[0.03] border-white/[0.07] text-white/40 hover:text-white/70"
            }`}>
            <span>{s.emoji}</span>
            <span className="hidden sm:inline">{s.title}</span>
          </button>
        ))}
      </div>

      {INTERVIEW_SECTIONS[activeSection] && (
        <div className="space-y-4">
          <Card className="p-5">
            <h3 className="font-extrabold text-white mb-2">{INTERVIEW_SECTIONS[activeSection].title}</h3>
            <p className="text-sm text-white/50 leading-6">{INTERVIEW_SECTIONS[activeSection].desc}</p>
          </Card>

          {/* DSA topics */}
          {INTERVIEW_SECTIONS[activeSection].topics && (
            <div className="space-y-2">
              {INTERVIEW_SECTIONS[activeSection].topics.map((t, ti) => (
                <Card key={ti} className="flex items-center gap-4 px-5 py-3.5 hover:border-white/15 transition-colors">
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-bold text-white/80">{t.name}</p>
                    <p className="text-xs text-white/30 mt-0.5 leading-4">{t.tip || t.note}</p>
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    {t.leetcodeCount && <span className="text-[10px] text-indigo-300 font-mono hidden sm:block">{t.leetcodeCount}</span>}
                    <DifficultyBadge diff={t.difficulty}/>
                  </div>
                </Card>
              ))}
            </div>
          )}

          {/* Resources */}
          {INTERVIEW_SECTIONS[activeSection].resources && (
            <div>
              <p className="text-[10px] font-bold text-white/25 uppercase tracking-widest mb-3">Recommended Resources</p>
              <div className="grid sm:grid-cols-2 gap-2">
                {INTERVIEW_SECTIONS[activeSection].resources.map((r, ri) => (
                  <a key={ri} href={r.url} target="_blank" rel="noopener noreferrer"
                    className="flex items-center gap-3 p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.06] hover:border-indigo-500/30 transition-all group">
                    <FiExternalLink className="text-white/20 text-xs group-hover:text-indigo-400 transition-colors flex-shrink-0"/>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-bold text-white/70 group-hover:text-white transition-colors">{r.name}</p>
                      <p className="text-[10px] text-white/25 mt-0.5">{r.note}</p>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Prep timeline */}
      <Card className="p-5">
        <p className="text-[10px] font-bold text-white/25 uppercase tracking-widest mb-4">Preparation Timeline</p>
        <div className="grid sm:grid-cols-3 gap-4">
          {[
            { label:"3 Months Out",   title:"Build Foundation",      steps:["50 Easy LeetCode problems","Learn all data structures","1 personal project complete","Read STAR method basics"] },
            { label:"2 Months Out",   title:"Go Deep",               steps:["75 Medium LeetCode problems","System design basics","Mock interviews x5 (Pramp)","Update resume & LinkedIn"] },
            { label:"1 Month Out",    title:"Final Prep",            steps:["25 Hard LeetCode problems","5 system design problems","Company-specific research","Behavioral stories ready"] },
          ].map((t,i) => (
            <div key={i} className="p-4 rounded-xl bg-white/[0.025] border border-white/[0.05]">
              <p className="text-[10px] font-bold text-indigo-400 uppercase tracking-wider">{t.label}</p>
              <p className="font-bold text-white text-sm mt-1 mb-3">{t.title}</p>
              {t.steps.map((s,si) => (
                <div key={si} className="flex items-start gap-2 mb-1.5">
                  <div className="w-1 h-1 rounded-full bg-white/20 flex-shrink-0 mt-2"/>
                  <p className="text-xs text-white/45 leading-4">{s}</p>
                </div>
              ))}
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────
// SECTION: RESUME GUIDE
// ─────────────────────────────────────────────────────────────────
function ResumeGuideSection() {
  return (
    <div className="space-y-5">
      <SectionHeader id="resume-guide" emoji="📄" title="Resume & Portfolio Guide" tag="Getting Hired"
        subtitle="What separates a resume that gets interviews from one that gets rejected by ATS in 3 seconds." />
      <div className="grid sm:grid-cols-2 gap-4">
        <Card className="p-5">
          <div className="flex items-center gap-2 mb-4">
            <FiCheckCircle className="text-emerald-400 text-sm"/>
            <p className="font-bold text-emerald-300 text-sm">DO These Things</p>
          </div>
          <div className="space-y-2">
            {RESUME_GUIDE.dos.map((d,i) => (
              <div key={i} className="flex items-start gap-2.5">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 flex-shrink-0 mt-1.5"/>
                <p className="text-xs text-white/55 leading-5">{d}</p>
              </div>
            ))}
          </div>
        </Card>
        <Card className="p-5">
          <div className="flex items-center gap-2 mb-4">
            <FiX className="text-red-400 text-sm"/>
            <p className="font-bold text-red-300 text-sm">NEVER Do These</p>
          </div>
          <div className="space-y-2">
            {RESUME_GUIDE.donts.map((d,i) => (
              <div key={i} className="flex items-start gap-2.5">
                <div className="w-1.5 h-1.5 rounded-full bg-red-500 flex-shrink-0 mt-1.5"/>
                <p className="text-xs text-white/55 leading-5">{d}</p>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Before/After bullets */}
      <div>
        <p className="text-[10px] font-bold text-white/25 uppercase tracking-widest mb-3">Before / After — Real Resume Bullet Rewrites</p>
        <div className="space-y-3">
          {RESUME_GUIDE.bullets.map((b, i) => (
            <Card key={i} className="overflow-hidden">
              <div className="p-4 border-b border-white/[0.06] bg-red-500/5">
                <p className="text-[10px] font-bold text-red-400 uppercase tracking-wider mb-1.5">❌ Before</p>
                <p className="text-sm text-red-300/70 font-mono">{b.bad}</p>
              </div>
              <div className="p-4 bg-emerald-500/5">
                <p className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider mb-1.5">✅ After</p>
                <p className="text-sm text-emerald-300/80 font-mono">{b.good}</p>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────
// SECTION: GROWTH LADDER
// ─────────────────────────────────────────────────────────────────
function GrowthLadderSection() {
  const [active, setActive] = useState(0);
  return (
    <div className="space-y-5">
      <SectionHeader id="growth-ladder" emoji="📈" title="Career Growth Ladder" tag="Start Here"
        subtitle="What each stage of your career looks like — what you focus on, what you earn, what opens up next." />
      <div className="flex gap-2 overflow-x-auto pb-1">
        {GROWTH_STAGES.map((s,i) => (
          <button key={i} onClick={() => setActive(i)}
            className={`flex-shrink-0 px-3 py-2 rounded-xl text-xs font-bold border transition-all ${
              active===i ? "bg-indigo-600 border-indigo-500 text-white" : "bg-white/[0.03] border-white/[0.07] text-white/35 hover:text-white/60"
            }`}>{s.years}</button>
        ))}
      </div>
      {GROWTH_STAGES[active] && (
        <Card className="p-6">
          <div className="flex items-start gap-4 mb-5">
            <div className={`w-12 h-12 ${GROWTH_STAGES[active].color} rounded-2xl flex items-center justify-center text-white font-extrabold text-lg flex-shrink-0`}>
              {active+1}
            </div>
            <div>
              <p className="text-[10px] font-bold text-white/25 uppercase tracking-wider">{GROWTH_STAGES[active].years}</p>
              <h3 className="text-xl font-extrabold text-white mt-0.5">{GROWTH_STAGES[active].role}</h3>
              <p className="text-emerald-400 font-bold text-sm mt-1">{GROWTH_STAGES[active].salary}</p>
            </div>
          </div>
          <div className="grid sm:grid-cols-2 gap-5">
            <div>
              <p className="text-[10px] font-bold text-white/25 uppercase tracking-wider mb-3">What You Focus On</p>
              <p className="text-sm text-white/60 leading-6">{GROWTH_STAGES[active].focus}</p>
            </div>
            <div>
              <p className="text-[10px] font-bold text-white/25 uppercase tracking-wider mb-3">Key Milestones</p>
              <div className="space-y-2">
                {GROWTH_STAGES[active].key.map((k,ki) => (
                  <div key={ki} className="flex items-center gap-2">
                    <FiCheck className="text-indigo-400 text-xs flex-shrink-0"/>
                    <p className="text-sm text-white/55">{k}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="mt-4 pt-4 border-t border-white/[0.06]">
            <span className="text-[10px] font-bold text-white/20 uppercase tracking-wider">Career Milestone: </span>
            <span className="text-sm font-bold text-indigo-300">{GROWTH_STAGES[active].milestone}</span>
          </div>
        </Card>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────
// SECTION: CERTIFICATIONS
// ─────────────────────────────────────────────────────────────────
function CertificationsSection() {
  return (
    <div className="space-y-5">
      <SectionHeader id="certifications" emoji="📜" title="Top Certifications" tag="Skills"
        subtitle="Which certifications are worth your time and money in 2025. Ranked by industry recognition and salary impact." />
      <div className="space-y-3">
        {CERTIFICATIONS.map((cert, i) => (
          <a key={i} href={cert.url} target="_blank" rel="noopener noreferrer">
            <Card className="flex items-center gap-4 px-5 py-4 hover:border-white/20 transition-all group cursor-pointer mb-3">
              <div className="text-3xl flex-shrink-0">{cert.emoji}</div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap mb-1">
                  <p className="font-bold text-sm text-white/85 group-hover:text-white transition-colors">{cert.name}</p>
                  <Badge color="slate">{cert.level}</Badge>
                </div>
                <p className="text-xs text-white/35">{cert.org} · {cert.time} · {cert.cost}</p>
                <p className="text-xs text-white/45 mt-1 leading-4">{cert.why}</p>
              </div>
              <div className="text-right flex-shrink-0">
                <p className="text-sm font-bold text-amber-300">{cert.value}</p>
                <FiExternalLink className="text-white/15 text-xs mt-1 group-hover:text-white/40 transition-colors ml-auto"/>
              </div>
            </Card>
          </a>
        ))}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────
// SECTION: HIGHER STUDIES
// ─────────────────────────────────────────────────────────────────
function HigherStudiesSection() {
  const [open, setOpen] = useState(0);
  return (
    <div className="space-y-5">
      <SectionHeader id="higher-studies" emoji="🎓" title="Higher Studies Guide" tag="Advanced"
        subtitle="M.Tech vs MS Abroad vs MBA vs PhD — when each makes sense, what it costs, what it returns." />
      <div className="space-y-3">
        {HIGHER_STUDIES.map((h, i) => (
          <Card key={i} className="overflow-hidden">
            <button onClick={() => setOpen(open===i?-1:i)}
              className="w-full flex items-center gap-4 px-5 py-4 text-left hover:bg-white/[0.02] transition-colors">
              <span className="text-3xl">{h.emoji}</span>
              <div className="flex-1 min-w-0">
                <p className="font-extrabold text-white text-base">{h.degree}</p>
                <p className="text-xs text-white/35 mt-0.5">{h.where} · {h.duration}</p>
              </div>
              <div className="flex items-center gap-3 flex-shrink-0">
                <p className="text-sm font-bold text-emerald-400 hidden sm:block">{h.afterSalary}</p>
                <FiChevronDown className={`text-white/25 transition-transform ${open===i?"rotate-180":""}`}/>
              </div>
            </button>
            {open===i && (
              <div className="px-5 pb-5 border-t border-white/[0.06] pt-4 space-y-4">
                <div className="grid sm:grid-cols-3 gap-4 text-xs">
                  <div><p className="text-white/25 font-bold uppercase tracking-wider mb-1">Cost</p><p className="text-white/60">{h.cost}</p></div>
                  <div><p className="text-white/25 font-bold uppercase tracking-wider mb-1">After Salary</p><p className="text-emerald-300 font-bold">{h.afterSalary}</p></div>
                  <div><p className="text-white/25 font-bold uppercase tracking-wider mb-1">Duration</p><p className="text-white/60">{h.duration}</p></div>
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <p className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider mb-2">Pros</p>
                    {h.pros.map((p,pi) => <div key={pi} className="flex items-start gap-2 mb-1.5"><FiCheckCircle className="text-emerald-400 text-xs flex-shrink-0 mt-0.5"/><p className="text-xs text-white/55">{p}</p></div>)}
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-red-400 uppercase tracking-wider mb-2">Cons</p>
                    {h.cons.map((c,ci) => <div key={ci} className="flex items-start gap-2 mb-1.5"><FiX className="text-red-400 text-xs flex-shrink-0 mt-0.5"/><p className="text-xs text-white/55">{c}</p></div>)}
                  </div>
                </div>
                <div className="p-3 rounded-xl bg-indigo-500/8 border border-indigo-500/15">
                  <p className="text-[10px] font-bold text-indigo-400 uppercase tracking-wider mb-1">Choose This If</p>
                  <p className="text-xs text-white/55">{h.when}</p>
                </div>
                <div className="p-3 rounded-xl bg-white/[0.025] border border-white/[0.05]">
                  <p className="text-[10px] font-bold text-white/25 uppercase tracking-wider mb-1">Typical Path</p>
                  <p className="text-xs text-white/45 font-mono">{h.path}</p>
                </div>
              </div>
            )}
          </Card>
        ))}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────
// SECTION: SUCCESS STORIES
// ─────────────────────────────────────────────────────────────────
function SuccessStoriesSection() {
  return (
    <div className="space-y-5">
      <SectionHeader id="success-stories" emoji="🌟" title="Success Stories" tag="Insights"
        subtitle="Real stories from real people — different backgrounds, same lesson: skills beat everything else." />
      <div className="space-y-4">
        {SUCCESS_STORIES.map((s, i) => (
          <Card key={i} className="p-5">
            <div className="flex items-start gap-4 mb-4">
              <div className="w-12 h-12 bg-indigo-600/20 rounded-2xl flex items-center justify-center text-2xl flex-shrink-0">{s.emoji}</div>
              <div className="flex-1 min-w-0">
                <p className="font-extrabold text-white text-sm">{s.name}</p>
                <div className="flex items-center gap-2 mt-1 flex-wrap">
                  <span className="text-xs text-white/35">{s.from}</span>
                  <FiArrowRight className="text-white/20 text-xs flex-shrink-0"/>
                  <span className="text-xs text-indigo-300 font-semibold">{s.to}</span>
                </div>
                <div className="flex items-center gap-3 mt-1.5">
                  <Badge color="emerald">{s.salary}</Badge>
                  <span className="text-[10px] text-white/25">{s.time}</span>
                </div>
              </div>
            </div>
            <blockquote className="text-sm text-white/65 leading-6 italic border-l-2 border-indigo-500/40 pl-4 mb-3">
              "{s.quote}"
            </blockquote>
            <div className="p-3 rounded-xl bg-amber-500/6 border border-amber-500/15 mb-3">
              <p className="text-[10px] font-bold text-amber-400 uppercase tracking-wider mb-1">💡 Their Advice</p>
              <p className="text-xs text-amber-200/60">{s.advice}</p>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {s.tech.map((t,ti) => <span key={ti} className="text-[10px] bg-white/5 border border-white/10 text-white/40 px-2 py-1 rounded-lg font-mono">{t}</span>)}
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────
// SECTION: TRENDS 2025
// ─────────────────────────────────────────────────────────────────
function TrendsSection() {
  return (
    <div className="space-y-5">
      <SectionHeader id="trends-2025" emoji="🔭" title="Industry Trends 2025–2030" tag="Insights"
        subtitle="What's hot, what's cooling, what's coming. Where to bet your next 3 years of learning." />
      <div className="space-y-3">
        {TRENDS_2025.map((t, i) => (
          <Card key={i} className="p-5">
            <div className="flex items-start gap-3 mb-3">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap mb-1">
                  <p className="font-bold text-white text-sm">{t.trend}</p>
                  <span className="text-xs font-bold">{t.growth}</span>
                </div>
                <p className="text-sm text-white/50 leading-6">{t.desc}</p>
              </div>
            </div>
            <div className="flex items-center gap-2 p-2.5 rounded-lg bg-indigo-500/8 border border-indigo-500/15">
              <FiArrowRight className="text-indigo-400 text-xs flex-shrink-0"/>
              <p className="text-xs text-indigo-300 font-semibold">{t.action}</p>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────
// SECTION: FAQS
// ─────────────────────────────────────────────────────────────────
function FAQsSection() {
  const [open, setOpen] = useState(null);
  return (
    <div className="space-y-5">
      <SectionHeader id="faqs" emoji="❓" title="Frequently Asked Questions" tag="Insights"
        subtitle="The real answers to the questions every CSE student Googles at 2am." />
      <div className="divide-y divide-white/[0.05] rounded-2xl border border-white/[0.07] overflow-hidden">
        {FAQS.map((faq, i) => (
          <div key={i}>
            <button onClick={() => setOpen(open===i?null:i)}
              className="w-full flex items-start gap-3 px-5 py-4 text-left hover:bg-white/[0.02] transition-colors">
              <div className="w-6 h-6 rounded-full bg-indigo-600/15 border border-indigo-500/20 flex items-center justify-center text-[10px] font-bold text-indigo-400 flex-shrink-0 mt-0.5">
                {i+1}
              </div>
              <p className="flex-1 text-sm font-semibold text-white/80 leading-5 pr-2">{faq.q}</p>
              <FiChevronDown className={`text-white/25 flex-shrink-0 mt-0.5 transition-transform ${open===i?"rotate-180":""}`}/>
            </button>
            {open===i && (
              <div className="px-5 pb-4 pl-14 border-t border-white/[0.04] pt-3">
                <p className="text-sm text-white/55 leading-6">{faq.a}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────
// SECTION: RESOURCES
// ─────────────────────────────────────────────────────────────────
function ResourcesSection() {
  const [activeCategory, setActiveCategory] = useState(0);
  return (
    <div className="space-y-5">
      <SectionHeader id="resources" emoji="📚" title="Top Resources" tag="Skills"
        subtitle="Curated list of the best free and paid resources. No filler — only what actually produces results." />
      <div className="flex gap-2 overflow-x-auto pb-1">
        {RESOURCES_DATA.map((cat, i) => (
          <button key={i} onClick={() => setActiveCategory(i)}
            className={`flex-shrink-0 px-3 py-2 rounded-xl text-xs font-bold border transition-all ${
              activeCategory===i
                ? "bg-indigo-600 border-indigo-500 text-white"
                : "bg-white/[0.03] border-white/[0.07] text-white/35 hover:text-white/60"
            }`}>{cat.category}</button>
        ))}
      </div>
      {RESOURCES_DATA[activeCategory] && (
        <div className="space-y-2">
          {RESOURCES_DATA[activeCategory].items.map((r, ri) => (
            <a key={ri} href={r.url} target="_blank" rel="noopener noreferrer">
              <Card className="flex items-center gap-4 px-5 py-4 hover:border-white/20 transition-all group cursor-pointer mb-2">
                <div className="w-8 h-8 bg-white/5 rounded-xl flex items-center justify-center flex-shrink-0">
                  <FiExternalLink className="text-white/20 text-xs group-hover:text-indigo-400 transition-colors"/>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-bold text-white/80 group-hover:text-white transition-colors">{r.name}</p>
                  <p className="text-xs text-white/30 mt-0.5">{r.note}</p>
                </div>
                <div className="flex items-center gap-2 flex-shrink-0">
                  <Badge color={r.free?"emerald":"amber"}>{r.free?"Free":"Paid"}</Badge>
                  <Badge color="slate">{r.type}</Badge>
                </div>
              </Card>
            </a>
          ))}
        </div>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────
// SECTION: NETWORKING
// ─────────────────────────────────────────────────────────────────
function NetworkingSection() {
  return (
    <div className="space-y-5">
      <SectionHeader id="networking" emoji="🤝" title="Networking Guide" tag="Getting Hired"
        subtitle="A referral gets you 5x more callbacks than a cold application. Here's how to build a network that actually works." />
      <div className="space-y-3 mb-5">
        {NETWORKING_GUIDE.platforms.map((p, i) => (
          <Card key={i} className="p-4 flex items-start gap-4">
            <div className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center font-bold text-white/50 text-sm flex-shrink-0">{p.name[0]}</div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <p className="font-bold text-sm text-white/80">{p.name}</p>
                <span className={`text-[10px] font-bold ${p.power.includes("Very")?"text-yellow-400":p.power.includes("High")?"text-orange-400":"text-slate-400"}`}>{p.power}</span>
              </div>
              <p className="text-xs text-white/40 leading-5">{p.strategy}</p>
            </div>
          </Card>
        ))}
      </div>
      <Card className="p-5">
        <p className="text-[10px] font-bold text-white/25 uppercase tracking-widest mb-3">Golden Rules of Networking</p>
        <div className="space-y-2.5">
          {NETWORKING_GUIDE.tips.map((t, i) => (
            <div key={i} className="flex items-start gap-3">
              <span className="text-indigo-400 font-bold text-xs flex-shrink-0 mt-0.5">{String(i+1).padStart(2,"0")}</span>
              <p className="text-sm text-white/55 leading-5">{t}</p>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────
// SECTION: FREELANCING
// ─────────────────────────────────────────────────────────────────
function FreelancingSection() {
  return (
    <div className="space-y-5">
      <SectionHeader id="freelancing" emoji="🏠" title="Freelancing Guide" tag="Alternative"
        subtitle="Build a second income stream or go fully independent. Platform-by-platform breakdown with real earning ranges." />
      <div className="grid sm:grid-cols-2 gap-3 mb-5">
        {FREELANCING_GUIDE.platforms.map((p, i) => (
          <Card key={i} className="p-4">
            <div className="flex items-center justify-between mb-2">
              <p className="font-bold text-white text-sm">{p.name}</p>
              <p className="text-xs font-bold text-emerald-400">{p.earning}</p>
            </div>
            <p className="text-xs text-white/40 mb-2 leading-4">{p.desc}</p>
            <p className="text-[10px] text-indigo-300 font-semibold">Best for: {p.best}</p>
          </Card>
        ))}
      </div>
      <Card className="p-5">
        <p className="text-[10px] font-bold text-white/25 uppercase tracking-widest mb-3">Freelancing Success Tips</p>
        <div className="space-y-2">
          {FREELANCING_GUIDE.tips.map((t, i) => (
            <div key={i} className="flex items-start gap-2.5">
              <FiCheck className="text-emerald-400 text-xs flex-shrink-0 mt-0.5"/>
              <p className="text-sm text-white/55 leading-5">{t}</p>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────
// SECTION: AI ADVISOR
// ─────────────────────────────────────────────────────────────────
function AIAdvisorSection() {
  const [question, setQuestion] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const QUICK = [
    "Should I do M.Tech or get a job?",
    "How do I switch from TCS to a product company?",
    "What skills do I need for AI/ML jobs in 2025?",
    "How long to prepare for FAANG?",
    "Is MBA worth it for a CS engineer?",
    "Best way to build portfolio as a fresher?",
  ];
  const ask = async (q) => {
    const query = q || question.trim();
    if (!query) return;
    setLoading(true); setResult("");
    try {
      const d = await api.chat(`You are a senior career counselor for CSE students in India with 15+ years of experience. You have deep knowledge of the Indian tech industry.

Answer this career question honestly and specifically:
"${query}"

Format your answer clearly with:
- Direct answer first (no fluff)
- Specific actionable steps
- Real timelines and numbers where relevant
- What most people get wrong about this
- Your final recommendation

Be honest even if the answer is not what they want to hear. Keep it under 400 words but make every word count.`);
      setResult(d.response || "");
    } catch { toast.error("Failed to get AI advice"); }
    setLoading(false);
  };

  return (
    <div className="space-y-5">
      <SectionHeader id="ai-advisor" emoji="🤖" title="AI Career Advisor" tag="AI Tools"
        subtitle="Ask anything about your CSE career. Get specific, honest, actionable advice powered by Gemini AI." />
      <Card className="p-5 space-y-4">
        <div className="flex gap-3">
          <input value={question} onChange={e => setQuestion(e.target.value)}
            onKeyDown={e => e.key==="Enter" && ask()}
            placeholder="Ask your career question..."
            className="flex-1 bg-[#161b22] border border-white/[0.08] text-white/80 text-sm rounded-xl px-4 py-3 outline-none focus:border-indigo-500/50 placeholder:text-white/15"/>
          <button onClick={() => ask()} disabled={loading || !question.trim()}
            className="flex items-center gap-2 px-5 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-bold transition-all disabled:opacity-40">
            <FiZap className="text-sm"/>
            {loading ? "..." : "Ask"}
          </button>
        </div>
        <div>
          <p className="text-[10px] font-bold text-white/20 uppercase tracking-wider mb-2">Quick Questions</p>
          <div className="flex flex-wrap gap-2">
            {QUICK.map((q, i) => (
              <button key={i} onClick={() => { setQuestion(q); ask(q); }}
                className="text-xs bg-white/[0.03] border border-white/[0.07] text-white/40 hover:text-white/70 hover:border-indigo-500/30 px-3 py-1.5 rounded-lg transition-all">
                {q}
              </button>
            ))}
          </div>
        </div>
        {loading && (
          <div className="flex items-center gap-3 text-white/35 text-sm py-4">
            <div className="w-4 h-4 border-2 border-indigo-500/30 border-t-indigo-500 rounded-full animate-spin flex-shrink-0"/>
            Gemini AI is thinking...
          </div>
        )}
        {result && (
          <div className="prose prose-invert prose-sm max-w-none bg-white/[0.02] rounded-xl p-5 border border-white/[0.06]
            prose-p:text-white/60 prose-p:leading-6 prose-headings:text-white prose-strong:text-white/90
            prose-li:text-white/60 prose-li:leading-6 prose-code:text-indigo-300">
            <ReactMarkdown>{result}</ReactMarkdown>
          </div>
        )}
      </Card>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────
// SECTION: ROADMAP GENERATOR
// ─────────────────────────────────────────────────────────────────
function RoadmapGeneratorSection() {
  const [form, setForm] = useState({ goal:"SDE at a unicorn startup", year:"2nd Year B.Tech", skills:"Python, basic HTML/CSS", hours:"2-3 hours", timeline:"12 months" });
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const generate = async () => {
    setLoading(true); setResult("");
    try {
      const d = await api.chat(`You are a senior career counselor for CSE students in India. Create a DETAILED, SPECIFIC, ACTIONABLE personalized career roadmap.

Student Profile:
- Career Goal: ${form.goal}
- Current Year: ${form.year}
- Current Skills: ${form.skills}
- Study Hours Available: ${form.hours} per day
- Target Timeline: ${form.timeline}

Create a week-by-week or month-by-month plan covering:

## Month-by-Month Roadmap

### Month 1: [Title]
**Goal:** [specific goal for this month]
**Daily Tasks:**
- [specific task with time estimate]

**Projects to Build:**
- [concrete project idea]

**Milestone Check:** [how to know you've succeeded]

[Continue for each month up to the timeline...]

## Skills Acquisition Order
[Why this exact order matters]

## Top 5 Platforms to Use
[Specific platforms for this goal]

## Red Flags to Avoid
[Common mistakes for this path]

## Interview Preparation Timeline
[When to start, what to focus on]

## Realistic Salary Expectation
[What to expect at the end of this timeline]

Be extremely specific. Use actual resource names, platforms, GitHub repos. Do not be generic.`);
      setResult(d.response || "");
    } catch { toast.error("Failed to generate roadmap"); }
    setLoading(false);
  };
  return (
    <div className="space-y-5">
      <SectionHeader id="roadmap-gen" emoji="⚡" title="Generate My Personalized Roadmap" tag="AI Tools"
        subtitle="Tell us your goal and current situation. Get a month-by-month plan built specifically for you." />
      <Card className="p-5 space-y-4">
        <div className="grid sm:grid-cols-2 gap-4">
          {[
            { key:"goal",     label:"Career Goal",           placeholder:"e.g. SDE at Google, ML Engineer at startup" },
            { key:"year",     label:"Current Status",        placeholder:"e.g. 2nd Year B.Tech, Working at TCS" },
            { key:"skills",   label:"Current Skills",        placeholder:"e.g. Python basics, HTML/CSS, C++" },
            { key:"hours",    label:"Daily Study Hours",     placeholder:"e.g. 2 hours, 4 hours" },
            { key:"timeline", label:"Target Timeline",       placeholder:"e.g. 6 months, 1 year" },
          ].map(f => (
            <div key={f.key} className={f.key==="goal"?"sm:col-span-2":""}>
              <label className="text-[10px] font-bold text-white/30 uppercase tracking-wider block mb-1.5">{f.label}</label>
              <input value={form[f.key]} onChange={e => setForm(p => ({...p, [f.key]:e.target.value}))}
                placeholder={f.placeholder}
                className="w-full bg-[#161b22] border border-white/[0.07] text-white/70 text-sm rounded-xl px-4 py-2.5 outline-none focus:border-indigo-500/50 placeholder:text-white/15"/>
            </div>
          ))}
        </div>
        <button onClick={generate} disabled={loading}
          className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-sm transition-all disabled:opacity-40">
          {loading
            ? <><div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"/> Generating your roadmap...</>
            : <><FiZap className="text-sm"/> Generate My Roadmap</>}
        </button>
        {result && (
          <div className="prose prose-invert prose-sm max-w-none bg-white/[0.02] rounded-xl p-5 border border-white/[0.06] mt-2
            prose-p:text-white/60 prose-p:leading-6 prose-headings:text-white prose-headings:font-bold
            prose-strong:text-white/90 prose-li:text-white/60 prose-li:leading-6
            prose-h2:text-base prose-h3:text-sm prose-code:text-indigo-300">
            <ReactMarkdown>{result}</ReactMarkdown>
          </div>
        )}
      </Card>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────
// SKILLS MATRIX
// ─────────────────────────────────────────────────────────────────
function SkillsMatrixSection() {
  const matrix = [
    { skill:"Python",          sde:4, ai:5, devops:3, data:5, sec:3, mobile:1 },
    { skill:"JavaScript",      sde:5, ai:2, devops:2, data:2, sec:2, mobile:4 },
    { skill:"SQL",             sde:3, ai:3, devops:2, data:5, sec:2, mobile:2 },
    { skill:"Docker",          sde:3, ai:3, devops:5, data:2, sec:3, mobile:1 },
    { skill:"System Design",   sde:5, ai:4, devops:4, data:3, sec:3, mobile:3 },
    { skill:"Machine Learning",sde:2, ai:5, devops:1, data:4, sec:2, mobile:1 },
    { skill:"React/Vue",       sde:4, ai:1, devops:1, data:1, sec:1, mobile:4 },
    { skill:"Linux",           sde:3, ai:3, devops:5, data:2, sec:5, mobile:1 },
    { skill:"Kubernetes",      sde:2, ai:2, devops:5, data:1, sec:2, mobile:1 },
    { skill:"Statistics",      sde:2, ai:4, devops:1, data:5, sec:2, mobile:1 },
    { skill:"Networking",      sde:2, ai:1, devops:4, data:1, sec:5, mobile:2 },
    { skill:"Git",             sde:5, ai:4, devops:5, data:4, sec:4, mobile:5 },
  ];
  const tracks = ["sde","ai","devops","data","sec","mobile"];
  const trackLabels = { sde:"SDE", ai:"AI/ML", devops:"DevOps", data:"Data", sec:"Security", mobile:"Mobile" };
  const dots = (n) => Array.from({length:5}).map((_,i) => (
    <div key={i} className={`w-2 h-2 rounded-full ${i<n?"bg-indigo-500":"bg-white/[0.08]"}`}/>
  ));
  return (
    <div className="space-y-5">
      <SectionHeader id="skills-matrix" emoji="🗺️" title="Skills Matrix" tag="Skills"
        subtitle="How important each skill is for each career track. 5 dots = essential, 1 dot = helpful but not critical." />
      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/[0.06]">
                <th className="text-left px-5 py-3 text-[10px] font-bold text-white/30 uppercase tracking-wider">Skill</th>
                {tracks.map(t => <th key={t} className="px-4 py-3 text-[10px] font-bold text-white/30 uppercase tracking-wider">{trackLabels[t]}</th>)}
              </tr>
            </thead>
            <tbody className="divide-y divide-white/[0.04]">
              {matrix.map((row, i) => (
                <tr key={i} className="hover:bg-white/[0.02] transition-colors">
                  <td className="px-5 py-3 text-sm font-semibold text-white/70">{row.skill}</td>
                  {tracks.map(t => (
                    <td key={t} className="px-4 py-3">
                      <div className="flex items-center gap-0.5 justify-center">{dots(row[t])}</div>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────
// SECTION: CAREER SWITCHING
// ─────────────────────────────────────────────────────────────────
function CareerSwitchSection() {
  const paths = [
    { from:"IT Services (TCS/Infosys)", to:"Product Startup",     time:"6–9 months",  steps:["Build 2 production-quality side projects","LeetCode 120 medium problems","System design basics","Target mid-tier startups first, then unicorns"], hardest:"Breaking the 'service company' bias — solved by strong projects" },
    { from:"Non-CS Graduate",           to:"Software Developer",   time:"12–18 months",steps:["Pick one path (web dev or Python)","Complete structured course (Odin Project or CS50)","Build 3-5 projects with live demos","Start freelancing to build portfolio + income"], hardest:"Getting first job without experience — solved by open source contributions" },
    { from:"SDE → Product Manager",     to:"Product Manager",      time:"3–6 months",  steps:["Get 3+ years SWE experience first","MBA or online PM courses (not required but helps)","Practice product case studies (CIRCLES method)","Target tech PM roles (your SWE background is the advantage)"], hardest:"Demonstrating 'product thinking' without PM title" },
    { from:"SDE → Data Science",        to:"Data Scientist",       time:"6–12 months", steps:["Python already known — add Pandas, scikit-learn","Statistics: take StatQuest course","2 Kaggle competitions","Build one end-to-end ML project"], hardest:"Statistics fundamentals — invest time here, it pays back 10x" },
    { from:"Data Science → ML Engineer",to:"ML Engineer",          time:"4–8 months",  steps:["Learn PyTorch (if using sklearn only)","Learn MLOps: MLflow, model serving","Build a production ML API with FastAPI","Contribute to HuggingFace or open source ML"], hardest:"Production engineering skills — ML scientists often lack this" },
  ];
  const [open, setOpen] = useState(null);
  return (
    <div className="space-y-5">
      <SectionHeader id="career-switch" emoji="🔄" title="Career Switching" tag="Alternative"
        subtitle="Changing your career path is normal. Here's the realistic timeline and steps for the most common switches." />
      <div className="space-y-3">
        {paths.map((p, i) => (
          <Card key={i} className="overflow-hidden">
            <button onClick={() => setOpen(open===i?null:i)}
              className="w-full flex items-center gap-4 px-5 py-4 text-left hover:bg-white/[0.02] transition-colors">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap mb-1">
                  <span className="text-xs text-white/40">{p.from}</span>
                  <FiArrowRight className="text-indigo-400 text-xs flex-shrink-0"/>
                  <span className="text-xs font-bold text-indigo-300">{p.to}</span>
                </div>
              </div>
              <div className="flex items-center gap-2 flex-shrink-0">
                <Badge color="amber">{p.time}</Badge>
                <FiChevronDown className={`text-white/25 transition-transform ${open===i?"rotate-180":""}`}/>
              </div>
            </button>
            {open===i && (
              <div className="px-5 pb-5 border-t border-white/[0.06] pt-4 space-y-3">
                <div>
                  <p className="text-[10px] font-bold text-white/25 uppercase tracking-wider mb-2">Step-by-Step Plan</p>
                  {p.steps.map((s,si) => (
                    <div key={si} className="flex items-start gap-3 mb-2">
                      <span className="w-5 h-5 rounded-full bg-indigo-600/20 text-indigo-400 text-[10px] font-bold flex items-center justify-center flex-shrink-0 mt-0.5">{si+1}</span>
                      <p className="text-sm text-white/55">{s}</p>
                    </div>
                  ))}
                </div>
                <div className="p-3 rounded-xl bg-red-500/8 border border-red-500/15">
                  <p className="text-[10px] font-bold text-red-400 uppercase tracking-wider mb-1">⚠️ Hardest Part</p>
                  <p className="text-xs text-red-200/60">{p.hardest}</p>
                </div>
              </div>
            )}
          </Card>
        ))}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────
// SECTION: STARTUPS & ENTREPRENEURSHIP
// ─────────────────────────────────────────────────────────────────
function StartupsSection() {
  const stages = [
    { stage:"Idea Stage", time:"Month 0–3", tasks:["Validate problem exists (talk to 20 potential users)","Build MVP in 4 weeks (not 4 months)","Don't incorporate yet","Get first 10 paying customers before raising money"], icon:"💡" },
    { stage:"MVP & Traction", time:"Month 3–12", tasks:["Launch and get real users","Talk to every customer","Measure weekly active users, retention, revenue","Apply to startup programs (YC, Antler, 100X)"], icon:"🚀" },
    { stage:"Funding (Seed)", time:"Month 12–18", tasks:["Raise ₹50L–5Cr from angels/seed funds","Focus on growth metrics (MoM growth %)","Build a team of 3–5 people","Get into an accelerator if possible"], icon:"💰" },
    { stage:"Growth", time:"Year 2+", tasks:["Hire fast, fire fast","Focus on one channel that works","Build moat (network effects, data, brand)","Prepare Series A story"], icon:"📈" },
  ];
  return (
    <div className="space-y-5">
      <SectionHeader id="startups" emoji="🚀" title="Entrepreneurship Guide" tag="Alternative"
        subtitle="Starting a startup is one path. Here's the honest truth about what it takes, what it costs, and what success looks like." />
      <Card className="p-5 mb-4">
        <p className="text-[10px] font-bold text-white/25 uppercase tracking-widest mb-3">The Honest Truth</p>
        <div className="grid sm:grid-cols-3 gap-4 text-sm text-white/50 leading-6">
          <p>📊 90% of startups fail. But 100% of people who never try definitely don't build a ₹100Cr company. The skills you build are valuable regardless of outcome.</p>
          <p>⏰ Average time to startup "success" is 7-10 years, not 2. Media shows the outliers. Build with patience and realistic expectations.</p>
          <p>💡 The best founders have 2-5 years of industry experience first. Join a startup to learn, then start your own. Direct from college works but is harder.</p>
        </div>
      </Card>
      <div className="space-y-3">
        {stages.map((s, i) => (
          <Card key={i} className="p-5 flex items-start gap-4">
            <div className="text-2xl flex-shrink-0">{s.icon}</div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-2 flex-wrap">
                <p className="font-bold text-white text-sm">{s.stage}</p>
                <Badge color="slate">{s.time}</Badge>
              </div>
              <div className="space-y-1.5">
                {s.tasks.map((t, ti) => (
                  <div key={ti} className="flex items-start gap-2">
                    <div className="w-1 h-1 rounded-full bg-indigo-500 flex-shrink-0 mt-2"/>
                    <p className="text-xs text-white/50 leading-5">{t}</p>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────
// SECTION: STUDY ABROAD
// ─────────────────────────────────────────────────────────────────
function StudyAbroadSection() {
  const countries = [
    { flag:"🇺🇸", country:"USA",       pros:["Best universities (MIT, Stanford, CMU, GT)","OPT → H1B immigration path","Highest salaries","Research ecosystem"], cons:["Most expensive (₹40–70L total)","H1B lottery uncertainty","Gun violence, healthcare costs","Competitive job market post-2023"], unis:"MIT, Stanford, CMU, Georgia Tech, UIUC, Purdue", cost:"₹35–60L", after:"₹70–150L+ (USD salary)" },
    { flag:"🇩🇪", country:"Germany",   pros:["Free public university tuition","Strong industrial companies","EU work permit easier","Growing tech scene (Berlin)"], cons:["German language for many programs","Smaller startup ecosystem","Long processing times","Missing US network"], unis:"TU Munich, KIT, RWTH Aachen, TU Berlin", cost:"₹3–8L (living only)", after:"₹30–60L (EUR salary)" },
    { flag:"🇨🇦", country:"Canada",    pros:["Post-study work permit (3 yrs)","PR pathway clearer than US","Safe, multicultural","Growing tech cities (Toronto, Vancouver)"], cons:["Colder weather","Smaller job market than US","Lower salaries than US","Expensive cities (Toronto, Vancouver)"], unis:"UofT, UBC, Waterloo, McGill, UAlberta", cost:"₹25–45L", after:"₹35–70L (CAD salary)" },
    { flag:"🇸🇬", country:"Singapore", pros:["Short flight from India","English first","Strong ASEAN hub","Low taxes, high salaries","Easy PR path"], cons:["Very expensive city","Small job market","Hot, humid climate","Very high competition"], unis:"NUS, NTU, SMU", cost:"₹20–35L", after:"₹40–80L (SGD salary)" },
  ];
  const [open, setOpen] = useState(0);
  return (
    <div className="space-y-5">
      <SectionHeader id="study-abroad" emoji="✈️" title="Study Abroad Guide" tag="Advanced"
        subtitle="Country-by-country comparison for CS students — costs, visa, job prospects, and top universities." />
      <div className="grid grid-cols-4 gap-2">
        {countries.map((c, i) => (
          <button key={i} onClick={() => setOpen(i)}
            className={`p-3 rounded-xl border text-center transition-all ${open===i?"border-indigo-500/40 bg-indigo-600/10":"border-white/[0.07] bg-white/[0.02] hover:border-white/15"}`}>
            <div className="text-2xl mb-1">{c.flag}</div>
            <p className="text-xs font-bold text-white/70">{c.country}</p>
          </button>
        ))}
      </div>
      {countries[open] && (
        <Card className="p-5 space-y-4">
          <div className="flex items-center gap-3 mb-2">
            <span className="text-3xl">{countries[open].flag}</span>
            <div>
              <h3 className="font-extrabold text-white text-lg">{countries[open].country}</h3>
              <div className="flex items-center gap-3 mt-1">
                <span className="text-xs text-white/35">Cost: <span className="text-white/60 font-bold">{countries[open].cost}</span></span>
                <span className="text-xs text-white/35">After: <span className="text-emerald-400 font-bold">{countries[open].after}</span></span>
              </div>
            </div>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <p className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider mb-2">Pros</p>
              {countries[open].pros.map((p,pi) => <div key={pi} className="flex items-start gap-2 mb-1.5"><FiCheck className="text-emerald-400 text-xs flex-shrink-0 mt-0.5"/><p className="text-xs text-white/55">{p}</p></div>)}
            </div>
            <div>
              <p className="text-[10px] font-bold text-red-400 uppercase tracking-wider mb-2">Cons</p>
              {countries[open].cons.map((c,ci) => <div key={ci} className="flex items-start gap-2 mb-1.5"><FiX className="text-red-400 text-xs flex-shrink-0 mt-0.5"/><p className="text-xs text-white/55">{c}</p></div>)}
            </div>
          </div>
          <div className="p-3 rounded-xl bg-white/[0.025] border border-white/[0.05]">
            <p className="text-[10px] font-bold text-white/25 uppercase tracking-wider mb-1">Top Universities</p>
            <p className="text-xs text-white/55">{countries[open].unis}</p>
          </div>
        </Card>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────
// MAIN PAGE COMPONENT
// ─────────────────────────────────────────────────────────────────
export default function CareerPath() {
  const [activeSection, setActiveSection] = useState("overview");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [openGroup, setOpenGroup] = useState("Start Here");

  const filteredNav = NAV_SECTIONS.filter(s =>
    s.label.toLowerCase().includes(search.toLowerCase())
  );

  const scrollTo = (id) => {
    setActiveSection(id);
    document.getElementById(id)?.scrollIntoView({ behavior:"smooth", block:"start" });
    setSidebarOpen(false);
  };

  const renderSection = () => {
    if (activeSection === "overview")        return <OverviewSection/>;
    if (activeSection === "domains")         return <DomainsSection/>;
    if (activeSection === "growth-ladder")   return <GrowthLadderSection/>;
    const track = CAREER_TRACKS.find(t => t.id === activeSection);
    if (track)                               return <CareerTrackSection track={track}/>;
    if (activeSection === "salary")          return <SalarySection/>;
    if (activeSection === "companies")       return <CompaniesSection/>;
    if (activeSection === "interview-prep")  return <InterviewPrepSection/>;
    if (activeSection === "resume-guide")    return <ResumeGuideSection/>;
    if (activeSection === "networking")      return <NetworkingSection/>;
    if (activeSection === "skills-matrix")   return <SkillsMatrixSection/>;
    if (activeSection === "resources")       return <ResourcesSection/>;
    if (activeSection === "certifications")  return <CertificationsSection/>;
    if (activeSection === "higher-studies")  return <HigherStudiesSection/>;
    if (activeSection === "study-abroad")    return <StudyAbroadSection/>;
    if (activeSection === "freelancing")     return <FreelancingSection/>;
    if (activeSection === "startups")        return <StartupsSection/>;
    if (activeSection === "career-switch")   return <CareerSwitchSection/>;
    if (activeSection === "faqs")            return <FAQsSection/>;
    if (activeSection === "success-stories") return <SuccessStoriesSection/>;
    if (activeSection === "trends-2025")     return <TrendsSection/>;
    if (activeSection === "ai-advisor")      return <AIAdvisorSection/>;
    if (activeSection === "roadmap-gen")     return <RoadmapGeneratorSection/>;
    return <OverviewSection/>;
  };

  return (
    <DashboardLayout>
      <div className="flex -mx-4 sm:-mx-6 -mt-4 bg-[#060810]" style={{ minHeight:"calc(100vh - 64px)" }}>

        {/* ── SIDEBAR ── */}
        {sidebarOpen && (
          <div className="fixed inset-0 z-40 lg:hidden" onClick={() => setSidebarOpen(false)}>
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm"/>
          </div>
        )}
        <aside className={`
          fixed lg:sticky top-0 z-50 lg:z-auto h-screen bg-[#0d1117] border-r border-white/[0.07]
          flex-shrink-0 flex flex-col transition-all duration-300
          ${sidebarOpen?"left-0":"left-[-280px] lg:left-0"} w-[280px] lg:w-64
        `}>
          {/* Sidebar header */}
          <div className="p-4 border-b border-white/[0.07] flex-shrink-0">
            <div className="relative">
              <FiSearch className="absolute left-3 top-2.5 text-white/25 text-sm"/>
              <input value={search} onChange={e => setSearch(e.target.value)}
                placeholder="Search topics..."
                className="w-full pl-9 pr-3 py-2 bg-white/[0.04] border border-white/[0.07] rounded-xl text-xs text-white/60 outline-none focus:border-indigo-500/50 placeholder:text-white/20 transition-colors"/>
            </div>
          </div>

          {/* Nav */}
          <nav className="flex-1 overflow-y-auto p-3 pb-8">
            {search ? (
              <div className="space-y-0.5">
                {filteredNav.map(s => (
                  <button key={s.id} onClick={() => scrollTo(s.id)}
                    className={`w-full text-left flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-xs font-medium transition-all ${
                      activeSection===s.id
                        ? "bg-indigo-600/15 text-indigo-300 border border-indigo-500/20"
                        : "text-white/40 hover:bg-white/[0.04] hover:text-white/70"
                    }`}>
                    <span className="text-sm flex-shrink-0">{s.emoji}</span>
                    <span className="truncate">{s.label}</span>
                  </button>
                ))}
              </div>
            ) : (
              GROUPS.map(group => {
                const items = NAV_SECTIONS.filter(s => s.group===group);
                const isOpen = openGroup===group;
                return (
                  <div key={group} className="mb-1">
                    <button onClick={() => setOpenGroup(isOpen?"":group)}
                      className="w-full flex items-center justify-between px-3 py-2 text-[10px] font-bold text-white/20 uppercase tracking-widest hover:text-white/40 transition-colors">
                      {group}
                      <FiChevronDown className={`transition-transform text-xs ${isOpen?"rotate-180":""}`}/>
                    </button>
                    {isOpen && (
                      <div className="space-y-0.5 ml-1 mb-1">
                        {items.map(s => (
                          <button key={s.id} onClick={() => scrollTo(s.id)}
                            className={`w-full text-left flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-xs font-medium transition-all ${
                              activeSection===s.id
                                ? "bg-indigo-600/15 text-indigo-300 border border-indigo-500/20"
                                : "text-white/40 hover:bg-white/[0.04] hover:text-white/70"
                            }`}>
                            <span className="text-sm flex-shrink-0">{s.emoji}</span>
                            <span className="truncate">{s.label}</span>
                            {activeSection===s.id && <div className="w-1.5 h-1.5 rounded-full bg-indigo-400 ml-auto flex-shrink-0"/>}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })
            )}
          </nav>
        </aside>

        {/* ── MAIN CONTENT ── */}
        <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
          {/* Mobile header */}
          <div className="lg:hidden flex items-center gap-3 px-4 py-3 border-b border-white/[0.07] bg-[#0d1117] flex-shrink-0">
            <button onClick={() => setSidebarOpen(true)} className="text-white/40 hover:text-white/70 transition-colors">
              <FiMenu className="text-xl"/>
            </button>
            <p className="text-white/60 text-sm font-semibold truncate">
              {NAV_SECTIONS.find(s => s.id===activeSection)?.emoji} {NAV_SECTIONS.find(s => s.id===activeSection)?.label}
            </p>
          </div>

          {/* Section content */}
          <main className="flex-1 overflow-y-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="max-w-4xl">
              {renderSection()}
            </div>
          </main>
        </div>
      </div>
    </DashboardLayout>
  );
}

// ─────────────────────────────────────────────────────────────────
// SECTION: DOMAINS (quick visual overview)
// ─────────────────────────────────────────────────────────────────
function DomainsSection() {
  const domains = [
    { emoji:"💻", title:"Software Development", desc:"Build apps, websites, systems, APIs. The broadest track with most jobs.", roles:["SDE","Full Stack","Backend","Frontend"], avg:"₹8–60L", color:"indigo" },
    { emoji:"🤖", title:"AI / ML Engineering",  desc:"Models, LLMs, computer vision, NLP. Fastest growing, highest salary.", roles:["ML Eng","AI Researcher","LLM Eng","NLP"], avg:"₹12–80L", color:"violet" },
    { emoji:"☁️", title:"Cloud & DevOps",        desc:"Infrastructure, CI/CD, reliability engineering. High demand, lower competition.", roles:["DevOps","SRE","Cloud Eng","Platform"], avg:"₹8–50L", color:"sky" },
    { emoji:"🛡️", title:"Cybersecurity",         desc:"Protect systems and data. Global shortage of 3M+ professionals.", roles:["Security Eng","Pen Tester","SOC Analyst"], avg:"₹6–45L", color:"red" },
    { emoji:"📊", title:"Data Science & Analytics",desc:"Extract insights from data. Bridge between business and technology.", roles:["Data Scientist","Analyst","BI Dev"], avg:"₹6–40L", color:"emerald" },
    { emoji:"📱", title:"Mobile Development",    desc:"iOS, Android, cross-platform. Billions of users need great apps.", roles:["iOS Dev","Android Dev","Flutter Dev"], avg:"₹6–35L", color:"orange" },
    { emoji:"🎮", title:"Game Development",      desc:"Unity, Unreal, game design. Niche but growing rapidly in India.", roles:["Game Dev","Unity Dev","Game Designer"], avg:"₹4–20L", color:"amber" },
    { emoji:"🔬", title:"Research & Academia",   desc:"PhD, publications, teaching. For those who want to advance science.", roles:["Researcher","Professor","Research Sci"], avg:"₹6–30L", color:"teal" },
  ];
  return (
    <div className="space-y-5">
      <SectionHeader id="domains" emoji="🎯" title="Career Domains" tag="Start Here"
        subtitle="8 major paths in tech. Pick one to go deep into — generalists struggle, specialists thrive." />
      <div className="grid sm:grid-cols-2 gap-3">
        {domains.map((d, i) => (
          <Card key={i} className="p-5 hover:border-white/15 transition-all">
            <div className="flex items-start gap-3 mb-3">
              <span className="text-3xl flex-shrink-0">{d.emoji}</span>
              <div className="flex-1 min-w-0">
                <p className="font-extrabold text-white text-sm leading-tight">{d.title}</p>
                <p className="text-emerald-400 font-bold text-xs mt-0.5">{d.avg}</p>
              </div>
            </div>
            <p className="text-xs text-white/45 leading-5 mb-3">{d.desc}</p>
            <div className="flex flex-wrap gap-1.5">
              {d.roles.map((r,ri) => <Badge key={ri} color={d.color}>{r}</Badge>)}
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

