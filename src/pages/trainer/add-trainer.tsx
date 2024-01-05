import TrainerForm from '@/components/forms/trainerForm'
import { Separator } from '@/components/ui/separator'

const AddTrainer = () => {
  return (
    <div className='flex flex-col items-center justify-center h-full '>
      <div className='max-w-[360px] w-full'>
        <div>
          <h2 className='font-bold text-lg'>Add Trainer</h2>
          <p className='text-sm text-gray-500'>
            Add a new trainer to the gym
          </p>
        </div>
        <Separator className='my-5' />
        <TrainerForm />
      </div>
    </div>
  )
}

export default AddTrainer
