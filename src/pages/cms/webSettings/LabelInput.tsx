/* eslint-disable @typescript-eslint/no-explicit-any */
function LabelInput({ label, value, placeholder, textarea, onChange }: any) {
  return (
    <div className="my-2 xl:my-4">
      <label className="mb-1.5 block text-sm font-medium">{label}</label>
      {textarea ? (
        <textarea
          rows={3}
          value={value || ''}
          placeholder={placeholder}
          onChange={(e) => onChange(e.target.value)}
          className="w-full rounded-lg border border-[#F8BBD0] px-4 py-2"
        />
      ) : (
        <input
          value={value || ''}
          placeholder={placeholder}
          onChange={(e) => onChange(e.target.value)}
          className="w-full rounded-lg border border-[#F8BBD0] px-4 py-2"
        />
      )}
    </div>
  )
}
export default LabelInput
