import FormWrapper from '@/components/form-wrapper'
import CardioExerciseForm from '@/components/forms/cardio-exercise-form'
import StrengthExerciseForm from '@/components/forms/strength-exercise-form'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { useState } from 'react'

const AddExercise = () => {
  const [exerciseType, setExerciseType] = useState<ExerciseType>()

  const handleOnChange = (value: ExerciseType) => {
    setExerciseType(value)
  }

  return (
    <FormWrapper
      title='Add Exercise'
      description='Add a new exercise to the gym'
      form={
        <div className='space-y-5'>
          <div>
            <Label>Exercise Type</Label>
            <Select
              onValueChange={handleOnChange}
              value={exerciseType}
            >
              <SelectTrigger className='mt-2'>
                <SelectValue placeholder='Select Exercise Type' />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value='StrengthExercise'>
                    Strength
                  </SelectItem>
                  <SelectItem value='CardioExercise'>
                    Cardio
                  </SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          {exerciseType === 'StrengthExercise' ? (
            <StrengthExerciseForm />
          ) : exerciseType === 'CardioExercise' ? (
            <CardioExerciseForm />
          ) : null}
        </div>
      }
    />
  )
}

export default AddExercise
