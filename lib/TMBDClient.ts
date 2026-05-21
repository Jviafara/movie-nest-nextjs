const get = async (url: string) => {
  const res = await fetch(url, {
    headers: {
      Accept: 'application/json',
      'Accept-Encoding': 'identity',
    },
  })
  const data = await res.json()
  return data
}

const TMBDClient = { get }

export default TMBDClient
