import React, {useEffect, useState} from 'react'
import {useNavigate, useParams} from 'react-router-dom'
import {
  createExhibition,
  deleteExhibition,
  getExhibitionImage,
  getExhibitionItem,
  updateExhibiton,
} from '../../apis/exhibition'
import {IExhibitionItem} from '../../models/Exhibition'
import {dataURLtoFile, generateDataUrl, getFileName} from '../../utils/file'
import {EXHIBITION_INPUTS, EXHIBITION_LEFT_SECTION_INPUTS} from './exhibitionDetail.constants'
import DeleteModal from '../../components/shared/DeleteModal/DeleteModal'
import DetailPageHeader from '../../components/shared/DetailPageHeader/DetailPageHeader'
import SingleImageModal from '../../components/shared/SingleImageModal/SingleImageModal'
import PlaceList from './components/PlaceList'
import * as S from './ExhibitionDetail.styled'

interface ExhibitionDetailProps {
  isNew?: boolean
}

export const initialExhibitionState: IExhibitionItem = {
  imageUrl: '',
  exhibitionName: '',
  placeList: [],
  display: true,
}

function ExhibitionDetail({isNew}: ExhibitionDetailProps) {
  const navigate = useNavigate()
  const {id} = useParams<{id?: string}>()

  const [exhibitionData, setExhibitionData] = useState(initialExhibitionState)
  const [imageFile, setImageFile] = useState<File>()

  const [isEditMode, setIsEditMode] = useState(!isNew && id ? false : true)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)

  const generateImageFile = async (imageUrl: string) => {
    const res = await getExhibitionImage(imageUrl)
    const fileName = getFileName(res.headers)
    const string = generateDataUrl(imageUrl, res)
    const file = dataURLtoFile(string, fileName as string)
    setImageFile(file)
  }

  useEffect(() => {
    const fetchData = async () => {
      if (!id) return
      const data = await getExhibitionItem(parseInt(id))
      setExhibitionData(data)
      generateImageFile(data.imageUrl)
    }

    if (!isNew && id) {
      fetchData()
    }
  }, [isNew, id])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (isNew) {
      const formData = new FormData()
      formData.append(
        'postExhibitionAdminReq',
        new Blob(
          [
            JSON.stringify({
              display: exhibitionData.display,
              exhibitionName: exhibitionData.exhibitionName,
              imageUrl: exhibitionData.imageUrl,
              placeIdxList: exhibitionData.placeList.map(place => place.placeIdx),
            }),
          ],
          {
            type: 'application/json',
          },
        ),
      )
      formData.append('photoUrl', imageFile as File)
      const {exhibitionIdx} = await createExhibition(formData)
      navigate(`/exhibition/${exhibitionIdx}`)
    } else {
      if (!id) return

      const formData = new FormData()
      formData.append(
        'putExhibitionReq',
        new Blob(
          [
            JSON.stringify({
              display: exhibitionData.display,
              exhibitionName: exhibitionData.exhibitionName,
              imageUrl: exhibitionData.imageUrl,
              placeIdxList: exhibitionData.placeList.map(place => place.placeIdx),
            }),
          ],
          {
            type: 'application/json',
          },
        ),
      )

      formData.append('photoUrl', imageFile as File)

      await updateExhibiton(parseInt(id), formData)
      navigate(0)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const id = e.target.id
    let value: string | boolean = e.target.value

    if (id === 'display') {
      const toggleValue = (e as React.ChangeEvent<HTMLInputElement>).currentTarget.checked
      value = toggleValue
    }

    setExhibitionData(prev => {
      return {
        ...prev,
        [id]: value,
      }
    })
  }

  const handleDelete = async () => {
    if (!id) return
    await deleteExhibition(parseInt(id))
    navigate(`/exhibition`)
  }

  const checkIsDisabled = () => {
    if (!exhibitionData.exhibitionName) return true
    if (!imageFile) return true
    return false
  }

  return (
    <>
      <S.Form onSubmit={handleSubmit}>
        <DetailPageHeader
          navigate={navigate}
          isNew={isNew}
          isEditMode={isEditMode}
          setIsEditMode={setIsEditMode}
          setIsDeleteModalOpen={setIsDeleteModalOpen}
          checkIsDisabled={checkIsDisabled}
        />
        <S.ContentWrap>
          <div>
            {EXHIBITION_LEFT_SECTION_INPUTS.map(inputName => (
              <S.InputItemWrap
                key={EXHIBITION_INPUTS[inputName].name}
                className={inputName === 'display' ? 'display' : ''}
              >
                <label htmlFor={EXHIBITION_INPUTS[inputName].name}>{EXHIBITION_INPUTS[inputName].label}</label>
                {inputName === 'display' ? (
                  <S.CustomSwtich
                    size='xl'
                    onLabel='노출'
                    offLabel='숨기기'
                    onChange={handleChange}
                    id={EXHIBITION_INPUTS[inputName].name}
                    checked={exhibitionData[inputName]}
                    disabled={!isEditMode}
                  />
                ) : (
                  <input
                    value={exhibitionData[EXHIBITION_INPUTS[inputName].name] as string}
                    onChange={handleChange}
                    type={EXHIBITION_INPUTS[inputName].type}
                    id={EXHIBITION_INPUTS[inputName].name}
                    aria-describedby={EXHIBITION_INPUTS[inputName].name}
                    maxLength={EXHIBITION_INPUTS[inputName].max}
                    placeholder={EXHIBITION_INPUTS[inputName].placeholder}
                    required
                    disabled={!isEditMode}
                  />
                )}
              </S.InputItemWrap>
            ))}
            <PlaceList isEditMode={isEditMode} exhibitionData={exhibitionData} setExhibitionData={setExhibitionData} />
          </div>
          <S.ImageWrap>
            {imageFile ? (
              <img src={URL.createObjectURL(imageFile)} alt='exhibition' />
            ) : (
              <S.ImagePlaceholder>이미지 추가</S.ImagePlaceholder>
            )}
            <S.EditButton disabled={!isEditMode} onClick={() => setIsModalOpen(true)}>
              Edit Image
            </S.EditButton>
          </S.ImageWrap>
        </S.ContentWrap>
      </S.Form>
      <SingleImageModal
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        imageFile={imageFile}
        setImageFile={setImageFile}
      />
      <DeleteModal
        handleDelete={handleDelete}
        isDeleteModalOpen={isDeleteModalOpen}
        setIsDeleteModalOpen={setIsDeleteModalOpen}
      />
    </>
  )
}

export default ExhibitionDetail
