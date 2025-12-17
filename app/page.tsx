import Navbar from "@/components/navbar"
import HeroSection from "@/components/hero-section-new"
import AboutSection from "@/components/about-section-premium"
import WordsILiveBySection from "@/components/words-i-live-by-premium"
import JourneySection from "@/components/journey-premium"
import AchievementsSection from "@/components/achievements-premium"
import SkillsSection from "@/components/skills-premium"
import ToolsSection from "@/components/tools-premium"
import ProjectsSection from "@/components/projects-premium"
import RecentLaunchesSection from "@/components/recent-launches-section-new"
import RecentBlogSection from "@/components/recent-blog-section-new"
import ChallengesSection from "@/components/challenges-section-new"
import CodingStatsSection from "@/components/coding-stats-section-new"
import GithubSection from "@/components/github-section-new"
import ContactSection from "@/components/contact-section-new"
import WorkWithMeSection from "@/components/work-with-me-section-new"
import Footer from "@/components/footer"
import ParticleBackground from "@/components/particle-background"

export default function Home() {
  return (
    <main className="relative min-h-screen">
      <ParticleBackground />
      <Navbar />
      <HeroSection />
      <AboutSection />
      <WordsILiveBySection />
      <JourneySection />
      <AchievementsSection />
      <SkillsSection />
      <ToolsSection />
      <ProjectsSection />
      <RecentLaunchesSection />
      <RecentBlogSection />
      <ChallengesSection />
      <CodingStatsSection />
      <GithubSection />
      <ContactSection />
      <WorkWithMeSection />
      <Footer />
    </main>
  )
}
