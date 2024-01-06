import FormWrapper from '@/components/form-wrapper'
import TrainerForm from '@/components/forms/trainerForm'

const AddTrainer = () => {
  return (
    <FormWrapper
      title='Add Trainer'
      description='Add a new trainer to the gym'
      form={<TrainerForm />}
    />
  )
}

export default AddTrainer
