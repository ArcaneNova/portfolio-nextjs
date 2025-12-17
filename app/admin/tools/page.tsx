import { getCollection } from "@/lib/db"
import { ToolsClient } from "@/components/admin/tools-client"

const getData = async () => {
  try {
    const toolsCollection = await getCollection("tools")
    const data = await toolsCollection.find({}).toArray()
    return JSON.parse(JSON.stringify(data))
  } catch (error) {
    console.error("Failed to fetch tools:", error)
    return []
  }
}

export default async function ToolsPage() {
  const data = await getData()

  return <ToolsClient tools={data} />
}
