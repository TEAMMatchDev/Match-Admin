import React, {useEffect, useState} from 'react'
import {useNavigate, useParams} from 'react-router-dom'
import {createBanner, deleteBanner, getBannerImage, getBannerItem, updateBanner} from '../../apis/banner'
import {dataURLtoFile, generateDataUrl, getFileName} from '../../utils/file'
import {BANNER_INPUTS, BANNER_LEFT_SECTION_INPUTS} from './bannerDetail.constants'
import {IBannerItem} from '../../models/Banner'
import DetailPageHeader from '../../components/shared/DetailPageHeader/DetailPageHeader'
import DeleteModal from '../../components/shared/DeleteModal/DeleteModal'
import SingleImageModal from '../../components/shared/SingleImageModal/SingleImageModal'
import * as S from './BannerDetail.styled'

interface BannerDetailProps {
  isNew?: boolean
}

export const initialBannerState: IBannerItem = {
  endDate: '',
  name: '',
  startDate: '',
  bannerImg: '',
  bannerType: '',
  bannerContent: '',
  contentsUrl: '',
}

function BannerDetail({isNew}: BannerDetailProps) {
  const navigate = useNavigate()
  const {id} = useParams<{id?: string}>()

  const [bannerData, setBannerData] = useState(initialBannerState)
  const [imageFile, setImageFile] = useState<File>()

  const [isEditMode, setIsEditMode] = useState(!isNew && id ? false : true)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)

  const generateImageFile = async (imageUrl: string) => {
    const res = await getBannerImage(imageUrl)
    const fileName = getFileName(res.headers)
    const string = generateDataUrl(imageUrl, res)
    const file = dataURLtoFile(string, fileName as string)
    setImageFile(file)
  }

  useEffect(() => {
    const fetchData = async () => {
      if (!id) return
      const data = await getBannerItem(parseInt(id))
      setBannerData(data)
      generateImageFile(data.bannerImg)
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
        'postBannerAdminReq',
        new Blob(
          [
            JSON.stringify({
              ...bannerData,
            }),
          ],
          {
            type: 'application/json',
          },
        ),
      )
      formData.append('photoUrl', imageFile as File)
      const {bannerIdx} = await createBanner(formData)
      navigate(`/banner/${bannerIdx}`)
    } else {
      if (!id) return

      const formData = new FormData()
      formData.append(
        'patchBannerAdminReq',
        new Blob(
          [
            JSON.stringify({
              ...bannerData,
            }),
          ],
          {
            type: 'application/json',
          },
        ),
      )
      formData.append('photoUrl', imageFile as File)
      await updateBanner(parseInt(id), formData)
      navigate(0)
    }
  }

  const handleDelete = async () => {
    if (!id) return
    await deleteBanner(parseInt(id))
    navigate(`/banner`)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const id = e.target.id
    let value: string | boolean = e.target.value

    if (id === 'display') {
      const toggleValue = (e as React.ChangeEvent<HTMLInputElement>).currentTarget.checked
      value = toggleValue
    }

    setBannerData(prev => {
      return {
        ...prev,
        [id]: value,
      }
    })
  }

  const checkIsDisabled = () => {
    if (!bannerData.bannerTitle) return true
    if (!bannerData.bannerContent) return true
    if (!bannerData.bannerLinkUrl) return true
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
          <S.ImageWrap>
            {imageFile ? (
              <img src={URL.createObjectURL(imageFile)} alt='banner' />
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
        isDeleteModalOpen={isDeleteModalOpen}
        setIsDeleteModalOpen={setIsDeleteModalOpen}
        handleDelete={handleDelete}
      />
    </>
  )
}

export default BannerDetail
