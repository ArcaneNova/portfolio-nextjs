export const seoConfig: any = {
  titleTemplate: "%s | Md Arshad Noor",
  defaultTitle: "Md Arshad Noor - Full Stack Developer",
  description:
    "Full-stack developer specializing in web, mobile, and machine learning. Explore my portfolio, projects, technical articles, and journey.",
  canonicalUrl: "https://arshadnoor.me",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://arshadnoor.me",
    siteName: "Md Arshad Noor",
    title: "Md Arshad Noor - Full Stack Developer",
    description:
      "Full-stack developer specializing in web, mobile, and machine learning.",
    images: [
      {
        url: "https://arshadnoor.me/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Md Arshad Noor Portfolio",
        type: "image/jpeg",
      },
    ],
  },
  twitter: {
    handle: "@ArcaneNova",
    site: "@ArcaneNova",
    cardType: "summary_large_image",
  },
  robotsProps: {
    nosnippet: false,
    notranslate: false,
    noimageindex: false,
    noarchive: false,
    maxSnippet: -1,
    maxImagePreview: "large",
    maxVideoPreview: -1,
  },
};

export const pageMetadata = {
  home: {
    title: "Md Arshad Noor - Full Stack Developer",
    description:
      "Passionate full-stack developer with expertise in modern web technologies, mobile development, and machine learning.",
  },
  blog: {
    title: "Blog - Technical Articles & Insights",
    description:
      "Explore my technical blog covering web development, best practices, and insights from building production applications.",
  },
  projects: {
    title: "Projects - Featured Work",
    description:
      "View my portfolio of projects built with modern technologies including React, Next.js, TypeScript, and more.",
  },
  journey: {
    title: "My Journey - Career & Growth",
    description:
      "Follow my professional journey, milestones, challenges overcome, and continuous learning path.",
  },
  photos: {
    title: "Photos - Visual Moments",
    description: "A collection of moments from my projects, events, and experiences.",
  },
};

export const jsonLD = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Md Arshad Noor",
  url: "https://arshadnoor.me",
  image: "https://arshadnoor.me/profile.jpg",
  description:
    "Full-stack developer specializing in web, mobile, and machine learning",
  sameAs: [
    "https://github.com/ArcaneNova",
    "https://linkedin.com/in/mdarshadnoor",
    "https://twitter.com/ArcaneNova",
  ],
  jobTitle: "Full Stack Developer",
  workLocation: {
    "@type": "Place",
    name: "Remote",
  },
  knowsAbout: [
    "TypeScript",
    "React",
    "Next.js",
    "Node.js",
    "MongoDB",
    "Web Development",
    "Mobile Development",
    "Machine Learning",
  ],
};
