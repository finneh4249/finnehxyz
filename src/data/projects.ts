export interface Project {
  title: string;
  description: string;
  detailedDescription?: string;
  image: string;
  githubUrl?: string;
  liveDemoUrl?: string;
  featured?: boolean;
  date: number;
  technologies?: string[];
  tags: {
    name: string;
    badgeClass: string;
  }[];
}

export const projects: Project[] = [
  {
    title: "PoliCRM",
    description:
      "Automated political compliance infrastructure built in 48 hours to verify 911 members against electoral rolls.",
    detailedDescription:
      "Facing a critical regulatory deadline with potentially $640k in public funding at stake, the Fusion Party needed to verify the electoral enrollment status of 911 members within a tight timeframe. PoliCRM was architected, built, and deployed in under 48 hours, providing a unified 'source of truth' that programmatically interfaced with electoral tools while maintaining data privacy.",
    challenges:
      "The party faced a strict deadline from the Victorian Electoral Commission (VEC) to prove its membership numbers, with significant funding at stake. The existing process involved manual lookups or fragile scripts that could not handle the volume or the anti-bot measures of verification portals. Legacy systems were fragmented, lacking a unified source of truth required for programmatic verification.",
    outcomes:
      "PoliCRM processed the entire database in a fraction of the time, running completely unattended overnight due to its self-healing automation daemon. It secured the party's eligibility for $640k in electoral funding and evolved from a rescue script into a stable, production-grade application for future member management.",
    image: "images/policrm.png",
    githubUrl: null,
    featured: true,
    date: 1729033200000,
    technologies: ["Python", "FastAPI", "React", "Selenium", "Docker"],
    tags: [
      { name: "Python", badgeClass: "badge-info" },
      { name: "Automation", badgeClass: "badge-warning" },
    ],
  },
  {
    title: "SPARC Framework (2025)",
    description: "AI-assisted development workflow",
    detailedDescription:
      "A proprietary orchestration system designed to automate key stages of the software development lifecycle. SPARC reduces build times by up to 75% while maintaining documentation quality and version control integrity.",
    challenges:
      "Modern software lifecycles often suffer from fragmentation between planning, coding, and testing phases. Coordinating multiple AI agents to work deterministically without context loss or 'hallucinations' required a rigid architectural enforcement layer that didn't exist in standard LLM workflows.",
    outcomes:
      "Established a rigorous, self-documenting workflow that reduces build times by 75%. The framework autonomously handles everything from specification to versioning, ensuring high code quality and maintainability while keeping documentation strictly in sync with the codebase.",
    image: "images/axion.png",
    githubUrl: "https://github.com/Finneh4249/SPARC-Framework",
    featured: true,
    date: 1728946800000,
    technologies: ["AI Agents", "React", "Node.js", "SPARC Methodology"],
    tags: [
      { name: "AI", badgeClass: "badge-secondary" },
      { name: "Framework", badgeClass: "badge-primary" },
    ],
  },
  {
    title: "Nexus (Prototype, 2025)",
    description: "Financial wellness platform for couples",
    detailedDescription:
      "A next-generation web application that helps couples track, plan, and manage shared finances with empathy and transparency. Focused on user-centered design, ethical data handling, and meaningful engagement.",
    challenges:
      "Designing a financial interface that encourages transparency between partners without causing friction or anxiety. Technical challenges included securely syncing sensitive financial data in real-time across devices while adhering to strict privacy standards and maintaining a non-judgmental UX.",
    outcomes:
      "Created a safe digital space for financial planning that improves user financial literacy and communication. The prototype demonstrated the viability of an 'empathy-first' approach to fintech, balancing robust security with an accessible, human-centric design system.",
    image: "images/axion.png",
    githubUrl: "https://github.com/Finneh4249/Nexus-App",
    featured: false,
    date: 1728946800000,
    technologies: ["Full-Stack", "FinTech", "UX/UI"],
    tags: [
      { name: "FinTech", badgeClass: "badge-success" },
      { name: "Web App", badgeClass: "badge-info" },
    ],
  },
  {
    title: "PokerBo",
    description:
      "A casino card game that is a mix of Poker and Sicbo, created with Javascript",
    detailedDescription:
      "PokerBo combines elements of traditional poker with the dice game Sicbo, creating a unique gambling experience. The game features a custom-built user interface and betting system, all implemented in vanilla JavaScript.",
    challenges:
      "Balancing the game mechanics of two distinct games (Poker and Sicbo) into a cohesive rule set that felt fair. Implementing complex betting logic, state management, and win-condition evaluation in vanilla JavaScript without the state management aids of modern frameworks.",
    outcomes:
      "Successfully created a unique hybrid game with a responsive, custom UI. The project served as a deep dive into DOM manipulation and game loop logic, resulting in a playable web experience that handles complex user interactions and state updates smoothly.",
    image:
      "https://opengraph.githubassets.com/ac2cc951a3b599eef902e862b97033a4576240e1447ca579b4505d41778eb107/Finneh4249/PokerBo",
    githubUrl: "https://github.com/finneh4249/pokerbo",
    liveDemoUrl: "https://finneh.xyz/pokerbo",
    featured: false,
    date: 1708243200000,
    technologies: ["JavaScript", "HTML5", "CSS3"],
    tags: [{ name: "JavaScript", badgeClass: "badge-primary" }],
  },
  {
    title: "City Loopers",
    description:
      "A Greylisted City build Minecraft server and Discord Community administrated by me",
    detailedDescription:
      "City Loopers is a community-driven Minecraft server focused on urban city building. It features custom plugins, an active Discord community, and dedicated server management. I handle technical administration and community moderation.",
    challenges:
      "Managing a greylisted community requiring strict moderation tools and anti-griefing measures. Integrating in-game Minecraft server events with external Discord APIs for seamless cross-platform communication and user verification.",
    outcomes:
      "Built a thriving, safe community for urban builders with a stable technical infrastructure. The custom integration tools streamlined administration, allowing staff to focus on community engagement rather than manual user management.",
    image:
      "https://opengraph.githubassets.com/ac2cc951a3b599eef902e862b97033a4576240e1447ca579b4505d41778eb107/CityLoopers/CityLoopersMC",
    githubUrl: "https://github.com/cityloopers/CityLoopersMC",
    liveDemoUrl: "https://cityloopers.com",
    featured: false,
    date: 1709683200000,
    technologies: ["Java", "Spigot", "Discord.js"],
    tags: [{ name: "Minecraft", badgeClass: "badge-secondary" }],
  },
  {
    title: "Aometry",
    description:
      "A custom and modular discord bot framework build on Discord.JS v13.",
    detailedDescription:
      "Aometry is a robust framework designed to simplify the creation of Discord bots. It abstracts away common boilerplate, providing a modular structure for command handling, event listeners, and configuration management.",
    challenges:
      "Abstracting the repetitive boilerplate of Discord.js v13 into a flexible architecture that could support various bot types. Handling dynamic command registration and ensuring the framework remained performant while managing multiple event listeners.",
    outcomes:
      "Drastically reduced setup time for new bot projects. The framework allows developers to focus on feature logic rather than API connectivity, standardizing development practices and improving code maintainability.",
    image:
      "https://opengraph.githubassets.com/ac2cc951a3b599eef902e862b97033a4576240e1447ca579b4505d41778eb107/CityLoopers/Aometry",
    githubUrl: "https://github.com/CityLoopers/Aometry",
    date: 1625270400000,
    technologies: ["Node.js", "Discord.js", "JavaScript"],
    tags: [{ name: "Discord.js", badgeClass: "badge-accent" }],
  },
  {
    title: "F1 Results Tracker",
    description:
      "A terminal application that allows users to view and track Formula 1 race results.",
    detailedDescription:
      "This CLI application provides a fast and efficient way to query historical Formula 1 race data. It interacts with a local SQLite database to store and retrieve race results, driver standings, and team performance.",
    challenges:
      "Designing an intuitive Command Line Interface (CLI) for browsing complex hierarchical data (Seasons > Races > Drivers). Optimizing SQLite queries to ensure instant data retrieval and efficient storage of historical statistics.",
    outcomes:
      "Delivered a lightweight, fast tool for F1 enthusiasts that runs on any system with Python. It demonstrated efficient database schema design and the ability to create compelling user experiences without a graphical interface.",
    image:
      "https://opengraph.githubassets.com/ac2cc951a3b599eef902e862b97033a4576240e1447ca579b4505d41778eb107/finneh4249/F1-Results-Tracker",
    githubUrl: "https://github.com/finneh4249/F1-Results-Tracker",
    date: 1720396800000,
    technologies: ["Python", "SQLite"],
    tags: [
      { name: "Python", badgeClass: "badge-info" },
      { name: "SQLite", badgeClass: "badge-success" },
    ],
  },
  {
    title: "WeatherWise",
    description:
      "A modern weather application that provides real-time weather updates and forecasts.",
    detailedDescription:
      "WeatherWise offers a clean, modern interface for tracking weather conditions. It features real-time updates, hourly forecasts, and location-based searching, all wrapped in a responsive design optimized for both mobile and desktop.",
    challenges:
      "Aggregating data from external weather APIs while handling rate limits and data inconsistency. Designing a responsive UI that presents dense meteorological data clearly across different device sizes without clutter.",
    outcomes:
      "A robust, user-friendly weather application that provides accurate, real-time updates. The project highlighted effective API integration strategies and the implementation of clean, accessible UI design principles.",
    image:
      "https://opengraph.githubassets.com/ac2cc951a3b599eef902e862b97033a4576240e1447ca579b4505d41778eb107/finneh4249/hackathon",
    githubUrl: "https://github.com/finneh4249/hackathon",
    date: 1734124800000,
    technologies: ["JavaScript", "CSS", "API Integration"],
    tags: [
      { name: "Weather App", badgeClass: "badge-primary" },
      { name: "Team Project", badgeClass: "badge-secondary" },
    ],
  },
  {
    title: "OpenNewPOS6",
    description:
      "An educational project recreating the NP6 POS system used by McDonald's Australia.",
    detailedDescription:
      "This project is a faithful recreation of the proprietary Point of Sale system used in McDonald's Australia. Built for educational purposes, it replicates the user interface and core workflows of the enterprise system using standard web technologies.",
    challenges:
      "Reverse-engineering the complex UX/UI of a proprietary enterprise POS system solely from observation. Replicating intricate state flows (order management, modifiers, payment processing) using only frontend web technologies.",
    outcomes:
      "Created a highly accurate educational replica that serves as an effective training tool. It showcased the power of HTML, CSS, and JavaScript to mimic high-performance desktop applications and handle complex application state.",
    image:
      "https://opengraph.githubassets.com/ac2cc951a3b599eef902e862b97033a4576240e1447ca579b4505d41778eb107/finneh4249/OpenNewPOS6",
    githubUrl: "https://github.com/finneh4249/OpenNewPOS6",
    date: 1732320000000,
    technologies: ["HTML", "CSS", "JavaScript"],
    tags: [
      { name: "HTML/CSS", badgeClass: "badge-warning" },
      { name: "JavaScript", badgeClass: "badge-primary" },
    ],
  },
  {
    title: "Merry Berry Acai",
    description: "A full-stack solution for a smoothie & açaí shop.",
    detailedDescription:
      "A comprehensive e-commerce platform designed for a smoothie and açaí shop. It features a custom ordering system, menu management, and a streamlined checkout process tailored for health-conscious customers.",
    challenges:
      "Building a custom e-commerce flow that accommodates complex customization options (toppings, bases, allergies) for food items. Ensuring the checkout process was frictionless to minimize cart abandonment while managing inventory states.",
    outcomes:
      "Delivered a polished online ordering platform that streamlined the shop's operations. The system improved order accuracy and customer satisfaction through its intuitive customization interface and reliable backend processing.",
    image:
      "https://repository-images.githubusercontent.com/640027341/cdd6e617-a936-47d3-bc91-14cc88c9d20b",
    githubUrl: "https://github.com/merry-berry-acai",
    date: 1739664000000,
    technologies: ["Full-Stack", "E-commerce", "Web Development"],
    tags: [
      { name: "Full-stack", badgeClass: "badge-accent" },
      { name: "E-commerce", badgeClass: "badge-info" },
      { name: "Team Project", badgeClass: "badge-secondary" },
    ],
  },
  {
    title: "MunchRun",
    description:
      "A food delivery platform for Melbourne with zero commission for restaurants.",
    detailedDescription:
      "MunchRun is an ethical food delivery platform designed to disrupt the gig economy. It offers zero commission for restaurants, fair compensation for drivers, and transparent pricing for customers, built on a scalable tech stack.",
    challenges:
      "Competing with established giants by offering a different economic model while maintaining feature parity. Coordinating real-time logistics between restaurants, drivers, and customers with minimal latency and high reliability.",
    outcomes:
      "Validated a fair-trade delivery model with a functional platform. The project provided a local alternative that supported small businesses, proving the technical and operational viability of a zero-commission architecture.",
    image:
      "https://repository-images.githubusercontent.com/627035887/ba268172-7344-41f1-b4b0-9e8f0705208d",
    githubUrl: "https://github.com/munchrun-app",
    date: 1586822400000,
    technologies: ["App Development", "Real-time Systems", "Logistics"],
    tags: [
      { name: "App Development", badgeClass: "badge-secondary" },
      { name: "Food Delivery", badgeClass: "badge-success" },
      { name: "Team Project", badgeClass: "badge-secondary" },
    ],
  },
  {
    title: "EdgeBrowser",
    description: "A custom web browser built with Visual Basic in 2012.",
    detailedDescription:
      "EdgeBrowser was one of my first significant programming projects, created in 2012. Built using Visual Basic and Windows Forms, this application demonstrates my early interest in desktop application development and user interface design.",
    challenges:
      "Implementing core browser features (rendering, navigation, history) using legacy .NET framework components. Managing memory usage and event handling within the constraints of the Visual Basic environment.",
    outcomes:
      "A functional, custom web browser that marked a personal milestone in software development. It laid the foundational understanding of application lifecycle, UI event handling, and object-oriented programming that informs my current work.",
    image:
      "https://opengraph.githubassets.com/ac2cc951a3b599eef902e862b97033a4576240e1447ca579b4505d41778eb107/FinnehPleh/EdgeBrowser",
    githubUrl: "https://github.com/FinnehPleh/EdgeBrowser",
    date: 1345766400000,
    technologies: ["Visual Basic", "Windows Forms", ".NET Framework"],
    tags: [
      { name: "Visual Basic", badgeClass: "badge-warning" },
      { name: "Legacy", badgeClass: "badge-neutral" },
      { name: "Desktop App", badgeClass: "badge-info" },
    ],
  },
];
