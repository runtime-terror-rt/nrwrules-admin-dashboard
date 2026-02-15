import Swal from 'sweetalert2'
import { toast } from 'sonner'
import {
  useGetJourneysQuery,
  useDeleteJourneyMutation,
} from '../../redux/features/api/admin/journey'
import { Button, Card, PageHeader } from '../../components'
import SkeletonLoading from '@/components/SkeletonLoading'
import JourneyModal from '@/components/modal/JourneyModal'
import { Edit, Trash2, Plus } from 'lucide-react'

export function CmsOurJourney() {
  const { data: journeys, isLoading } = useGetJourneysQuery(undefined)
  const [deleteJourney] = useDeleteJourneyMutation()

  const handleDelete = async (id: number) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!'
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await deleteJourney(id).unwrap()
          Swal.fire(
            'Deleted!',
            'Milestone has been deleted.',
            'success'
          )
        } catch (error: any) {
          toast.error(error?.data?.message || 'Failed to delete milestone')
        }
      }
    })
  }

  return (
    <>
       <PageHeader
        title="Our Journey"
        subtitle="CMS · Journey"
        description="Manage the growth milestones of the Mamabot ecosystem."
        action={
          <JourneyModal>
            <Button className="bg-[#E91E63] w-full sm:w-auto">
              <Plus size={18}/>
               Add Milestone
            </Button>
          </JourneyModal>
        }
      />

      <div className="grid grid-cols-1  gap-6">
        {isLoading ? (
          <SkeletonLoading count={3} direction="vertical" />
        ) : (
          journeys?.data?.map((m: any, i: number) => (
            <Card key={m.id || i} className="flex items-start justify-between gap-4 p-4 ">
              <div className="flex items-center gap-4">
                <div className="w-36 h-36 rounded-xl overflow-hidden border-2 border-sky-100 flex-shrink-0">
                  <img
                    src={m.image_url_1 || 'https://via.placeholder.com/150'}
                    alt={m.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="w-36 h-36 rounded-xl overflow-hidden border-2 border-sky-100 flex-shrink-0">
                  <img
                    src={m.image_url_2 || 'https://via.placeholder.com/150'}
                    alt={m.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <p className="text-xs text-sky-400 mt-1">
                    {m.count > 1000 ? `${Math.round(m.count / 1000)}k+` : m.count}
                  </p>
                  <p className="font-semibold text-lg text-rose-500">{m.title}</p>
                  <p className="text-sm text-gray-600 line-clamp-2 italic mt-2">
                    &ldquo;{m.description}&rdquo;
                  </p>
                </div>
              </div>

              <div className="flex gap-2">
                <JourneyModal initialData={m}>
                  <button
                    type="button"
                    className="p-1.5 text-sky-500 hover:bg-sky-50 rounded-lg transition-colors cursor-pointer"
                    aria-label="Edit"
                  >
                    <Edit size={18} />
                  </button>
                </JourneyModal>
                <button
                  type="button"
                  onClick={() => handleDelete(m.id)}
                  className="p-1.5 text-rose-500 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
                  aria-label="Delete"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </Card>
          ))
        )}
      </div>
    </>
  )
}
