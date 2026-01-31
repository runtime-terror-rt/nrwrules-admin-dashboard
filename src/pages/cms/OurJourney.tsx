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
        <JourneyModal>
          <button className="bg-rose-500 text-white px-4 py-2 rounded-lg">+ Add Milestone</button>
        </JourneyModal>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {isLoading ? (
          <SkeletonLoading count={3} />
        ) : (
          journeys?.data?.map((j: any) => (
            <Card key={j.id} className="p-4 flex flex-col gap-3">
              <div className="flex gap-2 h-24">
                <img src={j.image_url_1} className="w-1/2 object-cover rounded-lg border" />
                <img src={j.image_url_2} className="w-1/2 object-cover rounded-lg border" />
              </div>
              <div>
                <div className="flex justify-between">
                  <h3 className="font-bold text-sky-500!">{j.title}</h3>
                  <span className="text-xs font-bold bg-gray-100 px-2 rounded-full">{j.count}</span>
                </div>
                <p className="text-sm text-gray-500 line-clamp-2">{j.description}</p>
              </div>
              <div className="flex gap-2 mt-auto border-t pt-3">
                <JourneyModal initialData={j}>
                  <button className="text-gray-400 hover:text-sky-500 flex items-center gap-1">
                    <Icon name="edit" size={16} /> Edit
                  </button>
                </JourneyModal>
                <DeleteJourneyModal onConfirm={() => deleteJourney(j.id)}>
                  <button className="text-gray-400 hover:text-red-500 flex items-center gap-1">
                    <Icon name="trash" size={16} /> Delete
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
