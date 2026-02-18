import { useState } from 'react'
import { Eye, X, Plus, Trash2 } from 'lucide-react'
import { useDeleteFaqMutation, useSaveFaqMutation } from '@/redux/features/api/user/FAQs'
import { useGetFaqsQuery } from '@/redux/features/api/user/FaqGET'
import { PageHeader } from '@/components'
import { toast } from 'sonner'
import Swal from 'sweetalert2'

interface Faq {
  id?: number
  question: string
  answer: string
  order: number
  is_active: number | boolean
}

const truncateWords = (text: string, limit = 5) => {
  const words = text.split(' ')
  return words.length > limit ? words.slice(0, limit).join(' ') + '...' : text
}

const FAQs = () => {
  const { data, isLoading } = useGetFaqsQuery()
  const [saveFaq, { isLoading: isSaving }] = useSaveFaqMutation()
  const [deleteFaq] = useDeleteFaqMutation()
  const faqs: Faq[] = data?.data || []

  const [selectedFaq, setSelectedFaq] = useState<Faq | null>(null)
  const [, setIsEdit] = useState(false)
  const [isAdd, setIsAdd] = useState(false)

  const [form, setForm] = useState({
    id: undefined as number | undefined,
    question: '',
    answer: '',
    order: 0,
    is_active: true,
  })

  // Open modal to view/edit FAQ
  const openViewModal = (faq: Faq) => {
    setSelectedFaq(faq)
    setForm({
      id: faq.id,
      question: faq.question,
      answer: faq.answer,
      order: faq.order,
      is_active: Boolean(faq.is_active),
    })
    setIsEdit(false)
    setIsAdd(false)
  }

  // Open modal to add new FAQ
  const openAddModal = () => {
    setSelectedFaq(null)
    setForm({ id: undefined, question: '', answer: '', order: 0, is_active: true })
    setIsEdit(true)
    setIsAdd(true)
  }

  // Save or Update FAQ
  const handleSave = async () => {
    try {
      const payload = { ...form }

      const response = await saveFaq(payload).unwrap()

      // Show success toast
      toast.success(
        response.message || (isAdd ? 'FAQ added successfully' : 'FAQ updated successfully')
      )

      // Close modal and reset form
      setSelectedFaq(null)
      setIsAdd(false)
      setIsEdit(false)
      setForm({ id: undefined, question: '', answer: '', order: 0, is_active: true })
    } catch (err: any) {
      toast.error(err?.data?.message || 'Something went wrong')
    }
  }

  const handleDelete = async (faq: Faq) => {
    if (!faq.id) return

    // Confirm deletion first
    const result = await Swal.fire({
      title: 'Delete message?',
      text: 'This action cannot be undone.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Delete',
    })

    if (!result.isConfirmed) return

    try {
      // Show loading + success/error with Sonner
      await toast.promise(deleteFaq(faq.id).unwrap(), {
        loading: 'Deleting FAQ...',
        success: 'FAQ deleted successfully!',
        error: 'Failed to delete FAQ.',
      })

      // Close modal if the deleted FAQ is currently selected
      if (selectedFaq?.id === faq.id) {
        setSelectedFaq(null)
        setIsAdd(false)
        setIsEdit(false)
        setForm({ id: undefined, question: '', answer: '', order: 0, is_active: true })
      }
    } catch (err) {
      // Optional: Already handled by toast.promise, but can log if needed
      console.error('FAQ delete error:', err)
    }
  }

  if (isLoading) return <p>Loading FAQs...</p>

  return (
    <>
      <div className="flex justify-between items-center mb-3">
        <PageHeader title="FAQs" subtitle="FAQs" description="Manage frequently asked questions." />
        <button
          onClick={openAddModal}
          className="flex items-center gap-2 px-4 py-2 bg-pink-500 text-white rounded-lg text-sm font-medium hover:bg-pink-600 transition-colors"
        >
          <Plus size={16} /> Add New FAQ
        </button>
      </div>

      {/* TABLE */}
      <div className="w-full overflow-x-auto">
        <table className="min-w-full border rounded-lg">
          <thead className="bg-sky-50 text-left">
            <tr>
              <th className="p-3">ID</th>
              <th className="p-3">Question</th>
              <th className="p-3">Answer</th>
              <th className="p-3 text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {faqs.map((faq) => (
              <tr key={faq.id} className="border-t">
                <td className="p-3">{faq.id}</td>
                <td className="p-3">{truncateWords(faq.question)}</td>
                <td className="p-3">{truncateWords(faq.answer)}</td>
                <td className="p-3 flex justify-center gap-2">
                  <button
                    onClick={() => openViewModal(faq)}
                    className="p-2 rounded bg-sky-100 text-sky-600"
                  >
                    <Eye size={16} />
                  </button>
                  <button
                    onClick={() => handleDelete(faq)}
                    className="p-2 rounded bg-red-100 text-red-600"
                  >
                    <Trash2 size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* MODAL */}
      {(selectedFaq || isAdd) && (
        <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center px-3">
          <div className="bg-white rounded-xl w-full max-w-lg p-5 relative">
            <button
              onClick={() => {
                setSelectedFaq(null)
                setIsAdd(false)
              }}
              className="absolute top-3 right-3"
            >
              <X />
            </button>

            <h3 className="text-lg text-black! font-semibold mb-4">
              {isAdd ? 'Add New FAQ' : 'FAQ Details'}
            </h3>

            <label className="block font-semibold mb-2">Question :</label>
            <input
              className="w-full border rounded p-2 mb-3"
              value={form.question}
              onChange={(e) => setForm({ ...form, question: e.target.value })}
              placeholder="Question"
            />

            <label className="block font-semibold mb-2">Answer :</label>
            <textarea
              className="w-full border rounded p-2 mb-3"
              value={form.answer}
              onChange={(e) => setForm({ ...form, answer: e.target.value })}
              placeholder="Answer"
            />

            <label className="block font-semibold mb-2">Order :</label>
            <input
              type="number"
              className="w-full border rounded p-2 mb-3"
              value={form.order}
              onChange={(e) => setForm({ ...form, order: Number(e.target.value) })}
            />

            <label className="flex items-center gap-2 mb-4">
              <input
                type="checkbox"
                checked={form.is_active}
                onChange={(e) => setForm({ ...form, is_active: e.target.checked })}
              />
              Active
            </label>

            <button
              onClick={handleSave}
              disabled={isSaving}
              className="w-full bg-sky-500 text-white py-2 rounded"
            >
              {isSaving ? (isAdd ? 'Adding...' : 'Updating...') : isAdd ? 'Add FAQ' : 'Update FAQ'}
            </button>
          </div>
        </div>
      )}
    </>
  )
}

export default FAQs
