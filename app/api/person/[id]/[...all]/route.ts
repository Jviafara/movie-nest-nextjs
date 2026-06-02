import responseHandler from '@/lib/responseHandler'
import TMDBApi from '@/lib/tmdb/tmdbApi'
import { NextRequest } from 'next/server'

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string; all: string[] }> }) {
  try {
    const { id: personId, all } = await params

    if (all[0] === 'detail') {
      const person = await TMDBApi.personDetail({ personId })
      return responseHandler.ok(person)
    } else if (all[0] === 'medias') {
      const person = await TMDBApi.personMedias({ personId })
      return responseHandler.ok(person)
    } else {
      return responseHandler.notFound()
    }
  } catch {
    return responseHandler.error()
  }
}
