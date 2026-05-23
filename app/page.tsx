'use client'
import Container from '@/components/Container'
import HeroSlide from '@/components/HeroSlide'
import MediaSlide from '@/components/MediaSlide'
import tmdbConfigs from '@/lib/configs/tmbd.configs'
import { useAppSelector } from '@/lib/hooks/redux.hooks'

export default function Home() {
  const { themeMode } = useAppSelector(state => state.themeMode)
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
