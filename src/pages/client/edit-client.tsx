import FormWrapper from '@/components/form-wrapper'
import ClientForm from '@/components/forms/client-form'
import Loader from '@/components/loader'
import { useGetClient } from '@/hooks/use-client'
import { useParams } from 'react-router-dom'

const EditClient = () => {
  const params = useParams()

  const {
    data: client,
    isLoading,
    isError,
  } = useGetClient(Number(params.id))

  const canDisplay = !isLoading && !isError && client

  return canDisplay ? (
    <FormWrapper
      title='Edit Client'
      description='Edit client details'
      form={<ClientForm client={client} />}
    />
  ) : (
    <Loader />
  )
}

export default EditClient
