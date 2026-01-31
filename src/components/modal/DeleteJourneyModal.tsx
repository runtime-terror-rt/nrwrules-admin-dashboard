import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from '@/components/ui/dialog'

const DeleteJourneyModal = ({
  onConfirm,
  children,
}: {
  onConfirm: () => void
  children: React.ReactNode
}) => (
  <Dialog>
    <DialogTrigger asChild>{children}</DialogTrigger>
    <DialogContent className="max-w-md">
      <DialogHeader>
        <DialogTitle className="text-red-500">Confirm Deletion</DialogTitle>
      </DialogHeader>
      <p className="text-gray-600">
        Are you sure you want to remove this journey milestone? This action cannot be undone.
      </p>
      <div className="flex gap-3 mt-4">
        <button onClick={onConfirm} className="px-4 py-2 bg-red-500 text-white rounded-lg">
          Delete
        </button>
        <DialogClose className="px-4 py-2 border rounded-lg">Cancel</DialogClose>
      </div>
    </DialogContent>
  </Dialog>
)

export default DeleteJourneyModal
