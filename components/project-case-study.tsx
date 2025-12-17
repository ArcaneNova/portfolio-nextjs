"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

interface CaseStudy {
  id: string;
  title: string;
  projectDescription: string;
  challenge: string;
  solution: string;
  results: Array<{
    metric: string;
    value: string;
  }>;
  keyLearnings: string[];
  codeSnippets: Array<{
    title: string;
    language: string;
    code: string;
  }>;
  images: {
    before?: string;
    after?: string;
    screenshots: string[];
  };
  technologies: string[];
  timeline?: string;
  teamSize?: string;
  role?: string;
}

interface ProjectCaseStudyProps {
  caseStudy: CaseStudy;
}

export function ProjectCaseStudyTemplate({ caseStudy }: ProjectCaseStudyProps) {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants: any = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 50, damping: 15 },
    },
  };

  return (
    <main className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-primary/10 to-background py-20">
        <div className="container mx-auto px-4">
          <Link href="/projects">
            <Button variant="ghost" className="mb-6">
              ← Back to Projects
            </Button>
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-4">
              {caseStudy.title}
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              {caseStudy.projectDescription}
            </p>

            {/* Meta Info */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {caseStudy.role && (
                <div>
                  <p className="text-sm text-muted-foreground">Role</p>
                  <p className="font-semibold text-foreground">
                    {caseStudy.role}
                  </p>
                </div>
              )}
              {caseStudy.timeline && (
                <div>
                  <p className="text-sm text-muted-foreground">Timeline</p>
                  <p className="font-semibold text-foreground">
                    {caseStudy.timeline}
                  </p>
                </div>
              )}
              {caseStudy.teamSize && (
                <div>
                  <p className="text-sm text-muted-foreground">Team Size</p>
                  <p className="font-semibold text-foreground">
                    {caseStudy.teamSize}
                  </p>
                </div>
              )}
              <div>
                <p className="text-sm text-muted-foreground">
                  Technologies
                </p>
                <p className="font-semibold text-foreground">
                  {caseStudy.technologies.length} Tools
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Challenge Section */}
      <motion.section
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="py-16 border-b border-border"
      >
        <div className="container mx-auto px-4">
          <motion.div variants={itemVariants}>
            <h2 className="text-3xl font-bold mb-6 text-primary">
              The Challenge
            </h2>
            <p className="text-lg text-foreground/90 leading-relaxed">
              {caseStudy.challenge}
            </p>
          </motion.div>
        </div>
      </motion.section>

      {/* Solution Section */}
      <motion.section
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="py-16 border-b border-border"
      >
        <div className="container mx-auto px-4">
          <motion.div variants={itemVariants}>
            <h2 className="text-3xl font-bold mb-6 text-primary">
              Solution
            </h2>
            <p className="text-lg text-foreground/90 leading-relaxed mb-8">
              {caseStudy.solution}
            </p>
          </motion.div>

          {/* Screenshots */}
          {caseStudy.images.screenshots.length > 0 && (
            <motion.div variants={itemVariants} className="mt-8">
              <h3 className="text-xl font-semibold mb-4">Implementation</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {caseStudy.images.screenshots.map((img, idx) => (
                  <motion.img
                    key={idx}
                    src={img}
                    alt="Project screenshot"
                    className="rounded-lg border border-border cursor-pointer hover:border-primary/50 transition-colors"
                    onClick={() => setSelectedImage(img)}
                    whileHover={{ scale: 1.02 }}
                  />
                ))}
              </div>
            </motion.div>
          )}
        </div>
      </motion.section>

      {/* Results Section */}
      <motion.section
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="py-16 border-b border-border"
      >
        <div className="container mx-auto px-4">
          <motion.h2 variants={itemVariants} className="text-3xl font-bold mb-8 text-primary">
            Results
          </motion.h2>
          <motion.div
            variants={containerVariants}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {caseStudy.results.map((result) => (
              <motion.div
                key={result.metric}
                variants={itemVariants}
                className="bg-gradient-to-br from-primary/10 to-primary/5 p-6 rounded-lg border border-primary/20"
              >
                <div className="text-4xl md:text-5xl font-bold text-primary mb-2">
                  {result.value}
                </div>
                <div className="text-foreground/70">{result.metric}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* Key Learnings Section */}
      <motion.section
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="py-16 border-b border-border"
      >
        <div className="container mx-auto px-4">
          <motion.h2 variants={itemVariants} className="text-3xl font-bold mb-8 text-primary">
            Key Learnings
          </motion.h2>
          <motion.ul variants={containerVariants} className="space-y-4">
            {caseStudy.keyLearnings.map((learning) => (
              <motion.li
                key={learning}
                variants={itemVariants}
                className="flex gap-4 items-start"
              >
                <span className="text-primary text-2xl flex-shrink-0 mt-1">
                  ✓
                </span>
                <span className="text-foreground/90 text-lg">{learning}</span>
              </motion.li>
            ))}
          </motion.ul>
        </div>
      </motion.section>

      {/* Technologies Section */}
      <motion.section
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="py-16 border-b border-border"
      >
        <div className="container mx-auto px-4">
          <motion.h2 variants={itemVariants} className="text-3xl font-bold mb-8 text-primary">
            Technologies Used
          </motion.h2>
          <motion.div
            variants={containerVariants}
            className="flex flex-wrap gap-3"
          >
            {caseStudy.technologies.map((tech) => (
              <motion.span
                key={tech}
                variants={itemVariants}
                className="px-4 py-2 bg-primary/10 text-primary rounded-full font-medium border border-primary/20 hover:border-primary/50 transition-colors"
              >
                {tech}
              </motion.span>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* Code Snippets Section */}
      {caseStudy.codeSnippets.length > 0 && (
        <motion.section
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="py-16"
        >
          <div className="container mx-auto px-4">
            <motion.h2
              variants={itemVariants}
              className="text-3xl font-bold mb-8 text-primary"
            >
              Key Code Snippets
            </motion.h2>
            <motion.div
              variants={containerVariants}
              className="space-y-8"
            >
              {caseStudy.codeSnippets.map((snippet) => (
                <motion.div key={snippet.title} variants={itemVariants}>
                  <h3 className="text-lg font-bold mb-3 text-foreground">
                    {snippet.title}
                  </h3>
                  <pre className="bg-slate-950 text-slate-50 p-4 rounded-lg overflow-x-auto border border-border">
                    <code className="text-sm">{snippet.code}</code>
                  </pre>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.section>
      )}

      {/* Image Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={selectedImage}
              alt="Full size"
              className="max-w-4xl w-full rounded-lg"
            />
          </motion.div>
        </div>
      )}
    </main>
  );
}
