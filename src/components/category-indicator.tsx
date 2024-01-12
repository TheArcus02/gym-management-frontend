const CategoryIndicator = ({ category }: { category: Category }) => {
  switch (category) {
    case 'PUSH':
      return (
        <span className='badge badge-pill badge-primary'>Push</span>
      )
    case 'PULL':
      return (
        <span className='badge badge-pill badge-secondary'>Pull</span>
      )
    case 'LEGS':
      return (
        <span className='badge badge-pill badge-success'>Legs</span>
      )
    case 'CARDIO':
      return (
        <span className='badge badge-pill badge-danger'>Cardio</span>
      )
  }
}

export default CategoryIndicator
