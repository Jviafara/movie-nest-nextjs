import HeroSlide from '@/components/HeroSlide'
import tmdbConfigs from '@/lib/configs/tmbd.configs'

export default function Home() {
  return (
    <div className='w-full h-full min-h-screen'>
      <HeroSlide
        mediaType={tmdbConfigs.mediaType.movie}
        mediaCategory={tmdbConfigs.mediaCategory.popular}
      />
    </div>
  )
}
