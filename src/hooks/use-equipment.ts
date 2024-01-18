import { equipmentSchema } from '@/utils/schema'
import useAdd from './use-add'
import useDelete from './use-delete'
import useGetAll from './use-get-all'
import useGetById from './use-get-by-id'
import useUpdate from './use-update'

export const useGetAllEquipment = ({ search }: SearchableQuery) => {
  return useGetAll<EquipmentObject[]>({
    queryKey: ['all-equipment'],
    url: search
      ? `/api/equipment/search?name=${search}`
      : '/api/equipment',
    errorMessage: 'Error fetching equipment',
  })
}

export const useGetEquipment = (id: number) => {
  return useGetById<EquipmentObject>({
    queryKey: ['equipment', Number(id)],
    url: `/api/equipment/${id}`,
    errorMessage: 'Error fetching equipment',
    id: Number(id),
  })
}

export const useDeleteEquipment = () => {
  return useDelete({
    url: '/api/equipment',
    successMessage: 'Equipment deleted successfully',
    errorMessage: 'Error deleting equipment',
    invalidateQueries: ['all-equipment'],
  })
}

export const useAddEquipment = () => {
  return useAdd<Equipment>({
    schema: equipmentSchema,
    url: '/api/equipment',
    successMessage: 'Equipment added successfully',
    errorMessage: 'Error adding equipment',
    invalidateQueries: ['all-equipment'],
    redirectUrl: '/equipment',
  })
}

export const useUpdateEquipment = () => {
  return useUpdate<Equipment>({
    schema: equipmentSchema,
    url: '/api/equipment',
    successMessage: 'Equipment updated successfully',
    errorMessage: 'Error updating equipment',
    invalidateQueries: ['all-equipment'],
    redirectUrl: '/equipment',
  })
}
