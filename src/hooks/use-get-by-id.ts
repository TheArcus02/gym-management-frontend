import axios, { AxiosError } from 'axios'
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

      let axiosError

      if (error instanceof AxiosError) {
        axiosError = error.response?.data.message || error.message
      }

      toast.error(
        `${
          errorMessage || 'Error fetching by id data'
        }: ${axiosError}`,
      )
    },
  })
}

export default useGetById
