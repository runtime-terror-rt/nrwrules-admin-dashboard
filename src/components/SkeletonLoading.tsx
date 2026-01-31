import { Skeleton } from './ui/skeleton'

const SkeletonLoading = ({
  count = 1,
  direction = 'horizontal',
}: {
  count?: number
  direction?: 'horizontal' | 'vertical'
}) => {
  return (
    <div
      className={
        direction === 'horizontal' ? 'w-full flex justify-between gap-3' : 'w-full space-y-3'
      }
    >
      {Array.from({ length: count }).map((_, index) => (
        <Skeleton
          key={index}
          className={
            direction === 'horizontal'
              ? 'h-44 w-full bg-gray-100 rounded-lg'
              : 'h-44 w-full bg-gray-100 rounded-lg'
          }
        />
      ))}
    </div>
  )
}

export default SkeletonLoading
