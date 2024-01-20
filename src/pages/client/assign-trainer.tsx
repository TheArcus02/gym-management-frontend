import { Button } from '@/components/ui/button'
import { useParams } from 'react-router-dom'
import SectionWrapper from '@/components/section-wrapper'
import ObjectCard from '@/components/object-card'
import { useGetTrainers } from '@/hooks/use-trainer'
import { useAssignTrainer, useGetClient } from '@/hooks/use-client'
import useSearch from '@/hooks/use-search'
import { useEffect } from 'react'
import SearchInput from '@/components/search-input'

const AssignTrainer = () => {
  const [search, setSearch] = useSearch()
  const params = useParams()

  const {
    data: trainers,
    isLoading: isTrainersLoading,
    isError: isTrainersError,
    refetch,
  } = useGetTrainers({
    search,
  })

  const {
    data: client,
    isLoading: isClientLoading,
    isError: isClientError,
  } = useGetClient(parseInt(params.id!))

  const { mutate: assignTrainer } = useAssignTrainer()

  useEffect(() => {
    refetch()
  }, [refetch, search])

  const canDisplay =
    !isClientLoading &&
    !isTrainersLoading &&
    !isClientError &&
    !isTrainersError &&
    trainers &&
    client
  return (
    <SectionWrapper
      title='Assign Trainer to Client'
      isLoading={!canDisplay}
    >
      <SearchInput
        placeholder='Search for a trainer'
        handleInputChange={(e) => setSearch(e.target.value)}
      />
      {canDisplay &&
        trainers.map((trainer) => (
          <ObjectCard
            key={trainer.id}
            title={trainer.name + ' ' + trainer.surname}
            content={
              <>
                <p>Salary: ${trainer.salary}</p>
                <p>Clients: {trainer.clients.length}</p>
              </>
            }
            footer={
              <>
                {client.trainerId === trainer.id ? (
                  <Button disabled>Assigned</Button>
                ) : (
                  <Button
                    onClick={() =>
                      assignTrainer({
                        clientId: client.id,
                        trainerId: trainer.id,
                      })
                    }
                  >
                    Assign
                  </Button>
                )}
              </>
            }
          />
        ))}
    </SectionWrapper>
  )
}

export default AssignTrainer
