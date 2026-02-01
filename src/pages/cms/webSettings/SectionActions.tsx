import { Button } from '../../../components'

function SectionActions({
  onSave,
  onCancel,
  loading,
}: {
  onSave: () => void
  onCancel: () => void
  loading?: boolean
}) {
  return (
    <div className="mt-6 flex gap-3">
      <button type="button" onClick={onCancel} className="rounded-lg border px-4 py-2 text-sm">
        Cancel
      </button>

      <Button variant="primary" size="md" onClick={onSave} disabled={loading}>
        {loading ? 'Saving...' : 'Save All Changes'}
      </Button>
    </div>
  )
}
export default SectionActions
