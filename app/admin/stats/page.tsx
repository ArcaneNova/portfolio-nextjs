import { getCollection } from "@/lib/db"
import { StatsClient } from "@/components/admin/stats-client"

const getData = async () => {
  try {
    const statsCollection = await getCollection("stats")
    const codingStats = await statsCollection.find({ type: "coding" }).toArray()
    const platformStats = await statsCollection.find({ type: "platform" }).toArray()
    return {
      codingStats: JSON.parse(JSON.stringify(codingStats)),
      platformStats: JSON.parse(JSON.stringify(platformStats)),
    }
  } catch (error) {
    console.error("Failed to fetch stats:", error)
    return { codingStats: [], platformStats: [] }
  }
}

export default async function StatsPage() {
  const data = await getData()

  return <StatsClient codingStats={data.codingStats} platformStats={data.platformStats} />
}
