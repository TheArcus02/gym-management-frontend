import axios from 'axios'
import { UseQueryResult, useQuery } from 'react-query'
import { toast } from 'sonner'

interface GetAllProps {
  queryKey: unknown[]
  url: string
  errorMessage?: string
}

function useGetAll<T>({
  queryKey,
  url,
  errorMessage,
}: GetAllProps): UseQueryResult<T> {
  return useQuery<T>({
    queryKey,
    queryFn: async () => {
      const { data } = await axios.get(
        `${import.meta.env.VITE_BASE_URL || ''}${url}`,
      )
      return data as T
    },
    onError: (error) => {
      console.log(error)
      toast.error(errorMessage || 'Error fetching data')
    },
  })
}

export default useGetAll
