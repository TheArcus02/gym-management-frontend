type Difficulty = 'EASY' | 'MEDIUM' | 'HARD'

type Category = 'PUSH' | 'PULL' | 'LEGS' | 'CARDIO'

type ExerciseType = 'StrengthExercise' | 'CardioExercise'

type EquipmentType = 'Dumbells' | 'Barbell' | 'Machine'

type ExerciseObject = StrengthExercise | CardioExercise

type EquipmentObject = Dumbells | Barbell | Machine

interface DbObject {
  id: number
  name: string
  createdAt: number
}

interface Trainer extends DbObject {
  surname: string
  salary: number
  clients: Client[]
}

interface Client extends DbObject {
  surname: string
  weight: number
  email: string
  workoutPlan: WorkoutPlan
  trainerId: number
  isTraining: boolean
  currentlyTrainedExerciseId: number | null
}

interface WorkoutPlan extends DbObject {
  description: string
  trainings: Training[]
  difficulty: Difficulty
}

interface Training extends DbObject {
  exercises: (StrengthExercise | CardioExercise)[]
  workoutPlans: WorkoutPlan[]
  description: string
}

interface Exercise extends DbObject {
  difficulty: Difficulty
  category: Category
  equipment: Dumbells | Barbell | Machine
  type: ExerciseType
}

interface StrengthExercise extends Exercise {
  sets: number
  reps: number
  weight: number
}

interface CardioExercise extends Exercise {
  duration: number
  tempo: number
}

interface Equipment extends DbObject {
  isOccupied: boolean
  occupiedBy: number | null
  type: EquipmentType
}

interface Dumbells extends Equipment {
  weight: number
}

interface Barbell extends Equipment {
  weight: number
}

interface Machine extends Equipment {
  category: Category
}

interface SearchableQuery {
  search?: string
}
