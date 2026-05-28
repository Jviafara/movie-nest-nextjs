'use client'

import CircularRate from '@/components/CircularRate'
import Container from '@/components/Container'
import FavoriteButton from '@/components/FavoriteButton'
import ImageHeader from '@/components/ImageHeader'
import MediaSlide from '@/components/MediaSlide'
import MediaVideosSlide from '@/components/MediaVideosSlide'
import RedPills from '@/components/RedPills'
import { useSession } from '@/lib/auth/auth-client'
import tmdbConfigs from '@/lib/configs/tmbd.configs'
import { useAppDispatch, useAppSelector } from '@/lib/hooks/redux.hooks'
import favoriteApi from '@/lib/modules/favoriteApi'
import mediaApi from '@/lib/modules/mediaApi'
import { setAppState } from '@/lib/redux/features/appStateSlice'
import { setAuthModalOpen } from '@/lib/redux/features/authModalSlice'
import { addFavorite, removeFavorite } from '@/lib/redux/features/favoriteSlice'
import { setGlobalLoading } from '@/lib/redux/features/globalLoadingSlice'
import { Favorite, FavoriteParams, Genre, IMediaVideo, Media } from '@/lib/types'
import { Play } from 'lucide-react'
import { notFound, useParams } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import { toast } from 'react-toastify'
import PosterSlides from '@/components/PosterSlides'
import BackDropSlide from '@/components/BackDropSlide'
import CastSlide from '@/components/CastSlide'
import RecommendSlide from '@/components/RecommendSlide'

const MediaDetailsPage = () => {
  const { data: session } = useSession()
  const { favoriteList } = useAppSelector(state => state.favoriteList)
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])
  const params = useParams()
  const mediaType = Array.isArray(params.mediaType) ? params.mediaType[0] : params.mediaType
  const mediaId = Array.isArray(params.mediaId) ? params.mediaId[0] : params.mediaId
  if (mediaType !== 'movie' && mediaType !== 'tv') {
    notFound()
  }

  const [media, setMedia] = useState<Media>()
  const [videos, setVideos] = useState<IMediaVideo[]>([])
  const [isFavorite, setIsFavorite] = useState(false)
  const [onRequest, setOnRequest] = useState(false)
  const [genres, setGenres] = useState<Genre[]>([])

  const dispatch = useAppDispatch()
  const videoRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    dispatch(setAppState(null))
    const getMedia = async () => {
      dispatch(setGlobalLoading(true))
      const { res, message } = await mediaApi.getDetail({
        mediaType,
        mediaId,
      })
      dispatch(setGlobalLoading(false))
      if (res.status_code) {
        notFound()
      }
      console.log(res)
      setMedia(res)
      if (res.videos) {
        setVideos([...res.videos.results].splice(0, 5))
      }
      setIsFavorite(res.isFavorite)
      setGenres(res.genres.splice(0, 2))
      if (message) {
        toast.error(message)
      }
    }
    getMedia()
  }, [dispatch, mediaId, mediaType, favoriteList])

  const onFavoriteClick = async () => {
    if (!session?.user) return dispatch(setAuthModalOpen(true))
    if (isFavorite) {
      onRemoveFavorite()
      return
    }

    setOnRequest(true)
    if (media) {
      const body: FavoriteParams = {
        mediaId: media.id,
        mediaTitle: media.title! || media.name!,
        mediaType: mediaType!,
        mediaPoster: media.poster_path!,
        mediaRate: media.vote_average!,
      }

      const { res, message } = await favoriteApi.add(body)
      setOnRequest(false)
      if (message) toast.error(message)
      if (res.status >= 400) {
        toast.error(res.message)
      } else if (res) {
        dispatch(addFavorite(res))
        setIsFavorite(true)
        toast.success(`${mediaType} added to favorites`)
      }
    } else {
      toast.error('Media Not Found!')
    }
  }

  const onRemoveFavorite = async () => {
    if (onRequest) return
    setOnRequest(true)

    if (media) {
      const favorite = favoriteList.find((e: Favorite) => e.mediaId.toString() === media.id.toString())
      const { res, message } = await favoriteApi.remove(favorite._id)
      setOnRequest(false)
      if (message) toast.error(message)
      if (res.status >= 400) {
        toast.error(res.message)
      } else if (res) {
        dispatch(removeFavorite(res))
        setIsFavorite(false)
        toast.success(`Media remove from favorites`)
      }
    }
  }

  const handlePlay = () => {
    if (videoRef.current) {
      videoRef.current.scrollIntoView()
    }
  }

  return media ? (
    <div className='w-full h-full min-h-screen last:mb-16'>
      <ImageHeader imgPath={tmdbConfigs.backdropPath(media.backdrop_path || media.poster_path!)} />
      <div className='relative  flex flex-col gap-16 w-full max-w-341.5 p-2 m-auto'>
        {/* Media Content */}
        <div className='-mt-20 md:-mt-40 lg:-mt-60 xl:-mt-80'>
          <div className='flex flex-col md:flex-row items-center md:items-start  lg:mx-auto '>
            {/* Poster */}
            <div className='w-[70%] sm:w-[50%] md:w-[40%] mt-0 mb-8 md:my-0 md:ml-8'>
              <div
                style={{
                  backgroundImage: `url(${tmdbConfigs.backdropPath(
                    tmdbConfigs.posterPath(media.backdrop_path || media.poster_path!),
                  )})`,
                }}
                className='pt-[140%] bg-cover bg-top'
              />
            </div>
            {/* Poster */}
            {/* Media Info */}
            <div className='mt-8 md:mt-0 w-full md:w-[60%] text-primary'>
              <div className='flex flex-col gap-8 px-8'>
                {/* Title */}
                <h1 className='text-[2rem] md:text-[3rem] lg:text-[4rem] font-bold'>{`${media.title || media.name} - ${
                  mediaType === tmdbConfigs.mediaType.movie
                    ? media.release_date?.split('-')[0]
                    : media.first_air_date?.split('-')[0]
                }`}</h1>

                {/* Title */}
                {/* Rate and Genres */}
                <div className='flex gap-4 items-center'>
                  {/*Rate */}
                  <CircularRate value={media.vote_average || media.mediaRate || 0} />
                  {/*Rate */}
                  {/* Genres */}
                  <div className='flex gap-2'>
                    {genres.map((genre, index) => (
                      <RedPills
                        key={index}
                        item={genre.name}
                      />
                    ))}
                  </div>
                  {/* Genres */}
                </div>
                {/* Rate and Genres */}
                {/* overview */}
                <div className='text-primary'>
                  <p>{media.overview}</p>
                </div>
                {/* overview */}

                {/* Buttons */}
                <div className='flex gap-12 items-center'>
                  <FavoriteButton
                    loading={onRequest}
                    onFavoriteClick={onFavoriteClick}
                    isFavorite={isFavorite}
                  />
                  {/* watch now */}
                  <div className='px-4 py-2 text-xl font-semibold text-white bg-secondary w-fit rounded-lg cursor-pointer'>
                    <button
                      onClick={handlePlay}
                      className='flex gap-3 cursor-pointer'
                    >
                      <Play size={28} /> Watch Now
                    </button>
                  </div>
                  {/* watch now */}
                </div>
                {/* Buttons */}

                {/* Cast */}
                <Container header='Cast'>{media?.credits && <CastSlide cast={media.credits.cast} />}</Container>
                {/* Cast */}
              </div>
            </div>
            {/* Media Info */}
          </div>
        </div>
        {/* Media Content */}

        {/* Media Video */}
        <div
          ref={videoRef}
          style={{ paddingTop: '2rem' }}
        >
          {videos && (
            <Container header='Videos'>
              <MediaVideosSlide videos={videos} />
            </Container>
          )}
        </div>
        {/* Media Video */}

        {/* Media Backdrops */}
        {media.images!.backdrops.length > 0 && (
          <Container header={'backdrops'}>
            {media.images && <BackDropSlide backdrops={media.images.backdrops || []} />}
          </Container>
        )}
        {/* Media Backdrops */}

        {/* Media Posters */}
        {media.images!.posters.length > 0 && (
          <Container header={'posters'}>{media.images && <PosterSlides posters={media.images.posters} />}</Container>
        )}
        {/* Media Posters */}

        {/* Media Reviews */}
        {/* <MediaReview
          reviews={media.reviews}
          media={media}
          mediaType={mediaType}
        /> */}
        {/* Media Reviews */}

        {/* Media Recommendations */}
        {media.recommend!.results.length > 0 && (
          <Container header={'recommendations'}>
            {media.recommend && (
              <RecommendSlide
                medias={media.recommend.results}
                mediaType={mediaType}
              />
            )}
          </Container>
        )}
        {media.recommend!.results.length === 0 && (
          <MediaSlide
            mediaType={mediaType}
            mediaCategory={tmdbConfigs.mediaCategory.top_rated}
          />
        )}
        {/* Media Recommendations */}
      </div>
    </div>
  ) : null
}

export default MediaDetailsPage
