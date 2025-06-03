import { FaPython, FaReact, FaHtml5, FaJs, FaNodeJs, FaJava, FaDatabase, FaGithub, FaCss3, FaRProject, FaGit, FaFigma, FaCuttlefish, FaSwift } from "react-icons/fa";
import { SiVite, SiVercel, SiFlutter, SiDart, SiCmake } from "react-icons/si";

const projects = [
  {
    title: "Portfolio Website",
    description: "A personal developer portfolio built with React and styled like VS Code.",
    link: "https://github.com/ein1le/portfolio",
    languages: ["react", "javascript", "css","vite","vercel"],
  },
  {
    title: "Oracle Backtester",
    description: "A set of Python tools for data cleaning, visualization, and machine learning.",
    link: "https://github.com/ein1le/data-analysis-toolkit",
    languages: ["python","r"],
  },
  // TODO: Option Pricing Model
  // TODO: BIF Risk 
  // TODO: Flare Time-Series Oracle
  // TODO: MLOps Sagemaker 
  // TODO: https://github.com/virattt/ai-hedge-fund/tree/main/app/backend
  {
    title: "MSSA Sorting Algorithm",
    description: "A conversational AI assistant using OpenAI's GPT-4 API.",
    link: "https://github.com/ein1le/chatbot-assistant",
    languages: ["python", "node", "javascript"],
  },
  {
    title: "Static Website",
    description: "A real-time dashboard for monitoring IoT devices, built with Node.js and WebSockets.",
    link: "https://github.com/earthlertkit/earthlertkit.github.io",
    languages: ["GitHub", "html", "CSS","javascript","figma"],
  },
  {
    title: "Budget Tracking Webapp",
    description: "Mobile-compatible budget tracking webapp built with Flutter and CMake",
    link: "https://github.com/NaFreee20/rawr/tree/main/budget_tracker",
    languages: ["GitHub", "flutter", "Dart","CMake","figma","Swift","C++"],
    contributors: [
      { name: "Mohamed Erfan Bin Fazal Othman", link: "https://www.linkedin.com/in/mohamed-erfan-bin-fazal-othman-67a5b12ab/"}
    ]
  },
  {
    title: "OpenCV Project",
    description: "Lorum Ipsum Type shit",
    link: "https://www.linkedin.com/in/wlertkit/",
    languages: ["GitHub", "html", "CSS","javascript","figma"],
    contributors: [
      { name: "Wichayut Lertkittarmonkul", link: "https://www.linkedin.com/in/wlertkit/" }
    ]
  }
];


export default projects; 