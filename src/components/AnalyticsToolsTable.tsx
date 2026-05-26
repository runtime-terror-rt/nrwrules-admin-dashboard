import { memo, useState } from 'react'
import { theme } from '../constants'
import { Button, Icon, Modal, Input, PageTitle } from './ui'

export interface AnalyticsTool {
  id: number
  tool: string
  tracking_id: string
  enabled: number
  created_at: string
  updated_at: string
}

export interface AnalyticsToolsTableProps {
  tools: AnalyticsTool[]
  onEditSubmit?: (tool: AnalyticsTool) => void
}

const tableHeaderStyle = {
  backgroundColor: theme.color.tableHeader,
}

function AnalyticsToolsTableComponent({ tools, onEditSubmit }: AnalyticsToolsTableProps) {
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 5

  const totalPages = Math.ceil(tools.length / itemsPerPage)
  const paginatedTools = tools.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  )

  const [editingTool, setEditingTool] = useState<AnalyticsTool | null>(null)
  const [editFormData, setEditFormData] = useState<Partial<AnalyticsTool>>({})

  const handleEditClick = (tool: AnalyticsTool) => {
    setEditingTool(tool)
    setEditFormData(tool)
  }

  const handleEditChange = (field: keyof AnalyticsTool, value: any) => {
    setEditFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSave = () => {
    if (editingTool && onEditSubmit) {
      onEditSubmit({ ...editingTool, ...editFormData } as AnalyticsTool)
    }
    setEditingTool(null)
  }

  return (
    <div className="mt-8">
      <PageTitle as={2} className="text-sky-400! mb-4">
        Analytics Configurations
      </PageTitle>
      <div
        className="overflow-hidden rounded-xl border border-gray-200 bg-white"
        style={{ boxShadow: theme.shadow.card }}
      >
        <div className="overflow-x-auto scrollbar-thin scrollbar-thumb-pink-100 scrollbar-track-transparent">
          <table className="w-full min-w-[800px] text-left text-[11px] md:text-sm border-collapse">
            <thead>
              <tr>
                <th
                  className="px-4 py-3 font-bold uppercase tracking-wider text-gray-800 whitespace-nowrap"
                  style={tableHeaderStyle}
                >
                  Tool Name
                </th>
                <th
                  className="px-4 py-3 font-bold uppercase tracking-wider text-gray-800 whitespace-nowrap"
                  style={tableHeaderStyle}
                >
                  Tracking ID
                </th>
                <th
                  className="px-4 py-3 font-bold uppercase tracking-wider text-gray-800 whitespace-nowrap text-center"
                  style={tableHeaderStyle}
                >
                  Status
                </th>
                <th
                  className="px-4 py-3 font-bold uppercase tracking-wider text-gray-800 whitespace-nowrap"
                  style={tableHeaderStyle}
                >
                  Updated At
                </th>
                <th
                  className="px-4 py-3 font-bold uppercase tracking-wider text-gray-800 whitespace-nowrap text-right"
                  style={tableHeaderStyle}
                >
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {paginatedTools.length === 0 ? (
                <tr>
                  <td colSpan={5} className="py-6 text-center text-gray-500">
                    No analytics tools found.
                  </td>
                </tr>
              ) : (
                paginatedTools.map((tool, index) => (
                  <TableRow
                    key={tool.id}
                    tool={tool}
                    index={index}
                    onEdit={() => handleEditClick(tool)}
                  />
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
            <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
              <div>
                <p className="text-sm text-gray-700">
                  Showing <span className="font-medium">{(currentPage - 1) * itemsPerPage + 1}</span> to{' '}
                  <span className="font-medium">
                    {Math.min(currentPage * itemsPerPage, tools.length)}
                  </span>{' '}
                  of <span className="font-medium">{tools.length}</span> results
                </p>
              </div>
              <div>
                <nav
                  className="isolate inline-flex -space-x-px rounded-md shadow-sm"
                  aria-label="Pagination"
                >
                  <button
                    onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                    disabled={currentPage === 1}
                    className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 disabled:opacity-50"
                  >
                    <span className="sr-only">Previous</span>
                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>
                  {Array.from({ length: totalPages }).map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setCurrentPage(i + 1)}
                      className={`relative inline-flex items-center px-4 py-2 text-sm font-semibold focus:z-20 focus:outline-offset-0 ${
                        currentPage === i + 1
                          ? 'z-10 bg-[var(--color-primary)] text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2'
                          : 'text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50'
                      }`}
                      style={
                        currentPage === i + 1
                          ? { backgroundColor: theme.color.primary }
                          : undefined
                      }
                    >
                      {i + 1}
                    </button>
                  ))}
                  <button
                    onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                    disabled={currentPage === totalPages}
                    className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 disabled:opacity-50"
                  >
                    <span className="sr-only">Next</span>
                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </nav>
              </div>
            </div>
          </div>
        )}
      </div>

      <Modal
        open={!!editingTool}
        onClose={() => setEditingTool(null)}
        title="Edit Analytics Tool"
      >
        {editingTool && (
          <div className="space-y-4 pt-4">
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">Tool Name</label>
              <Input
                value={editFormData.tool || ''}
                readOnly
                className="bg-gray-50"
              />
              <p className="mt-1 text-xs text-gray-500">Tool name cannot be changed.</p>
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">Tracking ID</label>
              <Input
                value={editFormData.tracking_id || ''}
                onChange={(e) => handleEditChange('tracking_id', e.target.value)}
                placeholder="Enter Tracking ID"
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">Status</label>
              <select
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-pink-500 focus:ring-pink-500 sm:text-sm px-3 py-2 border outline-none transition-colors"
                value={editFormData.enabled}
                onChange={(e) => handleEditChange('enabled', Number(e.target.value))}
              >
                <option value={1}>Enabled</option>
                <option value={0}>Disabled</option>
              </select>
            </div>
            <div className="mt-6 flex justify-end gap-3">
              <Button variant="outline" onClick={() => setEditingTool(null)}>
                Cancel
              </Button>
              <Button onClick={handleSave}>Save Changes</Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  )
}

function TableRow({
  tool,
  index,
  onEdit,
}: {
  tool: AnalyticsTool
  index: number
  onEdit: () => void
}) {
  const rowBg = index % 2 === 0 ? theme.color.surface : theme.color.pageBackground
  
  const formatDate = (dateStr: string) => {
    try {
      return new Date(dateStr).toLocaleDateString(undefined, {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      })
    } catch {
      return dateStr
    }
  }

  const formatToolName = (name: string) => {
    return name
      .split('_')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ')
  }

  return (
    <tr style={{ backgroundColor: rowBg }} className="hover:opacity-95 transition-opacity">
      <td className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap">
        {formatToolName(tool.tool)}
      </td>
      <td className="px-4 py-3 text-gray-600 whitespace-nowrap font-mono text-xs">
        {tool.tracking_id}
      </td>
      <td className="px-4 py-3 text-center whitespace-nowrap">
        {tool.enabled === 1 ? (
          <span className="inline-flex items-center gap-1 rounded-full bg-green-100 px-2.5 py-1 text-[10px] font-bold uppercase tracking-tight text-green-700">
            <Icon name="check" size={12} />
            Enabled
          </span>
        ) : (
          <span className="inline-flex items-center gap-1 rounded-full bg-red-100 px-2.5 py-1 text-[10px] font-bold uppercase tracking-tight text-red-700">
            <Icon name="x" size={12} />
            Disabled
          </span>
        )}
      </td>
      <td className="px-4 py-3 text-gray-600 whitespace-nowrap">
        {formatDate(tool.updated_at)}
      </td>
      <td className="px-4 py-3 text-right whitespace-nowrap">
        <button
          onClick={onEdit}
          className="inline-flex items-center justify-center p-1.5 text-gray-400 hover:text-sky-500 hover:bg-sky-50 rounded-md transition-colors"
          title="Edit"
        >
          <Icon name="edit" size={16} />
        </button>
      </td>
    </tr>
  )
}

export const AnalyticsToolsTable = memo(AnalyticsToolsTableComponent)
