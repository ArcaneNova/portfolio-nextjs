import { Metadata } from "next"
import Link from "next/link"
import { Calendar, Edit, FileText, Image, Mail, MessageSquare, Plus, Trophy } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { getCollection } from "@/lib/db"
import { DashboardClient } from "@/components/admin/dashboard-client"

interface SummaryData {
  projects: {
    count: number
    latest?: { title: string; createdAt: Date } | null
  }
  challenges: {
    count: number
    active: number
    latest?: { title: string; createdAt: Date } | null
  }
  achievements: {
    count: number
    latest?: { title: string; createdAt: Date } | null
  }
  blog: {
    count: number
    latest?: { title: string; createdAt: Date } | null
  }
  photos: {
    count: number
    latest?: { title: string; createdAt: Date } | null
  }
  messages: {
    count: number
    unread: number
    latest?: { name: string; createdAt: Date } | null
  }
}

async function getContentSummary(): Promise<SummaryData> {
  try {
    const projectsCollection = await getCollection("projects")
    const challengesCollection = await getCollection("challenges")
    const achievementsCollection = await getCollection("achievements")
    const blogsCollection = await getCollection("blogs")
    const photosCollection = await getCollection("photos")
    const messagesCollection = await getCollection("messages")

    const projects = await projectsCollection.countDocuments()
    const challenges = await challengesCollection.countDocuments()
    const activeChallengesTodo = await challengesCollection.countDocuments({ status: "active" }) // TODO: Check actual field name
    const achievements = await achievementsCollection.countDocuments()
    const blogs = await blogsCollection.countDocuments()
    const photos = await photosCollection.countDocuments()
    const messages = await messagesCollection.countDocuments()
    const unreadMessagesTodo = await messagesCollection.countDocuments({ read: false }) // TODO: Check actual field name

    const latestProject = await projectsCollection.find().sort({ createdAt: -1 }).limit(1).toArray()
    const latestChallenge = await challengesCollection.find().sort({ createdAt: -1 }).limit(1).toArray()
    const latestAchievement = await achievementsCollection.find().sort({ createdAt: -1 }).limit(1).toArray()
    const latestBlog = await blogsCollection.find().sort({ createdAt: -1 }).limit(1).toArray()
    const latestPhoto = await photosCollection.find().sort({ createdAt: -1 }).limit(1).toArray()
    const latestMessage = await messagesCollection.find().sort({ createdAt: -1 }).limit(1).toArray()
    
    return {
      projects: {
        count: projects,
        latest: latestProject.length > 0 ? {
          title: latestProject[0]?.title || "Untitled Project",
          createdAt: latestProject[0]?.createdAt || new Date()
        } : null
      },
      challenges: {
        count: challenges,
        active: activeChallengesTodo, // Using the placeholder count
        latest: latestChallenge.length > 0 ? {
          title: latestChallenge[0]?.title || "Untitled Challenge",
          createdAt: latestChallenge[0]?.createdAt || new Date()
        } : null
      },
      achievements: {
        count: achievements,
        latest: latestAchievement.length > 0 ? {
          title: latestAchievement[0]?.title || "Untitled Achievement",
          createdAt: latestAchievement[0]?.createdAt || new Date()
        } : null
      },
      blog: {
        count: blogs,
        latest: latestBlog.length > 0 ? {
          title: latestBlog[0]?.title || "Untitled Blog",
          createdAt: latestBlog[0]?.createdAt || new Date()
        } : null
      },
      photos: {
        count: photos,
        latest: latestPhoto.length > 0 ? {
          title: latestPhoto[0]?.title || "Untitled Photo",
          createdAt: latestPhoto[0]?.createdAt || new Date()
        } : null
      },
      messages: {
        count: messages,
        unread: unreadMessagesTodo, // Using the placeholder count
        latest: latestMessage.length > 0 ? {
          name: latestMessage[0]?.name || "Anonymous",
          createdAt: latestMessage[0]?.createdAt || new Date()
        } : null
      }
    }
  } catch (error) {
    console.error("Error fetching content summary:", error)
    return {
      projects: { count: 0, latest: null },
      challenges: { count: 0, active: 0, latest: null },
      achievements: { count: 0, latest: null },
      blog: { count: 0, latest: null },
      photos: { count: 0, latest: null },
      messages: { count: 0, unread: 0, latest: null }
    }
  }
}

export default async function AdminDashboardPage() {
  const data = await getContentSummary()
  
  // Pass data to client component
  return <DashboardClient data={data} />
}
