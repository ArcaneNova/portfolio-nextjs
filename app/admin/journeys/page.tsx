import { getCollection } from "@/lib/db"
import { JourneysClient } from "@/components/admin/journeys-client"

const getData = async () => {
  try {
    const journeysCollection = await getCollection("journeys")
    const data = await journeysCollection.find({}).toArray()
    return JSON.parse(JSON.stringify(data))
  } catch (error) {
    console.error("Failed to fetch journeys:", error)
    return []
  }
}

export default async function JourneysPage() {
  const data = await getData()

  return <JourneysClient journeys={data} />
}
