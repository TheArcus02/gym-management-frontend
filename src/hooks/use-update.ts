/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, { AxiosError } from 'axios'
import { useMutation, useQueryClient } from 'react-query'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import * as z from 'zod'

interface UpdateProps {
  schema: z.ZodObject<any, any, any>
  url: string
  successMessage?: string
  errorMessage?: string
  invalidateQueries?: unknown[]
  redirectUrl?: string
}

function useUpdate<T>({
  schema,
  url,
  successMessage,
  errorMessage,
  invalidateQueries,
  redirectUrl,
}: UpdateProps) {
  const queryClient = useQueryClient()
  const navigate = useNavigate()

  return useMutation<
    T,
    any,
    { values: z.infer<typeof schema>; id: number }
  >({
    mutationFn: async ({ values, id }) => {
      const { data } = await axios.put(
        `${import.meta.env.VITE_BASE_URL || ''}${url}/${id}`,
        {
          ...values,
          date: 1,
        },
      )
      return data as T
    },
    onSuccess: (data, variables) => {
      if (invalidateQueries && invalidateQueries.length)
        queryClient.invalidateQueries(invalidateQueries)
      toast.success(successMessage || `Item updated successfully`)
      if (redirectUrl) navigate(redirectUrl)
    },
    onError: (error) => {
      console.log(error)

      let axiosError

      if (error instanceof AxiosError) {
        axiosError = error.response?.data.message || error.message
      }

      toast.error(
        `${errorMessage || 'Error updating item'}: ${axiosError}`,
      )
    },
  })
}

export default useUpdate
