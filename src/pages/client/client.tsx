import Loader from '@/components/loader'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
  CardDescription,
} from '@/components/ui/card'
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
import { Separator } from '@/components/ui/separator'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import axios from 'axios'
import {
  Dumbbell,
  GanttChartSquare,
  MoreVertical,
  XOctagon,
} from 'lucide-react'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import { Link } from 'react-router-dom'
import { toast } from 'sonner'

const Client = () => {
  const queryClient = useQueryClient()

  const { data, isLoading, isError } = useQuery({
    queryKey: ['clients'],
    queryFn: async () => {
      const { data } = await axios.get(
        `${import.meta.env.VITE_BASE_URL || ''}/api/client`,
      )
      return data as Client[]
    },
    onError: (error) => {
      console.log(error)
      toast.error('Error fetching clients')
    },
  })

  const { mutate: deleteClient } = useMutation({
    mutationFn: async (id: number) => {
      await axios.delete(
        `${import.meta.env.VITE_BASE_URL || ''}/api/client/${id}`,
      )
    },
    onSuccess: () => {
      queryClient.invalidateQueries('clients')
      toast.success(`Trainer deleted successfully`)
    },
    onError: (error) => {
      console.log(error)
      toast.error('Error deleting trainer')
    },
  })

  const canDisplay = !isLoading && !isError && data

  return (
    <TooltipProvider>
      <div className='w-full h-full flex flex-col'>
        <div className=' flex justify-between items-center'>
          <h2 className='text-xl font-bold py-5 pl-3'>Clients</h2>
          <Link to='/client/add'>
            <Button size='sm' className='mr-3'>
              Add Client
            </Button>
          </Link>
        </div>
        <Separator />
        <div className='flex-1'>
          {!canDisplay ? (
            <Loader />
          ) : (
            <div className='p-4 flex flex-wrap w-full gap-5'>
              {data.map((client) => (
                <Card
                  key={client.id}
                  className='max-w-[350px] w-full'
                >
                  <CardHeader>
                    <div className='flex justify-between'>
                      <CardTitle>
                        {client.name} {client.surname}
                      </CardTitle>
                      <Button
                        variant='ghost'
                        size='icon'
                        onClick={() => deleteClient(client.id)}
                      >
                        <XOctagon />
                      </Button>
                    </div>
                    <CardDescription>{client.email}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p>Weight: {client.weight} kg</p>
                    <p>
                      Has trainer: {client.trainerId ? 'Yes' : 'No'}
                    </p>
                  </CardContent>
                  <CardFooter className='flex justify-between'>
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
                  </CardFooter>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </TooltipProvider>
  )
}

export default Client
