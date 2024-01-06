import FormWrapper from '@/components/form-wrapper'
import ClientForm from '@/components/forms/clientForm'

const AddClient = () => {
  return (
    <FormWrapper
      title='Add Client'
      description='Add new client to the gym'
      form={<ClientForm />}
    />
  )
}

export default AddClient
