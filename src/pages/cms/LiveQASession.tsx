import { useState } from 'react'
import { Button, PageHeader, Modal } from '@/components'
import { Plus, Eye } from 'lucide-react'
import { toast } from 'sonner'
import {
  useCreateSessionMutation,
  useGetSessionsQuery,
  type QASessionData,
} from '@/redux/features/api/user/QASession'
import { useGetDoctorsQuery } from '@/redux/features/api/admin/doctor'

export function LiveQASession() {
  const { data, isLoading } = useGetSessionsQuery()
  const [createSession, { isLoading: isCreating }] = useCreateSessionMutation()
  const sessions = data?.data || []

  // Modal & form states
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedSession, setSelectedSession] = useState<QASessionData | null>(null)
  const [form, setForm] = useState({
    doctor_id: 0,
    topic: '',
    start_time: '',
    end_time: '',
    meeting_link: '',
  })
  const { data: doctorsData } = useGetDoctorsQuery()
  const doctors = doctorsData?.data || []
  // Open Schedule modal
  const openScheduleModal = () => {
    setSelectedSession(null)
    setForm({ doctor_id: 0, topic: '', start_time: '', end_time: '', meeting_link: '' })
    setIsModalOpen(true)
  }

  // Handle create session
  const handleSchedule = async () => {
    if (form.doctor_id === 0) {
      toast.error('Please select a doctor')
      return
    }
    if (!form.topic || !form.start_time || !form.end_time || !form.meeting_link) {
      toast.error('All fields are required')
      return
    }

    const payload = {
      ...form,
      start_time: form.start_time.replace('T', ' ') + ':00',
      end_time: form.end_time.replace('T', ' ') + ':00',
    }

    try {
      await toast.promise(createSession(payload).unwrap(), {
        loading: 'Scheduling session...',
        success: 'QA Session scheduled successfully!',
        error: 'Failed to schedule session.',
      })

      setForm({ doctor_id: 0, topic: '', start_time: '', end_time: '', meeting_link: '' })
      setIsModalOpen(false)
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <PageHeader
        title="Live Q&A Session"
        subtitle="live Q&A sessions to address user queries and provide real-time support, enhancing user engagement and satisfaction."
        description="Manage Live Q&A Session information and activities for your website's users."
        action={
          <Button
            onClick={openScheduleModal}
            className="bg-[#E91E63] w-full sm:w-auto shadow shadow-[#E91E63]/20 flex items-center gap-2"
          >
            <Plus size={18} />
            Schedule New Session
          </Button>
        }
      />

      {/* Sessions Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full border rounded-lg">
          <thead className="bg-gray-50 text-left">
            <tr>
              <th className="p-3">ID</th>
              <th className="p-3">Doctor Name</th>
              <th className="p-3">Start Time</th>
              <th className="p-3">End Time</th>
              <th className="p-3 text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr>
                <td colSpan={5} className="p-3">
                  Loading sessions...
                </td>
              </tr>
            ) : sessions.length === 0 ? (
              <tr>
                <td colSpan={5} className="p-3 text-gray-500">
                  No sessions found.
                </td>
              </tr>
            ) : (
              sessions.map((session) => (
                <tr key={session.id} className="border-t">
                  <td className="p-3">{session.id}</td>
                  <td className="p-3">{session.doctor?.name || 'N/A'}</td>
                  <td className="p-3">{new Date(session.start_time).toLocaleString()}</td>
                  <td className="p-3">{new Date(session.end_time).toLocaleString()}</td>
                  <td className="p-3 flex justify-center">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => setSelectedSession(session)}
                      className="flex items-center gap-1"
                    >
                      <Eye size={16} /> View
                    </Button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      <Modal
        open={isModalOpen || !!selectedSession}
        onClose={() => {
          setIsModalOpen(false)
          setSelectedSession(null)
        }}
        title={selectedSession ? `Session Details` : 'Schedule New QA Session'}
      >
        {selectedSession ? (
          <div className="space-y-3">
            <p>
              <strong>Topic:</strong> {selectedSession.topic}
            </p>
            <p>
              <strong>Doctor:</strong> {selectedSession.doctor?.name}
            </p>
            <p>
              <strong>Start:</strong> {new Date(selectedSession.start_time).toLocaleString()}
            </p>
            <p>
              <strong>End:</strong> {new Date(selectedSession.end_time).toLocaleString()}
            </p>
            <p>
              <strong>Meeting Link:</strong>{' '}
              <a
                href={selectedSession.meeting_link}
                target="_blank"
                className="text-blue-600 underline"
              >
                {selectedSession.meeting_link}
              </a>
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            <label className="block font-medium">Doctor</label>
            <select
              value={form.doctor_id}
              onChange={(e) => setForm({ ...form, doctor_id: Number(e.target.value) })}
              className="w-full border rounded p-2"
            >
              <option value={0} disabled>
                Select a doctor
              </option>
              {doctors.map((doc) => (
                <option key={doc.id} value={doc.id}>
                  {doc.name} ({doc.specialty})
                </option>
              ))}
            </select>

            <label className="block font-medium">Topic</label>
            <input
              type="text"
              value={form.topic}
              onChange={(e) => setForm({ ...form, topic: e.target.value })}
              className="w-full border rounded p-2"
              placeholder="Session Topic"
            />

            <label className="block font-medium">Start Time</label>
            <input
              type="datetime-local"
              value={form.start_time}
              onChange={(e) => setForm({ ...form, start_time: e.target.value })}
              className="w-full border rounded p-2"
            />

            <label className="block font-medium">End Time</label>
            <input
              type="datetime-local"
              value={form.end_time}
              onChange={(e) => setForm({ ...form, end_time: e.target.value })}
              className="w-full border rounded p-2"
            />

            <label className="block font-medium">Meeting Link</label>
            <input
              type="url"
              value={form.meeting_link}
              onChange={(e) => setForm({ ...form, meeting_link: e.target.value })}
              className="w-full border rounded p-2"
              placeholder="https://zoom.us/j/..."
            />

            <Button
              onClick={handleSchedule}
              className="bg-[#E91E63] w-full mt-2"
              disabled={isCreating}
            >
              {isCreating ? 'Scheduling...' : 'Schedule'}
            </Button>
          </div>
        )}
      </Modal>
    </div>
  )
}
