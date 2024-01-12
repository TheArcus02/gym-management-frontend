import FormWrapper from '@/components/form-wrapper'
import ClientForm from '@/components/forms/client-form'
import Loader from '@/components/loader'
import useGetById from '@/hooks/use-get-by-id'
import { useParams } from 'react-router-dom'

const EditClient = () => {
  const params = useParams()

  const {
    data: client,
    isLoading,
    isError,
  } = useGetById<Client>({
    queryKey: ['client', Number(params.id)],
    url: `/api/client/${params.id}`,
    errorMessage: 'Error fetching client',
    id: Number(params.id),
  })

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
