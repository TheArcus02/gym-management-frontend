import React from 'react'
import { Input, InputProps } from './ui/input'
import { cn } from '@/utils'

interface SearchInputProps extends InputProps {
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  placeholder?: string
}

const SearchInput = ({
  handleInputChange,
  placeholder,
  className,
  ...props
}: SearchInputProps) => {
  return (
    <Input
      onChange={handleInputChange}
      placeholder={placeholder || 'Search...'}
      className={cn(className)}
      {...props}
    />
  )
}

export default SearchInput
