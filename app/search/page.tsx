'use client'

import LoadingButton from '@/components/LoadingButton'
import MediaGrid from '@/components/MediaGrid'
import mediaApi from '@/lib/modules/mediaApi'
import { Media } from '@/lib/types'
import { useCallback, useState } from 'react'
import { toast } from 'react-toastify'

const mediaTypes = ['movie', 'tv', 'people']
let timer: ReturnType<typeof setTimeout>
const timeout = 1000

const SearchPage = () => {
  const [query, setQuery] = useState('')
  const [onSearch, setOnSearch] = useState(false)
  const [mediaType, setMediaType] = useState(mediaTypes[0])
  const [medias, setMedias] = useState<Media[]>([])
  const [page, setPage] = useState(1)

  const search = useCallback(
    async (nextQuery: string, nextPage: number, nextMediaType = mediaType) => {
      setOnSearch(true)

      const { res, message } = await mediaApi.search({
        mediaType: nextMediaType,
        query: nextQuery,
        page: nextPage.toString(),
      })

      setOnSearch(false)
      if (message) toast.error(message)
      if (res.status >= 400) {
        toast.error(res.message)
      } else if (res) {
        if (nextPage > 1) setMedias(m => [...m, ...res.results])
        else setMedias(res.results)
      }
    },
    [mediaType],
  )

  const onCategoryChange = (selectedCategory: string) => {
    setMediaType(selectedCategory)
    setPage(1)
    setMedias([])

    if (query.trim().length > 0) {
      void search(query, 1, selectedCategory)
    }
  }

  const onQueryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newQuery = e.target.value
    clearTimeout(timer)

    if (newQuery.trim().length === 0) {
      setMedias([])
      setPage(1)
      setQuery(newQuery)
      return
    }

    timer = setTimeout(() => {
      setQuery(newQuery)
      setPage(1)
      setMedias([])
      void search(newQuery, 1)
    }, timeout)
  }

  return (
    <div className='w-full min-h-screen pt-32 flex flex-col gap-8'>
      <div className='w-full flex justify-center gap-6'>
        {mediaTypes.map((item, index) => (
          <button
            onClick={() => onCategoryChange(item)}
            className={`uppercase text-xl font-semibold ${mediaType === item ? 'text-white bg-secondary py-1 px-4 rounded-lg' : 'text-primary'}`}
            key={index}
          >
            {item}
          </button>
        ))}
      </div>
      <div className='w-[75vw] mx-auto'>
        <input
          type='text'
          name='search'
          placeholder='Search MovieNest'
          onChange={onQueryChange}
          className='w-full h-14 border-2 rounded-md placeholder:text-primary placeholder:font-light border-primary bg-base-100 text-lg font-semibold text-primary px-4 capitalize'
        />
      </div>
      <div className='w-[70vw] mx-auto'>
        <MediaGrid
          medias={medias}
          mediaType={mediaType}
        />
      </div>

      {medias.length > 0 && (
        <LoadingButton
          loading={onSearch}
          onLoadMore={() => {
            const nextPage = page + 1
            setPage(nextPage)
            void search(query, nextPage)
          }}
        />
      )}
    </div>
  )
}

export default SearchPage
