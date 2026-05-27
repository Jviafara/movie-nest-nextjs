'use client'
import Container from '@/components/Container'
import HeroSlide from '@/components/HeroSlide'
import MediaSlide from '@/components/MediaSlide'
import { useSession } from '@/lib/auth/auth-client'
import tmdbConfigs from '@/lib/configs/tmbd.configs'
import { useAppDispatch, useAppSelector } from '@/lib/hooks/redux.hooks'
import { useEffect } from 'react'
import { setFavoriteList } from '@/lib/redux/features/favoriteSlice'

export default function Home() {
  const { data: session } = useSession()
  const { themeMode } = useAppSelector(state => state.themeMode)
  const dispatch = useAppDispatch()

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const response = await fetch('/api/favorite', {
          method: 'GET',
          credentials: 'include',
        })

        const data = await response.json()
        dispatch(setFavoriteList(data))
      } catch (err) {
        dispatch(setFavoriteList(null))
        console.error(err)
      }
    }
    if (!session?.user) return
    fetchFavorites()
  }, [dispatch, session])

  return (
    <div
      className='w-full h-full min-h-screen'
      data-theme={themeMode}
    >
      <HeroSlide
        mediaType={tmdbConfigs.mediaType.movie}
        mediaCategory={tmdbConfigs.mediaCategory.popular}
      />
      <div className='flex flex-col gap-20 last-of-type: mb-40'>
        <Container header='popular movies'>
          <MediaSlide
            mediaType={tmdbConfigs.mediaType.movie}
            mediaCategory={tmdbConfigs.mediaCategory.popular}
          ></MediaSlide>
        </Container>
        <Container header='popular series'>
          <MediaSlide
            mediaType={tmdbConfigs.mediaType.tv}
            mediaCategory={tmdbConfigs.mediaCategory.popular}
          ></MediaSlide>
        </Container>
        <Container header={'top rated movies'}>
          <MediaSlide
            mediaType={tmdbConfigs.mediaType.movie}
            mediaCategory={tmdbConfigs.mediaCategory.top_rated}
          ></MediaSlide>
        </Container>

        <Container header={'top rated series'}>
          <MediaSlide
            mediaType={tmdbConfigs.mediaType.tv}
            mediaCategory={tmdbConfigs.mediaCategory.top_rated}
          ></MediaSlide>
        </Container>
      </div>
    </div>
  )
}
