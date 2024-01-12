import FormWrapper from '@/components/form-wrapper'
import TrainingForm from '@/components/forms/training-form'

const AddTraining = () => {
  return (
    <FormWrapper
      title='Add Training'
      description='Add a new training to the gym'
      form={<TrainingForm />}
    />
  )
}

export default AddTraining
