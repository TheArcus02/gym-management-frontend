import ObjectCard from '@/components/object-card'
import SectionWrapper from '@/components/section-wrapper'
import { Button } from '@/components/ui/button'
import {
  Command,
  CommandGroup,
  CommandItem,
  CommandList,
} from '@/components/ui/command'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import useDelete from '@/hooks/use-delete'
import useGetAll from '@/hooks/use-get-all'
import {
  Dumbbell,
  GanttChartSquare,
  MoreVertical,
} from 'lucide-react'
import { Link } from 'react-router-dom'

export const ClientCardContent = ({
  client: client,
}: {
  client: Client
}) => {
  return (
    <>
      <p>Weight: {client.weight} kg</p>
      <p>Has trainer: {client.trainerId ? 'Yes' : 'No'}</p>
      <p>
        Workout Plan:{' '}
        {client.workoutPlan ? client.workoutPlan.name : 'None'}
      </p>
    </>
  )
}

const Client = () => {
  const {
    data: clients,
    isLoading,
    isError,
  } = useGetAll<Client[]>({
    queryKey: ['clients'],
    url: '/api/client',
    errorMessage: 'Error fetching clients',
  })

  const { mutate: deleteClient } = useDelete({
    url: '/api/client',
    successMessage: 'Client deleted successfully',
    errorMessage: 'Error deleting client',
    invalidateQueries: ['clients'],
  })

  const canDisplay = !isLoading && !isError && clients
  return (
    <TooltipProvider>
      <SectionWrapper
        title='Clients'
        isLoading={!canDisplay}
        buttonProps={{
          title: 'Add Client',
          link: '/client/add',
        }}
      >
        {canDisplay &&
          clients.map((client) => (
            <ObjectCard
              key={client.id}
              title={client.name + ' ' + client.surname}
              description={client.email}
              content={<ClientCardContent client={client} />}
              footer={
                <>
                  <Link to={`/client/${client.id}`}>
                    <Button variant='outline'>Edit</Button>
                  </Link>
                  <Tooltip>
                    <TooltipTrigger>
                      <Popover>
                        <PopoverTrigger>
                          <Button variant='ghost' size='icon'>
                            <MoreVertical />
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className='w-52 px-1 py-1 z-10'>
                          <Command>
                            <CommandList>
                              <CommandGroup>
                                <Link
                                  to={`/client/${client.id}/trainer`}
                                >
                                  <CommandItem className='cursor-pointer'>
                                    <Dumbbell className='mr-2 h-4 w-4' />
                                    <span>Assign Trainer</span>
                                  </CommandItem>
                                </Link>
                                <Link
                                  to={`/client/${client.id}/workout-plan`}
                                >
                                  <CommandItem className='cursor-pointer'>
                                    <GanttChartSquare className='mr-2 h-4 w-4' />
                                    <span>Assign Workout Plan</span>
                                  </CommandItem>
                                </Link>
                              </CommandGroup>
                            </CommandList>
                          </Command>
                        </PopoverContent>
                      </Popover>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className='text-foreground text-sm'>
                        Actions
                      </p>
                    </TooltipContent>
                  </Tooltip>
                </>
              }
              deleteFunction={() => deleteClient(client.id)}
            />
          ))}
      </SectionWrapper>
    </TooltipProvider>
  )
}

export default Client
