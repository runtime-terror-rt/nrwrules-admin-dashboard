import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from '@/components/ui/dialog'
import React from 'react'

interface CommonDeleteModalProps {
  onConfirm: () => void
  children: React.ReactNode
  title?: string
  description?: string
  isLoading?: boolean
  btnText?: string
}

const CommonDeleteModal = ({
  onConfirm,
  children,
  title = 'Confirm Deletion',
  description = 'Are you sure you want to delete this item? This action cannot be undone.',
  isLoading = false,
  btnText = 'Delete',
}: CommonDeleteModalProps) => (
  <Dialog>
    <DialogTrigger asChild>{children}</DialogTrigger>
    <DialogContent className="max-w-md">
      <DialogHeader>
        <DialogTitle className="text-red-500">{title}</DialogTitle>
      </DialogHeader>
      <p className="text-gray-600">{description}</p>
      <div className="flex gap-3 mt-4 justify-end">
        <DialogClose asChild>
          <button className="px-4 py-2 border rounded-lg hover:bg-gray-50 transition">
            Cancel
          </button>
        </DialogClose>
        <button
          onClick={onConfirm}
          disabled={isLoading}
          className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition disabled:opacity-50"
        >
          {isLoading ? 'Loading...' : btnText}
        </button>
      </div>
    </DialogContent>
  </Dialog>
)

export default CommonDeleteModal
