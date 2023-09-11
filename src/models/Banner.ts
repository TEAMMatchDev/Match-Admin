export interface IBannerItem {
  bannerIdx?: number
  bannerImgUrl: string
  bannerTitle: string
  bannerContent: string
  bannerLinkUrl: string
  display: boolean
  [key: string]: string | number | boolean | undefined
}

export interface IBannerCreateResponse {
  bannerIdx: number
}
