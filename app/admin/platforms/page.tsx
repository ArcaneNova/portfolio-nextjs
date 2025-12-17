import { getCollection } from "@/lib/db"
import { PlatformsClient } from "@/components/admin/platforms-client"

const getData = async () => {
  try {
    const platformsCollection = await getCollection("platforms")
    const data = await platformsCollection.find({}).toArray()
    return JSON.parse(JSON.stringify(data))
  } catch (error) {
    console.error("Failed to fetch platforms:", error)
    return []
  }
}

export default async function PlatformsPage() {
  const data = await getData()

  return <PlatformsClient platforms={data} />
}
