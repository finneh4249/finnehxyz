/**
 * SEO utility functions for managing meta tags and structured data
 */

// Base site configuration
const siteMeta = {
  siteName: "finnehxyz",
  baseTitle: "Ethan Cornwill - Software Engineer",
  baseDescription: "Ethan Cornwill is a software engineer specializing in web development, data visualization, and building efficient digital experiences.",
  siteUrl: "https://finneh.xyz",
  twitterHandle: "@ethancornwill",
  language: "en",
  themeColor: "#3b82f6"
};

/**
 * Generates basic SEO meta tags
 * @param {Object} config - Configuration object
 * @returns {Object} Meta tags object
 */
export const getBasicMeta = ({
  title = siteMeta.baseTitle,
  description = siteMeta.baseDescription,
  canonical = siteMeta.siteUrl,
  noindex = false
}) => {
  const fullTitle = title === siteMeta.baseTitle 
    ? title
    : `${title} | ${siteMeta.siteName}`;
  
  return {
    title: fullTitle,
    meta: [
      { name: "description", content: description },
      { name: "robots", content: noindex ? "noindex, nofollow" : "index, follow" },
      { name: "language", content: siteMeta.language },
      { name: "theme-color", content: siteMeta.themeColor },
      { property: "og:title", content: fullTitle },
      { property: "og:description", content: description },
      { property: "og:url", content: canonical },
      { property: "og:type", content: "website" },
      { property: "og:site_name", content: siteMeta.siteName },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:creator", content: siteMeta.twitterHandle },
      { name: "twitter:title", content: fullTitle },
      { name: "twitter:description", content: description },
    ],
    link: [
      { rel: "canonical", href: canonical }
    ]
  };
};

/**
 * Generates SEO meta tags for a specific section
 * @param {string} sectionId - The ID of the current section
 * @returns {Object} Section-specific meta tags
 */
export const getSectionMeta = (sectionId) => {
  // Define section-specific meta data
  const sectionMeta = {
    // Home section
    home: {
      title: siteMeta.baseTitle,
      description: siteMeta.baseDescription
    },
    // About section
    about: {
      title: "About Me",
      description: "Learn about Ethan Cornwill's background, skills, and professional journey in software development."
    },
    // Professional Experience section
    professionalExperience: {
      title: "Professional Experience",
      description: "Explore Ethan Cornwill's professional experience and career achievements in software engineering."
    },
    // Education section
    education: {
      title: "Education",
      description: "Information about Ethan Cornwill's educational background, degrees, and academic achievements."
    },
    // Skills section
    skills: {
      title: "Skills & Technologies",
      description: "Discover the programming languages, frameworks, and tools that Ethan Cornwill specializes in."
    },
    // Projects section
    projects: {
      title: "Projects",
      description: "View Ethan Cornwill's portfolio of software projects, applications, and development work."
    },
    // Contact section
    contact: {
      title: "Contact",
      description: "Get in touch with Ethan Cornwill for collaborations, job opportunities, or project inquiries."
    },
    // Testimonials section
    testimonials: {
      title: "Testimonials",
      description: "Read what colleagues and clients have to say about working with Ethan Cornwill on software development projects."
    }
  };

  // Return meta data for the specified section or default meta
  return getBasicMeta(sectionMeta[sectionId] || {});
};

/**
 * Generates JSON-LD structured data
 * @param {string} type - Type of structured data
 * @param {Object} data - Additional data for structured data
 * @returns {Object} Structured data object
 */
export const getStructuredData = (type, data = {}) => {
  const baseData = {
    '@context': 'https://schema.org',
  };
  
  switch (type) {
    case 'Person':
      return {
        ...baseData,
        '@type': 'Person',
        name: 'Ethan Cornwill',
        url: siteMeta.siteUrl,
        jobTitle: 'Software Engineer',
        ...data
      };
      
    case 'WebSite':
      return {
        ...baseData,
        '@type': 'WebSite',
        name: siteMeta.siteName,
        url: siteMeta.siteUrl,
        ...data
      };
      
    default:
      return baseData;
  }
};

/**
 * Generates a canonical URL for the current path
 * @param {string} path - Current path
 * @returns {string} Canonical URL
 */
export const getCanonicalUrl = (path = '') => {
  const baseUrl = siteMeta.siteUrl.replace(/\/$/, '');
  const pathWithoutLeadingSlash = path.replace(/^\//, '');
  return pathWithoutLeadingSlash ? `${baseUrl}/${pathWithoutLeadingSlash}` : baseUrl;
};

export default {
  siteMeta,
  getBasicMeta,
  getSectionMeta,
  getStructuredData,
  getCanonicalUrl
};
