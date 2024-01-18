import CategoryIndicator from '@/components/category-indicator'
import DifficultyIndicator from '@/components/difficulty-indicator'
import ObjectCard from '@/components/object-card'
import SearchInput from '@/components/search-input'
import SectionWrapper from '@/components/section-wrapper'
import { Button } from '@/components/ui/button'
import {
  useDeleteExercise,
  useGetExercises,
} from '@/hooks/use-exercise'
import useSearch from '@/hooks/use-search'
import { useEffect } from 'react'
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
  const [search, setSearch] = useSearch()

  const {
    data: exercises,
    isLoading,
    isError,
    refetch,
  } = useGetExercises({
    search: search,
  })

  const { mutate: deleteExercise } = useDeleteExercise()

  useEffect(() => {
    refetch()
  }, [search, refetch])

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
      <SearchInput
        handleInputChange={(e) => setSearch(e.target.value)}
        placeholder='Search exercises...'
      />
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
