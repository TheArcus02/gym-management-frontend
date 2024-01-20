import ObjectCard from '@/components/object-card'
import SearchInput from '@/components/search-input'
import SectionWrapper from '@/components/section-wrapper'
import { Button } from '@/components/ui/button'
import { useGetFreeClients } from '@/hooks/use-client'
import useSearch from '@/hooks/use-search'
import { useAssignClient } from '@/hooks/use-trainer'
import { useEffect } from 'react'
import { useParams } from 'react-router-dom'

const AssignClient = () => {
  const params = useParams()
  const [search, setSearch] = useSearch()

  const {
    data: clients,
    isLoading,
    isError,
    refetch,
  } = useGetFreeClients({
    search,
  })

  const { mutate: assignClient } = useAssignClient()

  const canDisplay = !isLoading && !isError && clients

  useEffect(() => {
    refetch()
  }, [search, refetch])

  return (
    <SectionWrapper
      title='Clients ready to be assigned'
      isLoading={!canDisplay}
    >
      <SearchInput
        placeholder='Search for a client'
        handleInputChange={(e) => setSearch(e.target.value)}
      />
      {canDisplay &&
        clients.map((client) => (
          <ObjectCard
            key={client.id}
            title={client.name + ' ' + client.surname}
            description={client.email}
            content={<p>Weight: {client.weight} kg</p>}
            footer={
              <>
                <Button
                  onClick={() =>
                    assignClient({
                      clientId: client.id,
                      trainerId: parseInt(params.id!),
                    })
                  }
                >
                  Assign
                </Button>
              </>
            }
          />
        ))}
    </SectionWrapper>
  )
}

export default AssignClient
