export interface CodingStat {
  _id?: string
  label: string
  value: string
  icon: string
  color: string
  createdAt?: Date
  updatedAt?: Date
}

export interface PlatformStat {
  _id?: string
  platform: string
  icon: string
  stats: {
    label: string
    value: string
  }[]
  createdAt?: Date
  updatedAt?: Date
}

export interface StatsResponse {
  codingStats: CodingStat[]
  platformStats: PlatformStat[]
}
