/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from 'react'
import { Edit, Trash2, Plus, Image as ImageIcon } from 'lucide-react'
import SkeletonLoading from '@/components/SkeletonLoading'
import {
  useDeleteArticleMutation,
  useGetArticlesQuery,
  useGetCategoriesQuery,
  useUpsertArticleMutation,
} from '@/redux/features/api/admin/articles'
import { PageHeader } from '@/components'

const ArticleModal = ({ initialData, onCancel }: any) => {
  const { data: catResponse } = useGetCategoriesQuery({})
  const [upsertArticle, { isLoading }] = useUpsertArticleMutation()

  const [formData, setFormData] = useState({
    title: '',
    short_description: '',
    long_description: '',
    category_id: '',
    phase_type: 'pregnancy',
    status: 'published',
    week: '13',
  })

  const [mainImg, setMainImg] = useState<File | null>(null)
  const [thumbImg, setThumbImg] = useState<File | null>(null)

  useEffect(() => {
    if (initialData) {
      setFormData({
        title: initialData.title || '',
        short_description: initialData.short_description || '',
        long_description: initialData.long_description || '',
        category_id: initialData.category_id || '',
        phase_type: initialData.phase_type || 'pregnancy',
        status: initialData.status || 'published',
        week: initialData.week?.toString() || '13',
      })
    }
  }, [initialData])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const data = new FormData()
    if (initialData?.id) data.append('id', initialData.id)

    Object.entries(formData).forEach(([key, value]) => data.append(key, value))
    if (mainImg) data.append('main_img', mainImg)
    if (thumbImg) data.append('thumb_img', thumbImg)

    await upsertArticle(data)
    onCancel()
  }

  return (
    <div className="fixed inset-0 bg-black/60 flex justify-center items-center z-50 p-4 backdrop-blur-sm">
      <div className="bg-white rounded-[2rem] w-full max-w-4xl max-h-[90vh] overflow-y-auto p-6 md:p-10 shadow-2xl animate-in fade-in zoom-in duration-300 text-black">
        <form onSubmit={handleSubmit} className="space-y-6 md:space-y-8">
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-2xl font-bold text-sky-500! mb-1">
                {initialData ? 'Edit Content' : 'Create New Content'}
              </h2>
              <p className="text-gray-400 text-sm">Fill in the details to publish or update an article.</p>
            </div>
            <button type="button" onClick={onCancel} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
              <Plus className="rotate-45 text-gray-400" size={24} />
            </button>
          </div>

          <div className="space-y-5">
            <div className="space-y-1">
              <label className="text-xs font-bold text-gray-400 uppercase tracking-wider ml-1">Article Content</label>
              <div className="space-y-4">
                <input
                  className="w-full p-4 border border-transparent bg-gray-50 focus:bg-white focus:border-sky-200 rounded-2xl transition-all outline-none font-semibold text-gray-800"
                  value={formData.title}
                  required
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="Article Title (e.g., Understanding Postpartum Care)"
                />
                <input
                  required
                  className="w-full p-4 border border-transparent bg-gray-50 focus:bg-white focus:border-sky-200 rounded-2xl transition-all outline-none text-gray-600"
                  value={formData.short_description}
                  onChange={(e) => setFormData({ ...formData, short_description: e.target.value })}
                  placeholder="Brief summary for list view..."
                />
                <textarea
                  rows={6}
                  required
                  className="w-full p-4 border border-transparent bg-gray-50 focus:bg-white focus:border-sky-200 rounded-2xl transition-all outline-none text-gray-600 resize-none"
                  value={formData.long_description}
                  onChange={(e) => setFormData({ ...formData, long_description: e.target.value })}
                  placeholder="The full body of your article..."
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="space-y-1 text-gray-700">
                <label className="text-xs font-bold text-gray-400 uppercase tracking-wider ml-1">Category</label>
                <select
                  required
                  className="w-full p-3.5 border border-transparent bg-gray-50 focus:bg-white focus:border-sky-200 rounded-2xl transition-all outline-none appearance-none cursor-pointer"
                  value={formData.category_id}
                  onChange={(e) => setFormData({ ...formData, category_id: e.target.value })}
                >
                  <option value="">Select Category</option>
                  {catResponse?.data?.map((cat: any) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.title}
                    </option>
                  ))}
                </select>
              </div>
              <div className="space-y-1 text-gray-700">
                <label className="text-xs font-bold text-gray-400 uppercase tracking-wider ml-1">Target Phase</label>
                <select
                  required
                  className="w-full p-3.5 border border-transparent bg-gray-50 focus:bg-white focus:border-sky-200 rounded-2xl transition-all outline-none appearance-none cursor-pointer"
                  value={formData.phase_type}
                  onChange={(e) => setFormData({ ...formData, phase_type: e.target.value })}
                >
                  <option value="pregnancy">Pregnancy</option>
                  <option value="postpartum">Postpartum</option>
                </select>
              </div>
              <div className="space-y-1 text-gray-700">
                <label className="text-xs font-bold text-gray-400 uppercase tracking-wider ml-1">Status</label>
                <select
                  required
                  className="w-full p-3.5 border border-transparent bg-gray-50 focus:bg-white focus:border-sky-200 rounded-2xl transition-all outline-none appearance-none cursor-pointer"
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                >
                  <option value="published">Published</option>
                  <option value="draft">Draft</option>
                </select>
              </div>
              <div className="space-y-1 text-gray-700">
                <label className="text-xs font-bold text-gray-400 uppercase tracking-wider ml-1">Week Number</label>
                <input
                  required
                  type="number"
                  className="w-full p-3.5 border border-transparent bg-gray-50 focus:bg-white focus:border-sky-200 rounded-2xl transition-all outline-none"
                  value={formData.week}
                  onChange={(e) => setFormData({ ...formData, week: e.target.value })}
                />
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-8 pt-4">
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-400 uppercase tracking-wider ml-1">Thumbnail Image</label>
                <label className="w-full sm:w-40 h-40 border-2 border-dashed border-gray-100 bg-gray-50 rounded-3xl flex flex-col items-center justify-center cursor-pointer hover:bg-gray-100 transition relative overflow-hidden group">
                  <input
                    type="file"
                    className="hidden"
                    onChange={(e) => setThumbImg(e.target.files?.[0] || null)}
                  />
                  {thumbImg ? (
                    <img src={URL.createObjectURL(thumbImg)} className="object-cover w-full h-full" />
                  ) : (
                    <div className="flex flex-col items-center gap-2">
                      <ImageIcon className="text-gray-300 group-hover:text-sky-400 transition-colors" size={32} />
                      <span className="text-[10px] text-gray-400 font-bold uppercase tracking-tight">Select Thumb</span>
                    </div>
                  )}
                </label>
              </div>
              <div className="space-y-2 flex-1">
                <label className="text-xs font-bold text-gray-400 uppercase tracking-wider ml-1">Banner Image</label>
                <label className="w-full h-40 border-2 border-dashed border-gray-100 bg-gray-50 rounded-3xl flex flex-col items-center justify-center cursor-pointer hover:bg-gray-100 transition relative overflow-hidden group">
                  <input
                    type="file"
                    className="hidden"
                    onChange={(e) => setMainImg(e.target.files?.[0] || null)}
                  />
                  {mainImg ? (
                    <img src={URL.createObjectURL(mainImg)} className="object-cover w-full h-full" />
                  ) : (
                    <div className="flex flex-col items-center gap-2">
                      <ImageIcon className="text-gray-300 group-hover:text-sky-400 transition-colors" size={32} />
                      <span className="text-[10px] text-gray-400 font-bold uppercase tracking-tight">Select Banner</span>
                    </div>
                  )}
                </label>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-gray-50">
            <button
              type="submit"
              disabled={isLoading}
              className="flex-1 bg-rose-500 text-white p-4 rounded-2xl font-bold hover:bg-rose-600 shadow-lg shadow-rose-100 transition-all active:scale-95"
            >
              {initialData
                ? isLoading ? 'Updating...' : 'Update Article'
                : isLoading ? 'Creating...' : 'Publish Article'}
            </button>
            <button
              type="button"
              onClick={onCancel}
              className="px-10 py-4 border border-gray-200 text-gray-500 font-bold rounded-2xl hover:bg-gray-50 transition-all"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export const CmsArticles = () => {
  const { data: articlesResponse, isLoading } = useGetArticlesQuery({})
  const [deleteArticle] = useDeleteArticleMutation()

  const [activeTab, setActiveTab] = useState('All Posts')
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [selectedArticle, setSelectedArticle] = useState<any>(null)

  const articles = articlesResponse?.data || []

  const filteredArticles = articles.filter((art: any) => {
    if (activeTab === 'Published') return art.status === 'published' // Example count logic
    if (activeTab === 'Draft') return art.status === 'draft'
    return true
  })

  const handleEdit = (article: any) => {
    setSelectedArticle(article)
    setIsFormOpen(true)
  }

  const handleAddNew = () => {
    setSelectedArticle(null)
    setIsFormOpen(true)
  }

  return (
   <>

     <PageHeader
        title="Articles/ Blog Management"
        subtitle="CMS · Articles/ Blog Management"
      />
    <div className=" min-h-screen text-white">
      {/* Header */}
      <div className="bg-white p-4 rounded-xl">
        <div className="flex flex-col sm:flex-row justify-between items-start gap-4 mb-6 ">
          <div>
            <h1 className="text-xl md:text-2xl font-bold text-sky-400!">Content Management System</h1>
            <p className="text-gray-400 text-xs md:text-sm mt-1">
              Create and manage educational content, recovery guides, and articles.
            </p>
          </div>
          <button
            onClick={handleAddNew}
            className="w-full sm:w-auto bg-[#E91E63]  text-white px-4 py-2.5 rounded-lg flex items-center justify-center gap-2 transition text-sm font-semibold shadow-lg shadow-rose-100"
          >
            <Plus size={18} /> New Content
          </button>
        </div>

        {/* Effect Info Box */}
        <div className="bg-rose-50 border border-rose-100 rounded-xl p-4 text-rose-600 text-sm">
          <h3 className="font-bold mb-2 text-rose-600!">Effect on Mamabot Website:</h3>
          <ul className="list-disc ml-5 space-y-1">
            <li>Appears in Blog page</li>
            <li>Shown in Recommended Articles section</li>
            <li>Used in AI-powered content suggestions</li>
          </ul>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-3 my-8 overflow-x-auto pb-2 scrollbar-hide">
        {['All Posts', `Published`, `Draft`].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`whitespace-nowrap px-6 py-3 rounded-xl text-sm font-bold transition-all ${
              activeTab === tab
                ? 'text-rose-600 bg-white border border-rose-500 shadow-sm'
                : 'text-gray-500 bg-white/50 border border-transparent hover:bg-white hover:text-rose-400'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Modal for Add/Edit */}
      {isFormOpen && (
        <ArticleModal initialData={selectedArticle} onCancel={() => setIsFormOpen(false)} />
      )}

      {/* Article List */}
      <div className="grid grid-cols-1 gap-6">
        {isLoading ? (
          <SkeletonLoading count={3} />
        ) : (
          filteredArticles.map((article: any) => (
            <div
              key={article.id}
              className="group bg-white rounded-3xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-all flex flex-col md:flex-row gap-6 relative"
            >
              <div className="shrink-0">
                <div className="w-full md:w-32 h-40 md:h-32 rounded-2xl overflow-hidden bg-gray-50 shadow-inner">
                  {article.thumb_img ? (
                    <img src={article.thumb_img} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-300">
                      <ImageIcon size={32} />
                    </div>
                  )}
                </div>
              </div>

              <div className="flex-1 flex flex-col">
                <div className="flex flex-wrap items-center gap-2 mb-2">
                  <span className="bg-sky-50 text-sky-600 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border border-sky-100">
                    {article.category?.title}
                  </span>
                  <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border ${
                    article.status === 'published' ? 'bg-green-50 text-green-600 border-green-100' : 'bg-orange-50 text-orange-600 border-orange-100'
                  }`}>
                    {article.status}
                  </span>
                </div>
                
                <h3 className="font-bold text-xl text-gray-900! mb-2 group-hover:text-rose-500 transition-colors">{article.title}</h3>
                <p className="text-gray-500 text-sm line-clamp-2 md:line-clamp-3 mb-6 leading-relaxed">
                  {article.short_description}
                </p>

                <div className="mt-auto flex flex-wrap items-center gap-6 text-[10px] md:text-xs">
                  <div className="flex items-center gap-1.5 text-gray-400 font-bold uppercase tracking-tight">
                    <span className="w-2 h-2 rounded-full bg-sky-400" />
                    Phase: <span className="text-gray-900">{article.phase_type}</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-gray-400 font-bold uppercase tracking-tight">
                    <span className="w-2 h-2 rounded-full bg-rose-400" />
                    Week: <span className="text-gray-900">{article.week}</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-gray-400 font-bold uppercase tracking-tight">
                    <span className="w-2 h-2 rounded-full bg-green-400" />
                    Posted: <span className="text-gray-900">{article.created_at?.split('T')[0]}</span>
                  </div>
                </div>
              </div>

              <div className="flex md:flex-col gap-2 pt-4 md:pt-0 border-t md:border-t-0 border-gray-50">
                <button
                  onClick={() => handleEdit(article)}
                  className="flex-1 md:flex-none p-3 text-sky-600 hover:bg-sky-50 rounded-xl transition-colors flex items-center justify-center gap-2"
                  title="Edit Article"
                >
                  <Edit size={20} />
                  <span className="md:hidden font-bold text-sm">Edit</span>
                </button>
                <button
                  onClick={() => deleteArticle(article.id)}
                  className="flex-1 md:flex-none p-3 text-rose-600 hover:bg-rose-50 rounded-xl transition-colors flex items-center justify-center gap-2"
                  title="Delete Article"
                >
                  <Trash2 size={20} />
                  <span className="md:hidden font-bold text-sm">Delete</span>
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
   
   
   </>
  )
}
