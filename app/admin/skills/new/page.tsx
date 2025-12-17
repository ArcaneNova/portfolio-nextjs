"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { useToast } from "@/hooks/use-toast"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

const skillCategorySchema = z.object({
  title: z.string().min(1, "Title is required"),
  icon: z.string().min(1, "Icon is required"),
  skills: z.array(
    z.object({
      name: z.string().min(1, "Skill name is required"),
      level: z.number().min(0).max(100, "Level must be between 0 and 100"),
    })
  ).min(1, "Add at least one skill"),
})

type SkillCategoryForm = z.infer<typeof skillCategorySchema>

export default function NewSkillPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [skills, setSkills] = useState([{ name: "", level: 50 }])

  const form = useForm<SkillCategoryForm>({
    resolver: zodResolver(skillCategorySchema),
    defaultValues: {
      title: "",
      icon: "📚",
      skills: [{ name: "", level: 50 }],
    },
  })

  const onSubmit = async (data: SkillCategoryForm) => {
    try {
      setIsSubmitting(true)
      const response = await fetch("/api/skills", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })

      if (!response.ok) {
        throw new Error("Failed to create skill category")
      }

      toast({
        title: "Success",
        description: "Skill category created successfully",
      })
      router.push("/admin/skills")
      router.refresh()
    } catch (error) {
      console.error("Error:", error)
      toast({
        title: "Error",
        description: "Failed to create skill category",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const addSkill = () => {
    setSkills([...skills, { name: "", level: 50 }])
  }

  const removeSkill = (index: number) => {
    setSkills(skills.filter((_, i) => i !== index))
  }

  const updateSkill = (index: number, field: "name" | "level", value: any) => {
    const newSkills = [...skills]
    if (field === "name") {
      newSkills[index].name = value as string
    } else if (field === "level") {
      newSkills[index].level = value as number
    }
    setSkills(newSkills)
    form.setValue("skills", newSkills)
  }

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <Link href="/admin/skills" className="flex items-center gap-2 text-muted-foreground hover:text-foreground mb-6">
        <ArrowLeft className="h-4 w-4" /> Back to Skills
      </Link>

      <Card>
        <CardHeader>
          <CardTitle>Add New Skill Category</CardTitle>
          <CardDescription>
            Create a new skill category with individual skills
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Category Title</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., Frontend Development" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="icon"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Icon (Emoji)</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., 💻" maxLength={2} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold">Skills</h3>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={addSkill}
                  >
                    + Add Skill
                  </Button>
                </div>

                {skills.map((skill, index) => (
                  <div key={index} className="flex gap-3 items-end p-3 border rounded-lg">
                    <div className="flex-1">
                      <label className="text-sm font-medium mb-1 block">
                        Skill Name
                      </label>
                      <Input
                        placeholder="e.g., React"
                        value={skill.name}
                        onChange={(e) => updateSkill(index, "name", e.target.value)}
                      />
                    </div>
                    <div className="w-24">
                      <label className="text-sm font-medium mb-1 block">
                        Level (%)
                      </label>
                      <Input
                        type="number"
                        min="0"
                        max="100"
                        value={skill.level}
                        onChange={(e) =>
                          updateSkill(index, "level", parseInt(e.target.value) || 0)
                        }
                      />
                    </div>
                    {skills.length > 1 && (
                      <Button
                        type="button"
                        variant="destructive"
                        size="sm"
                        onClick={() => removeSkill(index)}
                      >
                        Remove
                      </Button>
                    )}
                  </div>
                ))}
              </div>

              <Button type="submit" disabled={isSubmitting} className="w-full">
                {isSubmitting ? "Creating..." : "Create Skill Category"}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  )
}
