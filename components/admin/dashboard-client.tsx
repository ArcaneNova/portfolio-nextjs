"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import {
  FolderKanban,
  Trophy,
  MessageCircle,
  Newspaper,
  ListTodo,
  Image,
} from "lucide-react"
import { formatDistanceToNow } from "date-fns"

// Interface matching the data structure from the server component
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

interface DashboardClientProps {
  data: SummaryData
}

export function DashboardClient({ data }: DashboardClientProps) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check if user is authenticated in localStorage
    const auth = localStorage.getItem("admin-auth");
    if (auth === "true") {
      setIsAuthenticated(true);
    }
  }, []);

  // If not authenticated, show nothing (the layout will handle the login screen)
  if (!isAuthenticated) {
    return null;
  }

  const cards = [
    {
      title: "Projects",
      icon: <FolderKanban className="h-5 w-5 text-muted-foreground" />,
      href: "/admin/projects",
      count: data.projects.count,
      latest: data.projects.latest,
      type: "project" as const,
    },
    {
      title: "Challenges",
      icon: <ListTodo className="h-5 w-5 text-muted-foreground" />,
      href: "/admin/challenges",
      count: data.challenges.count,
      badge: data.challenges.active > 0 ? {
        count: data.challenges.active,
        label: "Active",
      } : undefined,
      latest: data.challenges.latest,
      type: "project" as const,
    },
    {
      title: "Achievements",
      icon: <Trophy className="h-5 w-5 text-muted-foreground" />,
      href: "/admin/achievements",
      count: data.achievements.count,
      latest: data.achievements.latest,
      type: "project" as const,
    },
    {
      title: "Blog Posts",
      icon: <Newspaper className="h-5 w-5 text-muted-foreground" />,
      href: "/admin/blog",
      count: data.blog.count,
      latest: data.blog.latest,
      type: "project" as const,
    },
    {
      title: "Photos",
      icon: <Image className="h-5 w-5 text-muted-foreground" />,
      href: "/admin/photos",
      count: data.photos.count,
      latest: data.photos.latest,
      type: "project" as const,
    },
    {
      title: "Messages",
      icon: <MessageCircle className="h-5 w-5 text-muted-foreground" />,
      href: "/admin/messages",
      count: data.messages.count,
      badge: data.messages.unread > 0 ? {
        count: data.messages.unread,
        label: "Unread",
      } : undefined,
      latest: data.messages.latest,
      type: "message" as const,
    },
  ]

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground">
          {new Date().toLocaleDateString("en-US", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </p>
      </div>
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {cards.map((card) => (
          <Link key={card.title} href={card.href}>
            <Card className="h-full transition-shadow hover:shadow-md">
              <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                <CardTitle className="text-lg font-medium">{card.title}</CardTitle>
                {card.icon}
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{card.count}</div>
                {card.badge && (
                  <div className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary text-primary-foreground mt-2">
                    {card.badge.count} {card.badge.label}
                  </div>
                )}
                {card.latest && (
                  <CardDescription className="mt-2">
                    Latest: {card.type === "message" ? card.latest.name : card.latest.title}
                    <br />
                    {card.latest.createdAt && (
                      <span className="text-xs text-muted-foreground">
                        {formatDistanceToNow(new Date(card.latest.createdAt), { addSuffix: true })}
                      </span>
                    )}
                  </CardDescription>
                )}
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
      
      <div className="mt-8">
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Common tasks you might want to perform</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <Link href="/admin/projects/new">
              <div className="flex flex-col items-center justify-center p-4 border rounded-lg hover:bg-muted transition-colors">
                <FolderKanban className="h-10 w-10 mb-2" />
                <span>New Project</span>
              </div>
            </Link>
            <Link href="/admin/challenges/new">
              <div className="flex flex-col items-center justify-center p-4 border rounded-lg hover:bg-muted transition-colors">
                <ListTodo className="h-10 w-10 mb-2" />
                <span>New Challenge</span>
              </div>
            </Link>
            <Link href="/admin/blog/new">
              <div className="flex flex-col items-center justify-center p-4 border rounded-lg hover:bg-muted transition-colors">
                <Newspaper className="h-10 w-10 mb-2" />
                <span>New Blog Post</span>
              </div>
            </Link>
            <Link href="/admin/messages">
              <div className="flex flex-col items-center justify-center p-4 border rounded-lg hover:bg-muted transition-colors">
                <MessageCircle className="h-10 w-10 mb-2" />
                <span>Check Messages</span>
              </div>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  )
} 