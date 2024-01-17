import { Link, useNavigate } from 'react-router-dom'
import { Button } from './ui/button'
import { Separator } from './ui/separator'
import Loader from './loader'
import { ScrollArea } from './ui/scroll-area'
import { ArrowLeft } from 'lucide-react'
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
  const navigate = useNavigate()
  return (
    <div className='w-full h-full flex flex-col'>
      <div className=' flex justify-between items-center'>
        <div className='flex items-center mx-2'>
          <Button
            size='icon'
            variant='ghost'
            onClick={() => navigate(-1)}
          >
            <ArrowLeft className='h-6 w-6' />
          </Button>
          <h2 className='text-xl font-bold py-5 ml-1'>{title}</h2>
        </div>
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
