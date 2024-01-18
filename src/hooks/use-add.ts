/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios'
import { useMutation, useQueryClient } from 'react-query'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import * as z from 'zod'

interface AddProps {
  schema: z.ZodObject<any, any, any>
  url: string
  successMessage?: string
  errorMessage?: string
  invalidateQueries?: unknown[]
  redirectUrl?: string
}

function useAdd<T>({
  schema,
  url,
  successMessage,
  errorMessage,
  invalidateQueries,
  redirectUrl,
}: AddProps) {
  const queryClient = useQueryClient()
  const navigate = useNavigate()

  return useMutation<T, any, z.infer<typeof schema>>({
    mutationFn: async (values) => {
      const { data } = await axios.post(
        `${import.meta.env.VITE_BASE_URL || ''}${url}`,
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
      toast.success(successMessage || `Item added successfully`)
      if (redirectUrl) navigate(redirectUrl)
    },
    onError: (error) => {
      console.log(error)
      toast.error(errorMessage || 'Error adding item')
    },
  })
}

export default useAdd
