import CategoryIndicator from '@/components/category-indicator'
import DifficultyIndicator from '@/components/difficulty-indicator'
import ObjectCard from '@/components/object-card'
import SectionWrapper from '@/components/section-wrapper'
import { Button } from '@/components/ui/button'
import useDelete from '@/hooks/use-delete'
import {
  useDeleteExercise,
  useGetExercises,
} from '@/hooks/use-exercise'
import useGetAll from '@/hooks/use-get-all'
import { Link } from 'react-router-dom'

export const ExerciseCardContent = ({
  exercise,
}: {
  exercise: ExerciseObject
}) => {
  return (
    <>
      <p>
        Category: <CategoryIndicator category={exercise.category} />
      </p>
      <p>
        Equipment:{' '}
        {exercise.equipment
          ? exercise.equipment.name
          : 'Not assigned'}
      </p>
      {exercise.type === 'StrengthExercise' ? (
        <>
          <p>Sets: {(exercise as StrengthExercise).sets}</p>
          <p>Reps: {(exercise as StrengthExercise).reps}</p>
          <p>Weight {(exercise as StrengthExercise).weight}kg</p>
        </>
      ) : (
        <>
          <p>Duration: {(exercise as CardioExercise).duration}m</p>
          <p>Tempo: {(exercise as CardioExercise).tempo} km/h</p>
        </>
      )}
    </>
  )
}

const Exercise = () => {
  const { data: exercises, isLoading, isError } = useGetExercises()

  const { mutate: deleteExercise } = useDeleteExercise()

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
            content={<ExerciseCardContent exercise={exercise} />}
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
