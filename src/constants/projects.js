import { FaPython, FaReact, FaHtml5, FaJs, FaNodeJs, FaJava, FaDatabase, FaGithub, FaCss3, FaRProject, FaGit, FaFigma, FaCuttlefish, FaSwift } from "react-icons/fa";
import { SiVite, SiVercel, SiFlutter, SiDart, SiCmake } from "react-icons/si";
import VSCodeProjectImg from '../assets/VSCode_Project.jpg';
import UMAPMSSAProjectImg from '../assets/UMAP_MSSA_project.png';
import GlobeEarthProjectImg from '../assets/Globe_Earth_Project.png';
import WalletUIProjectImg from '../assets/Wallet_UI_Project.png';



const projects = [
  {
    title: "Portfolio Website",
    description: "A personal developer portfolio which serves to showcase my history, skills, and projects. With various windows and widgets, the design is inspired by a VS Code IDE.",
    link: "https://github.com/ein1le/portfolio",
    languages: ["react", "javascript", "tailwind","vite","vercel"],
    image: VSCodeProjectImg,
  },

  {
    title: "MSSA Sorting Algorithm",
    description: "An Email Newsletter template for automated email blasting. A Machine Learning sorting algorithm using NLP and feature encoding for family scheme groupings using UMAP clustering.",
    link: "https://github.com/ein1le/MSSA_famscheme",
    languages: ["python", "jupyter", "html"],
    image: UMAPMSSAProjectImg,
  },
  {
    title: "Static Website",
    description: "3D multipage developer portfolio website for a client built using Parcel. Explored Three.js in interactive 3D svg models within the website.",
    link: "https://github.com/earthlertkit/earthlertkit.github.io",
    languages: ["react","figma","threejs","parcel"],
    image: GlobeEarthProjectImg,
  },
  {
    title: "Fulstack Budget Tracking Application",
    description: "Mobile-compatible budget tracking webapp built with Flutter and CMake",
    link: "https://github.com/NaFreee20/rawr/tree/main/budget_tracker",
    languages: ["GitHub", "flutter", "Dart","CMake","figma","Swift","C++"],
    contributors: [
      { name: "Mohamed Erfan Bin Fazal Othman", link: "https://www.linkedin.com/in/mohamed-erfan-bin-fazal-othman-67a5b12ab/"}
    ],
    image: WalletUIProjectImg,
  },
  {
    title: "Hand Gesture Control",
    description: "Computer vision project using pre-trained models for real-time hand gesture recognition and control of a linked application.",
    link: "https://www.linkedin.com/in/wlertkit/",
    languages: ["GitHub", "python","opencv"],
    contributors: [
      { name: "Wichayut Lertkittarmonkul", link: "https://www.linkedin.com/in/wlertkit/" }
    ]
  }
];


export default projects; 