/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  useGetMissionsQuery,
  useDeleteMissionMutation,
} from '../../redux/features/api/admin/mission'
import SkeletonLoading from '@/components/SkeletonLoading'
import { Card, Icon, PageHeader } from '../../components'
import { theme } from '../../constants'
import MissionModal from '@/components/modal/MissionModal'

export function CmsOurMission() {
  const { data: missions, isLoading: missionsLoading } = useGetMissionsQuery(undefined)
  const [deleteMission] = useDeleteMissionMutation()

  const handleDelete = async (id: number) => {
    if (window.confirm('Are you sure you want to delete this mission?')) {
      try {
        await deleteMission(id).unwrap()
      } catch (error) {
        console.error('Failed to delete mission:', error)
      }
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <PageHeader
          title="Missions"
          subtitle="CMS · Our Mission"
          description="Central control for Mamabot ecosystem."
        />
        <MissionModal>
          <button
            className="rounded-lg px-4 py-2 text-sm font-medium text-white transition-opacity hover:opacity-90"
            style={{ backgroundColor: theme.color.primary }}
          >
            Add Mission
          </button>
        </MissionModal>
      </div>

      <div>
        <h2 className="mb-4 text-lg font-semibold text-sky-500!">Current Missions</h2>

        <div className="space-y-4">
          {missionsLoading ? (
            <SkeletonLoading count={3} direction="vertical" />
          ) : (
            missions?.data?.map((m: any, i: number) => (
              <Card key={m.id || i} className="flex items-start justify-between gap-4 p-4">
                <div className="flex items-center gap-4">
                  <span className="text-sm font-semibold text-gray-500">{i + 1}.</span>
                  <div className="w-16 h-16 rounded-xl overflow-hidden border-2 border-sky-100 flex-shrink-0">
                    <img
                      src={m.icon_url || 'https://via.placeholder.com/150'}
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
                  <MissionModal initialData={m}>
                    <button
                      type="button"
                      className="p-1.5 text-gray-400 hover:text-[var(--color-primary)] transition-colors"
                      aria-label="Edit"
                    >
                      <Icon name="edit" size={18} className="text-sky-500! cursor-pointer" />
                    </button>
                  </MissionModal>
                  <button
                    type="button"
                    onClick={() => handleDelete(m.id)}
                    className="p-1.5 text-gray-400 hover:text-red-500! transition-colors"
                    aria-label="Delete"
                  >
                    <Icon name="trash" size={18} className="text-red-500! cursor-pointer" />
                  </button>
                </div>
              </Card>
            ))
          )}
          {!missionsLoading && missions?.data?.length === 0 && (
            <div className="text-center py-10 text-gray-500 bg-gray-50 rounded-xl border border-dashed">
              No missions found. Click "Add Mission" to get started.
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
