import { Button, Card, Icon, PageHeader } from '../components'

/**
 * Web Settings — Figma node 3585-13270.
 * General Site Information, Contact & Social, SEO & Metadata.
 */
export function WebSettings() {
  return (
    <>
      <PageHeader
        title="Web Settings"
        subtitle="Web Settings"
        description="Manage general site information, contacts, and SEO."
      />

      <Section
        title="General Site Information"
        subtitle="Manage your general site information, contacts, and SEO."
      >
        <div className="space-y-4">
          <LabelInput label="Site Name" value="Mamabot" />
          <LabelInput label="Footer Description" placeholder="Brief description..." textarea />
          <LabelInput label="Copyright Text" value="© 2026 Mamabot. All rights reserved." />
          <LabelInput label="Footer Text" value="Empowering healthcare through AI" />
          <div className="grid gap-4 sm:grid-cols-2">
            <UploadBox label="Logo" />
            <UploadBox label="Favicon" />
          </div>
        </div>
        <SectionActions />
      </Section>

      <Section title="Contact & Social Information">
        <div className="grid gap-6 sm:grid-cols-2">
          <div className="space-y-4">
            <p className="text-xs font-semibold uppercase tracking-wider text-gray-500">
              Social Media
            </p>
            <LabelInput label="Instagram URL" value="https://instagram.com/" />
            <LabelInput label="Facebook URL" value="https://facebook.com/" />
            <LabelInput label="TikTok" value="https://tiktok.com/" />
          </div>
          <div className="space-y-4">
            <p className="text-xs font-semibold uppercase tracking-wider text-gray-500">
              Contact Information
            </p>
            <LabelInput label="Primary Email" type="email" value="contactmambot@gmail.com" />
            <LabelInput label="Working Hours" value="Mon - Fri: 9:00 AM - 6:00 PM" />
            <LabelInput label="Headquarter Address" placeholder="Address..." textarea />
          </div>
        </div>
        <SectionActions />
      </Section>

      <Section title="SEO & Metadata">
        <div className="space-y-4">
          <LabelInput label="Meta Title" value="Mamabot - AI Healthcare Solutions" />
          <LabelInput label="Meta Description" placeholder="Description..." textarea />
          <LabelInput label="Meta Keywords" value="healthcare, ai, medical, automation, bot" />
          <div>
            <label className="mb-1.5 block text-sm font-medium text-gray-700">
              Google Schema (JSON-LD)
            </label>
            <textarea
              readOnly
              rows={6}
              className="w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-2.5 font-mono text-sm text-gray-800"
              defaultValue={JSON.stringify(
                {
                  '@context': 'https://schema.org',
                  '@type': 'Organization',
                  name: 'Mamabot',
                  url: 'https://mamabot.com',
                },
                null,
                2
              )}
            />
          </div>
          <UploadBox label="Social Share Image (OG Image)" />
        </div>
        <SectionActions />
      </Section>
    </>
  )
}

function Section({
  title,
  subtitle,
  children,
}: {
  title: string
  subtitle?: string
  children: React.ReactNode
}) {
  return (
    <Card className="mb-8">
      <h2 className="text-lg font-semibold text-[var(--color-secondary)]">{title}</h2>
      {subtitle && <p className="mt-1 text-sm text-gray-600">{subtitle}</p>}
      <div className="mt-4 space-y-6">{children}</div>
    </Card>
  )
}

function SectionActions() {
  return (
    <div className="mt-6 flex flex-wrap gap-3">
      <button
        type="button"
        className="rounded-lg border border-[var(--color-primary)] bg-white px-4 py-2 text-sm font-medium text-[var(--color-primary)] hover:bg-[#FDF1F5]"
        onClick={() => {}}
      >
        Cancel
      </button>
      <Button variant="primary" size="md" onClick={() => {}}>
        Save All Changes
      </Button>
    </div>
  )
}

function LabelInput({
  label,
  value,
  placeholder,
  type = 'text',
  textarea,
}: {
  label: string
  value?: string
  placeholder?: string
  type?: string
  textarea?: boolean
}) {
  const inputClass =
    'w-full rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm text-gray-900 placeholder:text-gray-400 focus:border-[var(--color-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/30'
  return (
    <div>
      <label className="mb-1.5 block text-sm font-medium text-gray-700">{label}</label>
      {textarea ? (
        <textarea
          rows={3}
          className={inputClass}
          defaultValue={value}
          placeholder={placeholder}
          readOnly
        />
      ) : (
        <input
          type={type}
          className={inputClass}
          defaultValue={value}
          placeholder={placeholder}
          readOnly
        />
      )}
    </div>
  )
}

function UploadBox({ label }: { label: string }) {
  return (
    <div>
      <label className="mb-1.5 block text-sm font-medium text-gray-700">{label}</label>
      <div
        className="flex min-h-24 flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-200 bg-gray-50 py-6 text-center"
        role="button"
        tabIndex={0}
        onClick={() => {}}
        onKeyDown={(e) => e.key === 'Enter' && (() => {})()}
      >
        <Icon name="upload" size={40} className="text-gray-400" />
        <p className="mt-2 text-sm text-[var(--color-primary)]">Click or Drag image here</p>
      </div>
    </div>
  )
}

