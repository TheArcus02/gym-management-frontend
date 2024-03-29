import axios, { AxiosError } from 'axios'
import { UseQueryResult, useQuery } from 'react-query'
import { toast } from 'sonner'

interface GetAllProps<T> {
  queryKey: unknown[]
  url: string
  errorMessage?: string
  selectFn?: (data: T) => T
}

function useGetAll<T>({
  queryKey,
  url,
  errorMessage,
  selectFn,
}: GetAllProps<T>): UseQueryResult<T> {
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

      let axiosError

      if (error instanceof AxiosError) {
        axiosError = error.response?.data.message || error.message
      }

      toast.error(
        `${errorMessage || 'Error fetching all data'}: ${axiosError}`,
      )
    },
    select: selectFn,
  })
}

export default useGetAll
