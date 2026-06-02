'use client'

import Container from '@/components/Container'
import PersonMediaGrid from '@/components/PersonMediaGrid'
import tmdbConfigs from '@/lib/configs/tmbd.configs'
import { useAppDispatch } from '@/lib/hooks/redux.hooks'
import personApi from '@/lib/modules/personApi'
import { setAppState } from '@/lib/redux/features/appStateSlice'
import { setGlobalLoading } from '@/lib/redux/features/globalLoadingSlice'
import { PersonDetails } from '@/lib/types'
import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'

const PersonDetailsPage = () => {
  const { personId } = useParams()

  const [person, setPerson] = useState<PersonDetails | null>(null)

  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(setAppState(null))
    window.scrollTo(0, 0)
  }, [dispatch])

  useEffect(() => {
    const getPersonDetails = async () => {
      dispatch(setGlobalLoading(true))

      const { res, message } = await personApi.getDetail(personId?.toLocaleString() || '')
      if (res) dispatch(setGlobalLoading(false))

      if (message) toast.error(message)
      if (res.status >= 400) {
        toast.error(res.message)
      } else if (res) {
        setPerson(res)
      }
    }
    getPersonDetails()
  }, [dispatch, personId])

  return (
    <div>
      <div className='max-w-341.5 mx-auto min-h-screen p-12 my-10'>
        {person && (
          <div>
            <div className='flex flex-col md:flex-row justify-center items-center md:items-start gap-8 mb-10'>
              <div className='w-[50%] md:w-[20%]'>
                <div
                  style={{
                    backgroundImage: `url(${tmdbConfigs.posterPath(person.profile_path || '')})`,
                  }}
                  className='pt-[160%] bg-cover bg-top bg-base-300'
                />
              </div>
              <div className='w-full md:w-[80%] py-4 px-0  md:px-8 p-4'>
                <div className='text-primary flex flex-col gap-4'>
                  <h1 className='text-xl font-semibold underline'>
                    {`${person.name} (${person.birthday.split('-')[0]}`}
                    {person.deathday && ` - ${person.deathday.split('-')[0]}`}
                    {')'}
                  </h1>
                  <p className='line-clamp-10 text-justify'>{person.biography}</p>
                </div>
              </div>
            </div>
            <Container header='media'>
              <PersonMediaGrid personId={personId?.toLocaleString() || ''} />
            </Container>
          </div>
        )}
      </div>
    </div>
  )
}

export default PersonDetailsPage
