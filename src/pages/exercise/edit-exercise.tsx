import FormWrapper from '@/components/form-wrapper'
import CardioExerciseForm from '@/components/forms/cardio-exercise-form'
import StrengthExerciseForm from '@/components/forms/strength-exercise-form'
import Loader from '@/components/loader'
import { useGetExercise } from '@/hooks/use-exercise'
import { useParams } from 'react-router-dom'

const EditExercise = () => {
  const params = useParams()

  const {
    data: exercise,
    isLoading,
    isError,
  } = useGetExercise(Number(params.id))

  const canDisplay = !isLoading && !isError && exercise

  return canDisplay ? (
    <FormWrapper
      title='Edit Exercise'
      description='Edit exercise details'
      form={
        exercise.type === 'StrengthExercise' ? (
          <StrengthExerciseForm
            exercise={exercise as StrengthExercise}
          />
        ) : exercise.type === 'CardioExercise' ? (
          <CardioExerciseForm exercise={exercise as CardioExercise} />
        ) : null
      }
    />
  ) : (
    <Loader />
  )
}

export default EditExercise
