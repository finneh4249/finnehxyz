# Finneh.xyz - Personal Portfolio

A modern, responsive portfolio website for Ethan Cornwill, showcasing skills, projects, education, and professional experience.

## 🌟 Features

- **Responsive Design** - Fully responsive layout that works on all devices
- **Dark/Light Mode** - Toggle between dark and light themes
- **Interactive UI Components** - Including:
  - Animated tech cube
  - Typing effect
  - Skill cards with proficiency indicators
  - Scroll progress bar
  - Back to top button
- **Performance Optimized** - Lazy-loaded components and optimized images
- **SEO Friendly** - Proper meta tags and semantic HTML
- **Accessibility** - ARIA attributes and keyboard navigation support

## 🛠️ Technologies

- **Frontend Framework**: React with Vite
- **Styling**: Tailwind CSS with DaisyUI
- **Animations**: Framer Motion
- **Icons**: BoxIcons
- **Analytics**: Custom analytics component

## 📋 Project Structure
```src/ 
├── components/ # React components 
│ ├── AboutMe.jsx # About me section 
│ ├── Contact.jsx # Contact form 
│ ├── Education.jsx # Education history 
│ ├── Footer.jsx # Page footer 
│ ├── Hero.jsx # Hero section 
│ ├── Navbar.jsx # Navigation bar 
│ ├── Projects.jsx # Projects showcase 
│ ├── Skills.jsx # Skills section 
│ ├── ui/ # Reusable UI components 
│ │ └── BackToTop.jsx # Back to top button 
│ └── ... 
├── contexts/ # React contexts 
├── data/ # JSON data files 
├── styles/ # CSS stylesheets 
└── utils/ # Utility functions
```

## ⚙️ Setup & Installation

1. Clone the repository

   ```bash
   git clone https://github.com/yourusername/finnehxyz.git
   cd finnehxyz
   ```

2. Install dependencies

```bash
npm install
```

3. Start the development server

```bash
npm run dev
```

4. Build for production

```bash
npm run build
```

🚀 Deployment
The site is deployed at https://finneh.xyz.

Deployment can be done via your preferred hosting service:

Netlify
Vercel
GitHub Pages
AWS Amplify

## 🔧 Customization
Adding a New Component

1. Create a new file in the appropriate directory
2. Import it in the main App.jsx or relevant parent component
3. Add any necessary data in the data/ directory

Modifying Styles

- Global styles are in src/index.css
- Component-specific styles are in css/components.css or inline with Tailwind

## 📄 License
This project is licensed under the MIT License - see the LICENSE file for details.

## 👨‍💻 Author
Ethan Cornwill - Technical Lead & Software Engineer

Portfolio: [finneh.xyz](https://finneh.xyz)
LinkedIn: [in/ethancornwill](https://linkedin.com/in/ethancornwill)
GitHub: [finneh4249](https://github.com/finneh4249)

---

Built with ❤️ using React and Vite