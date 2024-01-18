import axios, { AxiosError } from 'axios'
import { useMutation, useQueryClient } from 'react-query'
import { toast } from 'sonner'

interface DeleteProps {
  url: string
  successMessage?: string
  errorMessage?: string
  invalidateQueries?: unknown[]
}

const useDelete = ({
  url,
  successMessage,
  errorMessage,
  invalidateQueries,
}: DeleteProps) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (id: number) => {
      await axios.delete(
        `${import.meta.env.VITE_BASE_URL || ''}${url}/${id}`,
      )
    },
    onSuccess: () => {
      if (invalidateQueries && invalidateQueries.length)
        queryClient.invalidateQueries(invalidateQueries)
      toast.success(successMessage || `Deleted successfully`)
    },
    onError: (error) => {
      console.log(error)

      let axiosError

      if (error instanceof AxiosError) {
        axiosError = error.response?.data.message || error.message
      }

      toast.error(
        `${errorMessage || 'Error deleting item'}: ${axiosError}`,
      )
    },
  })
}

export default useDelete
