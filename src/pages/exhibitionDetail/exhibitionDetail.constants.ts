interface IExhibitonInputItem {
  type: string
  name: string
  label: string
  max?: number
  placeholder?: string
}

interface IExhibitonInput {
  [key: string]: IExhibitonInputItem
}

export const EXHIBITION_INPUTS: IExhibitonInput = {
  exhibitionName: {
    type: 'text',
    name: 'exhibitionName',
    label: '플레이스 제목',
    max: 30,
    placeholder: '플레이스 제목을 입력해주세요.',
  },
  display: {
    type: 'checkbox',
    name: 'display',
    label: '노출 여부',
  },
}

export const EXHIBITION_LEFT_SECTION_INPUTS = ['exhibitionName', 'display']
