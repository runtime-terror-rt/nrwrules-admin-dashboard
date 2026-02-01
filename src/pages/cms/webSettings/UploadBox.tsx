import { Icon } from '../../../components'

function UploadBox({
  label,
  preview,
  onSelect,
}: {
  label: string
  preview?: string
  onSelect: (file: File) => void
}) {
  return (
    <div>
      <label className="mb-1.5 block text-sm font-medium">{label}</label>

      <label className="flex cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-[#F8BBD0] p-4">
        {preview ? (
          <img src={preview} alt={label} className="h-20 object-contain" />
        ) : (
          <Icon name="upload" size={32} />
        )}
        <input
          type="file"
          hidden
          accept="image/*"
          onChange={(e) => e.target.files && onSelect(e.target.files[0])}
        />
      </label>
    </div>
  )
}
export default UploadBox
