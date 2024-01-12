import CategoryIndicator from '@/components/category-indicator'
import DifficultyIndicator from '@/components/difficulty-indicator'
import ObjectCard from '@/components/object-card'
import SectionWrapper from '@/components/section-wrapper'
import { Button } from '@/components/ui/button'
import useDelete from '@/hooks/use-delete'
import useGetAll from '@/hooks/use-get-all'
import { Link } from 'react-router-dom'

type ExerciseArray = (StrengthExercise | CardioExercise)[]

const Exercise = () => {
  const {
    data: exercises,
    isLoading,
    isError,
  } = useGetAll<ExerciseArray>({
    queryKey: ['exercises'],
    url: '/api/exercise',
    errorMessage: 'Error fetching exercises',
  })

  const { mutate: deleteExercise } = useDelete({
    url: '/api/exercise',
    successMessage: 'Exercise deleted successfully',
    errorMessage: 'Error deleting exercise',
    invalidateQueries: ['exercises'],
  })

  const canDisplay = !isLoading && !isError && exercises

  return (
    <SectionWrapper
      title='Exercises'
      isLoading={!canDisplay}
      buttonProps={{
        title: 'Add Exercise',
        link: '/exercise/add',
      }}
    >
      {canDisplay &&
        exercises.map((exercise) => (
          <ObjectCard
            key={exercise.id}
            title={exercise.name}
            description={
              <DifficultyIndicator difficulty={exercise.difficulty} />
            }
            content={
              <>
                <p>
                  Category:{' '}
                  <CategoryIndicator category={exercise.category} />
                </p>
                {exercise.type === 'StrengthExercise' ? (
                  <>
                    <p>Sets: {(exercise as StrengthExercise).sets}</p>
                    <p>Reps: {(exercise as StrengthExercise).reps}</p>
                    <p>
                      Weight {(exercise as StrengthExercise).weight}kg
                    </p>
                  </>
                ) : (
                  <>
                    <p>
                      Duration:{' '}
                      {(exercise as CardioExercise).duration}m
                    </p>
                    <p>
                      Tempo: {(exercise as CardioExercise).tempo} km/h
                    </p>
                  </>
                )}
              </>
            }
            footer={
              <>
                <Link to={`/exercise/${exercise.id}`}>
                  <Button variant='outline'>Edit</Button>
                </Link>
                <Link to={`/exercise/${exercise.id}/equipment`}>
                  <Button size='sm'>Assign Equipment</Button>
                </Link>
              </>
            }
            deleteFunction={() => deleteExercise(exercise.id)}
          />
        ))}
    </SectionWrapper>
  )
}

export default Exercise