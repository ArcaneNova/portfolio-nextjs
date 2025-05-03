export interface Tool {
  _id?: string
  name: string
  icon: string
  color: string
  createdAt?: Date
  updatedAt?: Date
}

export interface ToolsResponse {
  tools: Tool[]
}
