import Loader from '@/components/loader'
import { useGetClients } from '@/hooks/use-client'
import { User } from 'lucide-react'
import DashboardCard from './dashboard-card'

const ClientCard = () => {
  const { data: clients, isLoading, isError } = useGetClients({})

  return !isLoading && clients ? (
    <DashboardCard
      Icon={User}
      title='Clients'
      content={
        <>
          <p>Count: {clients?.length || 0}</p>
          <p>
            Median Weight:{' '}
            {clients?.reduce((a, b) => a + b.weight, 0) /
              clients?.length || 0}
          </p>
          <p>
            Currently training:{' '}
            {clients?.filter((client) => client.isTraining).length ||
              0}
          </p>
        </>
      }
      link='/client'
    />
  ) : (
    <Loader />
  )
}

export default ClientCard
