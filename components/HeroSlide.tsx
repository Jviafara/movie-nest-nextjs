'use client'

import tmdbConfigs from '@/lib/configs/tmbd.configs'
import { useAppDispatch } from '@/lib/hooks/redux.hooks'
import genreApi from '@/lib/modules/genreApi'
import mediaApi from '@/lib/modules/mediaApi'
import { TMBD_PARAMS, Movie, Genre } from '@/lib/types'
import { Play } from 'lucide-react'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { Autoplay } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'

const HeroSlide = ({ mediaType, mediaCategory }: TMBD_PARAMS) => {
  const dispatch = useAppDispatch()

  const [movies, setMovies] = useState<Movie[]>([])
  const [genres, setGenres] = useState<Genre[]>([])

  useEffect(() => {
    const getMedias = async () => {
      const { res, message } = await mediaApi.getList({
        mediaType,
        mediaCategory,
        page: '1',
      })
      if (res) setMovies(res.results)
      if (message) toast.error(message)
      //   dispatch(setGlobalLoading(false))
    }

    const getGenres = async () => {
      // dispatch(setGlobalLoading(true))
      const { res, message } = await genreApi.getList({ mediaType })
      if (res) {
        setGenres(res.genres)
        getMedias()
      }
      if (message) {
        toast.error(message)
        //   setGlobalLoading(false)
      }
    }

    getGenres()
  }, [mediaType, mediaCategory, dispatch])
  return (
    <div className='text-primary w-full h-max'>
      <Swiper
        grabCursor={true}
        loop={true}
        style={{ width: '100%', height: 'max-content' }}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        modules={[Autoplay]}
      >
        {movies.map((movie, index) => (
          <SwiperSlide key={index}>
            <div
              style={{
                backgroundImage: `url(${tmdbConfigs.backdropPath(movie.backdrop_path || movie.poster_path!)})`,
              }}
              className='pt-[130%] sm:pt-[80%] md:pt-[60%] lg:pt-[45%] bg-cover bg-top'
            />
            <div className='w-full min-h-fit h-full flex flex-col gap-2 items-center md:items-start justify-center xl:pb-24 md:gap-8 absolute top-0 left-0  px-[15px] md:px-[5rem] lg:px-[10rem] bg-gradient-to-t from-base-100'>
              <h1 className='text-[2rem] lg:text-[4rem] font-bold text-center md:text-left w-full md:truncate text-primary'>
                {movie.title || movie.name}
              </h1>
              <div className='flex gap-8 items-center'>
                {/* rating */}
                {/* <CircularRate value={movie.vote_average} /> */}
                {/* rating */}

                {/* genres */}
                {/* <div className='flex gap-4'>
                  {[...movie.genre_ids].splice(0, 2).map((genreId, index) => (
                    <RedPills
                      key={index}
                      item={genres.find(e => e.id === genreId) && genres.find(e => e.id === genreId).name}
                    />
                  ))}
                </div> */}
                {/* genres */}
              </div>
              {/* overview */}
              <p className='text-primary font-semibold text-lg line-clamp-2 md:w-[75%]'>{movie.overview}</p>
              {/* overview */}
              {/* watch now */}
              <div className='px-4 py-2 text-xl font-semibold text-white bg-secondary w-fit rounded-lg'>
                <Link
                  href={`/${mediaType}/${movie.id}`}
                  className='flex gap-3'
                >
                  <Play size={28} /> Watch Now
                </Link>
              </div>
              {/* watch now */}
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}

export default HeroSlide
