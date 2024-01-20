import { cn } from '@/utils'

interface DifficultyIndicatorProps
  extends React.HTMLAttributes<HTMLParagraphElement> {
  difficulty: Difficulty
}
const DifficultyIndicator = ({
  difficulty,
  className,
  ...props
}: DifficultyIndicatorProps) => {
  return (
    <p
      className={cn(
        className,
        difficulty === 'EASY' && 'text-green-500',
        difficulty === 'MEDIUM' && 'text-yellow-500',
        difficulty === 'HARD' && 'text-red-500',
      )}
      {...props}
    >
      {difficulty}
    </p>
  )
}

export default DifficultyIndicator
