'use client'

import HeroSlide from '@/components/HeroSlide'
import LoadingButton from '@/components/LoadingButton'
import MediaGrid from '@/components/MediaGrid'
import tmdbConfigs from '@/lib/configs/tmbd.configs'
import { useAppDispatch } from '@/lib/hooks/redux.hooks'
import mediaApi from '@/lib/modules/mediaApi'
import { setAppState } from '@/lib/redux/features/appStateSlice'
import { setGlobalLoading } from '@/lib/redux/features/globalLoadingSlice'
import { Media } from '@/lib/types'
import { notFound, useParams } from 'next/navigation'
import { useEffect, useMemo, useState } from 'react'
import { toast } from 'react-toastify'

const Page = () => {
  const { mediaType } = useParams()
  if (mediaType !== 'movie' && mediaType !== 'tv') {
    notFound()
  }

  const [medias, setMedias] = useState<Media[]>([])
  const [mediaLoading, setMediaLoading] = useState(false)
  const [currCategory, setCurrCategory] = useState(0)
  const [currPage, setCurrPage] = useState(1)

  const dispatch = useAppDispatch()

  const mediaCategories = useMemo(() => ['popular', 'top_rated'], [])
  const category = ['popular', 'top rated']

  useEffect(() => {
    dispatch(setAppState(mediaType))
    window.scrollTo(0, 0)
  }, [mediaType, dispatch])

  useEffect(() => {
    const getMedias = async () => {
      if (currPage === 1) dispatch(setGlobalLoading(true))
      setMediaLoading(true)

      const { res, message } = await mediaApi.getList({
        mediaType,
        mediaCategory: mediaCategories[currCategory],
        page: currPage.toString(),
      })

      setMediaLoading(false)
      dispatch(setGlobalLoading(false))

      if (message) toast.error(message)
      if (res) {
        if (currPage !== 1) setMedias(m => [...m, ...res.results])
        else setMedias([...res.results])
      }
    }

    getMedias()
  }, [mediaType, currCategory, currPage, mediaCategories, dispatch])

  const onCategoryChange = (categoryIndex: number) => {
    if (currCategory === categoryIndex) return

    setCurrPage(1)
    setCurrCategory(categoryIndex)
  }

  const onLoadMore = () => setCurrPage(currPage + 1)
  return (
    <div className='w-full h-full min-h-screen flex flex-col gap-8 last:mb-16'>
      <HeroSlide
        mediaType={mediaType}
        mediaCategory={tmdbConfigs.mediaCategory.popular}
      />
      <div className='text-primary text-lg font-bold uppercase flex justify-between w-[70vw] mx-auto'>
        <h1 className='text-xl'>{mediaType === tmdbConfigs.mediaType.movie ? 'Movies' : 'TV Series'}</h1>
        <div className='flex gap-2'>
          {category.map((cate, index) => (
            <button
              onClick={() => onCategoryChange(index)}
              className={`uppercase ${currCategory === index ? 'text-white bg-secondary py-1 px-2 rounded' : 'text-primary'}`}
              key={index}
            >
              {cate}
            </button>
          ))}
        </div>
      </div>
      <div className='w-[70vw] mx-auto'>
        <MediaGrid
          medias={medias}
          mediaType={mediaType}
        />
      </div>
      <LoadingButton
        loading={mediaLoading}
        onLoadMore={onLoadMore}
      />
    </div>
  )
}

export default Page
