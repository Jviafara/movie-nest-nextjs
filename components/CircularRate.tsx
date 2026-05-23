interface ICircularRate {
  value: number
}

const CircularRate = ({ value }: ICircularRate) => {
  let color = ''
  const percentage = parseInt(value.toFixed(1)) * 10
  const size = 64
  const strokeWidth = 4
  const radius = (size - strokeWidth) / 2
  const circumference = radius * 2 * Math.PI
  const offset = circumference - (percentage / 100) * circumference

  if (value <= 2.5) {
    color = 'text-secondary'
  } else if (value <= 5) {
    color = 'text-orange-500'
  } else if (value <= 7.5) {
    color = 'text-yellow-500'
  } else {
    color = 'text-accent'
  }
  return (
    <div
      className='relative flex items-center justify-center '
      style={{ width: size, height: size }}
    >
      <svg
        className='transform -rotate-90'
        width={size}
        height={size}
      >
        {/* Background Circle (Track) */}
        <circle
          className='text-gray-200'
          strokeWidth={strokeWidth}
          stroke='currentColor'
          fill='transparent'
          r={radius}
          cx={size / 2}
          cy={size / 2}
        />
        {/* Progress Circle */}
        <circle
          className={`${color} transition-all duration-500 ease-out`}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap='round'
          stroke='currentColor'
          fill='transparent'
          r={radius}
          cx={size / 2}
          cy={size / 2}
        />
      </svg>
      {/* Percentage Text */}
      <span className='absolute text-primary text-base md:text-lg lg:text-xl font-semibold'>{value.toFixed(1)}</span>
    </div>
  )
}

export default CircularRate
