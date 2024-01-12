/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios'
import { useMutation, useQueryClient } from 'react-query'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import * as z from 'zod'

interface updateProps {
  schema: z.ZodObject<any, any, any>
  id: unknown
  url: string
  successMessage?: string
  errorMessage?: string
  invalidateQueries?: unknown[]
  redirectUrl?: string
}

function useUpdate<T>({
  schema,
  id,
  url,
  successMessage,
  errorMessage,
  invalidateQueries,
  redirectUrl,
}: updateProps) {
  const queryClient = useQueryClient()
  const navigate = useNavigate()

  return useMutation<T, any, z.infer<typeof schema>>({
    mutationKey: [id],
    mutationFn: async (values) => {
      const { data } = await axios.put(
        `${import.meta.env.VITE_BASE_URL || ''}${url}/${id}`,
        {
          ...values,
          date: 1,
        },
      )
      return data as T
    },
    onSuccess: () => {
      if (invalidateQueries && invalidateQueries.length)
        queryClient.invalidateQueries(invalidateQueries)
      toast.success(successMessage || `Item updated successfully`)
      if (redirectUrl) navigate(redirectUrl)
    },
    onError: (error) => {
      console.log(error)
      toast.error(errorMessage || 'Error updating item')
    },
  })
}

export default useUpdate
