import CategoryIndicator from '@/components/category-indicator'
import ObjectCard from '@/components/object-card'
import SectionWrapper from '@/components/section-wrapper'
import { Button } from '@/components/ui/button'
import useGetAll from '@/hooks/use-get-all'
import useGetById from '@/hooks/use-get-by-id'
import axios from 'axios'
import { useMutation, useQueryClient } from 'react-query'
import { useParams } from 'react-router-dom'
import { toast } from 'sonner'
import { ExerciseCardContent } from '../exercise/exercise'

const AssignExercise = () => {
  const queryClient = useQueryClient()
  const params = useParams()

  const {
    data: exercises,
    isLoading,
    isError,
  } = useGetAll<ExerciseObject[]>({
    queryKey: ['exercises'],
    url: `/api/exercise`,
    errorMessage: 'Error fetching exercises',
  })

  const { data: training } = useGetById<Training>({
    queryKey: ['training', params.id],
    url: `/api/training/${params.id}`,
    errorMessage: 'Error fetching training',
    id: Number(params.id),
  })

  const { mutate: assignExercise } = useMutation({
    mutationFn: async (exerciseId: number) => {
      const { data } = await axios.patch(
        `${
          import.meta.env.VITE_BASE_URL || ''
        }/api/training/${parseInt(
          params.id!,
        )}/exercise/${exerciseId}`,
        {},
      )
      return data as Training
    },
    onMutate: async (exerciseId: number) => {
      await queryClient.cancelQueries([
        'exercises',
        'training',
        params.id,
      ])

      const prevExercises = queryClient.getQueryData<
        ExerciseObject[]
      >(['exercises'])

      const prevTraining = queryClient.getQueryData<Training>([
        'training',
        params.id,
      ])

      if (prevExercises && prevTraining) {
        const updatedExercise = prevExercises.find(
          (e) => e.id === exerciseId,
        )
        if (!updatedExercise) return
        const newTraining: Training = {
          ...prevTraining,
          exercises: [...prevTraining.exercises, updatedExercise],
        }
        queryClient.setQueryData<Training>(
          ['training', params.id],
          newTraining,
        )
      }

      return { prevTraining, prevExercises }
    },
    onError: (error, variables, context) => {
      console.log(error)
      toast.error('Error assigning exercise')
      if (context?.prevExercises) {
        queryClient.setQueryData<
          (StrengthExercise | CardioExercise)[]
        >(['exercises'], context.prevExercises)
      }
      if (context?.prevTraining) {
        queryClient.setQueryData<Training>(
          ['training', params.id],
          context.prevTraining,
        )
      }
    },
    onSettled: () => {
      toast.success('Equipment assigned successfully')
      queryClient.invalidateQueries(['equipment'])
    },
  })

  const canDisplay = !isLoading && !isError && training && exercises

  return (
    <SectionWrapper title='Assign Equipment' isLoading={!canDisplay}>
      {canDisplay &&
        exercises.map((exercise) => (
          <ObjectCard
            key={exercise.id}
            title={exercise.name}
            content={<ExerciseCardContent exercise={exercise} />}
            footer={
              training.exercises.find((e) => e.id === exercise.id) ? (
                <>
                  <Button disabled>Assigned</Button>
                  <Button
                    onClick={() => undefined}
                    variant='destructive'
                  >
                    Unassign
                  </Button>
                </>
              ) : (
                <Button onClick={() => assignExercise(exercise.id)}>
                  Assign
                </Button>
              )
            }
          />
        ))}
    </SectionWrapper>
  )
}

export default AssignExercise
