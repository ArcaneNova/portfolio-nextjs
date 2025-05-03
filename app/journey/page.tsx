"use client"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "@/lib/framer-exports"
import { useInView } from "react-intersection-observer"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ChevronLeft, Trophy, CalendarDays, ExternalLink, Sparkles, Quote } from "lucide-react"
import HeaderSection from "@/components/header-section"
import ParticleBackground from "@/components/particle-background"
import Footer from "@/components/footer"
import Navbar from "@/components/navbar"

interface JourneyItem {
  year: string
  title: string
  description: string
  achievement: string
  color: string
  icon: string
  image: string
}

const journeyData: JourneyItem[] = [
  {
    year: '2013',
    title: 'Early Fascination with Technology',
    description: 'Since my childhood I had a keen interest in computers and technology. I learned to use computers when I was in 1st standard. My uncle had a xerox photocopy shop and after school I often spent my time learning computer skills and doing simple tasks like downloading and printing, nothing more fancy. When a teacher asked in GK class what I wanted to become, I used to say "I want to become a software engineer," even though I didn\'t know the definition of a software engineer and had just heard the term from my friend. Alhamdulillah, today that dream has become reality. Everytime I think about this, I feel so blessed and it gives me energy.',
    achievement: 'First interaction with computers in 1st standard',
    color: 'from-blue-400 to-indigo-600',
    icon: '💻',
    image: '/journey/childhood.jpg'
  },
  {
    year: '2014-2016',
    title: 'Digital Explorer & First Website',
    description: 'I started my internet journey in 2014 and created my first Facebook account with help from my friend Aftab Chand. After using Facebook for some time, I started understanding how Google, Facebook, and other websites worked. I wondered if I could build a custom website for myself, just to show off. I wasn\'t good in English, so when I searched on Google about how to create a website, the articles were only available in English and I had neither technical knowledge nor English skills to understand them. I created a blogspot website on Blogger (Google\'s platform) and started posting random general knowledge content. Fortunately, I was studying in an English-medium school, so over time I was able to understand English better. By reading articles, I managed to build my first website on May 16, 2016. I launched blogginghindi.com which was built on WordPress and I started writing articles to earn money from the internet.',
    achievement: 'Created first website on May 16, 2016',
    color: 'from-indigo-500 to-purple-600',
    icon: '🌐',
    image: '/journey/digital.jpg'
  },
  {
    year: '2018',
    title: 'First Earnings & Google Conference',
    description: 'After working consistently for 2 years and writing more than 300 articles on my website, I received my first payment in 2018. I was very happy because this was my life\'s first earning, around $100+. At the same time, other people who were doing full-time blogging were earning more than 2 lakh rupees monthly. But since I was studying, I couldn\'t do full-time blogging. I didn\'t want to give up on education at such an early age. I attended a Google Search Conference hosted by Google, which was a magical moment for me. I had always dreamed of working with Google, and somehow I was able to contribute to Google, which is why we received an invitation. My friend Aftab Chand and I went to Patna. This was the first time I left my city. I was doing all these things out of curiosity; otherwise, I wouldn\'t even have fit in with the group of older people—I was the youngest one there.',
    achievement: 'First income from digital content',
    color: 'from-pink-500 to-red-600',
    icon: '💰',
    image: '/journey/earnings.jpg'
  },
  {
    year: '2019',
    title: 'First Laptop & Server Management',
    description: 'I passed my 10th examination and purchased my first laptop, proudly using my own earned money. That same year, I got the highest traffic on my website. In a single day, I generated $348 (around 20,000+ INR), but my website server went down because of the high traffic. Since my 10th exam was about to be held, I had to give up my phone and everything for 2 months. I couldn\'t migrate the server, so the website\'s traffic declined (because Google doesn\'t rank unavailable websites). It was a golden opportunity—if I had been able to capitalize on it, I could easily have made 10 lakh rupees monthly from that traffic. Other bloggers (from Odisha and other states) grabbed similar opportunities and made more than 10 lakh rupees per month at that time. I missed this opportunity because I had no laptop, and managing a website from a mobile phone was impossible. Later, I migrated my website to Digital Ocean servers to handle millions of visitors simultaneously.',
    achievement: 'Website reached peak traffic',
    color: 'from-red-500 to-orange-600',
    icon: '💻',
    image: '/journey/laptop.jpg'
  },
  {
    year: '2020',
    title: 'Pandemic Opportunity',
    description: 'In 2020, when lockdown occurred, I was preparing for the JEE Mains examination. My coaching center was closed with no classes running. I decided to create a new website focusing on government schemes. The government was launching many new schemes (like sending money to people\'s accounts), and people were searching for information on Google. So I created a website where I wrote about these government schemes. After consistent day and night work, the website became successful with more than 100K daily visitors. I earned between 70K to 150K+ rupees monthly. Some others were able to generate more than 20 lakh rupees monthly on similar topics.',
    achievement: 'Created successful government schemes website',
    color: 'from-orange-500 to-yellow-600',
    icon: '🔍',
    image: '/journey/pandemic.jpg'
  },
  {
    year: '2021',
    title: 'First Startup Attempt',
    description: 'Since I was generating a good amount of money, I got a great idea and decided to start working on it. I formed a small team and began developing my startup idea. The concept was to build an EdTech startup for all state board students in India. Every state has its own education board like Bihar Board, UP Board, etc. My idea was to provide study materials for students from all these different boards. My team and I started working on this idea from my home. We worked 15+ hours daily to achieve our target. I passed my 12th exam in 2021, but took a 1-year break for JEE preparation and to work on this idea.',
    achievement: 'Formed a team for EdTech startup',
    color: 'from-yellow-500 to-green-600',
    icon: '🚀',
    image: '/journey/startup.jpg'
  },
  {
    year: '2022',
    title: 'Pivot to Education',
    description: 'After working for a year on this idea, we weren\'t able to achieve our target. My team was small and the idea was very big—even giants like Byju\'s aren\'t able to work on such a broad scope. The startup failed, and I had invested more than 5 lakh rupees in this idea. My government scheme website\'s traffic was also declining, and my earnings were decreasing month by month. I decided to pursue education because I knew learning new skills would be best; I could earn a good amount now, but that might not be sustainable in the future. So I took admission at Lovely Professional University. In my first year, I spent too much time and energy on unnecessary things. But everything happens for a reason. Maybe Allah wanted to test me, so He put me through difficulties. Nevertheless, we should learn from our mistakes—everything is written.',
    achievement: 'Started Bachelor\'s in Computer Science',
    color: 'from-green-500 to-teal-600',
    icon: '📚',
    image: '/journey/education.jpg'
  },
  {
    year: '2023',
    title: 'Balancing Act',
    description: 'In college, I tried to manage my studies while continuing work on my side projects. Managing studies, especially when pursuing computer science engineering, is very challenging. You have to learn new programming languages and tackle new concepts. Since I had good experience with technologies and knew programming languages like PHP, JavaScript (a little), HTML, CSS, etc., I was good at programming. However, I struggled with soft skills and couldn\'t speak confidently in front of people. I also performed only at an average level in theoretical subjects.',
    achievement: 'Applied past tech experience to college studies',
    color: 'from-teal-500 to-cyan-600',
    icon: '⚖️',
    image: '/journey/balance.jpg'
  },
  {
    year: '2024',
    title: 'Tech Exploration',
    description: 'I explored many programming languages and deepened my web development skills. Since I already had a good foundation in web development and was working on numerous web development projects, I decided to take machine learning as my minor subject in college. They teach artificial intelligence and machine learning courses going forward, which is crucial as machine learning is the future.',
    achievement: 'Chose Machine Learning as minor specialization',
    color: 'from-cyan-500 to-blue-600',
    icon: '🔬',
    image: '/journey/tech.jpg'
  },
  {
    year: '2025',
    title: 'Skill Integration',
    description: 'I now have good experience in web development, machine learning, and app development (Android and iOS). I have a solid foundation in DevOps and Cloud Engineering. I try to keep learning because I know in tech, everything is linked together. To build a complete product, I need knowledge across different skills. But mastering everything is impossible for any human being, so I create priority lists and focus on the most important things.',
    achievement: 'Integrated multiple technology domains',
    color: 'from-blue-500 to-indigo-600',
    icon: '🔄',
    image: '/journey/integration.jpg'
  },
  {
    year: 'Now',
    title: 'Continuous Growth',
    description: 'I am continuously learning DSA because it is the foundation for building logical solutions in the programming world. It makes you a better software engineer and enables you to build things from scratch without depending on external libraries. I have specific goals and continuously work toward them. I have ideas that need development and am also preparing for dream package placements (in case the ideas don\'t work out). Inshallah, I will remain consistent until I achieve success. I know that you shouldn\'t always focus only on outcomes—just give 100% effort, and even if things don\'t work out as planned, you\'ll have satisfaction. Even if you don\'t achieve the level of success you dreamed of, you\'ll have the great feeling of having tried your best when you\'re on your deathbed. So don\'t ever give up.',
    achievement: 'Focusing on DSA and innovative projects',
    color: 'from-indigo-500 to-violet-600',
    icon: '📈',
    image: '/journey/growth.jpg'
  }
];

// Skills data
const skills = [
  { name: 'Web Development', level: 90, color: 'from-blue-500 to-indigo-600' },
  { name: 'Database Management', level: 80, color: 'from-indigo-500 to-purple-600' },
  { name: 'Server Management', level: 85, color: 'from-purple-500 to-pink-600' },
  { name: 'Content Creation', level: 95, color: 'from-pink-500 to-red-600' },
  { name: 'Machine Learning', level: 65, color: 'from-red-500 to-orange-600' },
  { name: 'App Development', level: 70, color: 'from-orange-500 to-yellow-600' },
  { name: 'DSA', level: 75, color: 'from-yellow-500 to-green-600' },
  { name: 'DevOps', level: 65, color: 'from-green-500 to-teal-600' }
];

export default function JourneyPage() {
  // Animation state
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [selectedItem, setSelectedItem] = useState<number | null>(null);
  const [scrollY, setScrollY] = useState(0);

  // Parallax scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Skill progress animation
  const renderSkillBars = () => {
    return skills.map((skill, index) => {
      const [ref, inView] = useInView({
        triggerOnce: true,
        threshold: 0.2,
      });

      return (
        <motion.div
          ref={ref}
          key={skill.name}
          className="mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: index * 0.1 }}
        >
          <div className="flex justify-between mb-2">
            <span className="font-medium">{skill.name}</span>
            <span className="text-muted-foreground">{skill.level}%</span>
          </div>
          <div className="h-3 w-full bg-muted/50 backdrop-blur-sm rounded-full overflow-hidden">
            <motion.div
              className={`h-full rounded-full bg-gradient-to-r ${skill.color}`}
              initial={{ width: 0 }}
              animate={inView ? { width: `${skill.level}%` } : {}}
              transition={{ duration: 1, delay: 0.3 }}
            />
          </div>
        </motion.div>
      );
    });
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen relative">
        {/* Enhanced particle background with higher density */}
        <div className="fixed inset-0 z-0">
          <ParticleBackground />
        </div>
        
        {/* Decorative elements */}
        <div className="fixed inset-0 z-0 pointer-events-none">
          <div className="absolute top-0 left-0 w-full h-screen bg-gradient-to-b from-background/80 to-transparent" />
          <div className="absolute bottom-0 left-0 w-full h-screen bg-gradient-to-t from-background/80 to-transparent" />
          <div className="absolute -left-40 top-20 w-80 h-80 bg-purple-600/30 rounded-full blur-[100px]" 
               style={{ transform: `translateY(${scrollY * 0.1}px)` }} />
          <div className="absolute -right-40 top-60 w-80 h-80 bg-blue-600/20 rounded-full blur-[100px]" 
               style={{ transform: `translateY(${scrollY * -0.05}px)` }} />
          <div className="absolute left-1/3 bottom-20 w-64 h-64 bg-cyan-600/20 rounded-full blur-[100px]" 
               style={{ transform: `translateY(${scrollY * -0.08}px)` }} />
        </div>
        
        <main className="relative z-10 backdrop-blur-[1px] pt-20 pb-20">
          <HeaderSection
            title="My Journey"
            subtitle="The path I've traveled, the challenges I've faced, and the milestones I've achieved"
            className="mb-8 mt-4"
          />

          {/* Button to go back home */}
          <div className="container mx-auto px-4 mb-12">
            <Button
              asChild
              variant="outline"
              className="group flex items-center gap-2 mb-8 backdrop-blur-sm bg-background/70 border-primary/20 hover:bg-primary/10"
            >
              <Link href="/#journey">
                <ChevronLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
                <span>Back to Homepage</span>
              </Link>
            </Button>
          </div>

          {/* Journey timeline with enhanced animations */}
          <div className="container mx-auto px-4" ref={containerRef}>
            <div className="mb-16">
              <motion.div 
                className="flex items-center justify-center gap-2 mb-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <Sparkles className="h-5 w-5 text-primary" />
                <h3 className="text-2xl md:text-3xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-blue-500">My Full Journey</h3>
                <Sparkles className="h-5 w-5 text-primary" />
              </motion.div>

              <div className="relative space-y-12 md:space-y-0">
                {/* Central line for desktop - enhanced with glow effect */}
                <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-purple-500 via-blue-500 to-indigo-500 rounded-full shadow-[0_0_15px_rgba(107,70,193,0.5)]" />

                {journeyData.map((item, index) => {
                  const [ref, inView] = useInView({
                    triggerOnce: true,
                    threshold: 0.1,
                  });

                  const isEven = index % 2 === 0;
                  const isActive = activeIndex === index;

                  return (
                    <motion.div
                      ref={ref}
                      key={item.year}
                      className={`relative flex flex-col md:flex-row items-center md:items-start gap-8 my-24 md:my-32 ${
                        isEven ? "md:flex-row" : "md:flex-row-reverse text-right"
                      }`}
                      initial={{ opacity: 0, y: 50 }}
                      animate={inView ? { opacity: 1, y: 0 } : {}}
                      transition={{ duration: 0.7 }}
                      onMouseEnter={() => setActiveIndex(index)}
                      onMouseLeave={() => setActiveIndex(null)}
                    >
                      {/* Timeline node with enhanced effects */}
                      <div className="absolute z-20 left-1/2 md:left-auto md:static transform -translate-x-1/2 md:transform-none flex items-center justify-center md:w-24">
                        <motion.div
                          className={`relative w-16 h-16 rounded-full flex items-center justify-center text-white bg-gradient-to-r ${item.color} shadow-lg z-10 cursor-pointer`}
                          initial={{ scale: 0.5, opacity: 0 }}
                          animate={inView ? { 
                            scale: 1, 
                            opacity: 1,
                            boxShadow: isActive ? '0 0 20px rgba(139, 92, 246, 0.7)' : '0 4px 12px rgba(0, 0, 0, 0.1)'
                          } : {}}
                          whileHover={{ scale: 1.1 }}
                          transition={{ 
                            type: "spring", 
                            stiffness: 300, 
                            damping: 15, 
                            delay: 0.2 
                          }}
                          onClick={() => setSelectedItem(selectedItem === index ? null : index)}
                        >
                          {/* Pulsing effect around the icon */}
                          <motion.div 
                            className="absolute inset-0 rounded-full"
                            animate={{ 
                              boxShadow: isActive ? 
                                ['0 0 0 0 rgba(255,255,255,0)', '0 0 0 10px rgba(255,255,255,0)'] : 
                                ['0 0 0 0 rgba(255,255,255,0)']
                            }}
                            transition={{ 
                              duration: 1.5, 
                              repeat: Infinity,
                              repeatType: "loop"
                            }}
                          />
                          <span className="text-2xl">{item.icon}</span>
                        </motion.div>
                      </div>

                      {/* Content section with glass morphism effect */}
                      <div className={`w-full md:w-5/12 flex flex-col ${
                        isEven ? "md:text-right md:items-end" : "md:text-left md:items-start"
                      }`}>
                        <motion.div
                          initial={{ x: isEven ? -20 : 20, opacity: 0 }}
                          animate={inView ? { x: 0, opacity: 1 } : {}}
                          transition={{ duration: 0.5, delay: 0.3 }}
                          className={`p-6 rounded-xl bg-card/80 backdrop-blur-md border border-border hover:border-primary/20 transition-all duration-300 shadow-lg ${
                            isActive ? 'shadow-primary/10' : ''
                          }`}
                        >
                          <span className="inline-block px-3 py-1 text-sm rounded-full bg-primary/10 text-primary mb-2">
                            {item.year}
                          </span>
                          <h4 className="text-xl font-bold mb-3">{item.title}</h4>
                          <p className="text-muted-foreground mb-4">{item.description}</p>
                          <div className="flex items-center gap-2 text-sm font-medium text-primary">
                            <Trophy className="h-4 w-4" />
                            <span>{item.achievement}</span>
                          </div>
                        </motion.div>
                      </div>

                      {/* Image section with enhanced hover effects */}
                      <div className="w-full md:w-5/12">
                        <motion.div
                          className="relative overflow-hidden rounded-lg shadow-lg aspect-video group"
                          initial={{ scale: 0.9, opacity: 0 }}
                          animate={inView ? { scale: 1, opacity: 1 } : {}}
                          transition={{ duration: 0.5, delay: 0.4 }}
                          whileHover={{ scale: 1.03 }}
                        >
                          <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/30 z-10 flex items-center p-6 group-hover:from-black/50 group-hover:to-black/10 transition-all duration-500">
                            <div className="text-white max-w-[70%]">
                              <h4 className="text-lg font-bold mb-2 drop-shadow-md">{item.title}</h4>
                              <div className="flex items-center text-sm">
                                <CalendarDays className="h-4 w-4 mr-1" />
                                <span className="drop-shadow-md">{item.year}</span>
                              </div>
                            </div>
                          </div>
                          <Image
                            src={item.image}
                            alt={item.title}
                            fill
                            className="object-cover transition-transform duration-700 ease-out"
                            style={{ 
                              transform: isActive ? "scale(1.1)" : "scale(1)" 
                            }}
                          />
                        </motion.div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>

            {/* Skills section with glass morphism */}
            <div className="mt-32 mb-16">
              <motion.div 
                className="text-center mb-12"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <h3 className="text-2xl md:text-3xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-blue-500">My Skills Journey</h3>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  Skills I've developed throughout my journey, reflecting my experiences and interests
                </p>
                <div className="h-1 w-20 bg-gradient-to-r from-purple-500 to-blue-500 mx-auto mt-4"></div>
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                <motion.div 
                  className="bg-card/70 backdrop-blur-md border border-border rounded-xl p-8 shadow-lg"
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                >
                  {renderSkillBars()}
                </motion.div>

                <motion.div 
                  className="bg-card/70 backdrop-blur-md border border-border rounded-xl p-8 shadow-lg"
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                >
                  <motion.h4
                    className="text-xl font-bold mb-6"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                  >
                    My Learning Philosophy
                  </motion.h4>
                  
                  <motion.div
                    className="text-muted-foreground space-y-4"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                  >
                    <p>
                      I believe in continuous learning and growth. Technology is always evolving, and staying updated is crucial for success in this field.
                    </p>
                    
                    <p>
                      My approach is to build a strong foundation in core concepts while also exploring new technologies and possibilities.
                    </p>
                    
                    <p>
                      I focus on practical implementation, creativity in problem-solving, and integrating different skills to create comprehensive solutions.
                    </p>
                    
                    <div className="mt-8 pt-6 border-t border-border">
                      <blockquote className="italic text-foreground">
                        "Inshallah, I will remain consistent until I achieve success. Just give 100% effort, and even if things don't work out as planned, you'll have satisfaction."
                      </blockquote>
                    </div>
                  </motion.div>
                </motion.div>
              </div>
            </div>
              
            {/* Personal Philosophy Quote Section */}
            <motion.div 
              className="mt-24 relative mx-auto max-w-6xl px-4"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              {/* Decorative Elements */}
              <div className="absolute -top-10 left-10 text-primary/10 rotate-12">
                <Quote className="w-16 h-16" />
              </div>
              <div className="absolute -bottom-8 right-10 text-primary/10 -rotate-12">
                <Quote className="w-12 h-12" />
              </div>
              
              <div className="relative z-10 bg-gradient-to-br from-purple-900/30 via-blue-900/30 to-indigo-900/30 backdrop-blur-md rounded-2xl p-2 overflow-hidden shadow-xl">
                <div className="absolute top-0 left-0 w-full h-full bg-[url('/code-pattern.svg')] bg-repeat opacity-[0.03]" />
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 via-blue-500 to-indigo-500" />
                
                <div className="relative z-10 p-8 md:p-12 text-center">
                  <motion.div
                    initial={{ scale: 0.95, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                  >
                    <h3 className="text-2xl md:text-3xl font-medium mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-300 to-blue-300">
                      From My Heart
                    </h3>
                    
                    <div className="max-w-4xl mx-auto space-y-6 text-lg md:text-xl">
                      <p className="leading-relaxed">
                        Be honest with yourself — you know your journey better than anyone else. You understand what's best for you and what isn't. Whatever you choose to do, give it your all. Don't fixate on the outcome. Sometimes, even your best efforts won't lead to immediate success — and that's perfectly fine. What truly matters is that you keep moving forward.
                        <br />
                        <br />
                        One day, when you look back, you'll see that every attempt, every failure, and every setback helped shape you. Each struggle carried a lesson, and each lesson made you stronger, wiser, and more resilient. In the end, it will all be worth it.
                      </p>
                      
                      <div className="w-20 h-1 bg-gradient-to-r from-purple-400 to-blue-400 mx-auto my-6 opacity-70" />
                      
                      <p className="font-semibold text-foreground">
                        "Success is not built on success. It's built on failure. It's built on frustration. Sometimes it's built on catastrophe."
                        <br/>— Sumner Redstone
                      </p>
                    </div>
                  </motion.div>
                </div>
              </div>
            </motion.div>

            <motion.div 
              className="text-center my-24"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <p className="text-muted-foreground mb-6">Want to explore more about me?</p>
              <div className="flex flex-wrap justify-center gap-4">
                <Button asChild size="lg" className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 shadow-lg hover:shadow-purple-500/20 transition-all duration-300">
                  <Link href="/projects" className="flex items-center gap-2">
                    View My Projects <ExternalLink className="h-4 w-4" />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="backdrop-blur-sm bg-background/40 hover:bg-background/60 border-primary/20 hover:border-primary/40 shadow-lg transition-all duration-300">
                  <Link href="/contact">Get In Touch</Link>
                </Button>
              </div>
            </motion.div>
          </div>
        </main>
      </div>
      <Footer />
    </>
  );
} 
