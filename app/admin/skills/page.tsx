import { getCollection } from "@/lib/db"
import { SkillsClient } from "@/components/admin/skills-client"

const getData = async () => {
  try {
    const skillsCollection = await getCollection("skills")
    const data = await skillsCollection.find({}).sort({ order: 1 }).toArray()
    return JSON.parse(JSON.stringify(data))
  } catch (error) {
    console.error("Failed to fetch skills:", error)
    return []
  }
}

export default async function SkillsPage() {
  const data = await getData()

  return <SkillsClient categories={data} />
}
