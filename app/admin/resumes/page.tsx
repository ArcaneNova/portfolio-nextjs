import { getCollection } from "@/lib/db"
import { ResumesClient } from "@/components/admin/resumes-client"

const getData = async () => {
  try {
    const resumesCollection = await getCollection("resumes")
    const data = await resumesCollection.find({}).toArray()
    return JSON.parse(JSON.stringify(data))
  } catch (error) {
    console.error("Failed to fetch resumes:", error)
    return []
  }
}

export default async function ResumesPage() {
  const data = await getData()

  return <ResumesClient resumes={data} />
}
