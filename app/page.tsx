import Navbar from "@/components/navbar"
import HeroSection from "@/components/hero-section"
import AboutSection from "@/components/about-section"
import WordsILiveBySection from "@/components/words-i-live-by-section"
import JourneySection from "@/components/journey-section"
import AchievementsSection from "@/components/achievements-section"
import SkillsSection from "@/components/skills-section"
import ToolsSection from "@/components/tools-section"
import ProjectsSection from "@/components/projects-section"
import RecentLaunchesSection from "@/components/recent-launches-section"
import ChallengesSection from "@/components/challenges-section"
import CodingStatsSection from "@/components/coding-stats-section"
import GithubSection from "@/components/github-section"
import CodingPlatformsSection from "@/components/coding-platforms-section"
import ContactSection from "@/components/contact-section"
import WorkWithMeSection from "@/components/work-with-me-section"
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
      {/* <SkillsSection /> */}
      <ToolsSection />
      <ProjectsSection />
      <RecentLaunchesSection />
      <ChallengesSection />
      <CodingStatsSection />
      <GithubSection />
      <CodingPlatformsSection />
      <ContactSection />
      <WorkWithMeSection />
      <Footer />
    </main>
  )
}
