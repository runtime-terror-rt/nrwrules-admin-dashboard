import { LoadingScreen } from '@/components/LoadingScreen'
import { Button, Card, PageHeader } from '../../components'
import { useGetHeroQuery, useUpdateHeroMutation } from '../../redux/features/api/admin/hero'
import { useState, useEffect } from 'react'
import { Check } from 'lucide-react'

export function CmsHero() {
  const [image, setImage] = useState<File | null>(null)

  const { data, isLoading, error } = useGetHeroQuery(undefined)
  const [updateHero, { isLoading: isUpdating }] = useUpdateHeroMutation()

  const [inputValues, setInputValues] = useState({
    title: '',
    subtitle: '',
    description: '',
    btn_text: '',
    btn_link: '',
  })

  useEffect(() => {
    if (data?.data) {
      setInputValues({
        title: data.data.title || '',
        subtitle: data.data.subtitle || '',
        description: data.data.description || '',
        btn_text: data.data.btn_text || '',
        btn_link: data.data.btn_link || '',
      })
    }
  }, [data])

  const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setImage(file)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setInputValues((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleUpdateHero = () => {
    const formData = new FormData()
    formData.append('title', inputValues.title)
    formData.append('subtitle', inputValues.subtitle)
    formData.append('description', inputValues.description)
    formData.append('btn_text', inputValues.btn_text)
    formData.append('btn_link', inputValues.btn_link)
    if (image) {
      formData.append('image', image)
    }
    updateHero(formData)
  }

  if (isLoading) {
    return <LoadingScreen />
  }
  if (error) {
    return <div>Error in server.</div>
  }
  return (
    <>
      <PageHeader
        title="Hero Section"
        subtitle="CMS · Hero"
        description="Customize the main landing banner."
        action={
          <Button
            variant="primary"
            size="md"
            onClick={() => {
              handleUpdateHero()
            }}
            className="shrink-0"
          >
            <span className="inline-flex items-center gap-2">
              <Check size={18} /> {isUpdating ? 'Saving...' : 'Save Changes'}
            </span>
          </Button>
        }
      />

      <Card>
        <div className="space-y-6">
          <section>
            <h2 className="mb-4 text-base font-semibold text-sky-500!">Content</h2>
            <div className="space-y-4">
              <div>
                <label className="mb-1.5 block text-sm font-medium text-gray-700!">
                  Main Title
                </label>
                <input
                  type="text"
                  value={inputValues.title}
                  onChange={handleInputChange}
                  name="title"
                  className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm"
                />
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium text-gray-700!">Subtitle</label>
                <input
                  type="text"
                  value={inputValues.subtitle}
                  onChange={handleInputChange}
                  name="subtitle"
                  className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm"
                />
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium text-gray-700">
                  Description
                </label>
                <textarea
                  rows={3}
                  value={inputValues.description}
                  onChange={handleInputChange}
                  name="description"
                  className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm"
                />
              </div>
            </div>
          </section>

          <section>
            <h2 className="mb-4 text-base font-semibold text-gray-700!">Settings</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-1.5 block text-sm font-medium text-gray-700">
                  Button text
                </label>
                <input
                  type="text"
                  value={inputValues.btn_text}
                  onChange={handleInputChange}
                  name="btn_text"
                  className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm"
                />
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium text-gray-700">
                  Button link
                </label>
                <input
                  type="text"
                  value={inputValues.btn_link}
                  onChange={handleInputChange}
                  name="btn_link"
                  className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm"
                />
              </div>
            </div>
          </section>

          <section>
            <h2 className="mb-4 text-base font-semibold text-gray-700!">Image URL</h2>
            <div className="flex gap-3">
              {data?.data?.image !== null ? (
                <div className="h-24 w-24 shrink-0 rounded-lg bg-gray-200">
                  <img src={data?.data?.image} alt="" />
                </div>
              ) : (
                <div className="h-24 w-24 shrink-0 rounded-lg text-gray-400 bg-gray-200 flex justify-center items-center">
                  No image
                </div>
              )}
              <div
                onClick={() => document.getElementById('image')?.click()}
                className="flex min-h-24 flex-1 items-center justify-center rounded-lg border-2 border-dashed border-gray-200 bg-blue-50/50 text-sm text-gray-400"
              >
                Click or drag image here
              </div>
              <input
                onChange={handleImage}
                type="file"
                className="hidden"
                accept="image/*"
                id="image"
              />
            </div>
          </section>
        </div>
      </Card>
    </>
  )
}
