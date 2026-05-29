const TextAvatar = ({ text }: { text: string }) => {
  const stringToColor = (str: string) => {
    let hash = 0
    let i

    for (i = 0; i < str.length; i += 1) {
      hash = str.charCodeAt(i) + ((hash << 5) - hash)
    }

    let color = '#'

    for (i = 0; i < 3; i += 1) {
      const value = (hash >> (i * 8)) & 0xff
      color += `00${value.toString(16)}`.slice(-2)
    }

    return color
  }

  return (
    <div className=''>
      <div
        style={{ backgroundColor: stringToColor(text) }}
        className='text-white font-bold rounded-full  w-9 h-9 flex items-center justify-center'
      >
        <span className='text-lg text-center leading-none'>{text.split(' ')[0][0]}</span>
      </div>
    </div>
  )
}

export default TextAvatar
