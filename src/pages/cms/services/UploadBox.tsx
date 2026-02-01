function UploadBox({ label, onFile }: { label: string; onFile: (file: File) => void }) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700">{label}</label>
      <label className="flex h-24 cursor-pointer items-center justify-center rounded-lg border-2 border-dashed border-gray-200 bg-gray-50 text-sm text-[var(--color-primary)]">
        Click or drag image here
        <input
          type="file"
          hidden
          accept="image/*"
          onChange={(e) => e.target.files && onFile(e.target.files[0])}
        />
      </label>
    </div>
  )
}

export default UploadBox
