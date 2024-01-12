import axios from 'axios'
import { useQuery } from 'react-query'
import { toast } from 'sonner'

interface GetByIdProps {
  queryKey: unknown[]
  id: number
  url: string
  errorMessage?: string
}

function useGetById<T>({
  queryKey,
  id,
  url,
  errorMessage,
}: GetByIdProps) {
  return useQuery<T>({
    queryKey,
    enabled: !!id,
    queryFn: async () => {
      const { data } = await axios.get(
        `${import.meta.env.VITE_BASE_URL || ''}${url}`,
      )
      return data as T
    },
    onError: (error) => {
      console.log(error)
      toast.error(errorMessage || 'Error fetching by id data')
    },
  })
}

export default useGetById
