import { ReactNode } from 'react'
import { Separator } from './ui/separator'

interface FormWrapperProps {
  title: string
  description: string
  form: ReactNode
}

const FormWrapper = ({
  title,
  description,
  form,
}: FormWrapperProps) => {
  return (
    <div className='flex flex-col items-center justify-center h-full '>
      <div className='max-w-[360px] w-full'>
        <div>
          <h2 className='font-bold text-lg'>{title}</h2>
          <p className='text-sm text-gray-500'>{description}</p>
        </div>
        <Separator className='my-5' />
        {form}
      </div>
    </div>
  )
}

export default FormWrapper
