"use client";

import { motion } from "framer-motion";

export interface WorkExperience {
  id: string;
  company: string;
  position: string;
  startDate: string;
  endDate?: string;
  description: string;
  technologies: string[];
  achievements: string[];
  logo?: string;
}

interface ExperienceTimelineProps {
  experiences: WorkExperience[];
}

export function ExperienceTimeline({ experiences }: ExperienceTimelineProps) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants: any = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        type: "spring",
        stiffness: 50,
        damping: 15,
      },
    },
  };

  return (
    <section className="py-20 bg-gradient-to-b from-background to-background/50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <h2 className="text-4xl font-bold mb-4">Work Experience</h2>
          <p className="text-muted-foreground text-lg">
            My professional journey and key contributions
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="relative"
        >
          {/* Timeline line */}
          <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-primary via-primary/50 to-transparent top-0" />

          <div className="space-y-12">
            {experiences.map((exp, index) => (
              <motion.div
                key={exp.id}
                variants={itemVariants}
                className={`md:flex ${index % 2 === 0 ? "md:flex-row-reverse" : ""}`}
              >
                {/* Content */}
                <div className="md:w-1/2 md:px-6">
                  <div className="bg-card border border-border rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow">
                    {/* Company & Position */}
                    <div className="flex items-start gap-3 mb-2">
                      {exp.logo && (
                        <img
                          src={exp.logo}
                          alt={exp.company}
                          className="w-10 h-10 rounded object-contain"
                        />
                      )}
                      <div>
                        <h3 className="text-2xl font-bold text-primary">
                          {exp.position}
                        </h3>
                        <p className="text-lg font-semibold text-foreground">
                          {exp.company}
                        </p>
                      </div>
                    </div>

                    {/* Date Range */}
                    <p className="text-sm text-muted-foreground mb-4 font-medium">
                      {exp.startDate} - {exp.endDate || "Present"}
                    </p>

                    {/* Description */}
                    <p className="text-foreground/90 mb-4 leading-relaxed">
                      {exp.description}
                    </p>

                    {/* Achievements */}
                    {exp.achievements.length > 0 && (
                      <div className="mb-4">
                        <p className="font-semibold text-foreground mb-2">
                          Key Achievements:
                        </p>
                        <ul className="space-y-2 text-sm">
                          {exp.achievements.map((achievement) => (
                            <li
                              key={achievement}
                              className="flex gap-2 text-muted-foreground"
                            >
                              <span className="text-primary flex-shrink-0">
                                ✓
                              </span>
                              <span>{achievement}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Technologies */}
                    {exp.technologies.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {exp.technologies.map((tech) => (
                          <span
                            key={tech}
                            className="text-xs bg-primary/10 text-primary px-3 py-1 rounded-full font-medium hover:bg-primary/20 transition-colors"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* Timeline dot */}
                <div className="hidden md:flex md:w-1/2 justify-center">
                  <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 200 }}
                    className="w-4 h-4 bg-primary rounded-full ring-4 ring-background shadow-lg mt-2"
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
