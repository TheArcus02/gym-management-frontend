import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useDebounce } from './use-debounce'

function useSearch(): [string, Dispatch<SetStateAction<string>>] {
  const [searchParams, setSerchParams] = useSearchParams()
  const initialSearch = searchParams.get('name') || ''
  const [search, setSearch] = useState(initialSearch || '')
  const debouncedSearch = useDebounce<string>(search, 500)

  useEffect(() => {
    if (!debouncedSearch) {
      setSerchParams({})
      return
    }
    setSerchParams({
      name: debouncedSearch,
      surname: debouncedSearch,
    })
  }, [debouncedSearch, setSerchParams])

  return [debouncedSearch, setSearch]
}

export default useSearch
