/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  useGetJourneysQuery,
  useDeleteJourneyMutation,
} from '../../redux/features/api/admin/journey'
import { Card, Icon, PageHeader } from '../../components'
import SkeletonLoading from '@/components/SkeletonLoading'
import DeleteJourneyModal from '@/components/modal/DeleteJourneyModal'
import JourneyModal from '@/components/modal/JourneyModal'

export function CmsOurJourney() {
  const { data: journeys, isLoading } = useGetJourneysQuery(undefined)
  const [deleteJourney] = useDeleteJourneyMutation()

  return (
    <>
      <div className="flex justify-between items-center mb-6">
        <PageHeader
          title="Our Journey"
          subtitle="CMS · Journey"
          description="Manage the growth milestones of the Mamabot ecosystem."
        />
        {journeys?.data.length === 0 && (
          <JourneyModal>
            <button className="bg-rose-500 text-white px-4 py-2 rounded-lg">+ Add Milestone</button>
          </JourneyModal>
        )}
      </div>

      <div className="grid grid-cols-1  gap-6">
        {isLoading ? (
          <SkeletonLoading count={3} />
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
                  <p className="font-semibold text-[var(--color-primary)]">{m.title}</p>
                  <p className="text-sm text-gray-600 line-clamp-2 italic">
                    &ldquo;{m.description}&rdquo;
                  </p>
                  <p className="text-xs text-gray-400 mt-1">Order: {m.sort_order}</p>
                </div>
              </div>

              <div className="flex gap-2">
                <JourneyModal initialData={m}>
                  <button
                    type="button"
                    className="p-1.5 text-gray-400 hover:text-[var(--color-primary)] transition-colors"
                    aria-label="Edit"
                  >
                    <Icon name="edit" size={18} className="text-sky-500! cursor-pointer" />
                  </button>
                </JourneyModal>
                <DeleteJourneyModal onConfirm={() => deleteJourney(m.id)}>
                  <button
                    type="button"
                    className="p-1.5 text-gray-400 hover:text-red-500! transition-colors"
                    aria-label="Delete"
                  >
                    <Icon name="trash" size={18} className="text-red-500! cursor-pointer" />
                  </button>
                </DeleteJourneyModal>
              </div>
            </Card>
          ))
        )}
      </div>
    </>
  )
}
