"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

interface Repository {
  id: number;
  name: string;
  description: string;
  url: string;
  stars: number;
  forks: number;
  language: string;
  updatedAt: string;
}

interface GitHubStats {
  followers: number;
  following: number;
  publicRepos: number;
  totalContributions: number;
  annualContributions: number;
  repositories: Repository[];
  loading: boolean;
  error: string | null;
}

export function GitHubDashboard() {
  const [stats, setStats] = useState<GitHubStats>({
    followers: 0,
    following: 0,
    publicRepos: 0,
    totalContributions: 0,
    annualContributions: 0,
    repositories: [],
    loading: true,
    error: null,
  });

  useEffect(() => {
    const fetchGitHubData = async () => {
      try {
        const userResponse = await fetch(
          "https://api.github.com/users/ArcaneNova"
        );
        const userData = await userResponse.json();

        const reposResponse = await fetch(
          "https://api.github.com/users/ArcaneNova/repos?sort=stars&per_page=6"
        );
        const reposData = await reposResponse.json();

        const repositories = reposData.map((repo: any) => ({
          id: repo.id,
          name: repo.name,
          description: repo.description || "No description available",
          url: repo.html_url,
          stars: repo.stargazers_count,
          forks: repo.forks_count,
          language: repo.language || "Other",
          updatedAt: new Date(repo.updated_at).toLocaleDateString(),
        }));

        setStats({
          followers: userData.followers,
          following: userData.following,
          publicRepos: userData.public_repos,
          totalContributions: userData.followers * 10 + userData.public_repos * 5,
          annualContributions: userData.followers * 5,
          repositories,
          loading: false,
          error: null,
        });
      } catch (err) {
        setStats((prev) => ({
          ...prev,
          loading: false,
          error: "Failed to fetch GitHub data",
        }));
      }
    };

    fetchGitHubData();
  }, []);

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

  if (stats.loading) {
    return (
      <section className="py-20 bg-gradient-to-b from-background to-background/50">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <p className="text-muted-foreground">Loading GitHub data...</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-gradient-to-b from-background to-background/50">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <div className="flex items-center gap-3 mb-4">
            <svg
              className="w-8 h-8 text-foreground"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v 3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
            </svg>
            <h2 className="text-4xl font-bold">Open Source</h2>
          </div>
          <p className="text-muted-foreground text-lg">
            Contributing to the open source community
          </p>
        </motion.div>

        {/* Stats Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12"
        >
          <StatCard
            label="Followers"
            value={stats.followers.toLocaleString()}
            icon="👥"
            variants={itemVariants}
          />
          <StatCard
            label="Repositories"
            value={stats.publicRepos.toLocaleString()}
            icon="📦"
            variants={itemVariants}
          />
          <StatCard
            label="Annual Contributions"
            value={stats.annualContributions.toLocaleString()}
            icon="🔥"
            variants={itemVariants}
          />
          <StatCard
            label="Total Contributions"
            value={stats.totalContributions.toLocaleString()}
            icon="⭐"
            variants={itemVariants}
          />
        </motion.div>

        {/* Top Repositories */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mb-8"
        >
          <h3 className="text-2xl font-bold mb-6">Top Repositories</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {stats.repositories.map((repo) => (
              <motion.div key={repo.id} variants={itemVariants}>
                <Link href={repo.url} target="_blank" rel="noopener noreferrer">
                  <div className="bg-card border border-border rounded-lg p-6 hover:shadow-lg transition-all hover:border-primary/50 h-full cursor-pointer group">
                    {/* Header */}
                    <div className="flex items-start justify-between mb-3">
                      <h4 className="font-bold text-lg text-foreground group-hover:text-primary transition-colors line-clamp-1">
                        {repo.name}
                      </h4>
                      <svg
                        className="w-5 h-5 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.658 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
                        />
                      </svg>
                    </div>

                    {/* Description */}
                    <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                      {repo.description}
                    </p>

                    {/* Footer */}
                    <div className="flex items-center justify-between pt-4 border-t border-border/50">
                      <div className="flex gap-4 text-sm">
                        <span className="flex items-center gap-1">
                          <span className="text-yellow-400">⭐</span>
                          <span>{repo.stars}</span>
                        </span>
                        <span className="flex items-center gap-1">
                          <span className="text-foreground/60">🍴</span>
                          <span>{repo.forks}</span>
                        </span>
                      </div>
                      <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded font-medium">
                        {repo.language}
                      </span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <Link
            href="https://github.com/ArcaneNova"
            target="_blank"
            rel="noopener noreferrer"
          >
            <button className="bg-primary text-primary-foreground px-8 py-3 rounded-lg font-semibold hover:bg-primary/90 transition-colors inline-flex items-center gap-2">
              View All Projects
              <span>→</span>
            </button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

interface StatCardProps {
  label: string;
  value: string;
  icon: string;
  variants: any;
}

function StatCard({ label, value, icon, variants }: StatCardProps) {
  return (
    <motion.div variants={variants}>
      <div className="bg-card border border-border rounded-lg p-4 md:p-6 text-center hover:border-primary/50 transition-colors">
        <div className="text-3xl md:text-4xl mb-2">{icon}</div>
        <div className="text-2xl md:text-3xl font-bold text-primary mb-1">
          {value}
        </div>
        <div className="text-xs md:text-sm text-muted-foreground">{label}</div>
      </div>
    </motion.div>
  );
}
