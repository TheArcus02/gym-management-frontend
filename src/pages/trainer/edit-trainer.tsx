import TrainerForm from '@/components/forms/trainerForm'
import Loader from '@/components/loader'
import { Separator } from '@/components/ui/separator'
import axios from 'axios'
import { useQuery } from 'react-query'
import { useParams } from 'react-router-dom'
import { toast } from 'sonner'

const EditTrainer = () => {
  const params = useParams()

  const {
    data: trainer,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['trainer', params.id],
    enabled: !!params.id,
    queryFn: async () => {
      const { data } = await axios.get(
        `${
          import.meta.env.VITE_BASE_URL || ''
        }/api/trainer/${parseInt(params.id!)}`,
      )
      return data as Trainer
    },
    onError: (error) => {
      console.log(error)
      toast.error('Error fetching trainer')
    },
  })

  const canDisplay = !isLoading && !isError && trainer

  return (
    <div className='flex flex-col items-center justify-center h-full '>
      <div className='max-w-[360px] w-full'>
        <div>
          <h2 className='font-bold text-lg'>Edit Trainer</h2>
          <p className='text-sm text-gray-500'>
            Edit trainer details
          </p>
        </div>
        <Separator className='my-5' />
        {canDisplay ? <TrainerForm trainer={trainer} /> : <Loader />}
      </div>
    </div>
  )
}

export default EditTrainer
