const DifficultyIndicator = ({
  difficulty,
}: {
  difficulty: Difficulty
}) => {
  switch (difficulty) {
    case 'EASY':
      return <span className='text-green-500'>Easy</span>
    case 'MEDIUM':
      return <span className='text-yellow-500'>Medium</span>
    case 'HARD':
      return <span className='text-red-500'>Hard</span>
  }
}

export default DifficultyIndicator
