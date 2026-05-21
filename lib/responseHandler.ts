import { NextResponse } from 'next/server'

const responseWithData = (body: Record<string, unknown>, status: number) => NextResponse.json(body, { status })

const error = () =>
  responseWithData(
    {
      status: 500,
      message: 'Oops! Something wrong!',
    },
    500,
  )

const badRequest = (message: string) => responseWithData({ status: 400, message }, 400)

const ok = (data: any) => responseWithData(data, 200)

const unauthorize = () => responseWithData({ status: 401, message: 'Unauthorized' }, 401)

const notFound = () => responseWithData({ status: 404, message: 'Resource Not Found' }, 404)

const responseHandler = {
  responseWithData,
  error,
  badRequest,
  ok,
  unauthorize,
  notFound,
}

export default responseHandler
