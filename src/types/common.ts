export interface RecommendItemType {
  address: string
  cover: string
  rate: string
  price: string
  type: string
  location: {
    latitude: number
    longitude: number
  }
  comments?: string
}