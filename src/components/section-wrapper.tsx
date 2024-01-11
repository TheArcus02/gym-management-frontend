import { Link } from 'react-router-dom'
import { Button } from './ui/button'
import { Separator } from './ui/separator'
import Loader from './loader'
import { ScrollArea } from './ui/scroll-area'
interface SectionWrapperProps {
  title: string
  isLoading: boolean
  buttonProps?: {
    title: string
    link: string
  }
  children: React.ReactNode
}

const SectionWrapper = ({
  title,
  buttonProps,
  isLoading,
  children,
}: SectionWrapperProps) => {
  return (
    <div className='w-full h-full flex flex-col'>
      <div className=' flex justify-between items-center'>
        <h2 className='text-xl font-bold py-5 pl-3'>{title}</h2>
        {buttonProps && (
          <Link to={buttonProps.link}>
            <Button size='sm' className='mr-3'>
              {buttonProps.title}
            </Button>
          </Link>
        )}
      </div>
      <Separator />
      {isLoading ? (
        <Loader />
      ) : (
        <ScrollArea className='flex-1'>
          <div className='p-4 flex flex-wrap w-full gap-5'>
            {children}
          </div>
        </ScrollArea>
      )}
    </div>
  )
}

export default SectionWrapper
