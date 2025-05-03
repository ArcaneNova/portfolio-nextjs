export interface Achievement {
  _id?: string
  title: string
  description: string
  icon: string
  createdAt?: Date
  updatedAt?: Date
}

export interface AchievementsResponse {
  achievements: Achievement[]
  pagination: {
    total: number
    page: number
    limit: number
    totalPages: number
  }
}
