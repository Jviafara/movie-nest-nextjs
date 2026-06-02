'use client'

import { useAppDispatch } from '@/lib/hooks/redux.hooks'
import favoriteApi from '@/lib/modules/favoriteApi'
import { setGlobalLoading } from '@/lib/redux/features/globalLoadingSlice'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { Media } from '../../lib/types'
import LoadingButton from '@/components/LoadingButton'
import FavoriteItem from '@/components/FavoriteItem'
import Container from '@/components/Container'

const FavoriteListPage = () => {
  const [medias, setMedias] = useState<Media[]>([])
  const [filteredMedias, setFilteredMedias] = useState<Media[]>([])
  const [page, setPage] = useState(1)
  const [count, setCount] = useState(0)
  const [loading, setLoading] = useState(false)

  const dispatch = useAppDispatch()

  const skip = 8

  useEffect(() => {
    const getFavorites = async () => {
      dispatch(setGlobalLoading(true))
      const { res, message } = await favoriteApi.getList()
      if (res) dispatch(setGlobalLoading(false))
      if (message) toast.error(message)
      if (res.status >= 400) {
        toast.error(res.message)
      } else if (res) {
        setCount(res.length)
        setMedias([...res])
        setFilteredMedias([...res].splice(0, skip))
      }
    }
    getFavorites()
  }, [dispatch])

  const onLoadMore = () => {
    setLoading(true)
    setFilteredMedias([...filteredMedias, ...medias.slice(page * skip, page * skip + skip)])
    setPage(page + 1)
    setLoading(false)
  }

  const onRemoved = (id: string) => {
    const newMedias = [...medias].filter(e => e.mediaId !== id)
    setMedias(newMedias)
    setFilteredMedias([...newMedias].splice(0, page * skip))
    setCount(count - 1)
  }

  return (
    <div className='w-full min-h-screen max-w-341.5] mx-auto p-12 my-10 flex flex-col gap-8'>
      <Container header={`Your Favorites (${count})`}>
        <div className='grid grid-flow-row grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4'>
          {filteredMedias?.map((media, index) => (
            <FavoriteItem
              media={media}
              onRemoved={onRemoved}
              key={index}
            />
          ))}
        </div>
      </Container>

      {filteredMedias.length < medias.length && (
        <LoadingButton
          loading={loading}
          onLoadMore={onLoadMore}
        />
      )}
    </div>
  )
}

export default FavoriteListPage
