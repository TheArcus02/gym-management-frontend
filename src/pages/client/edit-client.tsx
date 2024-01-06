import FormWrapper from '@/components/form-wrapper'
import ClientForm from '@/components/forms/clientForm'
import Loader from '@/components/loader'
import axios from 'axios'
import { useQuery } from 'react-query'
import { useParams } from 'react-router-dom'
import { toast } from 'sonner'

const EditClient = () => {
  const params = useParams()

  const {
    data: client,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['client', params.id],
    enabled: !!params.id,
    queryFn: async () => {
      const { data } = await axios.get(
        `${import.meta.env.VITE_BASE_URL || ''}/api/client/${parseInt(
          params.id!,
        )}`,
      )
      return data as Client
    },
    onError: (error) => {
      console.log(error)
      toast.error('Error fetching client')
    },
  })

  const canDisplay = !isLoading && !isError && client

  return canDisplay ? (
    <FormWrapper
      title='Add Client'
      description='Add new client to the gym'
      form={<ClientForm client={client} />}
    />
  ) : (
    <Loader />
  )
}

export default EditClient
