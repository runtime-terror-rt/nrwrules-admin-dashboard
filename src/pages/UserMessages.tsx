import { useState, useMemo } from 'react'
import Swal from 'sweetalert2'
import { PageHeader, Card, Icon, Modal } from '@/components'
import {
  useDeleteUserMessageMutation,
  useGetUserMessagesQuery,
  type ContactMessage,
} from '@/redux/features/api/user/UserMessages'

export function UserMessages() {
  const { data, isLoading } = useGetUserMessagesQuery()
  const [deleteMessage] = useDeleteUserMessageMutation()

  const [selectedMessage, setSelectedMessage] = useState<ContactMessage | null>(null)

  const messages = useMemo(() => data?.data ?? [], [data])

  /** truncate */
  const truncateMessage = (msg: string) => {
    const words = msg.split(' ')
    if (words.length <= 5) return msg
    return words.slice(0, 5).join(' ') + '...'
  }

  /** handle delete */
  const handleDelete = async (id: number) => {
    const result = await Swal.fire({
      title: 'Delete message?',
      text: 'This action cannot be undone.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Delete',
    })

    if (!result.isConfirmed) return

    try {
      const res = await deleteMessage(id).unwrap()
      Swal.fire({
        icon: 'success',
        title: 'Deleted',
        text: res.message || 'Message deleted successfully',
        timer: 1500,
        showConfirmButton: false,
      })
      if (selectedMessage?.id === id) setSelectedMessage(null)
    } catch (err: any) {
      Swal.fire({
        icon: 'error',
        title: 'Failed',
        text: err?.data?.message || 'Failed to delete message',
      })
    }
  }

  return (
    <div className="">
      <PageHeader
        title="User Messages"
        subtitle="User Messages"
        description="Monitor user messages and communications."
      />

      <div className="space-y-3 mt-4">
        {isLoading ? (
          <p>Loading messages...</p>
        ) : messages.length === 0 ? (
          <p className="text-gray-500">No messages found.</p>
        ) : (
          messages.map((msg) => (
            <Card
              key={msg.id}
              className="cursor-pointer flex justify-between items-start p-4 hover:bg-gray-50"
              onClick={() => setSelectedMessage(msg)}
            >
              <div className="space-y-1">
                <p className="font-semibold text-gray-900">
                  {msg.first_name} {msg.last_name}
                </p>
                <p className="text-sm text-gray-600">{msg.email}</p>
                <p className="text-sm text-gray-700">{truncateMessage(msg.message)}</p>
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  handleDelete(msg.id)
                }}
                className="p-1.5 text-gray-400 hover:text-red-600"
                aria-label="Delete message"
              >
                <Icon name="trash" size={18} />
              </button>
            </Card>
          ))
        )}
      </div>

      {/* Modal message details */}
      <Modal
        open={!!selectedMessage}
        onClose={() => setSelectedMessage(null)}
        title={selectedMessage ? `${selectedMessage.first_name} ${selectedMessage.last_name}` : ''}
      >
        {selectedMessage && (
          <div className="space-y-4">
            <dl className="grid grid-cols-1 gap-2 text-sm sm:grid-cols-[auto_1fr]">
              <dt className="font-medium text-gray-500">First Name</dt>
              <dd>{selectedMessage.first_name}</dd>

              <dt className="font-medium text-gray-500">Last Name</dt>
              <dd>{selectedMessage.last_name}</dd>

              <dt className="font-medium text-gray-500">Email</dt>
              <dd>{selectedMessage.email}</dd>

              <dt className="font-medium text-gray-500">Phone</dt>
              <dd>{selectedMessage.phone_number}</dd>

              <dt className="font-medium text-gray-500">Message</dt>
              <dd>{selectedMessage.message}</dd>

              <dt className="font-medium text-gray-500">Agreed to Privacy</dt>
              <dd>{selectedMessage.agreed_to_privacy ? 'Yes' : 'No'}</dd>

              <dt className="font-medium text-gray-500">Submitted At</dt>
              <dd>{new Date(selectedMessage.submitted_at).toLocaleString()}</dd>
            </dl>

            <div className="flex justify-end pt-4">
              <button
                onClick={() => handleDelete(selectedMessage.id)}
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded"
              >
                Delete
              </button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  )
}
