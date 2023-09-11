interface IBannerInputItem {
  type: string
  name: string
  label: string
  max?: number
  placeholder?: string
}
interface IBannerInput {
  [key: string]: IBannerInputItem
}

export const BANNER_INPUTS: IBannerInput = {
  bannerTitle: {
    type: 'text',
    name: 'bannerTitle',
    label: '배너 제목',
    placeholder: '제목을 입력해주세요.',
  },
  bannerLinkUrl: {
    type: 'url',
    name: 'bannerLinkUrl',
    label: '베너 링크',
    placeholder: '베너 클릭시 이동할 링크를 입력해주세요.',
  },
  bannerContent: {
    type: 'text',
    name: 'bannerContent',
    label: '배너 내용',
    max: 30,
    placeholder: '최대 30자 이내',
  },
  display: {
    type: 'checkbox',
    name: 'display',
    label: '노출 여부',
  },
}

export const BANNER_LEFT_SECTION_INPUTS = ['bannerTitle', 'bannerLinkUrl', 'bannerContent', 'display']
