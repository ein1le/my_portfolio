import UOB_Banner from '../assets/UOB_Banner.jpeg';
import Harrow_Banner from '../assets/Harrow_Banner.jpeg';

const education = [
  {
    title: "University of Bristol",
    subheader: "Integrated Masters, Mechanical Engineering [4MECH002U]",
    date: "2021 - 2025",
    location: "Bristol, UK",
    grade: "First Class Honours (Expected)",
    logo: "https://media.licdn.com/dms/image/v2/D4E0BAQHpcDl5zEb2Og/company-logo_100_100/company-logo_100_100/0/1708951303888/university_of_bristol_logo?e=1756339200&v=beta&t=CaGrBwmsc-1iqvk5Baueq9slBLTyKP4WzMdaVrTferQ",
    hoverImage: UOB_Banner,
    modules: [
      "Year 4: Data Driven Physical Modelling, Multivariable and Non-linear Control, AT Generative Design, AT Quantum Information and Photonic Engineering, AT Design in a Constrained World, AT Machine Thinking in Smart Manufacturing, Group Industrial Project, Renewable Energy for a Sustainable Future, AT Biomechanics",
      "Year 3: Individual Research Project, Applied Solid Mechanics, Engineering Management, Behaviour of Dynamic Systems, Fluid Mechanics and Heat Transfer",
      "Year 2: Engineering Mathematics II, Dynamics and Control, Thermofluids, Engineering Practice, Materials Engineering",
      "Year 1: Engineering Mathematics I, Engineering Communication Measurement and Data Analysis, Introduction to Design Practice, Principles of Mechanical Engineering, Engineering Science"
    ],
    publications: [
      {
        title: "GKN Aerospace Ring Hoop Tension Test Investigation",
        course: "[MENGM5000] Group Industrial Project",
        authors: "Sophie Cook, Demetri Gaffney, Tallulah Jackson-Coombs, Daniel Lee",
        description: "An investigation on the parameters affecting the accuracy of material property determination of aluminium using ring hoop tension tests",
        date: "© April 29, 2025",
        pdfUrl: "/pdfs/G21_GIP_MENGM5000_REPORT.pdf",
        hyperlink: "https://github.com/ein1le/gip-ddest"
      },
      {
        title: "Biomechanics of Legged Vehicles for Interplanetary Applications",
        course: "[MENGM0059] Advanced Topics in Mechanical Engineering",
        description: "Report on the biomechanical feasibility and modifications to a Boston Dynamics Spot robot for Martian applications",
        date: "February 25, 2025",
        pdfUrl: "/pdfs/BURN_2143062_pdf.pdf"
      },
      {
        title: "Richmond Building - Renewable Energy Strategy",
        course: "[MENGM0064] Renewable Energy for a Sustainable Future",
        authors: "Demetri Gaffney, Daniel Lee,Anjli Majitha",
        description: "Official proposition of renewable energy alternative solutions for the University of Bristol's Richmond Building for Scope 1-2 emissions reduction",
        date: "December 5, 2024",
        pdfUrl: "/pdfs/Renewable_Energy.pdf"
      },
      {
        title: "Multivariable and Nonlinear Control of a 2-DOF Planar Manipulator",
        course: "[MENGM0067] Multivariable and Nonlinear Control",
        authors:"Ibrahim Arekat, William Sakyi",
        description: "",
        date: "December 3, 2024",
        pdfUrl: "/pdfs/Multivariable_and_Non_Linear_Control_Report.pdf",
        hyperlink: "https://github.com/Will27-s/MultiVarControl"
      },
      {
        title: "Reduced Order Recurrent Neural Networks for Vibration Modelling",
        course: "[SEMTM0007] Data-Driven Physical Modelling",
        description: "Utilisation of reduced order methods such as DMD, and various Neural Networks including ESNs, RNNs, and NODEs for modelling impact test vibration data",
        date: "November 28, 2024",
        pdfUrl: "/pdfs/bristol-article.pdf"
      },
      {
        title: "Evolutionary Algorithms for Optimisation of Sensors for SHM Applications",
        course: "[MENG35000] Individual Research Project",
        description: "Dissertation investiating heuristic information-based convex optimisation algorithms such as genetic algorithms and particle swarm for nonlinear optimisation of sensor placements on structural beams",
        date: "© May 9, 2024",
        pdfUrl: "/pdfs/IRP_2143062_Wishawin.pdf"
      },
      {
        title: "STP Ltd. Management Portfolio",
        course: "[MENG30012] Engineering Management",
        authors:"Kabeer Dayal, Vic Komolrojanaporn,  Daniel Lee, Abdullah Monnoo, Aung Zaw Myat",
        description: "Business portfolio, including components of risk assessments, product quality management plan, shareholder brief, etc. for a planned fictional VR glasses product launch",
        date: "May 2, 2024",
        pdfUrls: [
          "/pdfs/STP/1_Organisation Brief_LocaVision.pdf",
          "/pdfs/STP/2_Concept Selection_LocaVision.pdf",
          "/pdfs/STP/3_Business Case_LocaVision.pdf",
          "/pdfs/STP/4_Communication Plan_LocaVision.pdf",
          "/pdfs/STP/5_Risk Register_LocaVision.pdf",
          "/pdfs/STP/6_Sustainability Assessment_LocaVision.pdf",
          "/pdfs/STP/7_Quality Management Plan_LocaVision.pdf"
        ]
      },
      {
        title: "Finite Element Analysis of GCU Design on LNG Carriers",
        course: "[MENGM30011] Applied Solid Mechanics",
        description: "",
        date: "December 14, 2023",
        pdfUrl: "/pdfs/ASM_2143062.pdf"
      },
      {
        title: "Deployable Solar Array Portfolio",
        course: "[MENG20006] Engineering Practice",
        authors:"Ibrahim Arekat, Kabeer Dayal, Abdullah Monnoo",
        description: "",
        date: "April 5, 2023",
        pdfUrl: "/pdfs/bristol-article.pdf"
      },
      {
        title: "Compliance and Material Properties Analysis of a Rack and Pin Hinge",
        course: "[MENG10005] Engineering Communication, Measurement, and Data Analysis",
        description: "",
        date: "May 14, 2022",
        pdfUrl: "/pdfs/bristol-article.pdf"
      },
      {
        title: "Design Portfolio",
        course: "[CENG10012] Engineering Design",
        description: "Robot Chariot and Artefact study of a SR-71 Design Report",
        date: "December 17, 2021",
        pdfUrl: "/pdfs/bristol-article.pdf"
      },
      {
        title: "DMP",
        course: "[MENG10006] Design & Manufacturing Project",
        authors: "Sophie Tan, Daniel Kim",
        description: "Concept Generation, PDS, Analytics",
        date: "July 12 2019",
        pdfUrl: "/pdfs/harrow-math.pdf"
      }
    ],
    awards: ["Bristol PLUS Award", "Bristol Skills Accelerator","Think Big Scholarship"]
  },
  {
    title: "Harrow International School",
    subheader: "Highschool",
    date: "2011 - 2021",
    location: "Bangkok, Thailand",
    grade: "A-Levels: A*A*A*, IGCSEs: 12A*s",
    logo: "https://media.licdn.com/dms/image/v2/D4E0BAQF9R3ETIKNOOQ/company-logo_100_100/company-logo_100_100/0/1695058617344/harrowschool_logo?e=1756339200&v=beta&t=pwseqxifqgkfXlfTFOGHFKrr8lFRBsh7JxPMd3xRtE4",
    hoverImage: Harrow_Banner,
    modules: [
      "A Levels: Mathematics, Physics, Biology",
      "AS Levels: Mathematics, Physics, Chemistry, Extended Project Qualification",
      "IGCSEs: Additional Mathematics, Mathematics, Physics, Chemistry, Biology, Development Studies, Geography, Thai Language, English Language, English Literature, English Second Language,Art & Design",
      "IELTs: 8.0"
    ],
    publications: [
      {
        title: "Extended Project Qualification",
        course: "SCI101",
        authors: "Emily Chan, Michael Lee",
        description: "Presented at Harrow Science Fair 2020, this project won first place.",
        date: "Mar 2020",
        pdfUrl: "/pdfs/harrow-science.pdf"
      },
      {
        title: "Internal Research Project",
        course: "MATH201",
        authors: "Sophie Tan, Daniel Kim",
        description: "Awarded at International Math Olympiad for innovative problem solving.",
        date: "Jul 2019",
        pdfUrl: "/pdfs/harrow-math.pdf"
      },
      {
        title: "Internal Research Project",
        course: "MATH201",
        authors: "Sophie Tan, Daniel Kim",
        description: "Awarded at International Math Olympiad for innovative problem solving.",
        date: "Jul 2019",
        pdfUrl: "/pdfs/harrow-math.pdf"
      }
    ],
    awards: ["Harrow Prize Distinction", "Sixth Form Mathematics Prize", "Sixth Form House Prize","Gold Scholarship","Duke of Edinburgh Silver Award"]
  }
];

export default education; 