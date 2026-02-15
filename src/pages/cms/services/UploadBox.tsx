import React, { useState } from 'react'

function UploadBox({ label, onFile, preview }: { label: string; onFile: (file: File) => void; preview?: string }) {
  const [file, setFile] = useState<File | null>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0]
      setFile(selectedFile)
      onFile(selectedFile)
    }
  }

  const displayPreview = file ? URL.createObjectURL(file) : preview

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
      <label className="flex h-32 cursor-pointer items-center justify-center rounded-lg border-2 border-dashed border-gray-200 bg-gray-50 text-sm text-[var(--color-primary)] overflow-hidden relative">
        {displayPreview ? (
            <img src={displayPreview} alt="Preview" className="w-full h-full object-cover" />
        ) : (
            <span className="text-gray-400">Click or drag image here</span>
        )}
        <input
          type="file"
          hidden
          accept="image/*"
          onChange={handleFileChange}
        />
      </label>
    </div>
  )
}

export default UploadBox
