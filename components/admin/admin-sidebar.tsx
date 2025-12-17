"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  LayoutDashboard,
  FolderKanban,
  Trophy,
  MessageSquare,
  ImageIcon,
  FileText,
  LogOut,
  Menu,
  X,
  Rocket,
  Code,
  BarChart3,
  Link as LinkIcon,
  Route,
  Users,
} from "lucide-react"
import { useState } from "react"
import { Button } from "@/components/ui/button"

const navItems = [
  {
    title: "Dashboard",
    href: "/admin",
    icon: LayoutDashboard,
  },
  {
    title: "Content",
    href: "#",
    icon: FileText,
    isHeader: true,
  },
  {
    title: "Projects",
    href: "/admin/projects",
    icon: FolderKanban,
  },
  {
    title: "Blog",
    href: "/admin/blog",
    icon: FileText,
  },
  {
    title: "Achievements",
    href: "/admin/achievements",
    icon: Trophy,
  },
  {
    title: "Photos",
    href: "/admin/photos",
    icon: ImageIcon,
  },
  {
    title: "Challenges",
    href: "/admin/challenges",
    icon: Trophy,
  },
  {
    title: "Launches",
    href: "/admin/launches",
    icon: Rocket,
  },
  {
    title: "Skills",
    href: "/admin/skills",
    icon: Code,
  },
  {
    title: "Tools",
    href: "/admin/tools",
    icon: Code,
  },
  {
    title: "System",
    href: "#",
    icon: FileText,
    isHeader: true,
  },
  {
    title: "Stats",
    href: "/admin/stats",
    icon: BarChart3,
  },
  {
    title: "Platforms",
    href: "/admin/platforms",
    icon: LinkIcon,
  },
  {
    title: "Journeys",
    href: "/admin/journeys",
    icon: Route,
  },
  {
    title: "Resumes",
    href: "/admin/resumes",
    icon: FileText,
  },
  {
    title: "Messages",
    href: "/admin/messages",
    icon: MessageSquare,
  },
]

export default function AdminSidebar() {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      {/* Mobile menu button */}
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-4 left-4 z-50 md:hidden"
      >
        {isOpen ? <X /> : <Menu />}
      </Button>

      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-40 w-64 bg-card border-r border-border transform transition-transform duration-300 ease-in-out md:translate-x-0 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full">
          <div className="p-6 border-b border-border">
            <Link href="/admin" className="text-xl font-bold">
              Admin Dashboard
            </Link>
          </div>

          <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
            {navItems.map((item) => {
              if (item.isHeader) {
                return (
                  <div key={item.href} className="px-4 py-3 mt-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                    {item.title}
                  </div>
                )
              }
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center px-4 py-3 rounded-md transition-colors ${
                    isActive ? "bg-primary/10 text-primary" : "hover:bg-muted"
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  <item.icon className="h-5 w-5 mr-3" />
                  {item.title}
                </Link>
              )
            })}
          </nav>

          <div className="p-4 border-t border-border">
            <Button
              variant="ghost"
              className="w-full justify-start text-red-500 hover:text-red-600 hover:bg-red-100/10"
              onClick={() => {
                // This would normally log the user out
                console.log("Logging out...")
              }}
            >
              <LogOut className="h-5 w-5 mr-3" />
              Logout
            </Button>
          </div>
        </div>
      </div>
    </>
  )
}
