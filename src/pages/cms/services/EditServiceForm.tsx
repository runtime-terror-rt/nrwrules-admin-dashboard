/* eslint-disable @typescript-eslint/no-explicit-any */
import UploadBox from './UploadBox'

function EditServiceForm({ form, onChange, onFile }: any) {
  return (
    <div className="grid gap-6 sm:grid-cols-2">
      <div className="space-y-4">
        <label className="block text-sm font-medium text-gray-700">Service Title</label>
        <input
          value={form.title || ''}
          onChange={(e) => onChange('title', e.target.value)}
          className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm"
        />

        <label className="block text-sm font-medium text-gray-700">Short Description</label>
        <textarea
          rows={3}
          value={form.description || ''}
          onChange={(e) => onChange('description', e.target.value)}
          className="w-full h-43     rounded-lg border border-gray-200 px-3 py-2 text-sm"
        />
      </div>

      <div className="space-y-4">
        <UploadBox label="Thumbnail Image" onFile={(f) => onFile('thumbnail_img', f)} />

        <label className="block text-sm font-medium text-gray-700">Button Text</label>
        <input
          value={form.btn_text || ''}
          onChange={(e) => onChange('btn_text', e.target.value)}
          className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm"
        />

        <label className="block text-sm font-medium text-gray-700">Button Link</label>
        <input
          value={form.btn_link || ''}
          onChange={(e) => onChange('btn_link', e.target.value)}
          className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm"
        />
      </div>
    </div>
  )
}

export default EditServiceForm
